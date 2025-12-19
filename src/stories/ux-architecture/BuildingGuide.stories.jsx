import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { ChevronDown } from 'lucide-react';
import {
  DocumentTitle,
  PageContainer,
  SectionTitle,
  TreeNode,
} from '../../components/storybookDocumentation';
import {
  phases,
  learningTree,
  steps,
  mcpTools,
  apiKeyInfo,
  commonIssues,
  storybookReferences,
  stepTypeColors,
  envVariables,
  mcpCommands,
  stepTutorials,
} from '../../data/ux-architecture';

export default {
  title: 'UX Architecture/Building Guide',
  parameters: {
    layout: 'padded',
  },
};

/**
 * Building Guide Overview
 *
 * Admin System 학습 시나리오의 전체 구조를 시각화합니다.
 * 소스: docs/admin-building-guide-scenario.md
 */
export const Docs = {
  render: () => (
    <>
      <DocumentTitle
        title="Admin Building Guide"
        status="Available"
        note="Step-by-step learning scenario for Admin System"
        brandName="Lumenstate"
        systemName="Supabase MCP"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          Admin System Building Guide
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          디자이너가 Claude Code + Supabase MCP 환경에서 제로베이스부터 어드민 시스템을 구축하는 학습 가이드입니다.
        </Typography>

        {/* Learning Tree */}
        <SectionTitle title="학습 구조" description="클릭하여 펼치기/접기" />
        <Box sx={ { p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1, mb: 4 } }>
          { Object.entries(learningTree).map(([key, value]) => (
            <TreeNode
              key={ key }
              keyName={ key }
              value={ value }
              depth={ 0 }
              defaultOpen={ true }
            />
          )) }
        </Box>

        {/* Phase Overview */}
        <SectionTitle title="Phase 개요" description="각 Phase별 학습 목표와 소요 시간" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>Phase</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>제목</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>난이도</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>소요 시간</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>주요 성취</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { phases.map((phase) => (
                <TableRow key={ phase.id }>
                  <TableCell sx={ { fontWeight: 600 } }>{ phase.phase }</TableCell>
                  <TableCell>{ phase.title }</TableCell>
                  <TableCell>{ phase.difficulty }</TableCell>
                  <TableCell>{ phase.time }</TableCell>
                  <TableCell>{ phase.achievement }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>

        {/* Total Time */}
        <Box sx={ { p: 2, backgroundColor: 'grey.100', borderRadius: 1, mb: 4 } }>
          <Typography variant="subtitle2" sx={ { fontWeight: 600 } }>
            총 예상 시간: 8-13시간 (1-2일 워크샵)
          </Typography>
        </Box>

        {/* MCP Tools */}
        <SectionTitle title="MCP 도구" description="Supabase MCP에서 사용 가능한 도구" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>도구</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>용도</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { mcpTools.map((tool) => (
                <TableRow key={ tool.tool }>
                  <TableCell sx={ { fontFamily: 'monospace', fontWeight: 600 } }>{ tool.tool }</TableCell>
                  <TableCell>{ tool.description }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>

        {/* Storybook References */}
        <SectionTitle title="Storybook 참조" description="각 Phase에서 참조할 스토리" />
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>스토리</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>Phase</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>활용</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { storybookReferences.map((ref) => (
                <TableRow key={ ref.story }>
                  <TableCell sx={ { fontFamily: 'monospace', fontSize: 12 } }>{ ref.story }</TableCell>
                  <TableCell>{ ref.phases }</TableCell>
                  <TableCell>{ ref.usage }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>
      </PageContainer>
    </>
  ),
};

/**
 * Step Details
 *
 * 각 Step의 상세 정보를 Phase별로 시각화합니다.
 */
export const Steps = {
  render: () => {
    const [tabValue, setTabValue] = useState(0);
    const currentPhase = phases[tabValue];
    const phaseSteps = steps.filter((s) => s.phase === currentPhase.phase);

    return (
      <>
        <DocumentTitle
          title="Step Details"
          status="Available"
          note="Detailed information for each step"
          brandName="Lumenstate"
          systemName="Supabase MCP"
          version="1.0"
        />
        <PageContainer>
          <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
            Step 상세
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
            각 Phase별 Step의 목표와 체크포인트입니다.
          </Typography>

          {/* Phase Tabs */}
          <Box sx={ { borderBottom: 1, borderColor: 'divider', mb: 3 } }>
            <Tabs
              value={ tabValue }
              onChange={ (e, v) => setTabValue(v) }
              variant="scrollable"
              scrollButtons="auto"
            >
              { phases.map((phase) => (
                <Tab key={ phase.id } label={ `${phase.phase}: ${phase.title}` } />
              )) }
            </Tabs>
          </Box>

          {/* Phase Info */}
          <Box sx={ { mb: 3 } }>
            <Box sx={ { display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap', alignItems: 'center' } }>
              <Chip label={ currentPhase.difficulty } size="small" />
              <Chip label={ currentPhase.time } size="small" variant="outlined" />
              <Typography variant="body2" color="text.secondary">
                { currentPhase.description }
              </Typography>
            </Box>
          </Box>

          {/* Steps Stepper */}
          <Stepper orientation="vertical">
            { phaseSteps.map((step) => (
              <Step key={ step.step } active expanded>
                <StepLabel>
                  <Box sx={ { display: 'flex', alignItems: 'center', gap: 1 } }>
                    <Typography variant="subtitle1" sx={ { fontWeight: 600 } }>
                      { step.step }: { step.title }
                    </Typography>
                    <Chip
                      label={ step.type }
                      size="small"
                      color={ stepTypeColors[step.type] }
                      variant="outlined"
                    />
                  </Box>
                </StepLabel>
                <StepContent>
                  <Typography variant="body2" color="text.secondary" sx={ { mb: 2 } }>
                    목표: { step.goal }
                  </Typography>

                  {/* Tutorial Prompts */}
                  { stepTutorials[step.step] && stepTutorials[step.step].prompt && (
                    <Box sx={ { mb: 2 } }>
                      <Typography
                        variant="overline"
                        sx={ {
                          fontWeight: 700,
                          color: 'primary.main',
                          display: 'block',
                          mb: 1,
                          letterSpacing: 1,
                        } }
                      >
                        프롬프트
                      </Typography>
                      { stepTutorials[step.step].prompt.map((p, idx) => (
                        <Box key={ idx } sx={ { mb: 1.5 } }>
                          <Typography variant="caption" sx={ { fontWeight: 500, color: 'text.secondary' } }>
                            { p.description }
                          </Typography>
                          <Box
                            component="pre"
                            sx={ {
                              backgroundColor: 'grey.900',
                              color: 'grey.100',
                              p: 1.5,
                              fontSize: 11,
                              fontFamily: 'monospace',
                              overflow: 'auto',
                              borderRadius: 1,
                              whiteSpace: 'pre-wrap',
                              wordBreak: 'break-word',
                              mt: 0.5,
                            } }
                          >
                            { p.text }
                          </Box>
                        </Box>
                      )) }
                    </Box>
                  ) }

                  {/* Terminal Commands */}
                  { stepTutorials[step.step] && stepTutorials[step.step].terminal && (
                    <Box sx={ { mb: 2 } }>
                      <Typography
                        variant="overline"
                        sx={ {
                          fontWeight: 700,
                          color: 'success.main',
                          display: 'block',
                          mb: 1,
                          letterSpacing: 1,
                        } }
                      >
                        터미널
                      </Typography>
                      { stepTutorials[step.step].terminal.map((t, idx) => (
                        <Box key={ idx } sx={ { mb: 1.5 } }>
                          <Typography variant="caption" sx={ { fontWeight: 500, color: 'text.secondary' } }>
                            { t.description }
                          </Typography>
                          <Box
                            component="pre"
                            sx={ {
                              backgroundColor: 'grey.800',
                              color: 'success.light',
                              p: 1.5,
                              fontSize: 11,
                              fontFamily: 'monospace',
                              overflow: 'auto',
                              borderRadius: 1,
                              whiteSpace: 'pre-wrap',
                              wordBreak: 'break-word',
                              mt: 0.5,
                            } }
                          >
                            { t.command }
                          </Box>
                        </Box>
                      )) }
                    </Box>
                  ) }

                  {/* Checkpoints */}
                  <Box sx={ { mb: 2 } }>
                    <Typography variant="caption" sx={ { fontWeight: 600, color: 'text.secondary' } }>
                      체크포인트:
                    </Typography>
                    <Box component="ul" sx={ { m: 0, pl: 3 } }>
                      { step.checkpoints.map((cp, idx) => (
                        <Typography component="li" variant="body2" key={ idx }>
                          { cp }
                        </Typography>
                      )) }
                    </Box>
                  </Box>

                  {/* Storybook Reference */}
                  { step.storybook && (
                    <Chip
                      label={ `📖 ${step.storybook}` }
                      size="small"
                      variant="outlined"
                      sx={ { fontSize: 11 } }
                    />
                  ) }
                </StepContent>
              </Step>
            )) }
          </Stepper>
        </PageContainer>
      </>
    );
  },
};

/**
 * Setup 스토리용 내부 컴포넌트
 * React Hook 규칙을 준수하기 위해 별도 컴포넌트로 분리
 */
function SetupStoryContent() {
  const [selectedPhase, setSelectedPhase] = useState(0);

  // Phase별 Step 필터링
  const getPhaseSteps = (phaseIndex) => {
    const phase = phases[phaseIndex];
    if (!phase) return [];
    return Object.keys(stepTutorials).filter((stepKey) => {
      if (phaseIndex === 0) return stepKey.startsWith('Step 0');
      const stepNum = stepKey.replace('Step ', '');
      return phase.steps.includes(stepNum);
    });
  };

  const currentPhaseSteps = getPhaseSteps(selectedPhase);

  return (
    <>
      <DocumentTitle
        title="Setup and Tutorial"
        status="Available"
        note="Environment setup and step-by-step tutorial prompts"
        brandName="Lumenstate"
        systemName="Supabase MCP"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          환경 설정 & 튜토리얼
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          API 키, 환경 변수, MCP 명령어 및 각 Step별 Claude Code 프롬프트입니다.
        </Typography>

        {/* API Keys */}
        <SectionTitle title="API 키 정보" description="Supabase Dashboard에서 확인해야 할 정보" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>항목</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>위치</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>용도</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>공개 여부</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { apiKeyInfo.map((info) => (
                <TableRow key={ info.item }>
                  <TableCell sx={ { fontWeight: 600 } }>{ info.item }</TableCell>
                  <TableCell sx={ { fontSize: 12 } }>{ info.location }</TableCell>
                  <TableCell>{ info.usage }</TableCell>
                  <TableCell>
                    <Chip
                      label={ info.public ? '공개 가능' : '절대 비공개' }
                      size="small"
                      color={ info.public ? 'success' : 'error' }
                    />
                  </TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>

        {/* Environment Variables */}
        <SectionTitle title="환경 변수" description=".env.local 파일 설정" />
        <Box
          component="pre"
          sx={ {
            backgroundColor: 'grey.100',
            p: 2,
            fontSize: 12,
            fontFamily: 'monospace',
            overflow: 'auto',
            borderRadius: 1,
            mb: 4,
          } }
        >
          { `# .env.local\n${envVariables.map((v) => `${v.key}=${v.value}`).join('\n')}` }
        </Box>

        {/* MCP Commands */}
        <SectionTitle title="MCP 명령어" description="Quick Reference" />
        <TableContainer sx={ { mb: 4 } }>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={ { fontWeight: 600 } }>명령어</TableCell>
                <TableCell sx={ { fontWeight: 600 } }>설명</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { mcpCommands.map((cmd) => (
                <TableRow key={ cmd.description }>
                  <TableCell>
                    <Box
                      component="code"
                      sx={ {
                        backgroundColor: 'grey.100',
                        px: 1,
                        py: 0.5,
                        borderRadius: 0.5,
                        fontSize: 11,
                        fontFamily: 'monospace',
                      } }
                    >
                      { cmd.command }
                    </Box>
                  </TableCell>
                  <TableCell>{ cmd.description }</TableCell>
                </TableRow>
              )) }
            </TableBody>
          </Table>
        </TableContainer>

        {/* MCP Tools */}
        <SectionTitle title="MCP 도구" description="사용 가능한 Supabase MCP 도구" />
        <Box sx={ { display: 'flex', flexWrap: 'wrap', gap: 1, mb: 4 } }>
          { mcpTools.map((tool) => (
            <Chip
              key={ tool.tool }
              label={ `${tool.tool}: ${tool.description}` }
              size="small"
              variant="outlined"
              sx={ { fontFamily: 'monospace', fontSize: 11 } }
            />
          )) }
        </Box>

        {/* Step Tutorial Section */}
        <SectionTitle
          title="Step별 튜토리얼"
          description="각 Step에서 사용할 Claude Code 프롬프트와 터미널 명령어"
        />

        {/* Phase Tabs */}
        <Box sx={ { borderBottom: 1, borderColor: 'divider', mb: 3 } }>
          <Tabs
            value={ selectedPhase }
            onChange={ (_, v) => setSelectedPhase(v) }
            variant="scrollable"
            scrollButtons="auto"
          >
            { phases.map((phase) => (
              <Tab key={ phase.id } label={ `${phase.phase}` } />
            )) }
          </Tabs>
        </Box>

        {/* Phase Info */}
        <Box sx={ { mb: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 1 } }>
          <Typography variant="subtitle1" sx={ { fontWeight: 600 } }>
            { phases[selectedPhase].title }
          </Typography>
          <Typography variant="body2" color="text.secondary">
            { phases[selectedPhase].description }
          </Typography>
        </Box>

        {/* Tutorial Steps */}
        { currentPhaseSteps.length > 0 ? (
          currentPhaseSteps.map((stepKey) => {
            const tutorial = stepTutorials[stepKey];
            return (
              <Accordion key={ stepKey } defaultExpanded={ currentPhaseSteps.indexOf(stepKey) === 0 }>
                <AccordionSummary expandIcon={ <ChevronDown size={ 20 } /> }>
                  <Box sx={ { display: 'flex', alignItems: 'center', gap: 1 } }>
                    <Chip label={ stepKey } size="small" color="primary" />
                    <Typography variant="subtitle2" sx={ { fontWeight: 600 } }>
                      { tutorial.title }
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  {/* Prompts */}
                  { tutorial.prompt && tutorial.prompt.length > 0 && (
                    <Box sx={ { mb: 3 } }>
                      <Typography
                        variant="overline"
                        sx={ {
                          fontWeight: 700,
                          color: 'primary.main',
                          display: 'block',
                          mb: 1.5,
                          letterSpacing: 1,
                        } }
                      >
                        프롬프트
                      </Typography>
                      { tutorial.prompt.map((p, idx) => (
                        <Box key={ idx } sx={ { mb: 2 } }>
                          <Typography variant="body2" sx={ { fontWeight: 500, mb: 0.5 } }>
                            { idx + 1 }. { p.description }
                          </Typography>
                          <Box
                            component="pre"
                            sx={ {
                              backgroundColor: 'grey.900',
                              color: 'grey.100',
                              p: 2,
                              fontSize: 12,
                              fontFamily: 'monospace',
                              overflow: 'auto',
                              borderRadius: 1,
                              whiteSpace: 'pre-wrap',
                              wordBreak: 'break-word',
                            } }
                          >
                            { p.text }
                          </Box>
                        </Box>
                      )) }
                    </Box>
                  ) }

                  {/* Terminal Commands */}
                  { tutorial.terminal && tutorial.terminal.length > 0 && (
                    <Box sx={ { mb: 3 } }>
                      <Typography
                        variant="overline"
                        sx={ {
                          fontWeight: 700,
                          color: 'success.main',
                          display: 'block',
                          mb: 1.5,
                          letterSpacing: 1,
                        } }
                      >
                        터미널
                      </Typography>
                      { tutorial.terminal.map((t, idx) => (
                        <Box key={ idx } sx={ { mb: 2 } }>
                          <Typography variant="body2" sx={ { fontWeight: 500, mb: 0.5 } }>
                            { t.description }
                          </Typography>
                          <Box
                            component="pre"
                            sx={ {
                              backgroundColor: 'grey.800',
                              color: 'success.light',
                              p: 2,
                              fontSize: 12,
                              fontFamily: 'monospace',
                              overflow: 'auto',
                              borderRadius: 1,
                              whiteSpace: 'pre-wrap',
                              wordBreak: 'break-word',
                            } }
                          >
                            { t.command }
                          </Box>
                        </Box>
                      )) }
                    </Box>
                  ) }

                  {/* Note */}
                  { tutorial.note && (
                    <Box sx={ { p: 1.5, backgroundColor: 'warning.light', borderRadius: 1, mb: 2 } }>
                      <Typography variant="body2" sx={ { color: 'warning.dark' } }>
                        💡 { tutorial.note }
                      </Typography>
                    </Box>
                  ) }

                  {/* Expected Result */}
                  { tutorial.expectedResult && (
                    <Box sx={ { p: 1.5, backgroundColor: 'info.light', borderRadius: 1 } }>
                      <Typography variant="body2" sx={ { color: 'info.dark' } }>
                        ✅ 예상 결과: { tutorial.expectedResult }
                      </Typography>
                    </Box>
                  ) }
                </AccordionDetails>
              </Accordion>
            );
          })
        ) : (
          <Box sx={ { p: 3, textAlign: 'center', backgroundColor: 'grey.50', borderRadius: 1 } }>
            <Typography variant="body2" color="text.secondary">
              이 Phase에는 상세 튜토리얼이 없습니다. 브라우저에서 직접 진행하세요.
            </Typography>
          </Box>
        ) }
      </PageContainer>
    </>
  );
}

/**
 * Environment Setup & Tutorial
 *
 * 환경 설정 정보 및 Step별 튜토리얼을 시각화합니다.
 */
export const Setup = {
  render: () => <SetupStoryContent />,
};

/**
 * Troubleshooting
 *
 * 자주 발생하는 문제와 해결 방법을 시각화합니다.
 */
export const Troubleshooting = {
  render: () => (
    <>
      <DocumentTitle
        title="Common Issues"
        status="Available"
        note="Frequently occurring problems and solutions"
        brandName="Lumenstate"
        systemName="Supabase MCP"
        version="1.0"
      />
      <PageContainer>
        <Typography variant="h4" sx={ { fontWeight: 700, mb: 1 } }>
          주의사항 (자주 발생하는 문제)
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={ { mb: 4 } }>
          학습 중 자주 발생하는 문제와 해결 방법입니다.
          상세한 해결 방법은 troubleshooting.md를 참조하세요.
        </Typography>

        {/* Auth Issues */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={ <ChevronDown size={ 20 } /> }>
            <Typography variant="subtitle1" sx={ { fontWeight: 600 } }>
              A. 인증 및 권한
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={ { fontWeight: 600 } }>증상</TableCell>
                    <TableCell sx={ { fontWeight: 600 } }>원인</TableCell>
                    <TableCell sx={ { fontWeight: 600 } }>해결</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { commonIssues.auth.map((issue, idx) => (
                    <TableRow key={ idx }>
                      <TableCell sx={ { color: 'error.main' } }>{ issue.symptom }</TableCell>
                      <TableCell>{ issue.cause }</TableCell>
                      <TableCell>{ issue.solution }</TableCell>
                    </TableRow>
                  )) }
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>

        {/* Data Issues */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={ <ChevronDown size={ 20 } /> }>
            <Typography variant="subtitle1" sx={ { fontWeight: 600 } }>
              B. 데이터 로딩
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={ { fontWeight: 600 } }>증상</TableCell>
                    <TableCell sx={ { fontWeight: 600 } }>원인</TableCell>
                    <TableCell sx={ { fontWeight: 600 } }>해결</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { commonIssues.data.map((issue, idx) => (
                    <TableRow key={ idx }>
                      <TableCell sx={ { color: 'error.main' } }>{ issue.symptom }</TableCell>
                      <TableCell>{ issue.cause }</TableCell>
                      <TableCell>{ issue.solution }</TableCell>
                    </TableRow>
                  )) }
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>

        {/* React Issues */}
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={ <ChevronDown size={ 20 } /> }>
            <Typography variant="subtitle1" sx={ { fontWeight: 600 } }>
              C. React 생명주기
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={ { fontWeight: 600 } }>증상</TableCell>
                    <TableCell sx={ { fontWeight: 600 } }>원인</TableCell>
                    <TableCell sx={ { fontWeight: 600 } }>해결</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { commonIssues.react.map((issue, idx) => (
                    <TableRow key={ idx }>
                      <TableCell sx={ { color: 'error.main' } }>{ issue.symptom }</TableCell>
                      <TableCell>{ issue.cause }</TableCell>
                      <TableCell>{ issue.solution }</TableCell>
                    </TableRow>
                  )) }
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </PageContainer>
    </>
  ),
};
