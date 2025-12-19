import { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import WorkIcon from '@mui/icons-material/Work';
import MailIcon from '@mui/icons-material/Mail';
import { NavMenu } from '../../../components/navigation/NavMenu';
import { DocumentTitle, PageContainer } from '../../../components/storybookDocumentation';
import { SectionContainer } from '../../../components/container/SectionContainer';

// MUSE Navigation Items
const museNavItems = [
  { id: 'archive', label: 'Archive', icon: <DashboardIcon /> },
  { id: 'moodboards', label: 'Moodboards', icon: <PhotoLibraryIcon /> },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
];

// Basic Navigation Items
const basicNavItems = [
  { id: 'home', label: 'Home', icon: <HomeIcon /> },
  { id: 'about', label: 'About', icon: <InfoIcon /> },
  { id: 'work', label: 'Work', icon: <WorkIcon /> },
  { id: 'contact', label: 'Contact', icon: <MailIcon /> },
];

/**
 * Story Component: Interactive Demo
 */
function InteractiveDemo() {
  const [activeId, setActiveId] = useState('archive');

  return (
    <PageContainer>
      <DocumentTitle
        title="NavMenu - Interactive"
        status="Ready"
        note="Click to change active state"
        brandName="Navigation"
        systemName="NavMenu"
        version="1.0"
      />
      <SectionContainer>
        <NavMenu
          items={museNavItems}
          activeId={activeId}
          variant="underline"
          onItemClick={(item) => setActiveId(item.id)}
        />
        <Typography variant="body2" sx={{ mt: 3, color: 'text.secondary' }}>
          Active: {activeId}
        </Typography>
      </SectionContainer>
    </PageContainer>
  );
}

/**
 * Story Component: Variants Demo
 */
function VariantsDemo() {
  const [activeId, setActiveId] = useState('archive');

  return (
    <PageContainer>
      <DocumentTitle
        title="NavMenu - Variants"
        status="Ready"
        note="Different style variants"
        brandName="Navigation"
        systemName="NavMenu"
        version="1.0"
      />
      <SectionContainer>
        <Stack spacing={4}>
          {['default', 'pills', 'underline'].map((variant) => (
            <Box key={variant}>
              <Typography
                variant="caption"
                sx={{ mb: 1.5, display: 'block', color: 'text.secondary', textTransform: 'uppercase' }}
              >
                {variant}
              </Typography>
              <NavMenu
                items={museNavItems}
                activeId={activeId}
                variant={variant}
                onItemClick={(item) => setActiveId(item.id)}
              />
            </Box>
          ))}
        </Stack>
      </SectionContainer>
    </PageContainer>
  );
}

/**
 * Story Component: Vertical Demo
 */
function VerticalDemo() {
  const [activeId, setActiveId] = useState('archive');

  const items = [
    ...museNavItems,
    { id: 'disabled', label: 'Disabled Item', icon: <SettingsIcon />, disabled: true },
  ];

  return (
    <PageContainer>
      <DocumentTitle
        title="NavMenu - Vertical"
        status="Ready"
        note="Sidebar navigation style"
        brandName="Navigation"
        systemName="NavMenu"
        version="1.0"
      />
      <SectionContainer>
        <Box sx={{ maxWidth: 280 }}>
          <NavMenu
            items={items}
            activeId={activeId}
            orientation="vertical"
            variant="default"
            onItemClick={(item) => setActiveId(item.id)}
          />
        </Box>
      </SectionContainer>
    </PageContainer>
  );
}

export default {
  title: 'Custom Component/Navigation/NavMenu',
  component: NavMenu,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
};

/**
 * Default horizontal menu with MUSE style
 */
export const Default = {
  render: () => (
    <PageContainer>
      <DocumentTitle
        title="NavMenu"
        status="Ready"
        note="Navigation menu component for headers and sidebars"
        brandName="Navigation"
        systemName="NavMenu"
        version="1.0"
      />
      <SectionContainer>
        <NavMenu
          items={museNavItems}
          activeId="archive"
          variant="underline"
        />
      </SectionContainer>
    </PageContainer>
  ),
};

/**
 * Interactive menu
 */
export const Interactive = {
  render: () => <InteractiveDemo />,
};

/**
 * Style variants
 */
export const Variants = {
  render: () => <VariantsDemo />,
};

/**
 * Vertical orientation (sidebar)
 */
export const Vertical = {
  render: () => <VerticalDemo />,
};

/**
 * Icon only mode
 */
export const IconOnly = {
  render: () => (
    <PageContainer>
      <DocumentTitle
        title="NavMenu - Icon Only"
        status="Ready"
        note="Compact icon-only navigation"
        brandName="Navigation"
        systemName="NavMenu"
        version="1.0"
      />
      <SectionContainer>
        <NavMenu
          items={museNavItems}
          activeId="archive"
          isIconOnly
          variant="pills"
        />
      </SectionContainer>
    </PageContainer>
  ),
};

/**
 * Size comparison
 */
export const Sizes = {
  render: () => (
    <PageContainer>
      <DocumentTitle
        title="NavMenu - Sizes"
        status="Ready"
        note="Size comparison: sm, md, lg"
        brandName="Navigation"
        systemName="NavMenu"
        version="1.0"
      />
      <SectionContainer>
        <Stack spacing={4}>
          {['sm', 'md', 'lg'].map((size) => (
            <Box key={size}>
              <Typography
                variant="caption"
                sx={{ mb: 1, display: 'block', color: 'text.secondary' }}
              >
                {size.toUpperCase()}
              </Typography>
              <NavMenu
                items={museNavItems}
                activeId="archive"
                size={size}
                variant="pills"
              />
            </Box>
          ))}
        </Stack>
      </SectionContainer>
    </PageContainer>
  ),
};
