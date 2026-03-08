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

      {/* Interactive Double Diamond */}
      <InteractiveDiamond onMethodClick={(id) => setView({ type: "method", id })} />

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
