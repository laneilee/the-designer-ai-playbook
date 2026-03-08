import { useState, useRef } from "react";
import { methods, categories, categoryImages } from "@/data/methods";
import MethodDetail from "@/components/MethodDetail";
import ToolsView from "@/components/ToolsView";
import ToolLogo from "@/components/ToolLogo";
import { Bot, User, ArrowLeft, Sparkles, ChevronRight, ChevronDown, ArrowRight, Search, Lightbulb, FlaskConical, Palette, Send, MessageSquare, Star } from "lucide-react";

import phaseDiscovery from "@/assets/phase-discovery.jpg";
import phaseIdeation from "@/assets/phase-ideation.jpg";
import phaseTesting from "@/assets/phase-testing.jpg";
import phaseDesign from "@/assets/phase-design.jpg";
import phaseHandoff from "@/assets/phase-handoff.jpg";

type ViewState =
  | { type: "home" }
  | { type: "method"; id: string }
  | { type: "tools" };

const phaseData: Record<string, {
  description: string;
  image: string;
  icon: React.ElementType;
  color: string;
  colorBg: string;
  colorBorder: string;
  cta: string;
}> = {
  Discovery: {
    description: "Understand the problem space through research, interviews, and competitive analysis.",
    image: phaseDiscovery,
    icon: Search,
    color: "hsl(200, 98%, 39%)",
    colorBg: "hsl(200 98% 39% / 0.08)",
    colorBorder: "hsl(200 98% 39% / 0.2)",
    cta: "Start researching",
  },
  Ideation: {
    description: "Frame problems, define metrics, explore solutions, and build early prototypes.",
    image: phaseIdeation,
    icon: Lightbulb,
    color: "hsl(28, 60%, 55%)",
    colorBg: "hsl(28 60% 55% / 0.08)",
    colorBorder: "hsl(28 60% 55% / 0.2)",
    cta: "Start ideating",
  },
  Testing: {
    description: "Validate designs with real users through usability testing and feedback.",
    image: phaseTesting,
    icon: FlaskConical,
    color: "hsl(140, 30%, 40%)",
    colorBg: "hsl(140 30% 40% / 0.08)",
    colorBorder: "hsl(140 30% 40% / 0.2)",
    cta: "Start testing",
  },
  Design: {
    description: "Craft high-fidelity designs, ensure accessibility, and build realistic prototypes.",
    image: phaseDesign,
    icon: Palette,
    color: "hsl(270, 40%, 50%)",
    colorBg: "hsl(270 40% 50% / 0.08)",
    colorBorder: "hsl(270 40% 50% / 0.2)",
    cta: "Start designing",
  },
  Handoff: {
    description: "Document components, finalize specs, and evaluate post-launch performance.",
    image: phaseHandoff,
    icon: Send,
    color: "hsl(18, 30%, 55%)",
    colorBg: "hsl(18 30% 55% / 0.08)",
    colorBorder: "hsl(18 30% 55% / 0.2)",
    cta: "Start delivering",
  },
};

const Index = () => {
  const [view, setView] = useState<ViewState>({ type: "home" });
  const [expandedCategory, setExpandedCategory] = useState<string | null>("Discovery");

  const selectedMethod =
    view.type === "method"
      ? methods.find((m) => m.id === view.id) || methods[0]
      : null;

  if (view.type === "method" && selectedMethod) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
            <button
              onClick={() => setView({ type: "home" })}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <span className="text-border">/</span>
            <span className="text-xs uppercase tracking-widest text-muted-foreground">
              {selectedMethod.category}
            </span>
            <span className="text-border">/</span>
            <span className="text-sm text-foreground font-medium truncate">
              {selectedMethod.title}
            </span>
          </div>
        </div>
        <MethodDetail method={selectedMethod} />
      </div>
    );
  }

  if (view.type === "tools") {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
            <button
              onClick={() => setView({ type: "home" })}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <span className="text-border">/</span>
            <span className="text-sm text-foreground font-medium">Tools Directory</span>
          </div>
        </div>
        <ToolsView />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="pt-10 pb-4 sm:pt-14 sm:pb-6 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display text-foreground leading-tight">
            AI × UX Design Framework
          </h1>
          <p className="text-lg sm:text-xl font-display text-clay mt-3 leading-snug">
            From discovery to final handoff — design thinking, amplified by AI.
          </p>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl font-body leading-relaxed">
            A design-thinking-first playbook that weaves AI into every phase of the creative process — empowering you to empathize deeper, ideate bolder, and iterate faster.
          </p>
        </div>
      </header>

      {/* Methods vs Tools Switcher */}
      <div className="px-4 sm:px-6 mb-8">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => {/* Already on methods view */}}
            className="group relative flex items-center gap-4 px-5 py-4 rounded-xl border-2 border-primary bg-primary/5 transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-foreground font-body">Methods</div>
              <div className="text-xs text-muted-foreground font-body">
                Step-by-step UX processes enhanced with AI
              </div>
            </div>
            <div className="ml-auto w-2 h-2 rounded-full bg-primary shrink-0" />
          </button>

          <button
            onClick={() => setView({ type: "tools" })}
            className="group relative flex items-center gap-4 px-5 py-4 rounded-xl border-2 border-border hover:border-clay bg-card hover:bg-accent transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center shrink-0">
              <Search className="w-5 h-5 text-clay" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-foreground font-body">Tools Directory</div>
              <div className="text-xs text-muted-foreground font-body">
                Browse all AI & traditional tools in one place
              </div>
            </div>
            <ArrowRight className="ml-auto w-4 h-4 text-muted-foreground group-hover:text-clay group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>
        </div>
      </div>

      {/* Double Diamond Diagram */}
      <div className="px-4 sm:px-6 mb-12">
        <div className="max-w-4xl mx-auto rounded-2xl bg-secondary px-5 sm:px-10 py-10 sm:py-12 overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-display text-secondary-foreground leading-tight">
            Design Thinking × AI
          </h2>
          <p className="text-sm text-secondary-foreground/60 mt-2 max-w-2xl font-body leading-relaxed mb-8">
            How AI enhances each phase of the Double Diamond — comparing the traditional approach with the modern AI-augmented workflow.
          </p>

          <div className="relative w-full overflow-x-auto">
            <svg viewBox="0 0 900 420" className="w-full min-w-[600px]" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="225" y1="30" x2="225" y2="400" stroke="hsl(215 20% 65% / 0.15)" strokeDasharray="4 4" />
              <line x1="450" y1="30" x2="450" y2="400" stroke="hsl(215 20% 65% / 0.15)" strokeDasharray="4 4" />
              <line x1="675" y1="30" x2="675" y2="400" stroke="hsl(215 20% 65% / 0.15)" strokeDasharray="4 4" />

              <text x="112" y="24" textAnchor="middle" className="fill-secondary-foreground/40" fontSize="10" fontFamily="DM Sans">DISCOVER</text>
              <text x="337" y="24" textAnchor="middle" className="fill-secondary-foreground/40" fontSize="10" fontFamily="DM Sans">DEFINE</text>
              <text x="562" y="24" textAnchor="middle" className="fill-secondary-foreground/40" fontSize="10" fontFamily="DM Sans">DEVELOP</text>
              <text x="787" y="24" textAnchor="middle" className="fill-secondary-foreground/40" fontSize="10" fontFamily="DM Sans">DELIVER</text>

              <text x="12" y="105" className="fill-secondary-foreground/30" fontSize="10" fontFamily="DM Sans" fontWeight="500">Traditional</text>
              <polygon points="0,105 225,55 225,155 0,105" fill="hsl(215 20% 65% / 0.08)" stroke="hsl(215 20% 65% / 0.25)" strokeWidth="1.5" />
              <polygon points="225,55 450,105 450,105 225,155" fill="hsl(215 20% 65% / 0.08)" stroke="hsl(215 20% 65% / 0.25)" strokeWidth="1.5" />
              <polygon points="450,105 675,55 675,155 450,105" fill="hsl(215 20% 65% / 0.08)" stroke="hsl(215 20% 65% / 0.25)" strokeWidth="1.5" />
              <polygon points="675,55 900,105 900,105 675,155" fill="hsl(215 20% 65% / 0.08)" stroke="hsl(215 20% 65% / 0.25)" strokeWidth="1.5" />

              <text x="112" y="100" textAnchor="middle" className="fill-secondary-foreground/35" fontSize="9" fontFamily="DM Sans">Interviews</text>
              <text x="112" y="112" textAnchor="middle" className="fill-secondary-foreground/35" fontSize="9" fontFamily="DM Sans">Surveys</text>
              <text x="337" y="100" textAnchor="middle" className="fill-secondary-foreground/35" fontSize="9" fontFamily="DM Sans">Affinity Maps</text>
              <text x="337" y="112" textAnchor="middle" className="fill-secondary-foreground/35" fontSize="9" fontFamily="DM Sans">Personas</text>
              <text x="562" y="100" textAnchor="middle" className="fill-secondary-foreground/35" fontSize="9" fontFamily="DM Sans">Sketches</text>
              <text x="562" y="112" textAnchor="middle" className="fill-secondary-foreground/35" fontSize="9" fontFamily="DM Sans">Wireframes</text>
              <text x="787" y="100" textAnchor="middle" className="fill-secondary-foreground/35" fontSize="9" fontFamily="DM Sans">Usability Tests</text>
              <text x="787" y="112" textAnchor="middle" className="fill-secondary-foreground/35" fontSize="9" fontFamily="DM Sans">Handoff Docs</text>

              <text x="112" y="175" textAnchor="middle" className="fill-secondary-foreground/20" fontSize="8" fontFamily="DM Sans">Diverge</text>
              <text x="337" y="175" textAnchor="middle" className="fill-secondary-foreground/20" fontSize="8" fontFamily="DM Sans">Converge</text>
              <text x="562" y="175" textAnchor="middle" className="fill-secondary-foreground/20" fontSize="8" fontFamily="DM Sans">Diverge</text>
              <text x="787" y="175" textAnchor="middle" className="fill-secondary-foreground/20" fontSize="8" fontFamily="DM Sans">Converge</text>

              <line x1="0" y1="195" x2="900" y2="195" stroke="hsl(200 98% 39% / 0.3)" strokeDasharray="6 4" />
              <rect x="370" y="186" width="160" height="18" rx="9" fill="hsl(200 98% 39% / 0.15)" />
              <text x="450" y="198" textAnchor="middle" className="fill-primary" fontSize="9" fontFamily="DM Sans" fontWeight="600">AI-ENHANCED APPROACH</text>

              <text x="12" y="280" className="fill-primary" fontSize="10" fontFamily="DM Sans" fontWeight="500">AI-Enhanced</text>
              <polygon points="0,280 225,220 225,340 0,280" fill="hsl(200 98% 39% / 0.12)" stroke="hsl(200 98% 39% / 0.5)" strokeWidth="2" />
              <polygon points="225,220 450,280 450,280 225,340" fill="hsl(200 98% 39% / 0.12)" stroke="hsl(200 98% 39% / 0.5)" strokeWidth="2" />
              <polygon points="450,280 675,220 675,340 450,280" fill="hsl(28 60% 55% / 0.12)" stroke="hsl(28 60% 55% / 0.5)" strokeWidth="2" />
              <polygon points="675,220 900,280 900,280 675,340" fill="hsl(28 60% 55% / 0.12)" stroke="hsl(28 60% 55% / 0.5)" strokeWidth="2" />

              <text x="112" y="270" textAnchor="middle" className="fill-primary" fontSize="9" fontFamily="DM Sans" fontWeight="500">AI Research Synthesis</text>
              <text x="112" y="283" textAnchor="middle" className="fill-secondary-foreground/60" fontSize="8" fontFamily="DM Sans">ChatGPT + Claude</text>
              <text x="112" y="295" textAnchor="middle" className="fill-secondary-foreground/60" fontSize="8" fontFamily="DM Sans">analyze transcripts</text>

              <text x="337" y="270" textAnchor="middle" className="fill-primary" fontSize="9" fontFamily="DM Sans" fontWeight="500">AI Pattern Detection</text>
              <text x="337" y="283" textAnchor="middle" className="fill-secondary-foreground/60" fontSize="8" fontFamily="DM Sans">Auto-cluster insights</text>
              <text x="337" y="295" textAnchor="middle" className="fill-secondary-foreground/60" fontSize="8" fontFamily="DM Sans">Generate HMW statements</text>

              <text x="562" y="270" textAnchor="middle" fill="hsl(28 60% 55%)" fontSize="9" fontFamily="DM Sans" fontWeight="500">AI Rapid Prototyping</text>
              <text x="562" y="283" textAnchor="middle" className="fill-secondary-foreground/60" fontSize="8" fontFamily="DM Sans">Lovable + v0 generate</text>
              <text x="562" y="295" textAnchor="middle" className="fill-secondary-foreground/60" fontSize="8" fontFamily="DM Sans">functional prototypes</text>

              <text x="787" y="270" textAnchor="middle" fill="hsl(28 60% 55%)" fontSize="9" fontFamily="DM Sans" fontWeight="500">AI Quality Assurance</text>
              <text x="787" y="283" textAnchor="middle" className="fill-secondary-foreground/60" fontSize="8" fontFamily="DM Sans">Auto a11y audits</text>
              <text x="787" y="295" textAnchor="middle" className="fill-secondary-foreground/60" fontSize="8" fontFamily="DM Sans">AI-generated specs</text>

              <rect x="55" y="355" width="115" height="28" rx="6" fill="hsl(200 98% 39% / 0.15)" stroke="hsl(200 98% 39% / 0.3)" strokeWidth="1" />
              <text x="112" y="373" textAnchor="middle" className="fill-primary" fontSize="9" fontFamily="DM Sans" fontWeight="600">Discovery</text>
              <rect x="280" y="355" width="115" height="28" rx="6" fill="hsl(200 98% 39% / 0.15)" stroke="hsl(200 98% 39% / 0.3)" strokeWidth="1" />
              <text x="337" y="373" textAnchor="middle" className="fill-primary" fontSize="9" fontFamily="DM Sans" fontWeight="600">Ideation</text>
              <rect x="488" y="355" width="150" height="28" rx="6" fill="hsl(28 60% 55% / 0.15)" stroke="hsl(28 60% 55% / 0.3)" strokeWidth="1" />
              <text x="563" y="373" textAnchor="middle" fill="hsl(28 60% 55%)" fontSize="9" fontFamily="DM Sans" fontWeight="600">Testing + Design</text>
              <rect x="720" y="355" width="115" height="28" rx="6" fill="hsl(28 60% 55% / 0.15)" stroke="hsl(28 60% 55% / 0.3)" strokeWidth="1" />
              <text x="777" y="373" textAnchor="middle" fill="hsl(28 60% 55%)" fontSize="9" fontFamily="DM Sans" fontWeight="600">Handoff</text>

              <line x1="112" y1="340" x2="112" y2="355" stroke="hsl(200 98% 39% / 0.3)" strokeWidth="1" />
              <line x1="337" y1="340" x2="337" y2="355" stroke="hsl(200 98% 39% / 0.3)" strokeWidth="1" />
              <line x1="563" y1="340" x2="563" y2="355" stroke="hsl(28 60% 55% / 0.3)" strokeWidth="1" />
              <line x1="777" y1="340" x2="777" y2="355" stroke="hsl(28 60% 55% / 0.3)" strokeWidth="1" />

              <text x="450" y="410" textAnchor="middle" className="fill-secondary-foreground/25" fontSize="8" fontFamily="DM Sans">
                AI reduces cycle time by 40-60% while maintaining human judgment at critical decision points
              </text>
            </svg>
          </div>

          <div className="flex flex-wrap items-center gap-5 mt-6 pt-5 border-t border-secondary-foreground/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm border-2 border-[hsl(215,20%,65%,0.4)] bg-[hsl(215,20%,65%,0.08)]" />
              <span className="text-xs text-secondary-foreground/40 font-body">Traditional approach</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm border-2 border-primary/50 bg-primary/12" />
              <span className="text-xs text-secondary-foreground/60 font-body">AI-enhanced (Research + Define)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm border-2 border-[hsl(28,60%,55%,0.5)] bg-[hsl(28,60%,55%,0.12)]" />
              <span className="text-xs text-secondary-foreground/60 font-body">AI-enhanced (Develop + Deliver)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Playbook Phases */}
      <div className="px-4 sm:px-6 pb-16">
        <div className="max-w-4xl mx-auto space-y-6">
          {categories.map((category, catIndex) => {
            const phase = phaseData[category];
            const isExpanded = expandedCategory === category;
            const categoryMethods = methods.filter((m) => m.category === category);
            const PhaseIcon = phase.icon;
            const aiCount = categoryMethods.filter((m) => m.criticality === "ai-enhanced").length;
            const humanCount = categoryMethods.length - aiCount;

            return (
              <div
                key={category}
                className="rounded-2xl overflow-hidden border border-border bg-card transition-all duration-300 hover:shadow-md"
                style={{ borderColor: isExpanded ? phase.colorBorder : undefined }}
              >
                {/* Phase Card Header */}
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : category)}
                  className="w-full text-left"
                >
                  <div className="flex flex-col sm:flex-row">
                    {/* Image */}
                    <div className="relative sm:w-48 lg:w-56 shrink-0 h-36 sm:h-auto overflow-hidden">
                      <img
                        src={phase.image}
                        alt={category}
                        className="w-full h-full object-cover"
                      />
                      {/* Phase number overlay */}
                      <div className="absolute top-3 left-3 w-8 h-8 rounded-lg flex items-center justify-center text-sm font-display text-white/90 backdrop-blur-sm"
                        style={{ background: `${phase.color}CC` }}
                      >
                        {catIndex + 1}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-5 sm:p-6 flex flex-col justify-center">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2.5 mb-2">
                            <div
                              className="w-7 h-7 rounded-lg flex items-center justify-center"
                              style={{ background: phase.colorBg }}
                            >
                              <PhaseIcon className="w-4 h-4" style={{ color: phase.color }} />
                            </div>
                            <h2 className="text-lg sm:text-xl font-display text-foreground leading-tight">
                              {category}
                            </h2>
                          </div>
                          <p className="text-xs sm:text-sm text-muted-foreground font-body leading-relaxed mb-3">
                            {phase.description}
                          </p>

                          {/* Stats row */}
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] sm:text-xs font-body text-muted-foreground bg-accent px-2 py-0.5 rounded-md">
                              {categoryMethods.length} methods
                            </span>
                            {aiCount > 0 && (
                              <span className="badge-ai text-[10px]">
                                <Bot className="w-2.5 h-2.5" /> {aiCount} AI-enhanced
                              </span>
                            )}
                            {humanCount > 0 && (
                              <span className="badge-human text-[10px]">
                                {humanCount} human-critical
                              </span>
                            )}
                          </div>
                        </div>

                        <ChevronDown
                          className={`w-5 h-5 text-muted-foreground shrink-0 mt-1 transition-transform duration-300 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </button>

                {/* Expanded Methods */}
                <div
                  className={`transition-all duration-400 ease-in-out overflow-hidden ${
                    isExpanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-t border-border px-4 sm:px-6 py-5 space-y-2">
                    {categoryMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setView({ type: "method", id: method.id })}
                        className="w-full text-left group/method rounded-xl p-4 transition-all duration-200 hover:bg-accent border border-transparent hover:border-border"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              {method.criticality === "ai-enhanced" ? (
                                <span className="badge-ai text-[10px]">
                                  <Bot className="w-2.5 h-2.5" /> AI-Enhanced
                                </span>
                              ) : (
                                <span className="badge-human text-[10px]">
                                  <User className="w-2.5 h-2.5" /> Human-Critical
                                </span>
                              )}
                            </div>
                            <h3 className="text-sm sm:text-base font-display text-foreground group-hover/method:text-clay transition-colors leading-snug">
                              {method.title}
                            </h3>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                              {method.description}
                            </p>
                          </div>

                          {/* Tool logos + arrow */}
                          <div className="flex items-center gap-2 shrink-0 mt-1">
                            <div className="flex items-center gap-1">
                              {[...method.aiTools, ...method.traditionalTools]
                                .slice(0, 3)
                                .map((tool) => (
                                  <ToolLogo
                                    key={tool.name}
                                    name={tool.name}
                                    type={tool.type}
                                    size="sm"
                                  />
                                ))}
                              {method.aiTools.length + method.traditionalTools.length > 3 && (
                                <span className="text-[10px] text-muted-foreground">
                                  +{method.aiTools.length + method.traditionalTools.length - 3}
                                </span>
                              )}
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover/method:text-clay transition-colors" />
                          </div>
                        </div>
                      </button>
                    ))}

                    {/* Phase CTA */}
                    <div className="pt-3 flex justify-center">
                      <button
                        onClick={() => setView({ type: "method", id: categoryMethods[0]?.id })}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-body font-medium transition-colors hover:opacity-80"
                        style={{ background: phase.colorBg, color: phase.color }}
                      >
                        {phase.cta}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feedback Section */}
      <FeedbackForm />
    </div>
  );
};

function FeedbackForm() {
  const [message, setMessage] = useState("");
  const maxLen = 500;
  const email = "feedback@example.com"; // Replace with your email

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;
    const subject = encodeURIComponent("AI × UX Framework Feedback");
    const body = encodeURIComponent(trimmed.slice(0, maxLen));
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="px-4 sm:px-6 pb-16">
      <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
            <MessageSquare className="w-4.5 h-4.5 text-clay" />
          </div>
          <div>
            <h3 className="text-base font-display text-foreground">Share your feedback</h3>
            <p className="text-xs text-muted-foreground font-body">Ideas, suggestions, or anything on your mind — opens your email client.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, maxLen))}
              placeholder="What would you add, change, or improve?"
              rows={3}
              className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
            <div className="text-[10px] text-muted-foreground/50 text-right mt-1 font-body">
              {message.length}/{maxLen}
            </div>
          </div>

          <button
            type="submit"
            disabled={!message.trim()}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-body font-medium bg-foreground text-background hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Send via email
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Index;
