import discoveryImg from "@/assets/category-discovery.jpg";
import ideationImg from "@/assets/category-ideation.jpg";
import testingImg from "@/assets/category-testing.jpg";
import designImg from "@/assets/category-design.jpg";
import handoffImg from "@/assets/category-handoff.jpg";

export type ToolType = "ai" | "traditional";
export type CriticalityType = "ai-enhanced" | "human-critical";

export interface Tool {
  name: string;
  description: string;
  type: ToolType;
  icon?: string;
}

export interface WorkflowStep {
  label: string;
  aiTool?: string;
}

export interface Method {
  id: string;
  title: string;
  category: string;
  criticality: CriticalityType;
  description: string;
  image: string;
  aiTools: Tool[];
  traditionalTools: Tool[];
  workflow: WorkflowStep[];
  deliverables: string[];
  resources: { title: string; url: string }[];
}

export const categories = [
  "Discovery",
  "Ideation",
  "Testing",
  "Design",
  "Handoff",
] as const;

export const categoryImages: Record<string, string> = {
  Discovery: discoveryImg,
  Ideation: ideationImg,
  Testing: testingImg,
  Design: designImg,
  Handoff: handoffImg,
};

export const methods: Method[] = [
  // DISCOVERY
  {
    id: "stakeholder-interviews",
    title: "Conduct stakeholder interviews",
    category: "Discovery",
    criticality: "human-critical",
    description:
      "Meet with key stakeholders to understand business goals, constraints, success metrics, and political dynamics. AI can help you prepare interview guides and synthesize notes afterward, but the nuanced relationship-building and follow-up probing require human judgment. Focus on uncovering unstated assumptions and conflicting priorities between stakeholders.",
    image: discoveryImg,
    aiTools: [
      { name: "ChatGPT", description: "Generate interview question templates and synthesize raw notes into themes", type: "ai" },
      { name: "Claude", description: "Analyze transcripts to surface contradictions and implicit assumptions", type: "ai" },
    ],
    traditionalTools: [
      { name: "Miro / FigJam", description: "Map stakeholder relationships and organize interview insights visually", type: "traditional" },
      { name: "Notion / Confluence", description: "Document and share findings with the broader team", type: "traditional" },
    ],
    workflow: [
      { label: "Draft interview guide" },
      { label: "Conduct interviews" },
      { label: "Transcribe & synthesize", aiTool: "ChatGPT" },
      { label: "Map themes & share" },
    ],
    deliverables: [
      "Stakeholder interview summary with key themes",
      "Priority matrix mapping business goals vs. user needs",
      "List of constraints, risks, and open questions",
    ],
    resources: [
      { title: "NNG: Stakeholder Interviews (2023)", url: "https://www.nngroup.com/articles/stakeholder-interviews/" },
    ],
  },
  {
    id: "review-research",
    title: "Review previous research",
    category: "Discovery",
    criticality: "ai-enhanced",
    description:
      "Before starting new research, audit existing knowledge. Gather past usability studies, analytics reports, support tickets, and prior design explorations. AI excels at rapidly digesting large volumes of documents and surfacing patterns you might miss. This prevents duplicate work and ensures your new research builds on what's already known.",
    image: discoveryImg,
    aiTools: [
      { name: "ChatGPT", description: "Summarize lengthy research reports and extract key findings", type: "ai" },
      { name: "Claude", description: "Cross-reference multiple documents to find contradictions and gaps", type: "ai" },
    ],
    traditionalTools: [
      { name: "Dovetail", description: "Centralized research repository for tagging and searching past studies", type: "traditional" },
      { name: "Google Docs", description: "Collaborative document review and annotation", type: "traditional" },
    ],
    workflow: [
      { label: "Gather existing research" },
      { label: "AI-assisted synthesis", aiTool: "ChatGPT" },
      { label: "Identify gaps" },
      { label: "Document findings" },
    ],
    deliverables: [
      "Research audit summary with key findings from past studies",
      "Gap analysis identifying what we still don't know",
      "Annotated bibliography of relevant sources",
    ],
    resources: [
      { title: "NNG: Secondary Research in UX (2022)", url: "https://www.nngroup.com/articles/secondary-research-in-ux/" },
    ],
  },
  {
    id: "competitive-analysis",
    title: "Review competitive analysis",
    category: "Discovery",
    criticality: "ai-enhanced",
    description:
      "Systematically evaluate competitor products to understand market patterns, UX conventions, and opportunities for differentiation. AI can accelerate the data gathering and initial comparison, but human expertise is needed to assess experience quality and strategic implications.",
    image: discoveryImg,
    aiTools: [
      { name: "ChatGPT", description: "Research competitors and generate comparison matrices", type: "ai" },
      { name: "Perplexity", description: "Deep research on competitor features, positioning, and reviews", type: "ai" },
    ],
    traditionalTools: [
      { name: "Figma", description: "Screenshot and annotate competitor UIs for side-by-side comparison", type: "traditional" },
      { name: "Spreadsheets", description: "Build feature comparison matrices and scoring rubrics", type: "traditional" },
    ],
    workflow: [
      { label: "Identify competitors" },
      { label: "AI-assisted research", aiTool: "Perplexity" },
      { label: "Hands-on evaluation" },
      { label: "Synthesize & present" },
    ],
    deliverables: [
      "Competitive landscape map with positioning",
      "Feature comparison matrix with scoring",
      "UX strengths/weaknesses analysis per competitor",
      "Opportunity areas for differentiation",
    ],
    resources: [
      { title: "NNG: Competitive UX Benchmarking (2023)", url: "https://www.nngroup.com/articles/competitive-usability-evaluations/" },
    ],
  },
  {
    id: "user-interviews",
    title: "Conduct user interviews",
    category: "Discovery",
    criticality: "human-critical",
    description:
      "Speak directly with users to understand their goals, behaviors, pain points, and mental models. This is fundamentally a human activity — building rapport, reading body language, and following unexpected conversational threads. AI assists with preparation, transcription, and post-interview synthesis.",
    image: discoveryImg,
    aiTools: [
      { name: "Claude", description: "Draft discussion guides and analyze interview transcripts for themes", type: "ai" },
      { name: "Otter.ai", description: "Real-time transcription and automated note-taking during sessions", type: "ai" },
    ],
    traditionalTools: [
      { name: "Zoom / Teams", description: "Conduct and record remote interview sessions", type: "traditional" },
      { name: "Dovetail", description: "Tag, organize, and share qualitative research data", type: "traditional" },
    ],
    workflow: [
      { label: "Write discussion guide", aiTool: "Claude" },
      { label: "Recruit participants" },
      { label: "Conduct interviews" },
      { label: "Synthesize themes", aiTool: "Claude" },
    ],
    deliverables: [
      "Interview transcripts and recordings",
      "Affinity map of themes and patterns",
      "User needs and pain points summary",
      "Persona drafts or updates",
    ],
    resources: [
      { title: "NNG: User Interviews (2024)", url: "https://www.nngroup.com/articles/user-interviews/" },
    ],
  },

  // IDEATION
  {
    id: "synthesize-research",
    title: "Synthesize research",
    category: "Ideation",
    criticality: "ai-enhanced",
    description:
      "Transform raw research data into actionable insights. Cluster observations, identify patterns, build frameworks, and distill findings into a narrative the team can act on. AI dramatically accelerates pattern recognition across large datasets while human judgment ensures insights are contextually valid and strategically relevant.",
    image: ideationImg,
    aiTools: [
      { name: "ChatGPT", description: "Cluster raw observations into themes and generate insight statements", type: "ai" },
      { name: "Claude", description: "Challenge synthesis for bias and identify overlooked patterns", type: "ai" },
    ],
    traditionalTools: [
      { name: "Miro / FigJam", description: "Affinity mapping and collaborative synthesis sessions", type: "traditional" },
      { name: "Notion", description: "Structure and document research insights for team access", type: "traditional" },
    ],
    workflow: [
      { label: "Gather raw data" },
      { label: "AI-assisted clustering", aiTool: "ChatGPT" },
      { label: "Human validation" },
      { label: "Create insight statements" },
    ],
    deliverables: [
      "Research synthesis document with key insights",
      "Affinity diagram or theme map",
      "Design principles derived from research",
    ],
    resources: [
      { title: "NNG: Thematic Analysis in UX (2023)", url: "https://www.nngroup.com/articles/thematic-analysis/" },
    ],
  },
  {
    id: "problem-framing",
    title: "Conduct problem framing session",
    category: "Ideation",
    criticality: "human-critical",
    description:
      "Align the team on what problem you're actually solving. A well-framed problem prevents wasted effort on the wrong solution. Use workshops to define the problem space, articulate assumptions, and agree on success criteria before generating solutions.",
    image: ideationImg,
    aiTools: [
      { name: "ChatGPT", description: "Generate How Might We statements and reframe problems from different angles", type: "ai" },
    ],
    traditionalTools: [
      { name: "Miro / FigJam", description: "Facilitate collaborative problem framing workshops", type: "traditional" },
      { name: "Sticky notes", description: "Physical or digital sticky notes for divergent thinking", type: "traditional" },
    ],
    workflow: [
      { label: "Review research insights" },
      { label: "Generate HMW statements", aiTool: "ChatGPT" },
      { label: "Workshop with team" },
      { label: "Prioritize & align" },
    ],
    deliverables: [
      "Problem statement document",
      "How Might We statements ranked by impact",
      "Assumptions log with validation plan",
      "Success criteria and metrics",
    ],
    resources: [
      { title: "NNG: Problem Framing (2024)", url: "https://www.nngroup.com/articles/problem-framing/" },
    ],
  },
  {
    id: "define-metrics",
    title: "Define success metrics and hypotheses",
    category: "Ideation",
    criticality: "human-critical",
    description:
      "Establish measurable success criteria before designing anything. Define what improvement looks like, formulate testable hypotheses, and align the team on how you'll know if your design is working. This prevents post-hoc rationalization and keeps the team honest about impact.",
    image: ideationImg,
    aiTools: [
      { name: "ChatGPT", description: "Suggest relevant metrics based on product type and generate hypothesis templates", type: "ai" },
    ],
    traditionalTools: [
      { name: "Spreadsheets", description: "Track metrics, baselines, and targets in a structured format", type: "traditional" },
      { name: "Analytics tools", description: "Establish baselines with tools like Amplitude, Mixpanel, or GA4", type: "traditional" },
    ],
    workflow: [
      { label: "Identify key outcomes" },
      { label: "Draft hypotheses", aiTool: "ChatGPT" },
      { label: "Set baselines" },
      { label: "Align with stakeholders" },
    ],
    deliverables: [
      "Metrics framework with primary and secondary KPIs",
      "Testable hypotheses linked to design decisions",
      "Baseline measurements for comparison",
    ],
    resources: [
      { title: "NNG: UX Metrics (2023)", url: "https://www.nngroup.com/articles/ux-metrics/" },
    ],
  },
  {
    id: "interaction-model",
    title: "Define interaction model and IA",
    category: "Ideation",
    criticality: "human-critical",
    description:
      "Before sketching any screens, align your team on the underlying structure of what you're building. Map the core entities and their relationships, define the navigation structure, and establish a shared conceptual model of the system. Determining primary user flows at this stage prevents designing screens that don't reflect how the system actually works.",
    image: ideationImg,
    aiTools: [
      { name: "ChatGPT", description: "Generate interaction model options and navigation structure suggestions", type: "ai" },
      { name: "Claude", description: "Critique and refine interaction models and IA structures", type: "ai" },
    ],
    traditionalTools: [
      { name: "Diagramming tools", description: "Create entity relationship maps, IA diagrams, and conceptual models (FigJam, Miro, Lucidchart)", type: "traditional" },
      { name: "Flowchart tools", description: "Map out user flows, IA diagrams, and identify friction points", type: "traditional" },
      { name: "Figma", description: "Version and collaborate on design files", type: "traditional" },
    ],
    workflow: [
      { label: "Review audit findings" },
      { label: "Sketch IA options", aiTool: "ChatGPT" },
      { label: "Map user flows" },
      { label: "Validate & finalize", aiTool: "Claude" },
    ],
    deliverables: [
      "Entity relationship map showing core objects and connections",
      "IA diagram or site map defining navigation hierarchy",
      "Conceptual model describing how users understand the system",
      "Primary user flow diagrams (pre-UI, flow-only)",
    ],
    resources: [
      { title: "NNG: Mental Models (2024)", url: "https://www.nngroup.com/articles/mental-models/" },
      { title: "NNG: Information Architecture vs Navigation (2023)", url: "https://www.nngroup.com/articles/ia-vs-navigation/" },
    ],
  },
  {
    id: "lofi-concepts",
    title: "Create multiple lo-fi concepts",
    category: "Ideation",
    criticality: "ai-enhanced",
    description:
      "Generate multiple divergent design concepts quickly. The goal is breadth, not polish — explore fundamentally different approaches to the same problem. AI can rapidly produce variations and free you to focus on evaluating which directions have the most potential.",
    image: ideationImg,
    aiTools: [
      { name: "ChatGPT", description: "Generate wireframe descriptions and explore layout alternatives through conversation", type: "ai" },
      { name: "Midjourney / DALL-E", description: "Create mood boards and visual direction explorations", type: "ai" },
    ],
    traditionalTools: [
      { name: "Figma", description: "Sketch low-fidelity wireframes and layout explorations", type: "traditional" },
      { name: "Paper & pen", description: "Fastest medium for initial sketching and crazy eights exercises", type: "traditional" },
    ],
    workflow: [
      { label: "Review IA & flows" },
      { label: "Sketch multiple directions" },
      { label: "AI-assisted variations", aiTool: "ChatGPT" },
      { label: "Critique & select" },
    ],
    deliverables: [
      "3-5 distinct lo-fi concept directions",
      "Annotated wireframes explaining design rationale",
      "Concept comparison matrix",
    ],
    resources: [
      { title: "NNG: Wireflows (2023)", url: "https://www.nngroup.com/articles/wireflows/" },
    ],
  },
  {
    id: "lofi-prototypes",
    title: "Build low-fidelity prototypes",
    category: "Ideation",
    criticality: "ai-enhanced",
    description:
      "Turn your best lo-fi concepts into clickable prototypes for early validation. Keep fidelity intentionally low to focus feedback on structure and flow rather than visual details. AI tools can accelerate prototype creation, especially for common patterns.",
    image: ideationImg,
    aiTools: [
      { name: "v0 by Vercel", description: "Generate functional UI components from text descriptions", type: "ai" },
      { name: "Lovable", description: "Build interactive prototypes from natural language descriptions", type: "ai" },
    ],
    traditionalTools: [
      { name: "Figma", description: "Build interactive prototypes with linking and transitions", type: "traditional" },
      { name: "Maze", description: "Set up unmoderated testing on lo-fi prototypes", type: "traditional" },
    ],
    workflow: [
      { label: "Select concept direction" },
      { label: "Build prototype", aiTool: "Lovable" },
      { label: "Internal review" },
      { label: "Prepare for testing" },
    ],
    deliverables: [
      "Clickable low-fidelity prototype covering key user flows",
      "Testing script and task scenarios",
    ],
    resources: [
      { title: "NNG: Prototyping (2024)", url: "https://www.nngroup.com/articles/prototyping/" },
    ],
  },

  // TESTING
  {
    id: "usability-testing",
    title: "Conduct usability testing",
    category: "Testing",
    criticality: "human-critical",
    description:
      "Observe real users attempting tasks with your prototype to identify usability issues, validate design decisions, and uncover unexpected behaviors. This is the single most important validation activity in UX — no amount of AI analysis can replace watching someone struggle with your design.",
    image: testingImg,
    aiTools: [
      { name: "Otter.ai", description: "Transcribe usability sessions in real time", type: "ai" },
      { name: "Claude", description: "Analyze session transcripts and generate usability finding reports", type: "ai" },
    ],
    traditionalTools: [
      { name: "Maze", description: "Run unmoderated usability tests at scale with analytics", type: "traditional" },
      { name: "Lookback / UserTesting", description: "Conduct moderated remote usability sessions with recording", type: "traditional" },
    ],
    workflow: [
      { label: "Write test plan" },
      { label: "Recruit participants" },
      { label: "Run sessions" },
      { label: "Analyze findings", aiTool: "Claude" },
    ],
    deliverables: [
      "Usability test report with severity-rated findings",
      "Video clips of key moments for stakeholder presentations",
      "Recommended design changes prioritized by severity",
    ],
    resources: [
      { title: "NNG: Usability Testing 101 (2023)", url: "https://www.nngroup.com/articles/usability-testing-101/" },
    ],
  },

  // DESIGN
  {
    id: "hifi-designs",
    title: "Create high-fidelity designs",
    category: "Design",
    criticality: "human-critical",
    description:
      "Transform validated wireframes into polished, pixel-perfect designs that embody your brand and design system. This is where visual craft, micro-interactions, and attention to detail matter most. AI can assist with generating assets and variations, but the cohesive vision requires human creative direction.",
    image: designImg,
    aiTools: [
      { name: "Midjourney / DALL-E", description: "Generate custom illustrations, icons, and visual assets", type: "ai" },
      { name: "ChatGPT", description: "Draft UI copy, error messages, and microcopy variations", type: "ai" },
    ],
    traditionalTools: [
      { name: "Figma", description: "Create production-ready designs with design system components", type: "traditional" },
      { name: "Storybook", description: "Document and test component states in isolation", type: "traditional" },
    ],
    workflow: [
      { label: "Apply visual design" },
      { label: "Generate assets", aiTool: "Midjourney / DALL-E" },
      { label: "Refine interactions" },
      { label: "Design review" },
    ],
    deliverables: [
      "High-fidelity design files in Figma",
      "Component specifications and states",
      "Motion and interaction specifications",
      "Responsive layout variations",
    ],
    resources: [
      { title: "NNG: Visual Design Principles (2023)", url: "https://www.nngroup.com/articles/visual-design-principles/" },
    ],
  },
  {
    id: "accessibility-review",
    title: "Accessibility and inclusive design review",
    category: "Design",
    criticality: "ai-enhanced",
    description:
      "Audit your designs for accessibility compliance and inclusive design practices. AI tools can automate checks for color contrast, heading hierarchy, and ARIA patterns, while human review ensures the experience is genuinely usable for people with diverse abilities.",
    image: designImg,
    aiTools: [
      { name: "ChatGPT", description: "Review designs for WCAG compliance and suggest improvements", type: "ai" },
      { name: "axe DevTools", description: "Automated accessibility testing for web implementations", type: "ai" },
      { name: "Lighthouse", description: "Google's built-in auditing tool for accessibility, performance, and best practices", type: "ai" },
      { name: "WAVE", description: "Web accessibility evaluation tool that provides visual feedback on a11y issues", type: "ai" },
      { name: "Pa11y", description: "Command-line accessibility testing tool for CI/CD pipelines", type: "ai" },
    ],
    traditionalTools: [
      { name: "Stark (Figma plugin)", description: "Check color contrast, simulate vision impairments, and audit designs", type: "traditional" },
      { name: "Screen readers", description: "Manual testing with VoiceOver, NVDA, or JAWS", type: "traditional" },
      { name: "Colour Contrast Analyser", description: "Desktop app by TPGi for checking color contrast ratios against WCAG", type: "traditional" },
    ],
    workflow: [
      { label: "Automated audit", aiTool: "axe DevTools" },
      { label: "Manual review" },
      { label: "Fix issues" },
      { label: "Re-validate" },
    ],
    deliverables: [
      "Accessibility audit report with WCAG references",
      "Color contrast verification for all text/background combinations",
      "Keyboard navigation flow documentation",
    ],
    resources: [
      { title: "NNG: Accessibility in UX (2024)", url: "https://www.nngroup.com/articles/accessibility-ux/" },
    ],
  },
  {
    id: "hifi-prototypes",
    title: "Build high-fidelity prototypes",
    category: "Design",
    criticality: "ai-enhanced",
    description:
      "Create realistic, interactive prototypes that closely simulate the final product experience. These are used for final validation, stakeholder sign-off, and as a reference for development. AI coding tools can now generate functional prototypes faster than ever.",
    image: designImg,
    aiTools: [
      { name: "Lovable", description: "Generate full functional prototypes from designs or descriptions", type: "ai" },
      { name: "Cursor / Copilot", description: "AI-assisted coding for interactive prototype features", type: "ai" },
    ],
    traditionalTools: [
      { name: "Figma", description: "Advanced prototyping with variables, conditionals, and expressions", type: "traditional" },
      { name: "Framer", description: "Code-backed prototypes with real data and interactions", type: "traditional" },
    ],
    workflow: [
      { label: "Define prototype scope" },
      { label: "Build interactions", aiTool: "Lovable" },
      { label: "Add real content" },
      { label: "Test & refine" },
    ],
    deliverables: [
      "Interactive high-fidelity prototype covering complete user flows",
      "Prototype documentation with interaction notes",
    ],
    resources: [
      { title: "NNG: Prototyping (2024)", url: "https://www.nngroup.com/articles/prototyping/" },
    ],
  },

  // HANDOFF
  {
    id: "component-docs",
    title: "Create component documentation",
    category: "Handoff",
    criticality: "ai-enhanced",
    description:
      "Document every component with its variants, states, props, and usage guidelines. Good documentation reduces developer questions, prevents inconsistencies, and scales the design system. AI can draft documentation from design files, significantly reducing the manual effort.",
    image: handoffImg,
    aiTools: [
      { name: "ChatGPT", description: "Generate component documentation from design specs and prop definitions", type: "ai" },
      { name: "Claude", description: "Review documentation for completeness and clarity", type: "ai" },
    ],
    traditionalTools: [
      { name: "Figma", description: "Annotate components with usage guidelines and specifications", type: "traditional" },
      { name: "Storybook / ZeroHeight", description: "Publish living documentation with interactive component examples", type: "traditional" },
    ],
    workflow: [
      { label: "Inventory components" },
      { label: "Draft docs", aiTool: "ChatGPT" },
      { label: "Review with engineering" },
      { label: "Publish & maintain" },
    ],
    deliverables: [
      "Component documentation with variants, states, and usage guidelines",
      "Design token documentation",
      "Pattern library with examples",
    ],
    resources: [
      { title: "NNG: Design System Documentation (2023)", url: "https://www.nngroup.com/articles/design-system-documentation/" },
    ],
  },
  {
    id: "design-specs",
    title: "Finalize design specifications",
    category: "Handoff",
    criticality: "ai-enhanced",
    description:
      "Prepare detailed specifications that eliminate ambiguity for developers. Include spacing, typography, color values, animation curves, responsive breakpoints, and edge cases. AI can auto-generate specs from design files, but human review ensures nothing critical is missed.",
    image: handoffImg,
    aiTools: [
      { name: "ChatGPT", description: "Generate detailed spec documents from annotated designs", type: "ai" },
      { name: "Figma AI", description: "Auto-generate redlines and spacing specifications", type: "ai" },
    ],
    traditionalTools: [
      { name: "Figma Dev Mode", description: "Provide developers with inspect-ready designs and code snippets", type: "traditional" },
      { name: "Zeplin", description: "Generate style guides, assets, and specs from design files", type: "traditional" },
    ],
    workflow: [
      { label: "Annotate designs" },
      { label: "Generate specs", aiTool: "Figma AI" },
      { label: "Review edge cases" },
      { label: "Developer walkthrough" },
    ],
    deliverables: [
      "Annotated design files with developer-facing notes",
      "Responsive behavior specifications",
      "Animation and transition specifications",
      "Edge case documentation (empty states, errors, loading)",
    ],
    resources: [
      { title: "NNG: Design Handoff (2023)", url: "https://www.nngroup.com/articles/design-handoff/" },
    ],
  },
  {
    id: "post-launch",
    title: "Evaluate post-launch performance",
    category: "Handoff",
    criticality: "human-critical",
    description:
      "After launch, measure actual performance against your success metrics. Combine quantitative analytics with qualitative feedback to assess whether the design achieved its goals. This closes the feedback loop and informs the next iteration cycle.",
    image: handoffImg,
    aiTools: [
      { name: "ChatGPT", description: "Analyze analytics data and generate performance summary reports", type: "ai" },
      { name: "Hotjar AI", description: "AI-powered session analysis and heatmap insights", type: "ai" },
    ],
    traditionalTools: [
      { name: "Amplitude / Mixpanel", description: "Track user behavior, funnels, and retention metrics", type: "traditional" },
      { name: "Hotjar / FullStory", description: "Session recordings and heatmaps for qualitative analysis", type: "traditional" },
    ],
    workflow: [
      { label: "Collect data (1-2 weeks)" },
      { label: "Analyze metrics", aiTool: "ChatGPT" },
      { label: "Gather user feedback" },
      { label: "Plan next iteration" },
    ],
    deliverables: [
      "Post-launch performance report vs. success metrics",
      "User feedback synthesis",
      "Recommendations for next iteration",
    ],
    resources: [
      { title: "NNG: UX Metrics (2023)", url: "https://www.nngroup.com/articles/ux-metrics/" },
    ],
  },
];
