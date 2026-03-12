export interface PersonaPrompt {
  id: string;
  persona: string;
  subtitle: string;
  description: string;
  prompt: string;
  tools: string[]; // tool names this prompt applies to
  tags: string[];
}

export const personaPrompts: PersonaPrompt[] = [
  // ── UI/UX Pattern Master ──
  {
    id: "pattern-master-full-ui",
    persona: "The UI/UX Pattern Master",
    subtitle: "End-to-end interface design with enterprise rigor",
    description: "When you need a complete, production-ready interface system — screens, states, components, and micro-interactions — all in one go.",
    prompt: `Act as a senior product designer at an enterprise company. Design a complete user interface for [your app/platform], tailored for [persona] with the specific goal of [goal].

Follow the [design system / brand guide] principles throughout.

Deliver:
• 8 key screens as detailed wireframes
• Component inventory: buttons, forms, cards, navigation, modals
• Interaction states for every component: default, hover, active, focused, disabled
• System states: empty, loading, error, success, partial data
• Micro-interactions: transitions, feedback animations, progress indicators
• Responsive behaviors: desktop → tablet → mobile breakpoints

Include designer's notes explaining key decisions, trade-offs, and rationale for pattern choices.`,
    tools: ["ChatGPT", "Claude"],
    tags: ["UI Design", "Wireframes", "Components"],
  },
  {
    id: "pattern-master-audit",
    persona: "The UI/UX Pattern Master",
    subtitle: "Audit existing interfaces for consistency gaps",
    description: "When you need to evaluate an existing product for pattern inconsistencies, accessibility gaps, and interaction debt.",
    prompt: `Act as a senior UX auditor reviewing an enterprise product. I'll share screenshots/descriptions of [app/feature].

Perform a comprehensive UI pattern audit:
1. Identify inconsistent component usage across screens
2. Flag missing interaction states (hover, error, empty, loading)
3. Evaluate information hierarchy and visual weight distribution
4. Check for accessibility anti-patterns (contrast, touch targets, focus order)
5. Note responsive design gaps or breakpoint issues
6. Suggest a prioritized remediation plan with quick wins vs. structural fixes

Format as an actionable audit report with severity ratings (Critical / Major / Minor).`,
    tools: ["ChatGPT", "Claude"],
    tags: ["Audit", "QA", "Accessibility"],
  },

  // ── The Figma Auto-Layout Expert ──
  {
    id: "figma-autolayout-system",
    persona: "The Figma Auto-Layout Expert",
    subtitle: "Build scalable, responsive Figma layouts from scratch",
    description: "When you need guidance on structuring complex auto-layout hierarchies that scale across breakpoints and content variability.",
    prompt: `Act as a Figma power-user and auto-layout specialist. I'm building a [component/page type] that needs to handle dynamic content.

Help me plan the auto-layout architecture:
1. Define the nesting hierarchy (which frames wrap which)
2. Specify fill/hug/fixed for each layer at each breakpoint
3. Set spacing tokens: gap, padding, margin equivalents
4. Handle edge cases: long text truncation, missing images, variable-length lists
5. Set up constraints for elements that break out of auto-layout (absolute positioned overlays, badges)
6. Recommend component variants needed for responsive behavior

Output as a structured layer tree with auto-layout settings at each level.`,
    tools: ["Figma", "Figma AI"],
    tags: ["Figma", "Layout", "Responsive"],
  },
  {
    id: "figma-autolayout-migration",
    persona: "The Figma Auto-Layout Expert",
    subtitle: "Migrate legacy Figma files to modern auto-layout",
    description: "When inheriting messy Figma files with absolute positioning that need to be converted to maintainable auto-layout structures.",
    prompt: `Act as a Figma consultant brought in to refactor legacy design files. The current file uses mostly absolute positioning and manual spacing.

Create a migration plan:
1. Audit current structure — identify which frames can be converted to auto-layout
2. Define a spacing scale (4px base grid) to replace arbitrary values
3. Prioritize: start with atomic components, then molecules, then page layouts
4. For each component type, describe the target auto-layout setup
5. Flag components that genuinely need absolute positioning vs. those that don't
6. Suggest naming conventions for layers that communicate layout intent

Include before/after structural diagrams for 3 example components.`,
    tools: ["Figma"],
    tags: ["Figma", "Refactoring", "Migration"],
  },

  // ── The Design System Architect ──
  {
    id: "design-system-foundation",
    persona: "The Design System Architect",
    subtitle: "Define a design system from token foundations to components",
    description: "When you're starting a design system from scratch and need a structured approach from primitives to complex patterns.",
    prompt: `Act as a design systems lead building a system for a [industry/product type] company with [X] designers and [Y] engineers.

Define the complete architecture:

**Foundations:**
• Color system: primitives → semantic tokens → component tokens (light + dark)
• Typography scale: type ramp, line heights, font stacks, responsive sizes
• Spacing scale: base unit, scale multiplier, layout vs. component spacing
• Elevation/shadow scale: levels 0–5 with use-case mapping
• Border radius tokens: from sharp to pill, semantic names
• Motion tokens: duration, easing curves, choreography principles

**Component taxonomy:**
• Atoms: Button, Input, Badge, Avatar, Icon, Toggle
• Molecules: Form Field, Card, List Item, Toast, Menu Item
• Organisms: Navigation, Data Table, Modal, Command Palette

For each component, define: variants, sizes, states, accessibility requirements, and content guidelines.`,
    tools: ["ChatGPT", "Claude"],
    tags: ["Design System", "Tokens", "Architecture"],
  },
  {
    id: "design-system-governance",
    persona: "The Design System Architect",
    subtitle: "Establish governance and contribution workflows",
    description: "When your design system exists but lacks process — contributions are ad-hoc, adoption is inconsistent, and there's no clear ownership.",
    prompt: `Act as a design systems program manager. Our system has [X] components but adoption is inconsistent and contributions are unstructured.

Design a governance framework:
1. **Contribution model**: How do designers/engineers propose new components or changes?
2. **Review process**: Who reviews? What criteria? SLA for decisions?
3. **Versioning strategy**: How do we communicate breaking vs. non-breaking changes?
4. **Adoption metrics**: What do we track? Component coverage, override frequency, design-to-code consistency
5. **Documentation standards**: What must every component page include?
6. **Deprecation process**: How do we sunset components without breaking products?

Include templates for: component proposal, design review checklist, release notes, and adoption scorecard.`,
    tools: ["ChatGPT", "Claude", "Notion / Confluence"],
    tags: ["Design System", "Governance", "Process"],
  },

  // ── The Research Synthesizer ──
  {
    id: "research-synthesizer-interview",
    persona: "The Research Synthesizer",
    subtitle: "Extract structured insights from user interviews",
    description: "When you've completed multiple user interviews and need to rapidly synthesize findings into actionable themes.",
    prompt: `Act as a senior UX researcher synthesizing findings from [X] user interviews about [topic/feature].

I'll share the transcripts/notes. For each interview, extract:
1. **Key quotes** — verbatim statements that capture user sentiment
2. **Pain points** — specific frustrations with current experience
3. **Workarounds** — how users currently solve the problem
4. **Unmet needs** — desires they expressed or implied
5. **Mental models** — how they think about the problem space

Then synthesize across all interviews:
• Affinity-mapped themes ranked by frequency and severity
• Persona patterns: are there distinct user segments emerging?
• Opportunity areas: where is the biggest gap between expectation and reality?
• Recommended next steps: what to explore further vs. act on immediately

Format as a stakeholder-ready research readout.`,
    tools: ["ChatGPT", "Claude", "Dovetail", "Otter.ai"],
    tags: ["Research", "Synthesis", "Interviews"],
  },

  // ── The Accessibility Champion ──
  {
    id: "a11y-champion-audit",
    persona: "The Accessibility Champion",
    subtitle: "Comprehensive accessibility evaluation and remediation plan",
    description: "When you need to evaluate a product against WCAG standards and create a prioritized fix plan.",
    prompt: `Act as a WCAG 2.2 AA accessibility specialist auditing [app/feature]. I'll share screenshots and describe interactions.

Evaluate against these categories:
1. **Perceivable**: Color contrast ratios, text alternatives, media captions, content structure
2. **Operable**: Keyboard navigation, focus management, touch targets (44×44px min), motion preferences
3. **Understandable**: Error messaging, form labels, consistent navigation, reading level
4. **Robust**: Semantic HTML, ARIA usage, screen reader compatibility

For each finding:
• Severity: Critical (blocks users) / Major (degrades experience) / Minor (suboptimal)
• WCAG criterion: specific guideline reference (e.g., 1.4.3 Contrast)
• Current state: what's wrong
• Remediation: specific fix with code/design guidance
• Impact: which users/assistive technologies are affected

Prioritize fixes by: impact × effort matrix. Include estimated dev effort for each.`,
    tools: ["ChatGPT", "Claude", "axe AI", "axe DevTools"],
    tags: ["Accessibility", "WCAG", "Audit"],
  },

  // ── The Prototyping Strategist ──
  {
    id: "prototype-strategist-plan",
    persona: "The Prototyping Strategist",
    subtitle: "Choose the right fidelity and tool for your prototype",
    description: "When you're unsure whether to build a quick paper prototype, a Figma click-through, or a coded prototype — and need a strategic recommendation.",
    prompt: `Act as a UX strategy consultant advising on prototyping approach. Here's the context:

• **Goal**: [what you're trying to learn/validate]
• **Audience**: [who will interact with the prototype — users, stakeholders, devs]
• **Timeline**: [how much time you have]
• **Complexity**: [describe the interaction patterns]

Recommend:
1. **Fidelity level**: Paper → Low-fi wireframe → Mid-fi interactive → High-fi coded
2. **Best tool for the job**: and why (Figma, Framer, Lovable, code prototype)
3. **What to fake vs. build real**: which interactions need to feel real for valid feedback?
4. **Test script outline**: 3-5 tasks to run with this prototype
5. **Success criteria**: what signals tell you the prototype achieved its goal?

Include a decision tree I can reuse for future prototyping decisions.`,
    tools: ["ChatGPT", "Claude", "Figma", "Lovable", "Framer"],
    tags: ["Prototyping", "Strategy", "Testing"],
  },

  // ── The Data Storyteller ──
  {
    id: "data-storyteller-dashboard",
    persona: "The Data Storyteller",
    subtitle: "Transform analytics data into design action items",
    description: "When you have quantitative data from analytics tools but need to translate numbers into design decisions and stakeholder narratives.",
    prompt: `Act as a UX analytics specialist. I'll share data from [analytics tool] about [feature/flow].

Transform this data into a design narrative:
1. **Headline finding**: The single most important insight in one sentence
2. **Supporting data**: 3-5 metrics that paint the picture (with context — is 40% drop-off bad? Compare to benchmarks)
3. **User behavior patterns**: What are users actually doing? Where do they succeed/struggle?
4. **Funnel analysis**: Where are the biggest drop-offs and what might cause them?
5. **Segment differences**: Do different user types behave differently?
6. **Design hypotheses**: Based on the data, what design changes might improve outcomes?
7. **Recommended experiments**: A/B tests or prototype tests to validate hypotheses

Format as a stakeholder presentation outline with data visualizations recommendations.`,
    tools: ["ChatGPT", "Claude", "Amplitude / Mixpanel", "Hotjar / FullStory"],
    tags: ["Analytics", "Data", "Storytelling"],
  },
];

// Group prompts by tool name for lookup
export function getPromptsForTool(toolName: string): PersonaPrompt[] {
  return personaPrompts.filter((p) => p.tools.includes(toolName));
}

// Get unique personas
export function getUniquePersonas(): string[] {
  return [...new Set(personaPrompts.map((p) => p.persona))];
}
