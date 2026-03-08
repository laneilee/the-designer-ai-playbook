export type Phase = "Discover" | "Define" | "Ideate" | "Prototype" | "Validate" | "Align";
export type Context = "Solo" | "Team" | "Stakeholder" | "Cross-functional";
export type Effort = "Low" | "Medium" | "High";
export type ToolType = "ai" | "traditional";

export interface Tool {
  name: string;
  description: string;
  type: ToolType;
}

export interface Method {
  id: string;
  title: string;
  phase: Phase;
  context: Context[];
  whenToUse: string;
  description: string;
  effort: Effort;
  timeEstimate: string;
  steps: string[];
  artifacts: string[];
  relatedMethods: string[];
  aiTools: Tool[];
  traditionalTools: Tool[];
  resources: { title: string; url: string }[];
}

export const phases: Phase[] = ["Discover", "Define", "Ideate", "Prototype", "Validate", "Align"];

export const contexts: Context[] = ["Solo", "Team", "Stakeholder", "Cross-functional"];

export const methods: Method[] = [
  // ── DISCOVER ──
  {
    id: "jobs-to-be-done",
    title: "Jobs To Be Done",
    phase: "Discover",
    context: ["Solo", "Team"],
    whenToUse: "When you need to uncover the underlying motivations behind user behavior — what progress are they trying to make in their lives?",
    description:
      "JTBD reframes user needs around the 'job' they hire a product to do. Instead of asking what features users want, you explore the functional, emotional, and social dimensions of the progress they're seeking. This method reveals opportunities that demographic-based personas often miss.",
    effort: "Medium",
    timeEstimate: "1–2 weeks",
    steps: [
      "Identify the domain and target users to interview",
      "Conduct switch interviews — ask about the last time they switched to/from a solution",
      "Map the timeline: first thought → passive looking → active looking → deciding → consuming → satisfaction",
      "Extract the functional, emotional, and social jobs",
      "Write job statements: 'When [situation], I want to [motivation], so I can [outcome]'",
      "Cluster jobs by themes and prioritize by frequency and importance",
    ],
    artifacts: [
      "Job statements with situation-motivation-outcome structure",
      "Forces of progress diagram (push, pull, anxiety, habit)",
      "Job map showing the full consumption chain",
    ],
    relatedMethods: ["user-story-mapping", "journey-mapping", "assumption-mapping"],
    aiTools: [
      { name: "Claude", description: "Analyze interview transcripts to extract job statements and forces of progress", type: "ai" },
      { name: "Otter.ai", description: "Real-time transcription of JTBD interviews", type: "ai" },
    ],
    traditionalTools: [
      { name: "Miro / FigJam", description: "Map forces diagrams and cluster job statements collaboratively", type: "traditional" },
      { name: "Dovetail", description: "Tag and organize qualitative interview data", type: "traditional" },
    ],
    resources: [
      { title: "Intercom: Jobs To Be Done", url: "https://www.intercom.com/resources/books/intercom-jobs-to-be-done" },
      { title: "JTBD Toolkit by Jim Kalbach", url: "https://jtbd-toolkit.com/" },
    ],
  },
  {
    id: "competitive-analysis",
    title: "Competitive Analysis",
    phase: "Discover",
    context: ["Solo", "Team"],
    whenToUse: "When entering a market, redesigning a product, or looking for differentiation opportunities against existing solutions.",
    description:
      "Systematically evaluate competitor products to understand market patterns, UX conventions, and opportunities for differentiation. Go beyond feature checklists — analyze the experience quality, positioning, and unmet needs competitors leave open.",
    effort: "Medium",
    timeEstimate: "3–5 days",
    steps: [
      "Define your competitive landscape: direct, indirect, and aspirational competitors",
      "Create a feature/experience comparison matrix",
      "Evaluate each competitor hands-on — sign up, complete key flows, note friction",
      "Analyze their positioning, messaging, and target audience",
      "Identify patterns, conventions, and gaps across the landscape",
      "Synthesize findings into opportunity areas for differentiation",
    ],
    artifacts: [
      "Competitive landscape map with positioning",
      "Feature/experience comparison matrix with scoring",
      "UX strengths and weaknesses per competitor",
      "Opportunity areas for differentiation",
    ],
    relatedMethods: ["experience-principles", "north-star-framing", "stakeholder-mapping"],
    aiTools: [
      { name: "ChatGPT", description: "Research competitors and generate comparison matrices", type: "ai" },
      { name: "Perplexity", description: "Deep research on competitor features, positioning, and reviews", type: "ai" },
    ],
    traditionalTools: [
      { name: "Figma", description: "Screenshot and annotate competitor UIs for comparison", type: "traditional" },
      { name: "Spreadsheets", description: "Build feature comparison matrices and scoring rubrics", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Competitive UX Benchmarking", url: "https://www.nngroup.com/articles/competitive-usability-evaluations/" },
    ],
  },
  {
    id: "journey-mapping",
    title: "Journey Mapping",
    phase: "Discover",
    context: ["Team", "Stakeholder"],
    whenToUse: "When you need a shared understanding of the end-to-end user experience, including emotional highs and lows, across all touchpoints.",
    description:
      "Journey maps visualize the complete user experience over time, capturing actions, thoughts, emotions, touchpoints, and pain points. They create empathy and alignment across teams by making the invisible visible — especially the gaps between touchpoints that no single team owns.",
    effort: "Medium",
    timeEstimate: "3–5 days",
    steps: [
      "Define the scope: which persona, which scenario, start/end points",
      "Gather research data — interviews, analytics, support tickets",
      "Map the stages of the journey (awareness → consideration → use → retention)",
      "For each stage, capture: actions, thoughts, emotions, touchpoints, pain points",
      "Plot the emotional curve across the journey",
      "Identify moments of truth and opportunity areas",
      "Workshop with cross-functional team to validate and ideate",
    ],
    artifacts: [
      "Journey map with stages, actions, emotions, and pain points",
      "Opportunity map highlighting key improvement areas",
      "Emotional curve visualization",
    ],
    relatedMethods: ["service-blueprint", "jobs-to-be-done", "stakeholder-mapping"],
    aiTools: [
      { name: "ChatGPT", description: "Synthesize research data into journey stages and identify patterns", type: "ai" },
      { name: "Claude", description: "Analyze support tickets and reviews to surface pain points along the journey", type: "ai" },
    ],
    traditionalTools: [
      { name: "Miro / FigJam", description: "Collaborative journey mapping with the team", type: "traditional" },
      { name: "Figma", description: "Create polished journey map deliverables", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Journey Mapping 101", url: "https://www.nngroup.com/articles/journey-mapping-101/" },
    ],
  },
  {
    id: "service-blueprint",
    title: "Service Blueprint",
    phase: "Discover",
    context: ["Cross-functional", "Stakeholder"],
    whenToUse: "When you need to understand and optimize the systems, processes, and people behind the user-facing experience.",
    description:
      "Service blueprints extend journey maps by revealing the backstage operations that support each user touchpoint. They map frontstage interactions alongside backstage processes, support systems, and internal actions — making it possible to diagnose systemic failures and design holistic improvements.",
    effort: "High",
    timeEstimate: "1–2 weeks",
    steps: [
      "Start with a customer journey map as the foundation",
      "Add the line of interaction: what the user directly interacts with",
      "Add the line of visibility: frontstage employee actions the user sees",
      "Add backstage actions: what happens behind the scenes",
      "Add support processes: systems, tools, and policies that enable delivery",
      "Mark failure points, bottlenecks, and wait times",
      "Identify improvement opportunities across all layers",
    ],
    artifacts: [
      "Service blueprint with all five layers mapped",
      "Failure point inventory with severity ratings",
      "Improvement roadmap with quick wins and strategic bets",
    ],
    relatedMethods: ["journey-mapping", "stakeholder-mapping", "okr-alignment"],
    aiTools: [
      { name: "ChatGPT", description: "Generate backstage process descriptions from operational documentation", type: "ai" },
    ],
    traditionalTools: [
      { name: "Miro / FigJam", description: "Large-format collaborative blueprinting sessions", type: "traditional" },
      { name: "Notion / Confluence", description: "Document and share the blueprint with stakeholders", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Service Blueprints", url: "https://www.nngroup.com/articles/service-blueprints-definition/" },
    ],
  },
  {
    id: "stakeholder-mapping",
    title: "Stakeholder Mapping",
    phase: "Discover",
    context: ["Solo", "Stakeholder"],
    whenToUse: "At project kickoff — when you need to understand who has influence, who has concerns, and how to navigate organizational dynamics.",
    description:
      "Map the people and teams who influence, are affected by, or care about your project. Understanding power dynamics, motivations, and concerns helps you build the right coalitions, anticipate resistance, and communicate effectively throughout the design process.",
    effort: "Low",
    timeEstimate: "1–2 days",
    steps: [
      "List all people and teams connected to the project",
      "Plot them on a power/interest matrix (high power + high interest = manage closely)",
      "Identify each stakeholder's goals, concerns, and definition of success",
      "Map relationships and potential conflicts between stakeholders",
      "Define your communication strategy for each quadrant",
      "Schedule introductory conversations with key stakeholders",
    ],
    artifacts: [
      "Power/interest matrix with all stakeholders plotted",
      "Stakeholder profiles with goals, concerns, and communication preferences",
      "RACI chart for design decisions",
    ],
    relatedMethods: ["okr-alignment", "design-critique", "service-blueprint"],
    aiTools: [
      { name: "ChatGPT", description: "Generate interview guides and synthesize stakeholder notes into profiles", type: "ai" },
    ],
    traditionalTools: [
      { name: "Miro / FigJam", description: "Collaborative stakeholder mapping and relationship diagrams", type: "traditional" },
      { name: "Notion / Confluence", description: "Document stakeholder profiles and communication plans", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Stakeholder Interviews", url: "https://www.nngroup.com/articles/stakeholder-interviews/" },
    ],
  },

  // ── DEFINE ──
  {
    id: "north-star-framing",
    title: "North Star Vision Framing",
    phase: "Define",
    context: ["Team", "Stakeholder"],
    whenToUse: "When the team needs a shared, inspiring vision of the future state to guide design decisions and align stakeholders.",
    description:
      "Define a compelling vision of the ideal user experience 12–18 months out. The North Star isn't a feature spec — it's an aspirational narrative that describes how life is better for users. It gives the team a decision-making compass and helps stakeholders understand the 'why' behind design choices.",
    effort: "Medium",
    timeEstimate: "2–3 days",
    steps: [
      "Synthesize research insights and identify the biggest opportunity areas",
      "Draft a future-state narrative: describe a day in the user's life with the ideal experience",
      "Define the key experience principles that guide toward this vision",
      "Create a visual concept or storyboard of the North Star experience",
      "Pressure-test with stakeholders: is it inspiring? Is it achievable? Does it align with business goals?",
      "Distill into a one-page North Star document the team can reference",
    ],
    artifacts: [
      "North Star narrative document with vision statement",
      "Future-state storyboard or concept visualization",
      "Experience principles derived from the vision",
    ],
    relatedMethods: ["experience-principles", "how-might-we", "okr-alignment"],
    aiTools: [
      { name: "ChatGPT", description: "Draft narrative scenarios and vision statements from research insights", type: "ai" },
      { name: "Midjourney / DALL-E", description: "Generate visual concept explorations for the future state", type: "ai" },
    ],
    traditionalTools: [
      { name: "Figma", description: "Create storyboards and visual concepts for the North Star", type: "traditional" },
      { name: "Google Docs", description: "Collaboratively draft and refine the vision narrative", type: "traditional" },
    ],
    resources: [
      { title: "Amplitude: North Star Metric", url: "https://amplitude.com/blog/north-star-metric" },
    ],
  },
  {
    id: "how-might-we",
    title: "How Might We",
    phase: "Define",
    context: ["Team", "Cross-functional"],
    whenToUse: "When transitioning from research insights to design opportunities — turning problems into actionable starting points for ideation.",
    description:
      "HMW questions reframe problems as opportunities. The magic is in the specificity: too broad and they're useless ('HMW make users happy'), too narrow and they're prescriptive ('HMW add a button'). Well-crafted HMW questions open creative space while maintaining focus on real user needs.",
    effort: "Low",
    timeEstimate: "2–4 hours",
    steps: [
      "Review research insights and identify the most important pain points and needs",
      "For each insight, write 3-5 HMW questions at different levels of specificity",
      "Critique each HMW: is it too broad? Too narrow? Does it assume a solution?",
      "Vote on the most promising HMW questions as a team",
      "Cluster related HMWs into design challenge themes",
      "Select 3-5 top HMW questions to take into ideation",
    ],
    artifacts: [
      "Prioritized list of HMW questions linked to research insights",
      "Clustered design challenge themes",
      "Selected HMWs ready for ideation sessions",
    ],
    relatedMethods: ["affinity-mapping", "crazy-eights", "assumption-mapping"],
    aiTools: [
      { name: "ChatGPT", description: "Generate HMW variations from research insights at different specificity levels", type: "ai" },
      { name: "Claude", description: "Critique HMW questions for breadth/narrowness and assumption bias", type: "ai" },
    ],
    traditionalTools: [
      { name: "Sticky notes", description: "Physical or digital sticky notes for collaborative HMW generation", type: "traditional" },
      { name: "Miro / FigJam", description: "Cluster and vote on HMW questions together", type: "traditional" },
    ],
    resources: [
      { title: "IDEO: How Might We", url: "https://designthinking.ideo.com/faq/how-might-we-questions" },
    ],
  },
  {
    id: "experience-principles",
    title: "Experience Principles",
    phase: "Define",
    context: ["Team", "Stakeholder"],
    whenToUse: "When the team needs a shared set of decision-making criteria to evaluate design options consistently.",
    description:
      "Experience principles are opinionated statements that describe the qualities your product experience must embody. Unlike generic values ('simple', 'delightful'), good experience principles are specific enough to resolve design debates — they tell you what to prioritize when principles conflict.",
    effort: "Medium",
    timeEstimate: "2–3 days",
    steps: [
      "Review research synthesis, competitive analysis, and North Star vision",
      "Workshop: brainstorm qualities that describe the ideal experience",
      "Cluster and prioritize — aim for 4-6 principles, not 20",
      "Make each principle specific and opinionated (not 'be simple', but 'reduce decisions at checkout to three')",
      "Add 'this, not that' comparisons to clarify intent",
      "Validate with stakeholders and test against real design decisions",
    ],
    artifacts: [
      "4-6 experience principles with rationale and examples",
      "'This, not that' comparisons for each principle",
      "Decision-making rubric for evaluating designs against principles",
    ],
    relatedMethods: ["north-star-framing", "design-principles-workshop", "design-critique"],
    aiTools: [
      { name: "ChatGPT", description: "Generate principle candidates from research themes and competitive gaps", type: "ai" },
    ],
    traditionalTools: [
      { name: "Miro / FigJam", description: "Collaborative brainstorming and voting on principles", type: "traditional" },
      { name: "Notion", description: "Document and socialize the final principles", type: "traditional" },
    ],
    resources: [
      { title: "NNG: UX Principles", url: "https://www.nngroup.com/articles/ux-principles/" },
    ],
  },
  {
    id: "assumption-mapping",
    title: "Assumption Mapping",
    phase: "Define",
    context: ["Team", "Cross-functional"],
    whenToUse: "Before investing in building — when you need to surface and prioritize the riskiest unknowns so you can test the right things first.",
    description:
      "Every design decision rests on assumptions. Assumption mapping makes them explicit, then plots them on a certainty/impact matrix to identify which assumptions are both high-impact and least validated. This focuses your research and testing on what matters most.",
    effort: "Low",
    timeEstimate: "2–4 hours",
    steps: [
      "Individually list all assumptions behind your current design direction",
      "Categorize: desirability (will users want this?), viability (can the business support it?), feasibility (can we build it?)",
      "Plot each on a 2×2: importance vs. certainty",
      "Focus on high-importance, low-certainty quadrant — these are your riskiest bets",
      "For each risky assumption, define what would prove/disprove it",
      "Plan validation experiments for top-priority assumptions",
    ],
    artifacts: [
      "Assumption inventory categorized by type",
      "2×2 importance/certainty matrix",
      "Validation plan for high-risk assumptions",
    ],
    relatedMethods: ["concept-testing", "usability-testing", "how-might-we"],
    aiTools: [
      { name: "Claude", description: "Challenge your assumptions and suggest blind spots from different user perspectives", type: "ai" },
    ],
    traditionalTools: [
      { name: "Miro / FigJam", description: "Plot assumptions on the 2×2 matrix collaboratively", type: "traditional" },
      { name: "Sticky notes", description: "Silent brainstorming to surface individual assumptions", type: "traditional" },
    ],
    resources: [
      { title: "Strategyzer: Assumption Mapping", url: "https://www.strategyzer.com/library/how-to-test-business-ideas-5-assumption-mapping" },
    ],
  },

  // ── IDEATE ──
  {
    id: "affinity-mapping",
    title: "Affinity Mapping",
    phase: "Ideate",
    context: ["Team", "Cross-functional"],
    whenToUse: "When you have a large volume of unstructured data — research notes, brainstorm outputs, feedback — and need to find patterns and themes.",
    description:
      "Affinity mapping (or affinity diagramming) is a bottom-up clustering technique. You write individual observations on sticky notes, then silently group them by natural affinity. Themes emerge from the data rather than being imposed top-down, reducing bias and surfacing unexpected connections.",
    effort: "Low",
    timeEstimate: "1–3 hours",
    steps: [
      "Write each observation/idea on a separate sticky note (one thought per note)",
      "Silently cluster notes that feel related — don't discuss while sorting",
      "Once clusters stabilize, discuss what each group represents",
      "Name each cluster with a theme statement (not just a label)",
      "Identify outliers that don't fit — these often contain the most interesting insights",
      "Prioritize themes by frequency, impact, or novelty",
    ],
    artifacts: [
      "Themed clusters with descriptive labels",
      "Key insights summary from each theme",
      "Outlier observations for further investigation",
    ],
    relatedMethods: ["how-might-we", "crazy-eights", "prioritization-matrix"],
    aiTools: [
      { name: "ChatGPT", description: "Pre-cluster large datasets and suggest theme labels for review", type: "ai" },
      { name: "Claude", description: "Analyze and cross-reference data to find non-obvious connections", type: "ai" },
    ],
    traditionalTools: [
      { name: "Miro / FigJam", description: "Digital sticky notes for remote affinity mapping", type: "traditional" },
      { name: "Sticky notes", description: "Physical sticky notes on a wall for in-person sessions", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Affinity Diagramming", url: "https://www.nngroup.com/articles/affinity-diagram/" },
    ],
  },
  {
    id: "crazy-eights",
    title: "Crazy 8s",
    phase: "Ideate",
    context: ["Solo", "Team"],
    whenToUse: "When you need to push past your first idea and rapidly generate multiple divergent solutions to a focused design challenge.",
    description:
      "Crazy 8s forces rapid ideation: fold a sheet into 8 panels and sketch 8 distinct ideas in 8 minutes. The time pressure bypasses your inner critic and pushes you past obvious solutions. It's not about quality — it's about quantity and variety. The best ideas often come in panels 5-8.",
    effort: "Low",
    timeEstimate: "30–60 minutes",
    steps: [
      "Select a focused HMW question or design challenge",
      "Fold paper into 8 panels (or use a digital template)",
      "Set a timer for 8 minutes",
      "Sketch one distinct concept per panel — no repeating ideas",
      "Share sketches with the team (1 minute per person)",
      "Dot-vote on the most promising concepts",
      "Combine and refine the top-voted ideas",
    ],
    artifacts: [
      "8 rough concept sketches per participant",
      "Top-voted concepts selected for further development",
      "Combined concept directions for prototyping",
    ],
    relatedMethods: ["how-might-we", "affinity-mapping", "design-critique"],
    aiTools: [
      { name: "ChatGPT", description: "Generate additional concept variations and 'what if' prompts to push thinking", type: "ai" },
      { name: "Midjourney / DALL-E", description: "Rapidly visualize concept directions as mood references", type: "ai" },
    ],
    traditionalTools: [
      { name: "Paper & pen", description: "The original and still the fastest medium for Crazy 8s", type: "traditional" },
      { name: "Miro / FigJam", description: "Digital templates for remote Crazy 8s sessions", type: "traditional" },
    ],
    resources: [
      { title: "Google Design Sprint: Crazy 8s", url: "https://designsprintkit.withgoogle.com/methodology/phase3-sketch/crazy-eights" },
    ],
  },
  {
    id: "user-story-mapping",
    title: "User Story Mapping",
    phase: "Ideate",
    context: ["Team", "Cross-functional"],
    whenToUse: "When planning what to build and in what order — mapping the user's journey into a releasable backlog that preserves narrative coherence.",
    description:
      "User story mapping arranges user stories along two axes: the horizontal backbone of user activities (the narrative flow) and vertical priority within each activity. This reveals the 'walking skeleton' — the minimum end-to-end experience you can ship — and prevents the backlog from becoming a disconnected list of features.",
    effort: "Medium",
    timeEstimate: "3–5 hours",
    steps: [
      "Map the user's journey as a horizontal backbone of activities",
      "Under each activity, list the tasks/stories that support it",
      "Arrange stories vertically by priority (top = must-have, bottom = nice-to-have)",
      "Draw horizontal lines to define release slices across the backbone",
      "Validate: does each slice deliver a coherent end-to-end experience?",
      "Identify gaps and dependencies between stories",
    ],
    artifacts: [
      "Story map with backbone, stories, and release slices",
      "MVP/v1 definition as the top slice across the backbone",
      "Dependency map between user stories",
    ],
    relatedMethods: ["jobs-to-be-done", "prioritization-matrix", "okr-alignment"],
    aiTools: [
      { name: "ChatGPT", description: "Generate user stories from research findings and acceptance criteria", type: "ai" },
    ],
    traditionalTools: [
      { name: "Miro / FigJam", description: "Large-format story mapping with the cross-functional team", type: "traditional" },
      { name: "Sticky notes", description: "Physical story mapping on a wall for in-person sessions", type: "traditional" },
    ],
    resources: [
      { title: "Jeff Patton: User Story Mapping (book)", url: "https://jpattonassociates.com/user-story-mapping/" },
    ],
  },
  {
    id: "design-principles-workshop",
    title: "Design Principles Workshop",
    phase: "Ideate",
    context: ["Team", "Stakeholder"],
    whenToUse: "When establishing or refreshing the guiding principles that inform every design decision across the product.",
    description:
      "Unlike experience principles (which describe the desired user experience), design principles are the team's operating rules for how to design. They codify hard-won lessons and shared values into memorable, actionable guidelines — e.g., 'Show, don't tell' or 'Earn every interaction'.",
    effort: "Medium",
    timeEstimate: "1–2 days",
    steps: [
      "Review existing design decisions that the team is proud of (and ones that went wrong)",
      "Each team member writes 5-7 principles they think should guide the team",
      "Share and discuss: what patterns emerge? Where do you disagree?",
      "Consolidate into 5-7 candidate principles through affinity mapping",
      "Stress-test each principle against recent design decisions — does it help resolve debates?",
      "Finalize wording, add examples, and publish to the team",
    ],
    artifacts: [
      "5-7 design principles with rationale and real examples",
      "Principle cards for display and reference",
      "Decision-log showing how principles apply to past choices",
    ],
    relatedMethods: ["experience-principles", "design-critique", "north-star-framing"],
    aiTools: [
      { name: "ChatGPT", description: "Generate principle candidates and 'this not that' examples from team input", type: "ai" },
    ],
    traditionalTools: [
      { name: "Miro / FigJam", description: "Collaborative workshop facilitation and affinity sorting", type: "traditional" },
      { name: "Notion", description: "Publish and maintain the principles as living documentation", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Design Principles", url: "https://www.nngroup.com/articles/design-principles/" },
    ],
  },

  // ── PROTOTYPE ──
  {
    id: "lofi-prototyping",
    title: "Low-Fidelity Prototyping",
    phase: "Prototype",
    context: ["Solo", "Team"],
    whenToUse: "When you need to quickly test structure, flow, and concept viability before investing in visual design.",
    description:
      "Low-fi prototypes are deliberately rough — they focus attention on information architecture, task flow, and content hierarchy. The intentional lack of polish invites honest feedback and prevents stakeholders from fixating on colors and fonts when the structure isn't yet validated.",
    effort: "Low",
    timeEstimate: "1–3 days",
    steps: [
      "Define the key user flows to prototype (2-3 max for a single round)",
      "Sketch key screens on paper or whiteboard first",
      "Build a clickable wireframe prototype using your tool of choice",
      "Keep fidelity intentionally low: grayscale, system fonts, placeholder content",
      "Add just enough interactivity to simulate the core task flow",
      "Prepare a test script with task scenarios for validation",
    ],
    artifacts: [
      "Clickable wireframe prototype with key user flows",
      "Task scenarios for usability testing",
      "Annotated wireframes explaining design rationale",
    ],
    relatedMethods: ["crazy-eights", "usability-testing", "concept-testing"],
    aiTools: [
      { name: "v0 by Vercel", description: "Generate UI wireframe components from text descriptions", type: "ai" },
      { name: "Lovable", description: "Build interactive prototypes from natural language descriptions", type: "ai" },
    ],
    traditionalTools: [
      { name: "Figma", description: "Build clickable wireframe prototypes with linking", type: "traditional" },
      { name: "Paper & pen", description: "Fastest medium for initial layout exploration", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Prototyping", url: "https://www.nngroup.com/articles/prototyping/" },
    ],
  },
  {
    id: "hifi-prototyping",
    title: "High-Fidelity Prototyping",
    phase: "Prototype",
    context: ["Solo", "Team"],
    whenToUse: "When validating the final experience before development — testing visual design, micro-interactions, and content in a realistic context.",
    description:
      "High-fi prototypes closely simulate the final product. They're essential for validating the complete experience with users, getting stakeholder sign-off, and serving as a precise reference for developers. AI coding tools now make it possible to generate functional prototypes at unprecedented speed.",
    effort: "High",
    timeEstimate: "1–2 weeks",
    steps: [
      "Apply the final visual design system to validated wireframes",
      "Add real (or realistic) content — no more 'Lorem ipsum'",
      "Build micro-interactions, transitions, and loading states",
      "Include edge cases: empty states, errors, long content, offline",
      "Test across devices and screen sizes",
      "Conduct a final usability test with the hi-fi prototype",
    ],
    artifacts: [
      "Interactive high-fidelity prototype with complete user flows",
      "Responsive design across key breakpoints",
      "Interaction specifications for development handoff",
    ],
    relatedMethods: ["usability-testing", "design-critique", "lofi-prototyping"],
    aiTools: [
      { name: "Lovable", description: "Generate full functional prototypes from designs or descriptions", type: "ai" },
      { name: "Cursor / Copilot", description: "AI-assisted coding for interactive prototype features", type: "ai" },
    ],
    traditionalTools: [
      { name: "Figma", description: "Advanced prototyping with variables and conditionals", type: "traditional" },
      { name: "Framer", description: "Code-backed prototypes with real data and interactions", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Prototyping", url: "https://www.nngroup.com/articles/prototyping/" },
    ],
  },

  // ── VALIDATE ──
  {
    id: "usability-testing",
    title: "Usability Testing",
    phase: "Validate",
    context: ["Team", "Cross-functional"],
    whenToUse: "When you need to observe real users attempting tasks to identify usability issues — the single most important validation activity in design.",
    description:
      "Watch real people try to use your design. No amount of expert review or AI analysis replaces the insight of watching someone struggle with something you thought was obvious. Even 5 participants reveal ~85% of major usability issues. Test early, test often, test with real users.",
    effort: "Medium",
    timeEstimate: "1–2 weeks",
    steps: [
      "Define test objectives and success criteria",
      "Write a test script with realistic task scenarios",
      "Recruit 5-8 representative participants",
      "Conduct sessions (moderated or unmoderated) with think-aloud protocol",
      "Take detailed notes on behaviors, not just opinions",
      "Analyze findings by severity and frequency",
      "Present actionable recommendations to the team",
    ],
    artifacts: [
      "Usability test report with severity-rated findings",
      "Video highlight reel for stakeholder presentations",
      "Prioritized list of design changes",
    ],
    relatedMethods: ["concept-testing", "assumption-mapping", "design-critique"],
    aiTools: [
      { name: "Otter.ai", description: "Transcribe usability sessions in real time", type: "ai" },
      { name: "Claude", description: "Analyze session transcripts and generate usability finding reports", type: "ai" },
    ],
    traditionalTools: [
      { name: "Maze", description: "Run unmoderated usability tests at scale with analytics", type: "traditional" },
      { name: "Lookback / UserTesting", description: "Conduct moderated remote usability sessions", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Usability Testing 101", url: "https://www.nngroup.com/articles/usability-testing-101/" },
    ],
  },
  {
    id: "concept-testing",
    title: "Concept Testing",
    phase: "Validate",
    context: ["Team", "Stakeholder"],
    whenToUse: "When evaluating early-stage concepts before committing to building — do users understand it, want it, and see value in it?",
    description:
      "Concept testing evaluates whether your idea resonates with users before you invest in detailed design. It tests the 'what' and 'why' before the 'how'. Present concepts through storyboards, landing pages, or simple prototypes and measure comprehension, appeal, and perceived value.",
    effort: "Medium",
    timeEstimate: "3–5 days",
    steps: [
      "Create concept stimuli: descriptions, storyboards, fake landing pages, or rough prototypes",
      "Define evaluation criteria: comprehension, appeal, relevance, uniqueness",
      "Recruit 8-12 target users for concept interviews",
      "Present concepts one at a time — observe reactions before asking questions",
      "Use both qualitative (reactions, quotes) and quantitative (rating scales) measures",
      "Compare concepts if testing multiple options",
    ],
    artifacts: [
      "Concept test results with comprehension and appeal scores",
      "Qualitative feedback themes per concept",
      "Go/no-go recommendation with rationale",
    ],
    relatedMethods: ["assumption-mapping", "usability-testing", "north-star-framing"],
    aiTools: [
      { name: "ChatGPT", description: "Draft concept descriptions and discussion guides for testing", type: "ai" },
      { name: "Midjourney / DALL-E", description: "Generate concept visualizations for testing stimuli", type: "ai" },
    ],
    traditionalTools: [
      { name: "Maze", description: "Run unmoderated concept tests with survey follow-ups", type: "traditional" },
      { name: "Zoom / Teams", description: "Conduct moderated concept testing interviews remotely", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Concept Testing", url: "https://www.nngroup.com/articles/concept-testing/" },
    ],
  },
  {
    id: "design-critique",
    title: "Design Critique",
    phase: "Validate",
    context: ["Team"],
    whenToUse: "Throughout the design process — when you need structured, constructive peer feedback on work in progress.",
    description:
      "Design critiques are structured feedback sessions where the team evaluates designs against stated objectives and principles. Unlike 'design reviews' (approval gates), critiques are collaborative learning moments. The goal is to improve the work, not approve or reject it.",
    effort: "Low",
    timeEstimate: "1–2 hours",
    steps: [
      "Presenter shares context: objectives, constraints, specific questions for the group",
      "Team silently reviews the design (2-3 minutes)",
      "Each person writes feedback organized as: what's working, what's not, suggestions",
      "Go around the room — each person shares their top feedback points",
      "Discuss and debate the most impactful feedback",
      "Presenter summarizes takeaways and next steps",
    ],
    artifacts: [
      "Critique notes organized by theme",
      "Action items with owners and timelines",
      "Updated design rationale documentation",
    ],
    relatedMethods: ["experience-principles", "design-principles-workshop", "usability-testing"],
    aiTools: [
      { name: "ChatGPT", description: "Pre-review designs for common UX heuristic violations", type: "ai" },
      { name: "Claude", description: "Generate structured feedback questions based on design objectives", type: "ai" },
    ],
    traditionalTools: [
      { name: "Figma", description: "Comment directly on designs during critique", type: "traditional" },
      { name: "Miro / FigJam", description: "Structured feedback templates for remote critiques", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Design Critiques", url: "https://www.nngroup.com/articles/design-critiques/" },
    ],
  },

  // ── ALIGN ──
  {
    id: "prioritization-matrix",
    title: "Prioritization Matrix",
    phase: "Align",
    context: ["Team", "Stakeholder", "Cross-functional"],
    whenToUse: "When you have more ideas than capacity — systematically evaluating options against multiple criteria to make defensible tradeoff decisions.",
    description:
      "Prioritization matrices help teams make objective tradeoff decisions by evaluating options against explicit criteria. Common frameworks include Impact/Effort, RICE (Reach, Impact, Confidence, Effort), and MoSCoW. The value isn't in the math — it's in the conversation about what matters.",
    effort: "Low",
    timeEstimate: "2–4 hours",
    steps: [
      "List all candidates for prioritization (features, fixes, research questions)",
      "Choose your framework: Impact/Effort 2×2, RICE scoring, or custom criteria",
      "Define what each criterion means specifically for your context",
      "Score each candidate independently, then discuss disagreements",
      "Plot results and identify quick wins (high impact, low effort)",
      "Document rationale for top priorities and items deliberately deprioritized",
    ],
    artifacts: [
      "Scored prioritization matrix with all candidates",
      "Prioritized roadmap or backlog",
      "Decision log with rationale for key tradeoffs",
    ],
    relatedMethods: ["user-story-mapping", "okr-alignment", "assumption-mapping"],
    aiTools: [
      { name: "ChatGPT", description: "Generate scoring criteria and help estimate impact/effort for candidates", type: "ai" },
    ],
    traditionalTools: [
      { name: "Spreadsheets", description: "Build scoring models with weighted criteria", type: "traditional" },
      { name: "Miro / FigJam", description: "2×2 matrix plotting in collaborative sessions", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Prioritization Methods", url: "https://www.nngroup.com/articles/prioritization-methods/" },
    ],
  },
  {
    id: "okr-alignment",
    title: "OKR Alignment Workshop",
    phase: "Align",
    context: ["Stakeholder", "Cross-functional"],
    whenToUse: "When connecting design work to measurable business outcomes — ensuring every design decision ladders up to organizational goals.",
    description:
      "OKR (Objectives and Key Results) alignment ensures design efforts directly contribute to business goals. The workshop connects design initiatives to measurable outcomes, creating shared accountability and making it easier to justify design investment to leadership.",
    effort: "Medium",
    timeEstimate: "1–2 days",
    steps: [
      "Review company/team OKRs for the current period",
      "Map existing design initiatives to relevant OKRs",
      "Identify OKRs with no design coverage — are there opportunities?",
      "For each design initiative, define specific key results it contributes to",
      "Establish design-specific metrics that lead to business KRs",
      "Create a tracking cadence: weekly design metrics, monthly OKR check-ins",
    ],
    artifacts: [
      "Design-to-OKR mapping document",
      "Design-specific leading metrics for each initiative",
      "Quarterly design review template tied to OKRs",
    ],
    relatedMethods: ["north-star-framing", "prioritization-matrix", "stakeholder-mapping"],
    aiTools: [
      { name: "ChatGPT", description: "Suggest design metrics that correlate with business OKRs", type: "ai" },
    ],
    traditionalTools: [
      { name: "Spreadsheets", description: "Track OKR progress and design metrics", type: "traditional" },
      { name: "Notion / Confluence", description: "Document OKR alignment and tracking cadence", type: "traditional" },
    ],
    resources: [
      { title: "What Matters: OKR Guide", url: "https://www.whatmatters.com/faqs/okr-meaning-definition-example" },
    ],
  },

  // ── Additional DISCOVER methods ──
  {
    id: "contextual-inquiry",
    title: "Contextual Inquiry",
    phase: "Discover",
    context: ["Solo", "Team"],
    whenToUse: "When you need to understand how users actually behave in their natural environment — not what they say they do, but what they really do.",
    description:
      "Contextual inquiry combines observation and interview in the user's own environment. You watch users work, interrupt to ask why, and build a shared understanding of their process, tools, workarounds, and pain points. It reveals tacit knowledge that users can't articulate in a conference room.",
    effort: "High",
    timeEstimate: "1–3 weeks",
    steps: [
      "Define the focus areas and research questions",
      "Recruit 6-12 participants in their actual work/use context",
      "Observe users performing real tasks in their environment",
      "Use the master/apprentice model — user leads, you follow and ask 'why'",
      "Take detailed notes on actions, artifacts, workarounds, and breakdowns",
      "Debrief after each session — capture key insights while fresh",
      "Build an affinity diagram from all session notes",
      "Synthesize into work models: flow, sequence, artifact, cultural, physical",
    ],
    artifacts: [
      "Contextual inquiry session notes with observations and quotes",
      "Work models (flow, sequence, cultural)",
      "Affinity diagram of cross-session themes",
      "Environment and artifact photos (with consent)",
    ],
    relatedMethods: ["journey-mapping", "jobs-to-be-done", "affinity-mapping"],
    aiTools: [
      { name: "Otter.ai", description: "Transcribe field interviews in real time", type: "ai" },
      { name: "Claude", description: "Analyze field notes to surface patterns across sessions", type: "ai" },
    ],
    traditionalTools: [
      { name: "Dovetail", description: "Tag and organize qualitative field research data", type: "traditional" },
      { name: "Miro / FigJam", description: "Build affinity diagrams from field notes", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Contextual Inquiry", url: "https://www.nngroup.com/articles/contextual-inquiry/" },
    ],
  },
  {
    id: "diary-study",
    title: "Diary Study",
    phase: "Discover",
    context: ["Solo", "Team"],
    whenToUse: "When you need to understand behaviors and experiences that unfold over time — habits, routines, and evolving needs that a single interview can't capture.",
    description:
      "Diary studies ask participants to self-report their experiences over days or weeks. They reveal longitudinal patterns, context-dependent behaviors, and the emotional arc of product usage. Particularly valuable for understanding habits, onboarding journeys, and intermittent use cases.",
    effort: "High",
    timeEstimate: "2–6 weeks",
    steps: [
      "Define the research questions and study duration (typically 1-4 weeks)",
      "Design the diary protocol: what to log, how often, what format",
      "Recruit 10-15 participants and brief them thoroughly",
      "Send regular prompts/reminders to maintain engagement",
      "Monitor entries and follow up on interesting observations mid-study",
      "Conduct post-study debrief interviews with each participant",
      "Analyze entries for patterns across time and participants",
      "Synthesize into journey insights and behavioral patterns",
    ],
    artifacts: [
      "Diary entry database with coded themes",
      "Longitudinal behavior patterns and timelines",
      "Participant journey arcs showing experience over time",
      "Key quotes and moments for storytelling",
    ],
    relatedMethods: ["journey-mapping", "contextual-inquiry", "jobs-to-be-done"],
    aiTools: [
      { name: "ChatGPT", description: "Analyze diary entries at scale to find patterns across participants", type: "ai" },
      { name: "Claude", description: "Generate thematic analysis from hundreds of diary entries", type: "ai" },
    ],
    traditionalTools: [
      { name: "dscout", description: "Purpose-built diary study platform with mobile capture", type: "traditional" },
      { name: "Dovetail", description: "Organize and analyze qualitative diary data", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Diary Studies", url: "https://www.nngroup.com/articles/diary-studies/" },
    ],
  },

  // ── Additional DEFINE methods ──
  {
    id: "persona-development",
    title: "Persona Development",
    phase: "Define",
    context: ["Team", "Stakeholder"],
    whenToUse: "When you need to align the team around who you're designing for — creating a shared, research-grounded understanding of your key user segments.",
    description:
      "Personas are research-based archetypes representing distinct user segments. Good personas go beyond demographics — they capture goals, behaviors, pain points, and contexts of use. They serve as a decision-making tool: 'Would Maria do this?' is more actionable than 'Would our users do this?'",
    effort: "Medium",
    timeEstimate: "1–2 weeks",
    steps: [
      "Synthesize research data to identify behavioral patterns and segments",
      "Cluster users by goals and behaviors, not demographics",
      "Draft 3-5 persona archetypes with names and narratives",
      "Include: goals, frustrations, behaviors, context, tech comfort, key quotes",
      "Validate personas against raw research data — do they ring true?",
      "Present to stakeholders and iterate based on feedback",
      "Socialize personas across the organization with posters, cards, or wiki pages",
    ],
    artifacts: [
      "3-5 persona documents with photos, narratives, and behavioral traits",
      "Persona spectrum showing range of user needs",
      "Quick-reference persona cards for meetings and workshops",
    ],
    relatedMethods: ["jobs-to-be-done", "journey-mapping", "experience-principles"],
    aiTools: [
      { name: "ChatGPT", description: "Draft persona narratives from research synthesis and generate scenario variations", type: "ai" },
      { name: "Midjourney / DALL-E", description: "Generate representative persona illustrations (avoiding stock photos)", type: "ai" },
    ],
    traditionalTools: [
      { name: "Figma", description: "Design polished persona documents and cards", type: "traditional" },
      { name: "Notion / Confluence", description: "Host living persona documents the team can reference", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Personas", url: "https://www.nngroup.com/articles/persona/" },
    ],
  },
  {
    id: "problem-framing",
    title: "Problem Framing",
    phase: "Define",
    context: ["Team", "Stakeholder"],
    whenToUse: "When the team is jumping to solutions before agreeing on the problem — you need to step back and ensure you're solving the right problem.",
    description:
      "Problem framing is the discipline of defining what problem you're actually solving, for whom, and why it matters now. A well-framed problem is half-solved. This method prevents the team from optimizing the wrong thing and creates alignment on scope, constraints, and success criteria.",
    effort: "Medium",
    timeEstimate: "2–3 days",
    steps: [
      "Gather all known context: research findings, business goals, technical constraints",
      "Write the problem from multiple perspectives: user, business, technical",
      "Use the '5 Whys' technique to find the root problem behind symptoms",
      "Draft a problem statement: [User] needs [need] because [insight]",
      "Define what's in scope and explicitly out of scope",
      "Set success criteria: how will we know we've solved this?",
      "Align with stakeholders on the problem frame before ideation begins",
    ],
    artifacts: [
      "Problem statement document with user, business, and technical perspectives",
      "Scope definition with explicit in/out boundaries",
      "Success criteria and measurable outcomes",
      "Constraints inventory",
    ],
    relatedMethods: ["how-might-we", "assumption-mapping", "north-star-framing"],
    aiTools: [
      { name: "Claude", description: "Challenge problem framing by generating alternative perspectives and reframes", type: "ai" },
      { name: "ChatGPT", description: "Apply '5 Whys' analysis and generate problem statement variations", type: "ai" },
    ],
    traditionalTools: [
      { name: "Miro / FigJam", description: "Collaborative problem framing workshop facilitation", type: "traditional" },
      { name: "Google Docs", description: "Draft and iterate on problem statements with stakeholders", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Problem Statements", url: "https://www.nngroup.com/articles/problem-statements/" },
    ],
  },

  // ── Additional IDEATE methods ──
  {
    id: "design-studio",
    title: "Design Studio",
    phase: "Ideate",
    context: ["Team", "Cross-functional"],
    whenToUse: "When you need cross-functional input on design solutions — bringing diverse perspectives together to sketch, critique, and converge on concepts.",
    description:
      "Design Studio is a structured collaborative sketching workshop where everyone — designers, engineers, PMs, even stakeholders — generates and critiques solutions. It democratizes ideation, surfaces unexpected ideas from non-designers, and builds shared ownership of the solution direction.",
    effort: "Medium",
    timeEstimate: "2–4 hours",
    steps: [
      "Brief the group on the design challenge, constraints, and research insights",
      "Round 1: Individual sketching (10 min) — everyone draws 6-8 concepts",
      "Present and critique: each person shares, group provides structured feedback",
      "Round 2: Iterate on best ideas — refine, combine, or pivot (10 min)",
      "Present refined concepts and vote on strongest directions",
      "Select 2-3 concepts for further development by the design team",
    ],
    artifacts: [
      "Sketches from all participants across rounds",
      "Critique notes and voting results",
      "2-3 selected concept directions with rationale",
    ],
    relatedMethods: ["crazy-eights", "design-critique", "how-might-we"],
    aiTools: [
      { name: "Midjourney / DALL-E", description: "Quickly visualize rough concepts for discussion", type: "ai" },
      { name: "ChatGPT", description: "Generate 'What if...' prompts to push ideation further", type: "ai" },
    ],
    traditionalTools: [
      { name: "Paper & pen", description: "Low-barrier sketching for all participants regardless of skill", type: "traditional" },
      { name: "Miro / FigJam", description: "Remote design studio with templates and voting", type: "traditional" },
    ],
    resources: [
      { title: "Todd Zaki Warfel: Design Studio Method", url: "https://www.uxpin.com/studio/blog/design-studio-methodology/" },
    ],
  },

  // ── Additional PROTOTYPE methods ──
  {
    id: "design-system",
    title: "Design System Development",
    phase: "Prototype",
    context: ["Team", "Cross-functional"],
    whenToUse: "When scaling design across multiple teams, products, or platforms — ensuring consistency, efficiency, and quality at scale.",
    description:
      "A design system is the single source of truth for how your product looks, feels, and behaves. It includes components, patterns, tokens, guidelines, and principles. For senior designers, building and evolving a design system is one of the highest-leverage activities — it multiplies your impact across the entire organization.",
    effort: "High",
    timeEstimate: "Ongoing (initial: 2–3 months)",
    steps: [
      "Audit existing UI patterns: screenshot and catalog every component and pattern in use",
      "Identify inconsistencies, duplications, and one-offs",
      "Define design tokens: colors, typography, spacing, elevation, motion",
      "Build core components: buttons, inputs, cards, navigation, modals",
      "Document usage guidelines, dos/don'ts, and accessibility requirements for each",
      "Set up a contribution model: how do teams propose new components?",
      "Establish a governance process for updates and deprecations",
      "Measure adoption and track design debt reduction over time",
    ],
    artifacts: [
      "Component library in Figma with variants and documentation",
      "Design token specification",
      "Usage guidelines and pattern documentation",
      "Contribution and governance model",
    ],
    relatedMethods: ["hifi-prototyping", "design-principles-workshop", "design-qa"],
    aiTools: [
      { name: "Figma AI", description: "Generate component variants and auto-document design tokens", type: "ai" },
      { name: "ChatGPT", description: "Draft component usage guidelines and accessibility documentation", type: "ai" },
    ],
    traditionalTools: [
      { name: "Figma", description: "Build and maintain the component library with variants", type: "traditional" },
      { name: "Storybook", description: "Document and test coded components in isolation", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Design Systems 101", url: "https://www.nngroup.com/articles/design-systems-101/" },
    ],
  },

  // ── Additional VALIDATE methods ──
  {
    id: "heuristic-evaluation",
    title: "Heuristic Evaluation",
    phase: "Validate",
    context: ["Solo", "Team"],
    whenToUse: "When you need a fast, expert-driven assessment of usability issues — useful when there's no time or budget for user testing.",
    description:
      "Heuristic evaluation is an expert review method where evaluators examine a UI against a set of established usability principles (heuristics). It's fast, cheap, and effective at catching common issues. Best when done by 3-5 evaluators independently, then combined. Not a substitute for user testing, but a powerful complement.",
    effort: "Low",
    timeEstimate: "1–3 days",
    steps: [
      "Select a heuristic framework (Nielsen's 10, Shneiderman's 8, or custom)",
      "Define the scope: which flows, screens, or features to evaluate",
      "Each evaluator independently reviews the UI against each heuristic",
      "Rate each finding by severity: cosmetic, minor, major, catastrophic",
      "Consolidate findings across evaluators — note agreement and disagreements",
      "Prioritize findings and create actionable recommendations",
    ],
    artifacts: [
      "Heuristic evaluation report with severity-rated findings",
      "Annotated screenshots showing specific violations",
      "Prioritized action plan for addressing issues",
    ],
    relatedMethods: ["usability-testing", "design-critique", "accessibility-audit"],
    aiTools: [
      { name: "ChatGPT", description: "Pre-scan screenshots against heuristic checklists to surface potential issues", type: "ai" },
      { name: "Claude", description: "Generate detailed heuristic evaluation reports from UI descriptions", type: "ai" },
    ],
    traditionalTools: [
      { name: "Figma", description: "Annotate designs with heuristic violation markers", type: "traditional" },
      { name: "Spreadsheets", description: "Track and score heuristic findings systematically", type: "traditional" },
    ],
    resources: [
      { title: "NNG: How to Conduct a Heuristic Evaluation", url: "https://www.nngroup.com/articles/how-to-conduct-a-heuristic-evaluation/" },
    ],
  },
  {
    id: "accessibility-audit",
    title: "Accessibility Audit",
    phase: "Validate",
    context: ["Solo", "Team", "Cross-functional"],
    whenToUse: "When ensuring your product is usable by people with disabilities — both for ethical reasons and legal compliance (WCAG, ADA, EAA).",
    description:
      "An accessibility audit systematically evaluates your product against WCAG guidelines across perceivable, operable, understandable, and robust criteria. For senior designers, accessibility isn't a checklist — it's a design constraint that improves the experience for everyone.",
    effort: "Medium",
    timeEstimate: "1–2 weeks",
    steps: [
      "Define scope: which pages, flows, and states to audit",
      "Run automated scans (axe, Lighthouse) to catch low-hanging fruit",
      "Manual keyboard navigation testing: can every action be completed without a mouse?",
      "Screen reader testing: does the experience make sense auditorily?",
      "Color contrast and text sizing evaluation",
      "Test with assistive technology users if possible",
      "Document findings with WCAG criteria references and severity",
      "Create a remediation roadmap with priorities",
    ],
    artifacts: [
      "Accessibility audit report with WCAG criteria mapping",
      "Automated scan results from axe/Lighthouse",
      "Remediation roadmap with severity and effort estimates",
      "Accessible design patterns documentation for the team",
    ],
    relatedMethods: ["heuristic-evaluation", "usability-testing", "design-system"],
    aiTools: [
      { name: "ChatGPT", description: "Generate WCAG-compliant alternatives for inaccessible patterns", type: "ai" },
      { name: "axe AI", description: "AI-enhanced automated accessibility scanning", type: "ai" },
    ],
    traditionalTools: [
      { name: "axe DevTools", description: "Browser-based automated accessibility testing", type: "traditional" },
      { name: "Figma", description: "Use accessibility plugins to check contrast and reading order", type: "traditional" },
    ],
    resources: [
      { title: "W3C: WCAG 2.2 Quick Reference", url: "https://www.w3.org/WAI/WCAG22/quickref/" },
    ],
  },
  {
    id: "ab-testing",
    title: "A/B Testing",
    phase: "Validate",
    context: ["Team", "Cross-functional"],
    whenToUse: "When you have enough traffic to statistically compare design variations — making data-driven decisions about which design performs better.",
    description:
      "A/B testing compares two or more design variations with real users in production. It provides statistical evidence for design decisions, reducing reliance on opinions and HiPPO (Highest Paid Person's Opinion). Senior designers use it strategically — testing high-impact hypotheses, not random button colors.",
    effort: "Medium",
    timeEstimate: "1–4 weeks (including analysis)",
    steps: [
      "Formulate a clear hypothesis: changing [X] will improve [metric] because [reason]",
      "Define primary and secondary metrics with statistical significance thresholds",
      "Design the variations with minimal differences to isolate the variable",
      "Calculate required sample size for statistical power",
      "Run the test until reaching significance — don't peek and stop early",
      "Analyze results: primary metric, secondary metrics, and segment breakdowns",
      "Document learnings and apply to future design decisions",
    ],
    artifacts: [
      "Test hypothesis document with metrics and success criteria",
      "Design variations with documented differences",
      "Results report with statistical analysis and recommendations",
      "Learning repository entry for organizational knowledge",
    ],
    relatedMethods: ["usability-testing", "concept-testing", "okr-alignment"],
    aiTools: [
      { name: "ChatGPT", description: "Generate test hypotheses and help calculate sample sizes", type: "ai" },
    ],
    traditionalTools: [
      { name: "Optimizely / LaunchDarkly", description: "Feature flagging and A/B test infrastructure", type: "traditional" },
      { name: "Amplitude / Mixpanel", description: "Analyze test results with statistical rigor", type: "traditional" },
    ],
    resources: [
      { title: "NNG: A/B Testing", url: "https://www.nngroup.com/articles/putting-ab-testing-in-its-place/" },
    ],
  },

  // ── Additional ALIGN methods ──
  {
    id: "design-qa",
    title: "Design QA & Handoff",
    phase: "Align",
    context: ["Team", "Cross-functional"],
    whenToUse: "When ensuring the built product matches the designed intent — bridging the gap between design files and production code.",
    description:
      "Design QA is the systematic process of comparing the implemented product against design specifications. For senior designers, this isn't pixel-policing — it's about ensuring the user experience intent survives the build process. Good handoff prevents QA; great QA catches what handoff missed.",
    effort: "Medium",
    timeEstimate: "Ongoing (per feature: 1–3 days)",
    steps: [
      "Create a comprehensive handoff document: specs, interactions, states, edge cases",
      "Review the build against designs at each major milestone, not just at the end",
      "Check responsive behavior across key breakpoints",
      "Verify all interaction states: hover, focus, active, disabled, loading, error, empty",
      "Test content extremes: long names, missing images, empty lists",
      "File issues with clear screenshots comparing expected vs. actual",
      "Work with engineers to understand technical constraints and find compromises",
    ],
    artifacts: [
      "Design QA checklist per feature",
      "Bug reports with annotated comparison screenshots",
      "Design-dev feedback loop documentation",
      "Handoff spec template for future features",
    ],
    relatedMethods: ["hifi-prototyping", "design-system", "accessibility-audit"],
    aiTools: [
      { name: "Figma AI", description: "Auto-generate dev-ready specs and interaction documentation", type: "ai" },
      { name: "ChatGPT", description: "Generate comprehensive QA checklists from design specs", type: "ai" },
    ],
    traditionalTools: [
      { name: "Figma", description: "Dev mode for inspecting designs and extracting specs", type: "traditional" },
      { name: "Storybook", description: "Review implemented components against design", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Design Handoff", url: "https://www.nngroup.com/articles/design-handoff/" },
    ],
  },
  {
    id: "retrospective",
    title: "Design Retrospective",
    phase: "Align",
    context: ["Team", "Cross-functional"],
    whenToUse: "After a major release, sprint, or project — reflecting on what worked, what didn't, and how to improve the design process.",
    description:
      "Design retrospectives focus specifically on the design process, collaboration, and craft quality — not just delivery speed. They're how senior designers evolve team practices, improve cross-functional relationships, and build a culture of continuous improvement.",
    effort: "Low",
    timeEstimate: "1–2 hours",
    steps: [
      "Set the stage: review what was shipped, key decisions made, and timeline",
      "Individual reflection: what went well, what was frustrating, what surprised you?",
      "Share and cluster observations into themes",
      "Identify the top 2-3 improvement areas the team agrees on",
      "Define concrete action items with owners for each improvement",
      "Review action items from previous retros — did we follow through?",
    ],
    artifacts: [
      "Retrospective summary with themes and action items",
      "Process improvement backlog",
      "Updated team working agreements",
    ],
    relatedMethods: ["design-critique", "okr-alignment", "design-principles-workshop"],
    aiTools: [
      { name: "ChatGPT", description: "Generate retro prompts and help synthesize themes from team input", type: "ai" },
    ],
    traditionalTools: [
      { name: "Miro / FigJam", description: "Retro board templates with voting and action tracking", type: "traditional" },
      { name: "Notion / Confluence", description: "Document retro outcomes and track action items", type: "traditional" },
    ],
    resources: [
      { title: "Atlassian: Retrospectives", url: "https://www.atlassian.com/team-playbook/plays/retrospective" },
    ],
  },
];
