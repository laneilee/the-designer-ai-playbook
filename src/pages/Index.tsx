import { useState, useRef } from "react";
import { methods, phases, type Phase } from "@/data/methods";
import MethodDetail from "@/components/MethodDetail";
import ToolsView from "@/components/ToolsView";
import ToolLogo from "@/components/ToolLogo";
import { Bot, User, ArrowLeft, Sparkles, ChevronDown, ArrowRight, Search, Lightbulb, FlaskConical, Palette, Send, MessageSquare, Zap, Clock, Users, Compass, PenTool, Layers, Target, Handshake } from "lucide-react";

type ViewState =
  | { type: "home" }
  | { type: "method"; id: string }
  | { type: "tools" };

const phaseData: Record<Phase, {
  description: string;
  icon: React.ElementType;
  color: string;
  colorBg: string;
  colorBorder: string;
}> = {
  Discover: {
    description: "Understand the problem space through research, interviews, and mapping.",
    icon: Compass,
    color: "hsl(200, 98%, 39%)",
    colorBg: "hsl(200 98% 39% / 0.08)",
    colorBorder: "hsl(200 98% 39% / 0.2)",
  },
  Define: {
    description: "Frame the problem, set vision, and establish guiding principles.",
    icon: Target,
    color: "hsl(270, 40%, 50%)",
    colorBg: "hsl(270 40% 50% / 0.08)",
    colorBorder: "hsl(270 40% 50% / 0.2)",
  },
  Ideate: {
    description: "Generate solutions, map stories, and explore multiple directions.",
    icon: Lightbulb,
    color: "hsl(28, 60%, 55%)",
    colorBg: "hsl(28 60% 55% / 0.08)",
    colorBorder: "hsl(28 60% 55% / 0.2)",
  },
  Prototype: {
    description: "Build testable artifacts from low-fidelity wireframes to realistic prototypes.",
    icon: PenTool,
    color: "hsl(140, 30%, 40%)",
    colorBg: "hsl(140 30% 40% / 0.08)",
    colorBorder: "hsl(140 30% 40% / 0.2)",
  },
  Validate: {
    description: "Test with real users, run critiques, and verify assumptions.",
    icon: FlaskConical,
    color: "hsl(18, 50%, 50%)",
    colorBg: "hsl(18 50% 50% / 0.08)",
    colorBorder: "hsl(18 50% 50% / 0.2)",
  },
  Align: {
    description: "Prioritize, connect to business goals, and build stakeholder alignment.",
    icon: Handshake,
    color: "hsl(215, 30%, 50%)",
    colorBg: "hsl(215 30% 50% / 0.08)",
    colorBorder: "hsl(215 30% 50% / 0.2)",
  },
};

const effortColor: Record<string, string> = {
  Low: "text-green-600",
  Medium: "text-amber-600",
  High: "text-red-500",
};

const Index = () => {
  const [view, setView] = useState<ViewState>({ type: "home" });
  const [expandedPhase, setExpandedPhase] = useState<Phase | null>("Discover");
  const [contextFilter, setContextFilter] = useState<string | null>(null);

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
              {selectedMethod.phase}
            </span>
            <span className="text-border">/</span>
            <span className="text-sm text-foreground font-medium truncate">
              {selectedMethod.title}
            </span>
          </div>
        </div>
        <MethodDetail method={selectedMethod} onMethodClick={(id) => setView({ type: "method", id })} />
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

  const allContexts = ["Solo", "Team", "Stakeholder", "Cross-functional"];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="pt-10 pb-4 sm:pt-14 sm:pb-6 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display text-foreground leading-tight">
            AI × UX Design Framework
          </h1>
          <p className="text-lg sm:text-xl font-display text-clay mt-3 leading-snug">
            {methods.length} methods across {phases.length} phases — design thinking, amplified by AI.
          </p>
          <p className="text-sm text-muted-foreground mt-2 max-w-2xl font-body leading-relaxed">
            A practitioner's playbook for every stage of the design process. Each method includes when to use it, step-by-step guidance, effort estimates, example artifacts, and AI tool recommendations.
          </p>
        </div>
      </header>

      {/* Methods vs Tools Switcher */}
      <div className="px-4 sm:px-6 mb-6">
        <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={() => {}}
            className="group relative flex items-center gap-4 px-5 py-4 rounded-xl border-2 border-primary bg-primary/5 transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium text-foreground font-body">Methods Library</div>
              <div className="text-xs text-muted-foreground font-body">
                {methods.length} methods organized by phase and context
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
                Browse all AI & traditional tools
              </div>
            </div>
            <ArrowRight className="ml-auto w-4 h-4 text-muted-foreground group-hover:text-clay group-hover:translate-x-0.5 transition-all shrink-0" />
          </button>
        </div>
      </div>

      {/* Context filter */}
      <div className="px-4 sm:px-6 mb-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-body uppercase tracking-widest text-muted-foreground mr-1">Filter:</span>
            <button
              onClick={() => setContextFilter(null)}
              className={`text-xs px-3 py-1.5 rounded-lg font-body transition-colors ${
                !contextFilter ? "bg-foreground text-background" : "bg-secondary text-secondary-foreground hover:bg-accent"
              }`}
            >
              All
            </button>
            {allContexts.map((ctx) => (
              <button
                key={ctx}
                onClick={() => setContextFilter(contextFilter === ctx ? null : ctx)}
                className={`text-xs px-3 py-1.5 rounded-lg font-body transition-colors ${
                  contextFilter === ctx ? "bg-foreground text-background" : "bg-secondary text-secondary-foreground hover:bg-accent"
                }`}
              >
                {ctx}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Phases */}
      <div className="px-4 sm:px-6 pb-16">
        <div className="max-w-4xl mx-auto space-y-4">
          {phases.map((phase, phaseIndex) => {
            const phaseConfig = phaseData[phase];
            const isExpanded = expandedPhase === phase;
            const phaseMethods = methods.filter((m) => {
              if (m.phase !== phase) return false;
              if (contextFilter && !m.context.includes(contextFilter as any)) return false;
              return true;
            });
            const PhaseIcon = phaseConfig.icon;

            return (
              <div
                key={phase}
                className="rounded-2xl overflow-hidden border border-border bg-card transition-all duration-300 hover:shadow-md"
                style={{ borderColor: isExpanded ? phaseConfig.colorBorder : undefined }}
              >
                <button
                  onClick={() => setExpandedPhase(isExpanded ? null : phase)}
                  className="w-full text-left"
                >
                  <div className="flex items-center p-5 sm:p-6 gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: phaseConfig.colorBg }}
                    >
                      <PhaseIcon className="w-5 h-5" style={{ color: phaseConfig.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className="text-[10px] font-body text-muted-foreground">0{phaseIndex + 1}</span>
                        <h2 className="text-lg sm:text-xl font-display text-foreground leading-tight">
                          {phase}
                        </h2>
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-body">
                          {phaseMethods.length} methods
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-muted-foreground font-body leading-relaxed">
                        {phaseConfig.description}
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </button>

                {/* Expanded Methods */}
                <div
                  className={`transition-all duration-400 ease-in-out overflow-hidden ${
                    isExpanded ? "max-h-[3000px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="border-t border-border px-4 sm:px-6 py-5 space-y-2">
                    {phaseMethods.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-4 font-body">
                        No methods match the current filter.
                      </p>
                    ) : (
                      phaseMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => setView({ type: "method", id: method.id })}
                          className="w-full text-left group/method rounded-xl p-4 transition-all duration-200 hover:bg-accent border border-transparent hover:border-border"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                                {method.context.map((ctx) => (
                                  <span key={ctx} className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground font-body">
                                    {ctx}
                                  </span>
                                ))}
                                <span className={`text-[10px] font-body ${effortColor[method.effort]}`}>
                                  {method.effort} effort
                                </span>
                                <span className="text-[10px] text-muted-foreground font-body flex items-center gap-0.5">
                                  <Clock className="w-2.5 h-2.5" /> {method.timeEstimate}
                                </span>
                              </div>
                              <h3 className="text-sm sm:text-base font-display text-foreground group-hover/method:text-clay transition-colors leading-snug">
                                {method.title}
                              </h3>
                              <p className="text-xs text-muted-foreground mt-1 line-clamp-2 leading-relaxed">
                                {method.whenToUse}
                              </p>
                            </div>

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
                              </div>
                              <ArrowRight className="w-4 h-4 text-muted-foreground/30 group-hover/method:text-clay transition-colors" />
                            </div>
                          </div>
                        </button>
                      ))
                    )}
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
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const maxLen = 500;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed || sending) return;
    setSending(true);
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.functions.invoke("send-feedback", {
        body: { message: trimmed },
      });
      if (error) throw error;
      setSent(true);
      setMessage("");
    } catch {
      alert("Failed to send feedback. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 pb-16">
      <div className="max-w-4xl mx-auto rounded-2xl border border-border bg-card p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center">
            <MessageSquare className="w-4 h-4 text-clay" />
          </div>
          <div>
            <h3 className="text-base font-display text-foreground">Share your feedback</h3>
            <p className="text-xs text-muted-foreground font-body">Ideas, suggestions, or anything on your mind.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            {sent ? (
              <div className="rounded-lg border border-border bg-accent/30 px-4 py-3 text-sm font-body text-foreground">
                ✓ Thanks for your feedback!
              </div>
            ) : (
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, maxLen))}
                placeholder="What would you add, change, or improve?"
                rows={3}
                disabled={sending}
                className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm font-body text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-ring resize-none disabled:opacity-50"
              />
            )}
            {!sent && (
              <div className="text-[10px] text-muted-foreground/50 text-right mt-1 font-body">
                {message.length}/{maxLen}
              </div>
            )}
          </div>

          {!sent && (
            <button
              type="submit"
              disabled={!message.trim() || sending}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-body font-medium bg-foreground text-background hover:opacity-90 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {sending ? "Sending…" : "Submit feedback"}
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Index;
