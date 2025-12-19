import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * 환경변수 유효성 검사
 */
const hasValidConfig = !!(supabaseUrl && supabaseAnonKey);

if (!hasValidConfig) {
  console.warn('Supabase environment variables are not set. Check .env or .env.local file.');
}

/**
 * Supabase client 싱글톤 관리
 * - HMR(Hot Module Replacement)로 인한 중복 인스턴스 방지
 * - window 객체에 캐싱하여 재사용
 */
let supabaseInstance = null;

const getSupabaseClient = () => {
  if (!hasValidConfig) return null;

  // 브라우저 환경에서 HMR 시 기존 인스턴스 재사용
  if (typeof window !== 'undefined' && window.__supabase) {
    return window.__supabase;
  }

  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
      global: {
        headers: {
          'x-client-info': 'starter-kit',
        },
      },
      // Realtime 비활성화 (불필요한 연결 방지)
      realtime: {
        params: {
          eventsPerSecond: 1,
        },
      },
    });

    // 브라우저 환경에서 window에 캐싱
    if (typeof window !== 'undefined') {
      window.__supabase = supabaseInstance;
    }
  }

  return supabaseInstance;
};

/**
 * Supabase client instance
 * - Uses anon key for public operations (respects RLS policies)
 * - For admin operations, user must be authenticated via Supabase Auth
 * - null if environment variables are not configured
 * - Singleton pattern to prevent duplicate instances during HMR
 */
export const supabase = getSupabaseClient();

/**
 * Check if Supabase is enabled and properly configured
 * - VITE_USE_SUPABASE must be 'true'
 * - VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be set
 * @returns {boolean}
 */
export const isSupabaseEnabled = () => {
  const featureEnabled = import.meta.env.VITE_USE_SUPABASE === 'true';

  if (featureEnabled && !hasValidConfig) {
    console.error(
      'VITE_USE_SUPABASE is true but Supabase URL/Key are not configured. ' +
      'Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env file.'
    );
    return false;
  }

  return featureEnabled && hasValidConfig;
};

export default supabase;
