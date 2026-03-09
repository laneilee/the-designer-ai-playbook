export type Phase = "Align" | "Discovery" | "Define" | "Design" | "Validate" | "Handoff";
export type Context = "Solo" | "Team" | "Stakeholder" | "Cross-functional";
export type Effort = "Low" | "Medium" | "High";
export type ToolType = "ai" | "traditional";

export interface Tool {
  name: string;
  description: string;
  type: ToolType;
  promptGuide?: string;
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

export const phases: Phase[] = ["Align", "Discovery", "Define", "Design", "Validate", "Handoff"];

export const contexts: Context[] = ["Solo", "Team", "Stakeholder", "Cross-functional"];

export const methods: Method[] = [
  // ── ALIGN ──
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
    relatedMethods: ["prioritization-matrix", "define-success-metrics"],
    aiTools: [
      { name: "ChatGPT", description: "Suggest design metrics that correlate with business OKRs", type: "ai", promptGuide: "Here are our company OKRs: [paste OKRs]. For each, suggest 2-3 design-specific leading metrics that would indicate progress. Format as a table with OKR → Design Metric → How to Measure." },
    ],
    traditionalTools: [
      { name: "Spreadsheets", description: "Track OKR progress and design metrics", type: "traditional" },
      { name: "Notion / Confluence", description: "Document OKR alignment and tracking cadence", type: "traditional" },
    ],
    resources: [
      { title: "What Matters: OKR Guide", url: "https://www.whatmatters.com/faqs/okr-meaning-definition-example" },
    ],
  },

  // ── DISCOVERY ──
  {
    id: "review-previous-research",
    title: "Review Previous Research",
    phase: "Discovery",
    context: ["Solo", "Team"],
    whenToUse: "At the start of any project — before conducting new research, understand what's already been learned to avoid redundant effort and build on existing knowledge.",
    description:
      "A thorough review of prior research ensures you're not re-discovering what the organization already knows. Gather past usability studies, analytics reports, customer feedback, survey results, and prior design explorations. Synthesize findings to identify knowledge gaps that warrant new research.",
    effort: "Low",
    timeEstimate: "1–3 days",
    steps: [
      "Identify all sources of existing research: past studies, analytics, support data, surveys",
      "Gather and organize materials into a central repository",
      "Review each source for key findings, insights, and recommendations",
      "Note what was acted upon and what was shelved",
      "Identify gaps — what questions remain unanswered?",
      "Synthesize into a research landscape document to share with the team",
    ],
    artifacts: [
      "Research landscape summary with key findings from past work",
      "Knowledge gap analysis highlighting unanswered questions",
      "Annotated bibliography of prior research sources",
    ],
    relatedMethods: ["conduct-stakeholder-interviews", "review-competitive-analysis"],
    aiTools: [
      { name: "ChatGPT", description: "Summarize and cross-reference large volumes of past research documents", type: "ai", promptGuide: "I'm uploading [X] past research documents. For each, extract: (1) Key findings, (2) Methodology used, (3) Date conducted, (4) Open questions. Then cross-reference findings across all documents and highlight contradictions or knowledge gaps." },
      { name: "Claude", description: "Analyze and synthesize findings across multiple research reports", type: "ai", promptGuide: "Here are findings from [X] previous research studies. Identify: (1) Recurring themes across studies, (2) Findings that contradict each other, (3) Questions that remain unanswered, (4) Areas where research is outdated (>2 years old)." },
    ],
    traditionalTools: [
      { name: "Notion / Confluence", description: "Central repository for organizing past research", type: "traditional" },
      { name: "Dovetail", description: "Search and resurface insights from previous qualitative studies", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Secondary Research in UX", url: "https://www.nngroup.com/articles/secondary-research-in-ux/" },
    ],
  },
  {
    id: "review-competitive-analysis",
    title: "Review Competitive Analysis",
    phase: "Discovery",
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
    relatedMethods: ["review-previous-research"],
    aiTools: [
      { name: "ChatGPT", description: "Research competitors and generate comparison matrices", type: "ai", promptGuide: "I'm designing a [product type] in the [industry] space. Identify 5 direct competitors and 3 aspirational competitors. For each, analyze: (1) Core value proposition, (2) Key UX patterns they use, (3) Strengths and weaknesses, (4) Unmet user needs they leave open. Present as a comparison matrix." },
      { name: "Perplexity", description: "Deep research on competitor features, positioning, and reviews", type: "ai", promptGuide: "Research [competitor name] product. Find: recent feature launches, user reviews (positive and negative), pricing model, target audience, and any public UX case studies. Include sources." },
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
    id: "conduct-stakeholder-interviews",
    title: "Conduct Stakeholder Interviews",
    phase: "Discovery",
    context: ["Solo", "Stakeholder"],
    whenToUse: "At project kickoff — to understand business goals, constraints, success criteria, and internal perspectives before diving into user research.",
    description:
      "Stakeholder interviews uncover the business context, political landscape, and organizational constraints that shape your design work. They build relationships, surface hidden expectations, and ensure design direction aligns with what the business needs to achieve.",
    effort: "Medium",
    timeEstimate: "1–2 weeks",
    steps: [
      "Identify key stakeholders across functions: product, engineering, marketing, leadership",
      "Prepare an interview guide covering goals, concerns, success metrics, and constraints",
      "Schedule 30-60 minute individual interviews",
      "Conduct interviews — listen for both stated needs and underlying motivations",
      "Document key themes, conflicting perspectives, and shared priorities",
      "Synthesize findings into a stakeholder summary and share back for validation",
    ],
    artifacts: [
      "Stakeholder interview summary with key themes",
      "Business goals and success criteria document",
      "Constraint inventory — technical, business, and organizational",
      "Conflicting perspectives map for resolution",
    ],
    relatedMethods: ["review-stakeholder-mapping", "okr-alignment"],
    aiTools: [
      { name: "Otter.ai", description: "Transcribe stakeholder interviews in real time", type: "ai" },
      { name: "ChatGPT", description: "Generate interview guides and synthesize notes into themes", type: "ai", promptGuide: "I'm interviewing [role] stakeholders for a [project type]. Generate a 45-min interview guide covering: their definition of success, biggest concerns, key constraints, and how they'll measure impact. Include follow-up probes for each question." },
    ],
    traditionalTools: [
      { name: "Google Docs", description: "Collaborative note-taking during interviews", type: "traditional" },
      { name: "Miro / FigJam", description: "Map stakeholder perspectives and themes visually", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Stakeholder Interviews", url: "https://www.nngroup.com/articles/stakeholder-interviews/" },
    ],
  },
  {
    id: "review-stakeholder-mapping",
    title: "Review Stakeholder Mapping",
    phase: "Discovery",
    context: ["Solo", "Stakeholder"],
    whenToUse: "After stakeholder interviews — when you need to understand who has influence, who has concerns, and how to navigate organizational dynamics.",
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
    relatedMethods: ["conduct-stakeholder-interviews", "okr-alignment"],
    aiTools: [
      { name: "ChatGPT", description: "Generate interview guides and synthesize stakeholder notes into profiles", type: "ai", promptGuide: "Based on these stakeholder interview notes [paste notes], create a stakeholder profile for each person including: their role, goals, concerns, influence level, and preferred communication style. Then suggest a RACI matrix for key design decisions." },
    ],
    traditionalTools: [
      { name: "Miro / FigJam", description: "Collaborative stakeholder mapping and relationship diagrams", type: "traditional" },
      { name: "Notion / Confluence", description: "Document stakeholder profiles and communication plans", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Stakeholder Maps", url: "https://www.nngroup.com/articles/stakeholder-interviews/" },
    ],
  },
  {
    id: "conduct-user-interviews",
    title: "Conduct User Interviews",
    phase: "Discovery",
    context: ["Solo", "Team"],
    whenToUse: "When you need deep qualitative understanding of user needs, behaviors, motivations, and pain points directly from the people you're designing for.",
    description:
      "User interviews are the foundation of user-centered design. One-on-one conversations with real users reveal the 'why' behind behaviors, uncover unmet needs, and build empathy. Great interviews go beyond surface-level opinions to understand the context, motivations, and mental models that drive user behavior.",
    effort: "Medium",
    timeEstimate: "1–3 weeks",
    steps: [
      "Define research objectives and key questions to answer",
      "Create a screening criteria and recruit 6-12 representative participants",
      "Write a semi-structured interview guide with open-ended questions",
      "Conduct 45-60 minute interviews — listen more than you speak",
      "Ask follow-up questions: 'Tell me more about that', 'Why?', 'Can you show me?'",
      "Debrief after each session — capture key insights while fresh",
      "Synthesize findings across all interviews into themes and patterns",
    ],
    artifacts: [
      "Interview transcripts and session recordings",
      "Research synthesis with key themes and patterns",
      "Key quotes and user stories for storytelling",
      "Insight statements linked to research evidence",
    ],
    relatedMethods: ["review-previous-research", "synthesize-research", "diary-study"],
    aiTools: [
      { name: "Otter.ai", description: "Real-time transcription of user interviews", type: "ai" },
      { name: "Claude", description: "Analyze interview transcripts to extract themes and patterns", type: "ai", promptGuide: "Here is a transcript from a user interview about [topic]. Extract: (1) Key pain points with direct quotes, (2) Workarounds the user currently uses, (3) Unmet needs (stated and implied), (4) Emotional moments — where did they express frustration or delight? Format each finding as an insight statement." },
    ],
    traditionalTools: [
      { name: "Dovetail", description: "Tag and organize qualitative interview data", type: "traditional" },
      { name: "Zoom / Teams", description: "Conduct and record remote interview sessions", type: "traditional" },
    ],
    resources: [
      { title: "NNG: User Interviews", url: "https://www.nngroup.com/articles/user-interviews/" },
    ],
  },
  {
    id: "diary-study",
    title: "Diary Study",
    phase: "Discovery",
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
    relatedMethods: ["conduct-user-interviews", "review-previous-research", "synthesize-research"],
    aiTools: [
      { name: "ChatGPT", description: "Analyze diary entries at scale to find patterns across participants", type: "ai", promptGuide: "Here are diary entries from [X] participants over [Y] weeks about [topic]. Analyze for: (1) Behavioral patterns that repeat across participants, (2) Changes in behavior over time, (3) Context-dependent variations, (4) Emotional peaks and valleys. Group findings by theme." },
      { name: "Claude", description: "Generate thematic analysis from hundreds of diary entries", type: "ai", promptGuide: "Perform a thematic analysis of these diary entries. For each theme: provide a theme name, description, frequency across participants, representative quotes, and design implications. Highlight any longitudinal trends." },
    ],
    traditionalTools: [
      { name: "dscout", description: "Purpose-built diary study platform with mobile capture", type: "traditional" },
      { name: "Dovetail", description: "Organize and analyze qualitative diary data", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Diary Studies", url: "https://www.nngroup.com/articles/diary-studies/" },
    ],
  },

  // ── DEFINE ──
  {
    id: "synthesize-research",
    title: "Synthesize Research",
    phase: "Define",
    context: ["Solo", "Team"],
    whenToUse: "After completing discovery research — when you need to distill raw data into actionable insights that inform design direction.",
    description:
      "Research synthesis transforms raw research data into structured, actionable insights. Using techniques like affinity mapping, thematic analysis, and insight statements, you move from 'what we observed' to 'what it means' and 'what we should do about it'. This is where research becomes design fuel.",
    effort: "Medium",
    timeEstimate: "3–5 days",
    steps: [
      "Gather all research data: interview notes, survey results, diary entries, analytics",
      "Create individual observations on sticky notes — one insight per note",
      "Cluster observations by natural affinity into themes",
      "Name each cluster with a descriptive theme statement",
      "Write insight statements: 'We learned that [observation] because [reason], which means [implication]'",
      "Prioritize insights by impact and frequency",
      "Create a research synthesis document to share with the team",
    ],
    artifacts: [
      "Affinity diagram with themed clusters",
      "Prioritized insight statements with supporting evidence",
      "Research synthesis presentation for stakeholders",
      "Key personas or behavioral archetypes derived from research",
    ],
    relatedMethods: ["conduct-user-interviews", "problem-framing", "define-success-metrics"],
    aiTools: [
      { name: "ChatGPT", description: "Pre-cluster large datasets and suggest theme labels for review", type: "ai", promptGuide: "Here are [X] research observations from user interviews. Group them into natural clusters by affinity. For each cluster: suggest a descriptive theme name, list the observations that belong to it, and write an insight statement in the format: 'We learned that [observation] because [reason], which means [implication].'" },
      { name: "Claude", description: "Analyze and cross-reference data to find non-obvious connections", type: "ai", promptGuide: "Review these research findings from [interviews/surveys/analytics]. Identify connections that aren't immediately obvious — contradictions between what users say vs. do, patterns that span multiple data sources, and minority findings that might signal emerging needs." },
    ],
    traditionalTools: [
      { name: "Miro / FigJam", description: "Digital sticky notes for affinity mapping", type: "traditional" },
      { name: "Dovetail", description: "Qualitative research analysis and tagging", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Affinity Diagramming", url: "https://www.nngroup.com/articles/affinity-diagram/" },
    ],
  },
  {
    id: "ideation",
    title: "Ideation",
    phase: "Define",
    context: ["Team", "Cross-functional"],
    whenToUse: "When transitioning from research insights to design opportunities — generating a wide range of possible solutions before converging on direction.",
    description:
      "Ideation is the structured generation of ideas to address defined problems. Using techniques like brainstorming, How Might We questions, Crazy 8s, and design studios, the team diverges widely before converging on the most promising directions. The goal is quantity and variety — evaluation comes later.",
    effort: "Low",
    timeEstimate: "2–4 hours",
    steps: [
      "Review research insights and problem statements as a team",
      "Frame the challenge with How Might We questions",
      "Use rapid ideation techniques (Crazy 8s, brainstorming, brainwriting)",
      "Generate as many ideas as possible — no judgment during divergence",
      "Cluster and theme the ideas using affinity mapping",
      "Vote on the most promising directions",
      "Select 2-3 concepts to carry forward for further development",
    ],
    artifacts: [
      "Ideation output: sketches, sticky notes, concept descriptions",
      "Clustered themes with voting results",
      "Selected concept directions with rationale",
    ],
    relatedMethods: ["synthesize-research", "problem-framing", "lofi-vibe-coding"],
    aiTools: [
      { name: "ChatGPT", description: "Generate concept variations and 'what if' prompts to push thinking further", type: "ai", promptGuide: "We're ideating solutions for this problem: [problem statement]. Generate 10 'How Might We' questions that reframe the problem from different angles. Then for each HMW, suggest 3 wildly different solution concepts — one conventional, one ambitious, and one that breaks assumptions." },
      { name: "Claude", description: "Challenge assumptions and suggest alternative approaches", type: "ai", promptGuide: "Here are our current solution concepts for [problem]: [list concepts]. For each, identify the underlying assumptions. Then suggest 3 alternative approaches we haven't considered — specifically ones that challenge our biggest assumptions." },
    ],
    traditionalTools: [
      { name: "Miro / FigJam", description: "Digital whiteboard for remote ideation and voting", type: "traditional" },
      { name: "Sticky notes", description: "Physical or digital sticky notes for brainstorming", type: "traditional" },
    ],
    resources: [
      { title: "IDEO: Brainstorming Rules", url: "https://www.ideou.com/pages/brainstorming-rules" },
    ],
  },
  {
    id: "problem-framing",
    title: "Conduct Problem Framing Session",
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
    relatedMethods: ["synthesize-research", "define-success-metrics", "ideation"],
    aiTools: [
      { name: "Claude", description: "Challenge problem framing by generating alternative perspectives and reframes", type: "ai", promptGuide: "Here's our current problem statement: [statement]. Challenge this framing: (1) What if we're solving the wrong problem? Suggest 3 alternative framings. (2) Apply the '5 Whys' to find the root cause. (3) Rewrite the problem from the user's, business's, and engineer's perspective." },
      { name: "ChatGPT", description: "Apply '5 Whys' analysis and generate problem statement variations", type: "ai", promptGuide: "Our design problem is: [describe problem]. Apply the 5 Whys technique to dig deeper. Then generate 5 different problem statement variations using the format: '[User type] needs [need] because [insight]. We'll know we've succeeded when [measurable outcome].'" },
    ],
    traditionalTools: [
      { name: "Miro / FigJam", description: "Collaborative problem framing workshop facilitation", type: "traditional" },
      { name: "Google Docs", description: "Draft and iterate on problem statements with stakeholders", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Problem Statements", url: "https://www.nngroup.com/articles/problem-statements/" },
    ],
  },
  {
    id: "define-success-metrics",
    title: "Define Success Metrics and Hypotheses",
    phase: "Define",
    context: ["Team", "Stakeholder", "Cross-functional"],
    whenToUse: "Before moving to design — when you need clear, measurable criteria for success and testable hypotheses to validate your design direction.",
    description:
      "Defining success metrics and hypotheses ensures the team agrees on what 'done well' looks like before building anything. Hypotheses make your assumptions explicit and testable, while metrics create accountability. This method bridges research insights and design action with measurable outcomes.",
    effort: "Medium",
    timeEstimate: "1–2 days",
    steps: [
      "Review problem statements and research insights",
      "Define primary success metrics: what user behavior change indicates success?",
      "Define secondary metrics: leading indicators and guardrail metrics",
      "Write design hypotheses: 'We believe [change] will [outcome] because [evidence]'",
      "Map each hypothesis to the metric it will move",
      "Define how and when you'll measure each metric",
      "Align with stakeholders on targets and acceptable ranges",
    ],
    artifacts: [
      "Success metrics framework with primary, secondary, and guardrail metrics",
      "Design hypotheses linked to research evidence",
      "Measurement plan with tools and timelines",
      "Stakeholder-approved success criteria",
    ],
    relatedMethods: ["problem-framing", "okr-alignment", "concept-testing"],
    aiTools: [
      { name: "ChatGPT", description: "Generate hypothesis variations and suggest relevant metrics for design outcomes", type: "ai", promptGuide: "Our design problem is [problem] and our proposed solution is [solution]. Generate 5 testable design hypotheses in the format: 'We believe [change] will [outcome] for [user segment] because [evidence].' For each, suggest a primary metric, a leading indicator, and a guardrail metric." },
    ],
    traditionalTools: [
      { name: "Spreadsheets", description: "Build metrics tracking frameworks", type: "traditional" },
      { name: "Notion / Confluence", description: "Document hypotheses and measurement plans", type: "traditional" },
    ],
    resources: [
      { title: "NNG: UX Metrics", url: "https://www.nngroup.com/articles/usability-metrics/" },
    ],
  },

  // ── DESIGN ──
  {
    id: "define-interaction-model",
    title: "Define Interaction Model and IA",
    phase: "Design",
    context: ["Solo", "Team"],
    whenToUse: "When establishing the structural foundation of the product — how information is organized, how users navigate, and how interactions work.",
    description:
      "The interaction model and information architecture define how users think about, find, and interact with content and features. This foundational work determines navigation patterns, content hierarchy, and the mental model users need to develop. Get this wrong and no amount of visual polish will save the experience.",
    effort: "Medium",
    timeEstimate: "3–5 days",
    steps: [
      "Conduct a content inventory of all information and features",
      "Run card sorting sessions to understand user mental models",
      "Define the information architecture: hierarchy, categories, and navigation structure",
      "Map key user flows and interaction patterns",
      "Create a sitemap showing the overall structure",
      "Define interaction patterns: how users move between sections, complete tasks, and recover from errors",
      "Validate the IA with tree testing or first-click testing",
    ],
    artifacts: [
      "Information architecture diagram / sitemap",
      "Navigation model with defined patterns",
      "User flow diagrams for key tasks",
      "Interaction pattern library for the product",
    ],
    relatedMethods: ["lofi-vibe-coding", "create-lofi-concepts"],
    aiTools: [
      { name: "ChatGPT", description: "Generate IA structure suggestions from content inventories", type: "ai", promptGuide: "Here's a content inventory for our [product type]: [list features/content]. Suggest 3 different information architecture structures. For each: show the hierarchy, explain the organizing principle (task-based, audience-based, topic-based), and identify potential navigation challenges." },
      { name: "Claude", description: "Analyze user flows for complexity and suggest simplifications", type: "ai", promptGuide: "Here's a user flow for [task]: [describe steps]. Analyze it for: (1) Unnecessary steps that could be removed, (2) Decision points that could be simplified, (3) Points where users might get lost. Suggest a simplified alternative flow." },
    ],
    traditionalTools: [
      { name: "Figma", description: "Create sitemaps, flow diagrams, and IA documentation", type: "traditional" },
      { name: "Optimal Workshop", description: "Run card sorting and tree testing studies", type: "traditional" },
    ],
    resources: [
      { title: "NNG: IA 101", url: "https://www.nngroup.com/articles/ia-101/" },
    ],
  },
  {
    id: "lofi-vibe-coding",
    title: "Build Low-Fidelity Prototypes with Vibe Coding",
    phase: "Design",
    context: ["Solo", "Team"],
    whenToUse: "When you need to quickly test structure, flow, and concept viability — using AI-powered coding tools to generate functional prototypes from descriptions.",
    description:
      "Vibe coding leverages AI tools like Lovable, v0, and Cursor to generate functional prototypes from natural language descriptions. Instead of spending days in Figma, describe what you want and iterate in minutes. The result is a real, interactive prototype — not a static mockup — enabling faster testing and more realistic user feedback.",
    effort: "Low",
    timeEstimate: "1–3 days",
    steps: [
      "Define the key user flows to prototype (2-3 max for a single round)",
      "Write clear descriptions of each screen: layout, content, interactions",
      "Use AI coding tools to generate the initial prototype from descriptions",
      "Iterate by refining prompts and adjusting the output",
      "Keep fidelity intentionally low: focus on structure and flow, not visual polish",
      "Add just enough interactivity to simulate the core task flow",
      "Prepare test scenarios for validation with users",
    ],
    artifacts: [
      "Functional low-fidelity prototype with key user flows",
      "Task scenarios for usability testing",
      "Iteration log showing prompt-to-output evolution",
    ],
    relatedMethods: ["define-interaction-model", "create-lofi-concepts", "concept-testing"],
    aiTools: [
      { name: "Lovable", description: "Build interactive prototypes from natural language descriptions", type: "ai", promptGuide: "Build a low-fidelity prototype for [product type]. The main flow is: [describe user journey]. Include these screens: [list screens]. Keep the design minimal — focus on layout and flow, not visual polish. Use placeholder content." },
      { name: "v0 by Vercel", description: "Generate UI components and pages from text descriptions", type: "ai", promptGuide: "Create a [component type] that [describe functionality]. It should have [list key elements]. Style it minimally — this is for concept validation, not production." },
      { name: "Cursor / Copilot", description: "AI-assisted coding for rapid prototype iteration", type: "ai", promptGuide: "I have a prototype with [describe current state]. Modify it to: [describe changes]. Keep the code simple — this is a throwaway prototype for user testing, not production code." },
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
    id: "create-lofi-concepts",
    title: "Create Multiple Lo-Fi Concepts",
    phase: "Design",
    context: ["Solo", "Team"],
    whenToUse: "When you need to explore multiple design directions before committing — generating divergent concepts to compare and evaluate with the team.",
    description:
      "Creating multiple lo-fi concepts forces you past your first idea and explores the solution space more broadly. By generating 3-5 distinct approaches, you can compare tradeoffs, combine the best elements, and make more informed design decisions. Rough is the point — it invites critique and iteration.",
    effort: "Low",
    timeEstimate: "2–4 days",
    steps: [
      "Review the IA, interaction model, and key design constraints",
      "Generate 3-5 distinct concept directions — each taking a different approach",
      "Keep fidelity low: wireframes, sketches, or rough mockups",
      "Document the design rationale for each concept: what tradeoffs does it make?",
      "Present concepts to the team for structured feedback",
      "Select the strongest direction or combine elements from multiple concepts",
    ],
    artifacts: [
      "3-5 lo-fi concept directions with design rationale",
      "Comparison matrix showing tradeoffs between concepts",
      "Selected direction with rationale for the decision",
    ],
    relatedMethods: ["lofi-vibe-coding", "design-critique", "define-interaction-model"],
    aiTools: [
      { name: "Midjourney / DALL-E", description: "Rapidly visualize concept directions as mood references", type: "ai", promptGuide: "Generate a UI concept for a [product type] that feels [tone/mood]. Show [key screen or feature]. Style: [design direction, e.g., minimal, bold, playful]. Use as mood reference, not final design." },
      { name: "Lovable", description: "Generate distinct functional concept prototypes from descriptions", type: "ai", promptGuide: "Create concept [A/B/C] for [product]. This version takes the approach of [describe approach]. Key differentiator from other concepts: [what makes this direction unique]. Include [key screens]." },
    ],
    traditionalTools: [
      { name: "Figma", description: "Create wireframe concept variations", type: "traditional" },
      { name: "Paper & pen", description: "Quick sketching for early concept exploration", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Parallel Design", url: "https://www.nngroup.com/articles/parallel-and-iterative-design/" },
    ],
  },
  {
    id: "design-critique",
    title: "Design Critique",
    phase: "Design",
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
    relatedMethods: ["create-lofi-concepts", "design-system-review", "hifi-designs"],
    aiTools: [
      { name: "ChatGPT", description: "Pre-review designs for common UX heuristic violations", type: "ai", promptGuide: "Review this design [describe or attach screenshot] against Nielsen's 10 usability heuristics. For each heuristic: rate compliance (pass/warning/fail), explain your reasoning, and suggest a fix for any issues found." },
      { name: "Claude", description: "Generate structured feedback questions based on design objectives", type: "ai", promptGuide: "We're critiquing a design for [feature]. The design objectives are: [list objectives]. Generate 10 specific critique questions that will surface the most valuable feedback. Organize by: effectiveness, usability, visual design, and edge cases." },
    ],
    traditionalTools: [
      { name: "Figma", description: "Comment directly on designs during critique", type: "traditional" },
      { name: "Miro / FigJam", description: "Structured feedback templates for remote critiques", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Design Critiques", url: "https://www.nngroup.com/articles/design-critiques/" },
    ],
  },
  {
    id: "design-system-review",
    title: "Design System Review",
    phase: "Design",
    context: ["Team", "Cross-functional"],
    whenToUse: "When scaling design across the product — reviewing and evolving the design system to ensure consistency, efficiency, and quality.",
    description:
      "A design system review evaluates the current state of your component library, design tokens, and patterns against actual product needs. It identifies gaps, inconsistencies, and opportunities for new shared components. Regular reviews keep the design system alive and relevant rather than becoming shelfware.",
    effort: "Medium",
    timeEstimate: "2–3 days",
    steps: [
      "Audit existing UI patterns: catalog every component and pattern in active use",
      "Identify inconsistencies, duplications, and one-off patterns",
      "Compare current components against design needs for upcoming work",
      "Evaluate design tokens: colors, typography, spacing, elevation",
      "Review component documentation and usage guidelines",
      "Propose additions, updates, or deprecations to the system",
      "Plan implementation with engineering partners",
    ],
    artifacts: [
      "Design system audit report with findings",
      "Component gap analysis for upcoming needs",
      "Proposed system updates with rationale",
      "Updated design tokens and pattern documentation",
    ],
    relatedMethods: ["design-critique", "accessibility-review", "hifi-designs"],
    aiTools: [
      { name: "Figma AI", description: "Auto-detect inconsistencies and generate component variants", type: "ai" },
      { name: "ChatGPT", description: "Draft component usage guidelines and documentation", type: "ai", promptGuide: "I have a [component name] with these variants: [list variants]. Write usage guidelines covering: when to use each variant, dos and don'ts, accessibility requirements, and content guidelines. Format for a design system documentation page." },
    ],
    traditionalTools: [
      { name: "Figma", description: "Build and maintain the component library with variants", type: "traditional" },
      { name: "Storybook", description: "Document and test coded components in isolation", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Design Systems 101", url: "https://www.nngroup.com/articles/design-systems-101/" },
    ],
  },
  {
    id: "accessibility-review",
    title: "Accessibility and Inclusive Design Review",
    phase: "Design",
    context: ["Solo", "Team", "Cross-functional"],
    whenToUse: "Before finalizing designs — ensuring the product is usable by people with disabilities and follows inclusive design principles.",
    description:
      "An accessibility and inclusive design review evaluates designs against WCAG guidelines and inclusive design principles. For senior designers, accessibility isn't a checklist at the end — it's a design constraint integrated throughout the process that improves the experience for everyone.",
    effort: "Medium",
    timeEstimate: "2–3 days",
    steps: [
      "Review designs for color contrast compliance (WCAG AA minimum)",
      "Evaluate text sizing, spacing, and readability across contexts",
      "Check that all interactive elements have clear focus states and are keyboard accessible",
      "Verify information isn't conveyed through color alone",
      "Review content for plain language and cognitive accessibility",
      "Test designs with assistive technology considerations in mind",
      "Document accessibility specifications for development",
    ],
    artifacts: [
      "Accessibility review report with WCAG criteria mapping",
      "Annotated designs with accessibility specifications",
      "Inclusive design recommendations",
      "Accessibility documentation for developer handoff",
    ],
    relatedMethods: ["design-system-review", "design-critique", "hifi-designs"],
    aiTools: [
      { name: "ChatGPT", description: "Generate WCAG-compliant alternatives for inaccessible patterns", type: "ai", promptGuide: "This UI pattern [describe pattern] fails WCAG [criterion]. Suggest 3 alternative implementations that meet WCAG AA compliance while preserving the design intent. Include: the fix, why it works, and any tradeoffs." },
      { name: "axe AI", description: "AI-enhanced accessibility evaluation of design patterns", type: "ai" },
    ],
    traditionalTools: [
      { name: "Figma", description: "Use accessibility plugins to check contrast and reading order", type: "traditional" },
      { name: "axe DevTools", description: "Browser-based automated accessibility testing", type: "traditional" },
    ],
    resources: [
      { title: "W3C: WCAG 2.2 Quick Reference", url: "https://www.w3.org/WAI/WCAG22/quickref/" },
    ],
  },
  {
    id: "hifi-designs",
    title: "Create High-Fidelity Designs",
    phase: "Design",
    context: ["Solo", "Team"],
    whenToUse: "When the concept direction is validated and it's time to apply final visual design, content, and interaction details before development.",
    description:
      "High-fidelity designs are the definitive reference for what gets built. They apply the visual design system, real content, micro-interactions, and edge case handling to validated concepts. AI coding tools now make it possible to generate functional high-fi prototypes for testing at unprecedented speed.",
    effort: "High",
    timeEstimate: "1–2 weeks",
    steps: [
      "Apply the visual design system to validated wireframes and concepts",
      "Replace placeholder content with real or realistic content",
      "Design micro-interactions, transitions, and loading states",
      "Handle edge cases: empty states, errors, long content, offline scenarios",
      "Design for responsive behavior across key breakpoints",
      "Create interaction specifications and redlines for development",
      "Conduct a final design review before handoff",
    ],
    artifacts: [
      "High-fidelity design files with complete user flows",
      "Responsive designs across key breakpoints",
      "Interaction and animation specifications",
      "Edge case designs: empty, error, loading, and extreme content states",
    ],
    relatedMethods: ["design-system-review", "accessibility-review", "design-qa"],
    aiTools: [
      { name: "Lovable", description: "Generate full functional prototypes from designs or descriptions", type: "ai", promptGuide: "Build a high-fidelity version of [feature/flow]. Use this design system: [describe tokens, colors, typography]. Include these states: default, loading, empty, error, and success. Make it responsive for desktop and mobile." },
      { name: "Cursor / Copilot", description: "AI-assisted coding for interactive prototype features", type: "ai", promptGuide: "Add [interaction type] to this component. It should: [describe behavior]. Include transitions with [timing] easing. Handle edge cases: [list edge cases]. Follow the existing code patterns." },
    ],
    traditionalTools: [
      { name: "Figma", description: "Advanced design with variables, auto-layout, and prototyping", type: "traditional" },
      { name: "Framer", description: "Code-backed prototypes with real data and interactions", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Prototyping", url: "https://www.nngroup.com/articles/prototyping/" },
    ],
  },

  // ── VALIDATE ──
  {
    id: "concept-testing",
    title: "Conduct Concept Testing",
    phase: "Validate",
    context: ["Team", "Stakeholder"],
    whenToUse: "When evaluating design concepts with real users — do they understand it, want it, and see value in it?",
    description:
      "Concept testing evaluates whether your design resonates with users before investing in full development. It tests comprehension, appeal, and perceived value through moderated or unmoderated sessions. Present prototypes or concepts and measure user reactions, task success, and feedback to validate your direction.",
    effort: "Medium",
    timeEstimate: "3–5 days",
    steps: [
      "Define what you're testing: comprehension, appeal, usability, or all three",
      "Prepare test stimuli: prototypes, storyboards, or interactive demos",
      "Write a test script with realistic task scenarios and discussion questions",
      "Recruit 5-8 representative participants",
      "Conduct sessions — observe behavior first, then ask questions",
      "Use both qualitative (reactions, quotes) and quantitative (task success, ratings) measures",
      "Analyze findings and create a go/iterate/stop recommendation",
    ],
    artifacts: [
      "Concept test results with task success rates and satisfaction scores",
      "Qualitative feedback themes and key quotes",
      "Usability issues with severity ratings",
      "Go/iterate/stop recommendation with rationale",
    ],
    relatedMethods: ["lofi-vibe-coding", "hifi-designs", "define-success-metrics"],
    aiTools: [
      { name: "Otter.ai", description: "Transcribe testing sessions in real time", type: "ai" },
      { name: "Claude", description: "Analyze session transcripts and generate usability finding reports", type: "ai", promptGuide: "Here is a transcript from a concept test session. The user was testing [describe concept] with tasks: [list tasks]. Extract: (1) Task success/failure with reasoning, (2) Comprehension issues, (3) Moments of delight or confusion with quotes, (4) Suggested design changes. Rate each finding by severity." },
    ],
    traditionalTools: [
      { name: "Maze", description: "Run unmoderated concept and usability tests at scale", type: "traditional" },
      { name: "Lookback / UserTesting", description: "Conduct moderated remote testing sessions", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Concept Testing", url: "https://www.nngroup.com/articles/concept-testing/" },
    ],
  },

  // ── HANDOFF ──
  {
    id: "design-qa",
    title: "Design QA & Handoff",
    phase: "Handoff",
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
    relatedMethods: ["component-documentation", "design-specs", "hifi-designs"],
    aiTools: [
      { name: "Figma AI", description: "Auto-generate dev-ready specs and interaction documentation", type: "ai" },
      { name: "ChatGPT", description: "Generate comprehensive QA checklists from design specs", type: "ai", promptGuide: "Generate a design QA checklist for [feature name]. Include checks for: visual accuracy, interaction states (hover, focus, active, disabled, loading, error, empty), responsive behavior, content edge cases (long text, missing data), and accessibility. Format as a checkable list." },
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
    id: "component-documentation",
    title: "Create Component Documentation",
    phase: "Handoff",
    context: ["Solo", "Team"],
    whenToUse: "When developers need clear specifications for building design system components — documenting behavior, states, variants, and usage guidelines.",
    description:
      "Component documentation bridges design and development by providing detailed specifications for every component: behavior, states, variants, accessibility requirements, and usage guidelines. Well-documented components reduce implementation questions and ensure consistency across the product.",
    effort: "Medium",
    timeEstimate: "1–2 weeks",
    steps: [
      "Inventory all components that need documentation",
      "For each component, document: purpose, variants, states, and responsive behavior",
      "Specify interaction behavior: click, hover, focus, keyboard navigation",
      "Define accessibility requirements: ARIA labels, roles, keyboard support",
      "Include dos and don'ts with visual examples",
      "Add code-ready design tokens: spacing, colors, typography references",
      "Review documentation with engineering leads for completeness",
    ],
    artifacts: [
      "Component specification sheets with all variants and states",
      "Usage guidelines with dos and don'ts",
      "Accessibility specification per component",
      "Design token mapping for development",
    ],
    relatedMethods: ["design-qa", "design-system-review", "design-specs"],
    aiTools: [
      { name: "ChatGPT", description: "Generate component documentation drafts from design files", type: "ai", promptGuide: "Document this component: [component name]. It has these variants: [list]. For each variant, describe: purpose, visual appearance, interaction behavior, states, accessibility requirements (ARIA labels, keyboard), and usage dos/don'ts. Include design token references." },
      { name: "Figma AI", description: "Auto-generate component specs and variant documentation", type: "ai" },
    ],
    traditionalTools: [
      { name: "Figma", description: "Create component documentation pages with annotations", type: "traditional" },
      { name: "Storybook", description: "Interactive component documentation with live examples", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Design Systems Documentation", url: "https://www.nngroup.com/articles/design-systems-101/" },
    ],
  },
  {
    id: "design-specs",
    title: "Finalize Design Specifications",
    phase: "Handoff",
    context: ["Solo", "Team"],
    whenToUse: "Before development begins — creating comprehensive, unambiguous specifications that answer every question developers will have.",
    description:
      "Final design specifications are the definitive reference for development. They include pixel-perfect redlines, interaction behaviors, animation timing, responsive rules, and edge case handling. Great specs prevent implementation misinterpretation and reduce design-dev ping-pong during build.",
    effort: "Medium",
    timeEstimate: "3–5 days",
    steps: [
      "Review all designs for completeness: every state, every edge case, every breakpoint",
      "Create redline annotations for spacing, sizing, and alignment",
      "Document all interaction behaviors with timing and easing specifications",
      "Specify responsive behavior rules: what adapts, what reflows, what hides",
      "Include content guidelines: character limits, truncation rules, fallback content",
      "Create a developer walkthrough document for complex flows",
      "Handoff via Figma dev mode or dedicated specification tool",
    ],
    artifacts: [
      "Annotated design files with redlines and specifications",
      "Interaction specification document with timing and easing",
      "Responsive behavior rules per component and layout",
      "Developer walkthrough for complex features",
    ],
    relatedMethods: ["design-qa", "component-documentation", "hifi-designs"],
    aiTools: [
      { name: "Figma AI", description: "Auto-generate redlines and responsive specifications", type: "ai" },
      { name: "ChatGPT", description: "Draft developer walkthrough documents from design descriptions", type: "ai", promptGuide: "Write a developer walkthrough for [feature]. Describe: (1) The user flow step by step, (2) Key interaction behaviors with timing, (3) Responsive rules per breakpoint, (4) Content rules (character limits, truncation, fallbacks), (5) Edge cases to handle. Write for a frontend developer audience." },
    ],
    traditionalTools: [
      { name: "Figma", description: "Dev mode for precise specification inspection", type: "traditional" },
      { name: "Zeplin", description: "Design handoff with auto-generated specs and style guides", type: "traditional" },
    ],
    resources: [
      { title: "NNG: Design Handoff", url: "https://www.nngroup.com/articles/design-handoff/" },
    ],
  },
  {
    id: "post-launch-performance",
    title: "Evaluate Post-Launch Performance",
    phase: "Handoff",
    context: ["Team", "Cross-functional"],
    whenToUse: "After launch — measuring whether the design achieved its intended outcomes and identifying opportunities for iteration.",
    description:
      "Post-launch evaluation closes the design loop by measuring actual outcomes against the success metrics and hypotheses defined earlier. It validates whether design decisions had the intended impact, identifies unexpected consequences, and surfaces insights for the next iteration cycle.",
    effort: "Medium",
    timeEstimate: "1–2 weeks",
    steps: [
      "Review the success metrics and hypotheses defined during the Define phase",
      "Gather quantitative data: analytics, conversion rates, task completion rates",
      "Gather qualitative data: user feedback, support tickets, session recordings",
      "Compare actual results against targets and hypotheses",
      "Identify what worked as expected, what surprised you, and what underperformed",
      "Document learnings and recommendations for the next iteration",
      "Present findings to stakeholders with clear next steps",
    ],
    artifacts: [
      "Post-launch performance report with metrics vs. targets",
      "Hypothesis validation summary: confirmed, invalidated, or inconclusive",
      "Qualitative feedback synthesis",
      "Recommendations for next iteration priorities",
    ],
    relatedMethods: ["define-success-metrics", "design-retrospective", "okr-alignment"],
    aiTools: [
      { name: "ChatGPT", description: "Analyze user feedback at scale and identify sentiment patterns", type: "ai", promptGuide: "Analyze these [X] pieces of user feedback collected after launching [feature]. Categorize by: sentiment (positive/negative/neutral), theme, and frequency. Highlight the top 5 issues and top 3 praise points. Suggest which findings warrant immediate action vs. next iteration." },
      { name: "Claude", description: "Generate comprehensive performance reports from analytics data", type: "ai", promptGuide: "Here are our post-launch metrics for [feature]: [paste data]. Our targets were: [list targets]. Generate a performance report covering: metrics vs. targets, hypothesis validation, unexpected findings, and recommended next steps. Include a summary suitable for stakeholder presentation." },
    ],
    traditionalTools: [
      { name: "Amplitude / Mixpanel", description: "Analyze user behavior and conversion funnels", type: "traditional" },
      { name: "Hotjar / FullStory", description: "Session recordings and heatmaps for qualitative insights", type: "traditional" },
    ],
    resources: [
      { title: "NNG: UX Metrics", url: "https://www.nngroup.com/articles/usability-metrics/" },
    ],
  },
  {
    id: "design-retrospective",
    title: "Design Retrospective",
    phase: "Handoff",
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
    relatedMethods: ["post-launch-performance", "design-qa", "okr-alignment"],
    aiTools: [
      { name: "ChatGPT", description: "Generate retro prompts and help synthesize themes from team input", type: "ai", promptGuide: "We just shipped [feature/project]. Generate 8 retrospective prompts that go beyond 'what went well / what didn't.' Focus on: design process, cross-functional collaboration, decision quality, and craft. Then after the retro, help us synthesize [paste team input] into themes and concrete action items." },
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
