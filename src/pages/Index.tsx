import { useState } from "react";
import { methods, categories, categoryImages } from "@/data/methods";
import MethodDetail from "@/components/MethodDetail";
import ToolsView from "@/components/ToolsView";
import ToolLogo from "@/components/ToolLogo";
import { Bot, User, ArrowLeft, Wrench, Sparkles } from "lucide-react";

type ViewState =
  | { type: "home" }
  | { type: "method"; id: string }
  | { type: "tools" };

const Index = () => {
  const [view, setView] = useState<ViewState>({ type: "home" });
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const selectedMethod =
    view.type === "method"
      ? methods.find((m) => m.id === view.id) || methods[0]
      : null;

  const filteredMethods =
    activeCategory === "all"
      ? methods
      : methods.filter((m) => m.category === activeCategory);

  if (view.type === "method" && selectedMethod) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
            <button
              onClick={() => setView({ type: "home" })}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
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
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
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
      <header className="pt-12 pb-8 sm:pt-16 sm:pb-10 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display text-foreground leading-tight">
            AI × UX Design Framework
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground mt-3 max-w-2xl font-body leading-relaxed">
            A curated collection of AI-enhanced methods and tools for modern UX
            design — from discovery to handoff.
          </p>
        </div>
      </header>

      {/* Tools CTA Banner */}
      <div className="px-4 sm:px-6 mb-8">
        <div className="max-w-5xl mx-auto">
          <button
            onClick={() => setView({ type: "tools" })}
            className="w-full group flex items-center justify-between gap-4 px-5 py-4 rounded-xl border border-border bg-card hover:bg-accent transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-clay" />
              </div>
              <div className="text-left">
                <div className="text-sm font-medium text-foreground">
                  Tools Directory
                </div>
                <div className="text-xs text-muted-foreground">
                  Browse all AI & traditional tools referenced across the framework
                </div>
              </div>
            </div>
            <ArrowLeft className="w-4 h-4 text-muted-foreground rotate-180 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-4 sm:px-6 mb-6">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-2">
          <button
            onClick={() => setActiveCategory("all")}
            className={`px-3.5 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${
              activeCategory === "all"
                ? "bg-foreground text-background"
                : "bg-card border border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            All Methods
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-body font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-foreground text-background"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Methods Grid */}
      <div className="px-4 sm:px-6 pb-16">
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setView({ type: "method", id: method.id })}
              className="group text-left rounded-xl border border-border bg-card hover:shadow-md transition-all duration-200 overflow-hidden"
            >
              {/* Card image */}
              <div className="h-32 sm:h-36 overflow-hidden">
                <img
                  src={method.image}
                  alt={method.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>

              {/* Card body */}
              <div className="p-4">
                {/* Category & badge */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-body uppercase tracking-widest text-muted-foreground">
                    {method.category}
                  </span>
                  {method.criticality === "ai-enhanced" ? (
                    <span className="badge-ai text-[10px]">
                      <Bot className="w-2.5 h-2.5" /> AI
                    </span>
                  ) : (
                    <span className="badge-human text-[10px]">
                      <User className="w-2.5 h-2.5" /> Human
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-sm font-display text-foreground leading-snug mb-2 group-hover:text-clay transition-colors">
                  {method.title}
                </h3>

                {/* Tool logos row */}
                <div className="flex items-center gap-1.5 mt-auto">
                  {[...method.aiTools, ...method.traditionalTools]
                    .slice(0, 4)
                    .map((tool) => (
                      <ToolLogo
                        key={tool.name}
                        name={tool.name}
                        type={tool.type}
                        size="sm"
                      />
                    ))}
                  {method.aiTools.length + method.traditionalTools.length > 4 && (
                    <span className="text-[10px] text-muted-foreground ml-1">
                      +{method.aiTools.length + method.traditionalTools.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
