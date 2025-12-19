import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { MemoryRouter } from 'react-router-dom';

import theme from '../src/styles/themes/theme.js';
import { TimelineProvider } from '../src/hooks/useTimeline';
import { CartProvider } from '../src/context/CartContext';

// Tiempos Headline 로컬 폰트 로드
import tiemposHeadline from '../src/assets/font/test-tiempos-headline-vf-roman.woff2';

const fontFace = new FontFace('Tiempos Headline', `url(${tiemposHeadline})`, {
  style: 'normal',
  weight: '100 900',
});
fontFace.load().then((font) => {
  document.fonts.add(font);
});

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    options: {
      storySort: {
        order: [
          'Overview',
          'Style', ['Overview', 'Colors', 'Typography', 'Spacing', 'Icons'],
          'MUI Component',
          'Custom Component',
          'Template',
          'Section',
          'Page',
          'Test Data',
        ],
        method: 'alphabetical',
      },
    },
  },
  decorators: [
    (Story, context) => (
      <MemoryRouter>
        <ThemeProvider theme={ theme }>
          <CssBaseline />
          <CartProvider>
            <TimelineProvider initialTimeline={0}>
              <div style={ { width: '100%', paddingTop: '40px' } }>
                { Story(context) }
              </div>
            </TimelineProvider>
          </CartProvider>
        </ThemeProvider>
      </MemoryRouter>
    ),
  ],
};

export default preview;
