import { useState, useRef, useEffect, useCallback } from "react";
import {
  Brain, Shield, HelpCircle,
  Users, Eye, Lock, Heart, MessageCircle, Scale,
  ChevronDown, ChevronUp, AlertTriangle, Lightbulb,
  Zap, Download, Printer,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* ── Section IDs for sidebar nav ── */
export const foundationSections = [
  { id: "to-ai-or-not", label: "To AI or Not to AI", icon: Lightbulb },
  { id: "decision-framework", label: "AI Decision Framework", icon: Brain },
  { id: "simplicity-wins", label: "When Simplicity Wins", icon: Scale },
  { id: "responsible-checklist", label: "Responsible AI Checklist", icon: Shield },
] as const;

export type FoundationSectionId = (typeof foundationSections)[number]["id"];

/* ── AI Decision Criteria ── */
const decisionCriteria = [
  {
    title: "Problem Fit",
    icon: Brain,
    color: "hsl(var(--primary))",
    description:
      "Does the problem involve complexity, scale, or ambiguity that AI is uniquely suited to solve (e.g., prediction, personalization, automation)?",
    questions: [
      "Does the problem involve pattern recognition?",
      "Is there a need to automate repetitive tasks at scale?",
      "Would personalization meaningfully improve outcomes?",
      "Does the problem require handling ambiguity or uncertainty?",
    ],
  },
  {
    title: "Simplicity vs. Necessity",
    icon: Scale,
    color: "hsl(var(--warm))",
    description:
      "Is AI actually necessary, or could a rule-based or conventional solution solve the problem more simply and transparently?",
    questions: [
      "Could a simple rules engine or decision tree work instead?",
      "Would users prefer a predictable, deterministic outcome?",
      "Is the added complexity of AI justified by the value it provides?",
      "Can you explain what the AI does in one sentence?",
    ],
  },
  {
    title: "User Value",
    icon: Heart,
    color: "hsl(var(--destructive))",
    description:
      "Will AI significantly enhance the user experience by reducing effort, improving accuracy, or enabling new capabilities?",
    questions: [
      "Does it reduce friction or effort for the user?",
      "Does it improve accuracy in a way manual methods cannot?",
      "Does it unlock entirely new capabilities for users?",
      "If AI doesn't directly improve the user's experience, is it unnecessary?",
    ],
  },
  {
    title: "Trust & Transparency",
    icon: Eye,
    color: "hsl(var(--sage))",
    description:
      "Can the AI's behavior be explained, errors handled gracefully, and users kept in control to build trust?",
    questions: [
      "Can users understand why AI made a specific suggestion?",
      "Are there graceful fallbacks when AI gets it wrong?",
      "Do users feel in control of the AI's actions?",
      "Is the AI's confidence level communicated clearly?",
    ],
  },
  {
    title: "Data Readiness",
    icon: Zap,
    color: "hsl(var(--clay))",
    description:
      "Is there sufficient, high-quality data available to support AI functionality, with mechanisms to update or improve the model over time?",
    questions: [
      "Do you have enough quality data to train or fine-tune?",
      "Is the data regularly updated and well-maintained?",
      "Are there mechanisms to improve the model over time?",
      "Could incomplete or biased data lead to poor results and damaged trust?",
    ],
  },
];

/* ── Responsible AI Checklist Categories ── */
const responsibleAIChecklist = [
  {
    title: "Transparency & Explainability",
    icon: Eye,
    items: [
      "Indicate when users are interacting with AI",
      'Explain AI decisions ("Why" or "How" it happened)',
      'Disclose technical details progressively (e.g., a "Learn more" link)',
      "Distinctly label prediction or fact",
    ],
  },
  {
    title: "Human Agency & Control",
    icon: Users,
    items: [
      "Allow users to override, edit, or decline AI suggestions",
      "Provide manual input paths alongside AI automation",
      "Make opting-in/out of AI features easy and visible",
      "Default to human input where high risk is involved",
    ],
  },
  {
    title: "Fairness & Inclusion",
    icon: Scale,
    items: [
      "Evaluate UX, including edge cases, with a diverse audience",
      "Check AI training data for exclusion (accents, skin tone, gendered names)",
      "Ensure accessibility (WCAG-compliant AI outputs, alt text, etc)",
      "Avoid reinforcing stereotypes in prompts, imagery, or outputs",
    ],
  },
  {
    title: "Privacy & Data Dignity",
    icon: Lock,
    items: [
      "Ask users' consent before collecting data for AI training",
      "Clearly explain how their data will be used",
      "Let them view, download, or delete their data",
      "Use anonymization, obfuscation, or local processing where possible",
    ],
  },
  {
    title: "Trust, Safety & Reliability",
    icon: Shield,
    items: [
      'Show AI confidence levels or uncertainty (e.g., "We\'re 60% sure…")',
      "Design graceful failure states (e.g., fallback to human support)",
      "Use safety filters and guardrails in prompt design and UI",
      "Block or warn about harmful or sensitive output",
    ],
  },
  {
    title: "Sustainability & Wellbeing",
    icon: Heart,
    items: [
      "Avoid dark patterns that push users to rely on AI unnecessarily",
      "Design for mindful interaction (limit over-automation)",
      "Consider environmental impact of model use (where relevant)",
    ],
  },
  {
    title: "Feedback & Ethical Iteration",
    icon: MessageCircle,
    items: [
      "Include feedback buttons near AI responses and decisions",
      "Allow users to rate or correct outputs",
      "Notify users when AI systems update or change behavior",
      "Run regular ethics and bias audits on UX patterns and AI outputs",
    ],
  },
];

/* ── Print / Download Checklist ── */
function generateChecklistHTML() {
  const styles = `
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 40px auto; padding: 0 20px; color: #1a1a2e; }
    h1 { font-size: 24px; margin-bottom: 4px; }
    .subtitle { color: #666; font-size: 13px; margin-bottom: 32px; }
    .category { margin-bottom: 28px; page-break-inside: avoid; }
    .category-title { font-size: 15px; font-weight: 600; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
    .item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 6px; font-size: 13px; line-height: 1.5; }
    .checkbox { width: 14px; height: 14px; border: 1.5px solid #999; border-radius: 3px; flex-shrink: 0; margin-top: 2px; }
    .footer { margin-top: 40px; padding-top: 16px; border-top: 1px solid #ddd; font-size: 11px; color: #999; }
    @media print { body { margin: 20px; } }
  `;
  
  const categories = responsibleAIChecklist.map(cat => `
    <div class="category">
      <div class="category-title">☐ ${cat.title}</div>
      ${cat.items.map(item => `
        <div class="item">
          <div class="checkbox"></div>
          <span>${item}</span>
        </div>
      `).join('')}
    </div>
  `).join('');

  return `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Responsible AI UX Design Checklist</title><style>${styles}</style></head>
<body>
  <h1>Responsible AI UX Design Checklist</h1>
  <p class="subtitle">Use this checklist throughout your design process — from discovery to handoff.</p>
  ${categories}
  <div class="footer">The AI Design Playbook — Responsible AI UX Checklist</div>
</body></html>`;
}

function handlePrintChecklist() {
  const html = generateChecklistHTML();
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 300);
  }
}

function handleDownloadChecklist() {
  const html = generateChecklistHTML();
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'responsible-ai-ux-checklist.html';
  a.click();
  URL.revokeObjectURL(url);
}

/* ── Main Component ── */
interface FoundationsViewProps {
  activeSection?: FoundationSectionId;
}

export default function FoundationsView({ activeSection }: FoundationsViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeSection && containerRef.current) {
      const el = containerRef.current.querySelector(`#${activeSection}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }, [activeSection]);

  return (
    <div ref={containerRef} className="px-6 sm:px-8 lg:px-12 py-8 max-w-4xl space-y-16">
      {/* Intro */}
      <section id="to-ai-or-not" className="space-y-4 scroll-mt-8">
        <div className="flex items-center gap-2 text-xs font-body font-semibold uppercase tracking-[0.15em] text-clay">
          <Lightbulb className="w-4 h-4" />
          Before you begin
        </div>
        <h2 className="text-2xl sm:text-3xl font-display text-foreground leading-tight">
          To AI or Not to AI
        </h2>
        <p className="text-sm font-body text-muted-foreground/70 leading-relaxed max-w-2xl">
          In the era of generative AI and rapidly advancing machine learning, it's tempting to add 
          artificial intelligence to every product. But does every product or feature truly need AI? 
          Before jumping into your design workflow, collaborate with your PM to evaluate whether AI 
          is the right tool for the problem.
        </p>
        <div className="rounded-xl border border-border bg-card/60 p-5 space-y-3">
          <p className="text-sm font-display font-medium text-foreground">
            💡 When to have this conversation
          </p>
          <p className="text-xs font-body text-muted-foreground/60 leading-relaxed">
            Ideally before any design sprint or discovery phase. Sit down with your Product Manager, 
            engineering lead, and data team to assess these criteria together. AI should solve real 
            problems — not be added because it's trendy.
          </p>
        </div>
      </section>

      {/* Decision Framework */}
      <section id="decision-framework" className="space-y-6 scroll-mt-8">
        <div className="space-y-2">
          <h3 className="text-xl font-display text-foreground">
            Decide if a product or feature should be AI-driven
          </h3>
          <p className="text-sm font-body text-muted-foreground/60 leading-relaxed">
            Use these five lenses to evaluate with your PM whether AI adds genuine value.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {decisionCriteria.map((criterion) => (
            <DecisionCard key={criterion.title} criterion={criterion} />
          ))}
        </div>
      </section>

      {/* When AI is unnecessary */}
      <section id="simplicity-wins" className="space-y-4 scroll-mt-8">
        <h3 className="text-xl font-display text-foreground">
          When AI is unnecessary: simplicity wins
        </h3>
        <p className="text-sm font-body text-muted-foreground/70 leading-relaxed max-w-2xl">
          AI isn't always the best tool for the job. Overusing it can lead to overcomplicated designs, 
          higher implementation costs, and user frustration. Ask yourself:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl border border-border bg-card/60 p-5 space-y-2">
            <p className="text-sm font-display font-medium text-foreground">Is AI actually necessary?</p>
            <p className="text-xs font-body text-muted-foreground/60 leading-relaxed">
              Could a rule-based or conventional solution solve the problem just as well? Sometimes, 
              transparency and simplicity win over complex AI systems.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card/60 p-5 space-y-2">
            <p className="text-sm font-display font-medium text-foreground">Can it be explained and trusted?</p>
            <p className="text-xs font-body text-muted-foreground/60 leading-relaxed">
              AI systems must be explainable, trustworthy, and safe to iterate on. If users can't 
              understand the AI's behavior — or if errors can't be handled gracefully — it can erode 
              confidence in your product.
            </p>
          </div>
        </div>
        <div className="rounded-xl border border-clay/20 bg-clay/5 p-5 space-y-2">
          <p className="text-sm font-display font-medium text-foreground flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-clay" />
            Your decision matters
          </p>
          <p className="text-xs font-body text-muted-foreground/60 leading-relaxed">
            At its core, product design isn't about chasing trends; it's about delivering clarity, trust, 
            and value to users. AI is powerful, but it's not a one-size-fits-all solution. By leading with 
            user needs, not novelty, we can create products that are not just intelligent but also intuitive, 
            effective, and delightful.
          </p>
        </div>
      </section>

      {/* Responsible AI Checklist */}
      <section id="responsible-checklist" className="space-y-6 scroll-mt-8">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-body font-semibold uppercase tracking-[0.15em] text-clay">
              <Shield className="w-4 h-4" />
              Responsible AI
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrintChecklist}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-body font-medium border border-border bg-card/60 text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
              >
                <Printer className="w-3 h-3" />
                Print
              </button>
              <button
                onClick={handleDownloadChecklist}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-body font-medium border border-border bg-card/60 text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
              >
                <Download className="w-3 h-3" />
                Download
              </button>
            </div>
          </div>
          <h3 className="text-xl font-display text-foreground">
            Responsible AI UX Design Checklist
          </h3>
          <p className="text-sm font-body text-muted-foreground/60 leading-relaxed max-w-2xl">
            If you decide to use AI, ensure your design upholds ethical standards. Use this checklist 
            throughout your design process — from discovery to handoff.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {responsibleAIChecklist.map((category) => (
            <ChecklistCategory key={category.title} category={category} />
          ))}
        </div>
      </section>

      {/* CTA to continue */}
      <section className="rounded-xl border border-border bg-card/60 p-6 text-center space-y-3">
        <p className="text-sm font-display font-medium text-foreground">
          Ready to start your AI-enhanced design process?
        </p>
        <p className="text-xs font-body text-muted-foreground/60">
          Head over to Methods to explore step-by-step UX techniques, or browse Tools for curated AI assistants.
        </p>
      </section>
    </div>
  );
}

/* ── Decision Card ── */
function DecisionCard({ criterion }: { criterion: (typeof decisionCriteria)[0] }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = criterion.icon;

  return (
    <div
      className="rounded-xl border border-border bg-card/60 p-5 space-y-3 cursor-pointer hover:border-foreground/15 transition-colors"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: `${criterion.color}15` }}
          >
            <Icon className="w-4 h-4" style={{ color: criterion.color }} />
          </div>
          <div>
            <p className="text-sm font-display font-medium text-foreground">{criterion.title}</p>
            <p className="text-xs font-body text-muted-foreground/60 leading-relaxed mt-1">
              {criterion.description}
            </p>
          </div>
        </div>
        <button className="shrink-0 mt-1 text-muted-foreground/40">
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-2 border-t border-border space-y-2">
              <p className="text-[10px] font-body font-semibold uppercase tracking-wider text-muted-foreground/40">
                Questions to discuss with your PM
              </p>
              {criterion.questions.map((q, i) => (
                <div key={i} className="flex items-start gap-2">
                  <HelpCircle className="w-3 h-3 text-muted-foreground/30 mt-0.5 shrink-0" />
                  <span className="text-xs font-body text-muted-foreground/70">{q}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Checklist Category Card ── */
function ChecklistCategory({ category }: { category: (typeof responsibleAIChecklist)[0] }) {
  const [checks, setChecks] = useState<boolean[]>(new Array(category.items.length).fill(false));
  const Icon = category.icon;
  const checkedCount = checks.filter(Boolean).length;

  return (
    <div className="rounded-xl border border-border bg-card/60 p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Icon className="w-4 h-4 text-clay" />
          <span className="text-sm font-display font-medium text-foreground">{category.title}</span>
        </div>
        {checkedCount > 0 && (
          <span className="text-[10px] font-body text-clay">
            {checkedCount}/{category.items.length}
          </span>
        )}
      </div>
      <div className="space-y-2">
        {category.items.map((item, i) => (
          <label
            key={i}
            className="flex items-start gap-2.5 cursor-pointer group"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              checked={checks[i]}
              onChange={() => {
                const next = [...checks];
                next[i] = !next[i];
                setChecks(next);
              }}
              className="mt-0.5 w-3.5 h-3.5 rounded border-border text-clay focus:ring-clay/30 cursor-pointer"
            />
            <span
              className={`text-xs font-body leading-relaxed transition-colors ${
                checks[i] ? "text-muted-foreground/40 line-through" : "text-muted-foreground/70"
              }`}
            >
              {item}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}
