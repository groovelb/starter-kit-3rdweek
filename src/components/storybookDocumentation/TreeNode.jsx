import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';

/**
 * TreeNode - MUI theme 구조를 트리 형태로 시각화하는 컴포넌트
 *
 * Props:
 * @param {string} keyName - 표시할 키 이름 [Required]
 * @param {any} value - 키에 해당하는 값 (객체, 배열, 원시값) [Required]
 * @param {number} depth - 트리 깊이 (들여쓰기 계산용) [Optional, 기본값: 0]
 * @param {boolean} defaultOpen - 초기 펼침 상태 [Optional, 기본값: false]
 *
 * Example usage:
 * <TreeNode keyName="palette" value={theme.palette} defaultOpen={true} />
 */
export const TreeNode = ({ keyName, value, depth = 0, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const isObject = typeof value === 'object' && value !== null && !Array.isArray(value);
  const isArray = Array.isArray(value);
  const isExpandable = isObject || isArray;
  const childCount = isExpandable ? Object.keys(value).length : 0;

  // 색상값 감지
  const isColor = typeof value === 'string' && (
    value.startsWith('#') ||
    value.startsWith('rgb') ||
    value.startsWith('rgba')
  );

  // 값 포맷팅
  const formatValue = (val) => {
    if (typeof val === 'string') return `"${val}"`;
    if (typeof val === 'number') return val;
    if (typeof val === 'boolean') return val ? 'true' : 'false';
    if (typeof val === 'function') return 'ƒ()';
    if (val === null) return 'null';
    if (val === undefined) return 'undefined';
    return String(val);
  };

  return (
    <Box sx={ { ml: depth > 0 ? 2 : 0 } }>
      <Box
        onClick={ () => isExpandable && setIsOpen(!isOpen) }
        sx={ {
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          py: 0.5,
          px: 1,
          cursor: isExpandable ? 'pointer' : 'default',
          borderRadius: 1,
          '&:hover': isExpandable ? { backgroundColor: 'action.hover' } : {},
          borderLeft: depth > 0 ? '1px solid' : 'none',
          borderColor: 'divider',
        } }
      >
        {/* 펼침/접힘 아이콘 */}
        { isExpandable ? (
          <Typography
            component="span"
            sx={ {
              width: 16,
              color: 'text.secondary',
              fontSize: '12px',
              fontFamily: 'monospace',
              userSelect: 'none',
            } }
          >
            { isOpen ? '▼' : '▶' }
          </Typography>
        ) : (
          <Box sx={ { width: 16 } } />
        ) }

        {/* 키 이름 */}
        <Typography
          component="span"
          sx={ {
            color: isExpandable ? 'primary.main' : 'secondary.main',
            fontFamily: 'monospace',
            fontSize: '13px',
            fontWeight: isExpandable ? 600 : 400,
          } }
        >
          { keyName }
        </Typography>

        {/* 구분자 */}
        <Typography component="span" sx={ { color: 'text.secondary', fontSize: '13px' } }>
          :
        </Typography>

        {/* 값 또는 타입 정보 */}
        { isExpandable ? (
          <Typography
            component="span"
            sx={ { color: 'text.secondary', fontSize: '12px', fontFamily: 'monospace' } }
          >
            { isArray ? `Array[${childCount}]` : `{${childCount}}` }
          </Typography>
        ) : (
          <Box sx={ { display: 'flex', alignItems: 'center', gap: 1 } }>
            { isColor && (
              <Box
                sx={ {
                  width: 14,
                  height: 14,
                  backgroundColor: value,
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: '2px',
                  flexShrink: 0,
                } }
              />
            ) }
            <Typography
              component="span"
              sx={ {
                color: typeof value === 'string' ? 'success.dark' :
                       typeof value === 'number' ? 'warning.dark' : 'text.primary',
                fontFamily: 'monospace',
                fontSize: '12px',
                maxWidth: 400,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              } }
            >
              { formatValue(value) }
            </Typography>
          </Box>
        ) }
      </Box>

      {/* 하위 노드 */}
      { isExpandable && (
        <Collapse in={ isOpen }>
          <Box>
            { Object.entries(value).map(([childKey, childValue]) => (
              <TreeNode
                key={ childKey }
                keyName={ childKey }
                value={ childValue }
                depth={ depth + 1 }
              />
            )) }
          </Box>
        </Collapse>
      ) }
    </Box>
  );
};
