import { Box, Typography } from '@mui/material';

/**
 * Title 컴포넌트
 *
 * 섹션/아이템의 계층적 타이틀 시스템을 제공하는 컴포넌트.
 * Overline, 메인 타이틀, 서브타이틀의 조합으로 명확한 정보 계층을 구성한다.
 *
 * 동작 방식:
 * 1. level prop에 따라 적절한 시맨틱 HTML 태그 (h1~h4)가 자동 적용됨
 * 2. overline이 있으면 메인 타이틀 위에 작은 레이블로 표시됨
 * 3. subtitle이 있으면 메인 타이틀 아래에 부연 설명으로 표시됨
 * 4. layout에 따라 요소들의 배치 방식이 달라짐
 * 5. divider가 true면 하단에 시각적 구분선이 추가됨
 *
 * Props:
 * @param {string} title - 메인 타이틀 텍스트 [Required]
 * @param {string} overline - 상단 작은 레이블 텍스트 [Optional]
 * @param {string} subtitle - 하단 서브타이틀 텍스트 [Optional]
 * @param {string} level - 시맨틱 레벨 ('h1' | 'h2' | 'h3' | 'h4') [Optional, 기본값: 'h2']
 * @param {string} align - 텍스트 정렬 ('left' | 'center' | 'right') [Optional, 기본값: 'left']
 * @param {string} layout - 레이아웃 방식 ('stack' | 'inline' | 'split') [Optional, 기본값: 'stack']
 * @param {boolean} divider - 하단 구분선 표시 여부 [Optional, 기본값: false]
 * @param {string} dividerStyle - 구분선 스타일 ('line' | 'dot' | 'gradient') [Optional, 기본값: 'line']
 * @param {object} sx - 추가 스타일 오버라이드 [Optional]
 *
 * Example usage:
 * <Title title="섹션 제목" />
 * <Title title="About Us" overline="Company" subtitle="우리의 이야기" />
 * <Title title="Features" layout="inline" divider dividerStyle="gradient" />
 */
export function Title({
  title,
  overline,
  subtitle,
  level = 'h2',
  align = 'left',
  layout = 'stack',
  divider = false,
  dividerStyle = 'line',
  sx,
  ...props
}) {
  // 레벨에 따른 타이포그래피 variant 매핑
  const variantMap = {
    h1: 'h1',
    h2: 'h2',
    h3: 'h3',
    h4: 'h4',
  };

  // 레벨에 따른 서브타이틀 variant 매핑
  const subtitleVariantMap = {
    h1: 'subtitle1',
    h2: 'subtitle1',
    h3: 'subtitle2',
    h4: 'body2',
  };

  // 정렬에 따른 flexbox 정렬
  const alignmentMap = {
    left: 'flex-start',
    center: 'center',
    right: 'flex-end',
  };

  // 구분선 스타일 정의
  const dividerStyles = {
    line: {
      width: '100%',
      maxWidth: align === 'center' ? 120 : '100%',
      height: 1,
      backgroundColor: 'divider',
      mt: 2,
    },
    dot: {
      display: 'flex',
      gap: 1,
      mt: 2,
      '& > span': {
        width: 6,
        height: 6,
        borderRadius: '50%',
        backgroundColor: 'primary.main',
      },
    },
    gradient: {
      width: '100%',
      maxWidth: align === 'center' ? 200 : '100%',
      height: 2,
      background: 'linear-gradient(90deg, transparent 0%, currentColor 50%, transparent 100%)',
      color: 'primary.main',
      mt: 2,
      opacity: 0.6,
    },
  };

  // Stack 레이아웃 (기본 - 수직 배치)
  if (layout === 'stack') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: alignmentMap[align],
          textAlign: align,
          ...sx,
        }}
        {...props}
      >
        {overline && (
          <Typography
            variant="overline"
            component="span"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              letterSpacing: '0.1em',
              mb: 0.5,
            }}
          >
            {overline}
          </Typography>
        )}

        <Typography
          variant={variantMap[level]}
          component={level}
          sx={{
            fontWeight: level === 'h1' ? 900 : level === 'h2' ? 800 : 700,
          }}
        >
          {title}
        </Typography>

        {subtitle && (
          <Typography
            variant={subtitleVariantMap[level]}
            component="p"
            sx={{
              color: 'text.secondary',
              mt: 1,
              maxWidth: '60ch',
            }}
          >
            {subtitle}
          </Typography>
        )}

        {divider && (
          dividerStyle === 'dot' ? (
            <Box sx={dividerStyles.dot}>
              <span />
              <span />
              <span />
            </Box>
          ) : (
            <Box sx={dividerStyles[dividerStyle]} />
          )
        )}
      </Box>
    );
  }

  // Inline 레이아웃 (overline과 title이 가로 배치)
  if (layout === 'inline') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: alignmentMap[align],
          textAlign: align,
          ...sx,
        }}
        {...props}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          {overline && (
            <Typography
              variant="overline"
              component="span"
              sx={{
                color: 'primary.main',
                fontWeight: 600,
                letterSpacing: '0.1em',
              }}
            >
              {overline}
            </Typography>
          )}

          <Typography
            variant={variantMap[level]}
            component={level}
            sx={{
              fontWeight: level === 'h1' ? 900 : level === 'h2' ? 800 : 700,
            }}
          >
            {title}
          </Typography>
        </Box>

        {subtitle && (
          <Typography
            variant={subtitleVariantMap[level]}
            component="p"
            sx={{
              color: 'text.secondary',
              mt: 1,
              maxWidth: '60ch',
            }}
          >
            {subtitle}
          </Typography>
        )}

        {divider && (
          dividerStyle === 'dot' ? (
            <Box sx={dividerStyles.dot}>
              <span />
              <span />
              <span />
            </Box>
          ) : (
            <Box sx={dividerStyles[dividerStyle]} />
          )
        )}
      </Box>
    );
  }

  // Split 레이아웃 (타이틀과 서브타이틀이 양쪽으로 분리)
  if (layout === 'split') {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          ...sx,
        }}
        {...props}
      >
        {overline && (
          <Typography
            variant="overline"
            component="span"
            sx={{
              color: 'primary.main',
              fontWeight: 600,
              letterSpacing: '0.1em',
            }}
          >
            {overline}
          </Typography>
        )}

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Typography
            variant={variantMap[level]}
            component={level}
            sx={{
              fontWeight: level === 'h1' ? 900 : level === 'h2' ? 800 : 700,
              flex: '1 1 auto',
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              variant={subtitleVariantMap[level]}
              component="p"
              sx={{
                color: 'text.secondary',
                maxWidth: '40ch',
                textAlign: 'right',
                flex: '0 1 auto',
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>

        {divider && (
          dividerStyle === 'dot' ? (
            <Box sx={{ ...dividerStyles.dot, justifyContent: 'flex-start' }}>
              <span />
              <span />
              <span />
            </Box>
          ) : (
            <Box sx={dividerStyles[dividerStyle]} />
          )
        )}
      </Box>
    );
  }

  return null;
}
