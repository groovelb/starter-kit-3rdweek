import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { supabase, isSupabaseEnabled } from '../lib/supabase';

/**
 * AuthContext
 * Supabase Auth 상태를 관리하고 어드민 권한을 확인하는 컨텍스트
 *
 * 동작 방식:
 * 1. 앱 초기화 시 기존 세션 확인
 * 2. 세션이 있으면 어드민 프로필 조회
 * 3. Auth 상태 변경 구독으로 실시간 상태 동기화
 */

const AuthContext = createContext(null);

/** 재시도 횟수 */
const MAX_RETRIES = 2;

/**
 * 로컬 스토리지의 Supabase 세션 캐시 정리
 * - 만료되거나 취소된 토큰으로 인한 무한 루프 방지
 * - 명시적으로 호출될 때만 실행 (자동 삭제 방지)
 */
const clearSessionCache = () => {
  try {
    // Supabase가 사용하는 로컬 스토리지 키 패턴
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith('sb-') || key.includes('supabase'))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach((key) => localStorage.removeItem(key));
    console.info('Session cache cleared');
  } catch (error) {
    console.warn('Failed to clear session cache:', error);
  }
};

/**
 * AuthProvider
 *
 * Props:
 * @param {ReactNode} children - 자식 컴포넌트 [Required]
 *
 * 제공하는 값:
 * - user: 현재 로그인한 사용자 정보
 * - adminProfile: 어드민 프로필 정보 (role 포함)
 * - isAdmin: 어드민 여부
 * - isLoading: 인증 상태 로딩 중 여부
 * - signIn: 로그인 함수
 * - signOut: 로그아웃 함수
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [adminProfile, setAdminProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const initCompleteRef = useRef(false);

  /**
   * 어드민 프로필 조회
   */
  const fetchAdminProfile = useCallback(async (userId) => {
    if (!isSupabaseEnabled() || !userId) {
      setAdminProfile(null);
      return null;
    }

    const { data, error } = await supabase
      .from('admin_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.warn('Admin profile not found:', error.message);
      setAdminProfile(null);
      return null;
    }

    setAdminProfile(data);
    return data;
  }, []);

  /**
   * 초기 세션 확인 및 Auth 상태 구독
   *
   * 동작 방식:
   * 1. Supabase 활성화 여부 확인
   * 2. 기존 세션이 있으면 어드민 프로필 조회
   * 3. Auth 상태 변경 구독 설정
   */
  useEffect(() => {
    if (!isSupabaseEnabled()) {
      console.log('[Auth] Supabase not enabled, skipping');
      setIsLoading(false);
      return;
    }

    let isMounted = true;

    // 현재 세션 확인
    const initAuth = async () => {
      console.log('[Auth] Starting initialization...');

      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        console.log('[Auth] getSession result:', { hasSession: !!session, error: error?.message });

        if (!isMounted) return;

        if (error) {
          console.error('[Auth] Session fetch error:', error);
          if (error.message?.includes('Invalid') || error.message?.includes('expired')) {
            clearSessionCache();
          }
        } else if (session?.user) {
          setUser(session.user);
          await fetchAdminProfile(session.user.id);
        }
      } catch (error) {
        console.error('[Auth] Init error:', error);
      } finally {
        if (isMounted) {
          console.log('[Auth] Initialization complete, setting isLoading=false');
          initCompleteRef.current = true;
          setIsLoading(false);
        }
      }
    };

    initAuth();

    // Auth 상태 변경 구독
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('[Auth] State change:', event, { hasSession: !!session });

        if (!isMounted) return;

        // 초기화 완료 전에는 무시 (initAuth가 처리)
        if (!initCompleteRef.current) {
          console.log('[Auth] Ignoring state change, init not complete');
          return;
        }

        if (event === 'SIGNED_OUT' || (event === 'TOKEN_REFRESHED' && !session)) {
          if (event === 'TOKEN_REFRESHED') {
            console.warn('[Auth] Token refresh failed');
            clearSessionCache();
          }
          setUser(null);
          setAdminProfile(null);
          setIsLoading(false);
          return;
        }

        if (session?.user) {
          setUser(session.user);
          await fetchAdminProfile(session.user.id);
        } else {
          setUser(null);
          setAdminProfile(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      isMounted = false;
      subscription?.unsubscribe();
    };
  }, [fetchAdminProfile]);

  /**
   * 이메일/비밀번호로 로그인
   *
   * 동작 방식:
   * 1. 이메일/비밀번호로 Supabase Auth 인증
   * 2. 성공 시 어드민 프로필 확인
   * 3. 어드민이 아니면 로그아웃 처리
   * 4. 네트워크 에러 시 재시도
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{success: boolean, error: string|null}>}
   */
  const signIn = useCallback(async (email, password, retryCount = 0) => {
    if (!isSupabaseEnabled()) {
      return { success: false, error: 'Supabase가 활성화되지 않았습니다.' };
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // 네트워크 에러 시 재시도
        if (error.message?.includes('fetch') || error.message?.includes('network')) {
          if (retryCount < MAX_RETRIES) {
            console.info(`Retrying sign in (${retryCount + 1}/${MAX_RETRIES})...`);
            await new Promise((resolve) => setTimeout(resolve, 1000 * (retryCount + 1)));
            setIsLoading(false);
            return signIn(email, password, retryCount + 1);
          }
        }

        // Supabase Auth 에러 메시지 한글화
        const errorMessages = {
          'Invalid login credentials': '이메일 또는 비밀번호가 올바르지 않습니다.',
          'Email not confirmed': '이메일 인증이 필요합니다.',
          'Too many requests': '요청이 너무 많습니다. 잠시 후 다시 시도해주세요.',
        };
        const message = errorMessages[error.message] || error.message;
        return { success: false, error: message };
      }

      // 어드민 프로필 확인
      const profile = await fetchAdminProfile(data.user.id);

      if (!profile) {
        // 어드민이 아니면 로그아웃
        await supabase.auth.signOut();
        return { success: false, error: '관리자 권한이 없습니다.' };
      }

      return { success: true, error: null };
    } catch (error) {
      // 네트워크 에러 시 재시도
      if (retryCount < MAX_RETRIES) {
        console.info(`Retrying sign in after error (${retryCount + 1}/${MAX_RETRIES})...`);
        await new Promise((resolve) => setTimeout(resolve, 1000 * (retryCount + 1)));
        setIsLoading(false);
        return signIn(email, password, retryCount + 1);
      }

      console.error('Sign in error:', error);
      return { success: false, error: '로그인 중 오류가 발생했습니다. 네트워크 연결을 확인해주세요.' };
    } finally {
      setIsLoading(false);
    }
  }, [fetchAdminProfile]);

  /**
   * 로그아웃
   */
  const signOut = useCallback(async () => {
    if (!isSupabaseEnabled()) {
      return;
    }

    await supabase.auth.signOut();
    setUser(null);
    setAdminProfile(null);
  }, []);

  /**
   * 세션 강제 초기화
   * - 로그인 문제 발생 시 캐시된 세션을 정리
   * - 무한 로딩 상태 해결용
   */
  const resetSession = useCallback(async () => {
    setIsLoading(true);
    try {
      if (isSupabaseEnabled() && supabase) {
        await supabase.auth.signOut();
      }
      clearSessionCache();
      setUser(null);
      setAdminProfile(null);
    } catch (error) {
      console.error('Session reset error:', error);
      clearSessionCache();
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    user,
    adminProfile,
    isAdmin: !!adminProfile,
    isAdminStrict: adminProfile?.role === 'admin',
    isLoading,
    signIn,
    signOut,
    resetSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth Hook
 * @returns {Object} AuthContext 값
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export default AuthContext;
