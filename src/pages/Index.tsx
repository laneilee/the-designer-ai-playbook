import { useState } from "react";
import { methods, categories, categoryImages } from "@/data/methods";
import MethodDetail from "@/components/MethodDetail";
import ToolsView from "@/components/ToolsView";
import ToolLogo from "@/components/ToolLogo";
import InteractiveDiamond from "@/components/InteractiveDiamond";
import { Bot, User, ArrowLeft, Sparkles, ChevronRight, Users, SlidersHorizontal, Eye, Scale, RefreshCw } from "lucide-react";

type ViewState =
  | { type: "home" }
  | { type: "method"; id: string }
  | { type: "tools" };

const categoryDescriptions: Record<string, string> = {
  Discovery: "Understand the problem space through research, interviews, and competitive analysis.",
  Ideation: "Frame problems, define metrics, explore solutions, and build early prototypes.",
  Testing: "Validate designs with real users through usability testing and feedback.",
  Design: "Craft high-fidelity designs, ensure accessibility, and build realistic prototypes.",
  Handoff: "Document components, finalize specs, and evaluate post-launch performance.",
};

const categoryColors: Record<string, string> = {
  Discovery: "from-[hsl(200,98%,39%)] to-[hsl(200,80%,55%)]",
  Ideation: "from-[hsl(28,60%,55%)] to-[hsl(35,70%,60%)]",
  Testing: "from-[hsl(140,30%,40%)] to-[hsl(140,25%,55%)]",
  Design: "from-[hsl(270,40%,50%)] to-[hsl(280,45%,60%)]",
  Handoff: "from-[hsl(18,30%,55%)] to-[hsl(25,35%,65%)]",
};

const categoryAccents: Record<string, string> = {
  Discovery: "border-l-[hsl(200,98%,39%)]",
  Ideation: "border-l-[hsl(28,60%,55%)]",
  Testing: "border-l-[hsl(140,30%,40%)]",
  Design: "border-l-[hsl(270,40%,50%)]",
  Handoff: "border-l-[hsl(18,30%,55%)]",
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
      <header className="pt-10 pb-6 sm:pt-14 sm:pb-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display text-foreground leading-tight">
            AI × UX Design Framework
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-3 max-w-2xl font-body leading-relaxed">
            A structured approach to AI-enhanced UX design — from discovery to handoff.
          </p>

          {/* Tools link */}
          <button
            onClick={() => setView({ type: "tools" })}
            className="mt-4 group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Sparkles className="w-4 h-4 text-clay" />
            <span className="underline underline-offset-2 decoration-border group-hover:decoration-foreground">
              Browse all tools
            </span>
          </button>
        </div>
      </header>

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

      {/* Accordion Book Layout */}
      <div className="px-4 sm:px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Phase number track */}
          <div className="space-y-0">
            {categories.map((category, catIndex) => {
              const isExpanded = expandedCategory === category;
              const categoryMethods = methods.filter((m) => m.category === category);

              return (
                <div key={category} className="group">
                  {/* Category Header - Accordion Trigger */}
                  <button
                    onClick={() =>
                      setExpandedCategory(isExpanded ? null : category)
                    }
                    className={`w-full text-left transition-all duration-300 ${
                      isExpanded
                        ? "rounded-t-xl"
                        : catIndex === 0
                        ? "rounded-t-xl"
                        : catIndex === categories.length - 1 && !isExpanded
                        ? "rounded-b-xl"
                        : ""
                    }`}
                  >
                    <div
                      className={`relative overflow-hidden px-5 sm:px-7 py-5 sm:py-6 border border-border transition-all duration-300 ${
                        isExpanded
                          ? `bg-gradient-to-r ${categoryColors[category]} border-transparent`
                          : "bg-card hover:bg-accent"
                      } ${catIndex > 0 ? "-mt-px" : ""} ${
                        isExpanded ? "rounded-t-xl" : ""
                      } ${
                        catIndex === 0 && !isExpanded ? "rounded-t-xl" : ""
                      } ${
                        catIndex === categories.length - 1 && !isExpanded
                          ? "rounded-b-xl"
                          : ""
                      }`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 sm:gap-5">
                          {/* Phase number */}
                          <span
                            className={`text-2xl sm:text-3xl font-display leading-none ${
                              isExpanded
                                ? "text-white/40"
                                : "text-muted-foreground/30"
                            }`}
                          >
                            {String(catIndex + 1).padStart(2, "0")}
                          </span>
                          <div>
                            <h2
                              className={`text-lg sm:text-xl font-display leading-tight ${
                                isExpanded ? "text-white" : "text-foreground"
                              }`}
                            >
                              {category}
                            </h2>
                            <p
                              className={`text-xs sm:text-sm mt-0.5 font-body leading-relaxed ${
                                isExpanded
                                  ? "text-white/70"
                                  : "text-muted-foreground"
                              }`}
                            >
                              {categoryDescriptions[category]}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span
                            className={`text-xs font-body ${
                              isExpanded
                                ? "text-white/50"
                                : "text-muted-foreground"
                            }`}
                          >
                            {categoryMethods.length} methods
                          </span>
                          <ChevronRight
                            className={`w-5 h-5 transition-transform duration-300 ${
                              isExpanded
                                ? "rotate-90 text-white/60"
                                : "text-muted-foreground"
                            }`}
                          />
                        </div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded Methods Panel */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isExpanded
                        ? "max-h-[2000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="border border-t-0 border-border rounded-b-xl bg-card">
                      <div className="p-4 sm:p-6 space-y-2">
                        {categoryMethods.map((method, i) => (
                          <button
                            key={method.id}
                            onClick={() =>
                              setView({ type: "method", id: method.id })
                            }
                            className={`w-full text-left group/method rounded-lg p-4 border-l-4 transition-all duration-200 hover:bg-accent ${categoryAccents[category]}`}
                          >
                            <div className="flex items-start justify-between gap-3">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1.5">
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

                              {/* Tool logos */}
                              <div className="flex items-center gap-1 shrink-0 mt-1">
                                {[
                                  ...method.aiTools,
                                  ...method.traditionalTools,
                                ]
                                  .slice(0, 3)
                                  .map((tool) => (
                                    <ToolLogo
                                      key={tool.name}
                                      name={tool.name}
                                      type={tool.type}
                                      size="sm"
                                    />
                                  ))}
                                {method.aiTools.length +
                                  method.traditionalTools.length >
                                  3 && (
                                  <span className="text-[10px] text-muted-foreground ml-0.5">
                                    +
                                    {method.aiTools.length +
                                      method.traditionalTools.length -
                                      3}
                                  </span>
                                )}
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
