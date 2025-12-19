import { useState, forwardRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

/**
 * ProductTabs 컴포넌트
 *
 * 제품 상세 정보 탭 메뉴. 레퍼런스 이미지의 세로 탭 스타일 적용.
 *
 * 동작 방식:
 * 1. 탭 목록이 세로로 나열됨
 * 2. 탭 클릭 시 해당 탭이 활성화되고 콘텐츠 표시
 * 3. 활성 탭은 시각적으로 구분 (언더라인 또는 볼드)
 *
 * Props:
 * @param {Array} tabs - 탭 목록 [Required]
 *   - { id: string, label: string, content: ReactNode }
 * @param {string} activeTab - 현재 활성 탭 ID [Optional]
 * @param {function} onTabChange - 탭 변경 핸들러 [Optional]
 * @param {string} orientation - 탭 방향 ('vertical' | 'horizontal') [Optional, 기본값: 'vertical']
 * @param {object} sx - 추가 스타일 [Optional]
 *
 * Example usage:
 * <ProductTabs
 *   tabs={[
 *     { id: 'overview', label: 'Overview', content: <div>Overview content</div> },
 *     { id: 'description', label: 'Description', content: <div>Description</div> },
 *   ]}
 *   activeTab="overview"
 *   onTabChange={(tabId) => console.log(tabId)}
 * />
 */
const ProductTabs = forwardRef(function ProductTabs(
  {
    tabs = [],
    activeTab: controlledActiveTab,
    onTabChange,
    orientation = 'vertical',
    sx = {},
    ...props
  },
  ref
) {
  const [internalActiveTab, setInternalActiveTab] = useState(tabs[0]?.id || '');

  // 외부/내부 활성 탭 관리
  const activeTab = controlledActiveTab !== undefined ? controlledActiveTab : internalActiveTab;

  /**
   * 탭 클릭 핸들러
   * @param {string} tabId - 클릭된 탭 ID
   */
  const handleTabClick = (tabId) => {
    if (onTabChange) {
      onTabChange(tabId);
    } else {
      setInternalActiveTab(tabId);
    }
  };

  // 현재 활성 탭의 콘텐츠 찾기
  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  if (tabs.length === 0) {
    return null;
  }

  const isVertical = orientation === 'vertical';

  return (
    <Box
      ref={ref}
      sx={{
        display: 'flex',
        flexDirection: isVertical ? 'row' : 'column',
        ...sx,
      }}
      {...props}
    >
      {/* 탭 목록 */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: isVertical ? 'column' : 'row',
          gap: isVertical ? 0 : 3,
          ...(isVertical && {
            minWidth: 200,
            borderRight: '1px solid',
            borderColor: 'divider',
            pr: 3,
            mr: 3,
          }),
          ...(!isVertical && {
            borderBottom: '1px solid',
            borderColor: 'divider',
            pb: 0,
            mb: 3,
          }),
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;

          return (
            <Box
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleTabClick(tab.id);
                }
              }}
              sx={{
                cursor: 'pointer',
                py: isVertical ? 1.5 : 1,
                position: 'relative',
                transition: 'color 0.2s ease',
                ...(isVertical && {
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                }),
                ...(!isVertical && {
                  pb: 1.5,
                }),
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? 'text.primary' : 'text.secondary',
                  transition: 'color 0.2s ease, font-weight 0.2s ease',
                  '&:hover': {
                    color: 'text.primary',
                  },
                }}
              >
                {tab.label}
              </Typography>

              {/* 활성 탭 인디케이터 */}
              {!isVertical && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    backgroundColor: isActive ? 'secondary.main' : 'transparent',
                    transition: 'background-color 0.2s ease',
                  }}
                />
              )}
            </Box>
          );
        })}
      </Box>

      {/* 탭 콘텐츠 */}
      <Box
        role="tabpanel"
        sx={{
          flex: 1,
          minHeight: isVertical ? 200 : 'auto',
        }}
      >
        {activeTabContent}
      </Box>
    </Box>
  );
});

export default ProductTabs;

/**
 * 기본 제품 탭 목록
 */
export const DEFAULT_PRODUCT_TABS = [
  { id: 'overview', label: 'Overview' },
  { id: 'description', label: 'Description' },
  { id: 'specs', label: 'Tech Specs + Downloads' },
  { id: 'collection', label: 'Explore the Collection' },
  { id: 'finishes', label: 'Finish Samples' },
  { id: 'parts', label: 'Bulbs + Spare Parts' },
];
