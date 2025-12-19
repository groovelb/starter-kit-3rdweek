import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DocumentTitle, PageContainer, SectionTitle } from '../../components/storybookDocumentation';

export default {
  title: 'Overview/Introduction',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## Starter Kit Basic

A development environment that enables designers to use React + MUI + Storybook as a design tool.

### Core Purpose
- Systematic UI component management with Storybook documentation
- Consistent design tone through centralized style management
- Clear separation of business logic and UI design
        `,
      },
    },
  },
};

/** Documentation */
export const Doc = {
  render: () => (
    <>
      <DocumentTitle
        title="Introduction"
        status="Available"
        note="Project overview and core concepts"
        brandName="Design System"
        systemName="Starter Kit"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          Starter Kit Basic
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          A development environment for designers using React + MUI + Storybook
        </Typography>

        <SectionTitle title="Tech Stack" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableBody>
              <TableRow>
                <TableCell sx={ { fontWeight: 600, width: '30%' } }>React</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>19.x</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>MUI (Material UI)</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>7.x</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Vite</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>7.x</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Storybook</TableCell>
                <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>10.x</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle title="Core Purpose" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Purpose</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>UI Component Management</TableCell>
                <TableCell>Document and manage reusable components with Storybook</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Design Consistency</TableCell>
                <TableCell>Centralized management of colors, typography, and styles via Theme</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Logic/UI Separation</TableCell>
                <TableCell>Clear separation between business logic and UI design work</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle title="Target Users" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Role</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Use Case</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Designer</TableCell>
                <TableCell>Visually explore and test components via Storybook. Adjust Props without code.</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Developer</TableCell>
                <TableCell>Leverage systematic component structure and style guides for consistent development.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle title="Document Structure" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Section</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Overview</TableCell>
                <TableCell>Project introduction and guides</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Style</TableCell>
                <TableCell>Design tokens: colors, typography, icons</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Component</TableCell>
                <TableCell>Reusable UI components</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Custom Component</TableCell>
                <TableCell>Project-specific custom components</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Template</TableCell>
                <TableCell>Component composition templates</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Page</TableCell>
                <TableCell>Full page layouts</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <SectionTitle title="Layer Separation Principle" />
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Layer</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Scope</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Characteristics</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>UI Layer (Storybook)</TableCell>
                <TableCell>Pure presentation components</TableCell>
                <TableCell>No logic, visual elements only, Props-controlled, designer testable</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Logic Layer (App)</TableCell>
                <TableCell>Business logic</TableCell>
                <TableCell>State management, API calls, event handling</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </PageContainer>
    </>
  ),
};
