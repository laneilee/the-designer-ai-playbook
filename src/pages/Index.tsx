import { useState, useEffect } from "react";
import { methods, phases, type Phase, type Method } from "@/data/methods";
import MethodDetail from "@/components/MethodDetail";
import ToolsView from "@/components/ToolsView";
import ToolLogo from "@/components/ToolLogo";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Users, MessageSquare, ArrowRight, ThumbsUp } from "lucide-react";

type ViewMode = "methods" | "tools";

const Index = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("methods");
  const [activeMethodId, setActiveMethodId] = useState<string>(methods[0]?.id || "");

  // Read method from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const methodParam = params.get("method");
    if (methodParam && methods.find((m) => m.id === methodParam)) {
      setActiveMethodId(methodParam);
      setViewMode("methods");
    }
  }, []);

  // Update URL when method changes
  useEffect(() => {
    if (viewMode === "methods" && activeMethodId) {
      const url = new URL(window.location.href);
      url.searchParams.set("method", activeMethodId);
      window.history.replaceState({}, "", url.toString());
    }
  }, [activeMethodId, viewMode]);

  const activeMethod = methods.find((m) => m.id === activeMethodId) || methods[0];

  const handleMethodClick = (id: string) => {
    setActiveMethodId(id);
    setViewMode("methods");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero header */}
      <header className="px-6 sm:px-10 pt-10 pb-6 sm:pt-14 sm:pb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-[2.8rem] font-display text-foreground leading-tight">
          AI × UX Design Framework
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground mt-2 max-w-2xl font-body leading-relaxed">
          Build with craft and the best tools available — {methods.length} methods across {phases.length} phases, each with step-by-step guidance and AI tool recommendations.
        </p>
      </header>

      {/* Two-panel layout */}
      <div className="flex min-h-[calc(100vh-160px)] border-t border-border">
        {/* ── Left sidebar ── */}
        <aside className="w-[320px] lg:w-[360px] shrink-0 border-r border-border bg-card hidden md:block">
          {/* Methods / Tools toggle */}
          <div className="flex items-center gap-4 px-6 pt-5 pb-3">
            <button
              onClick={() => setViewMode("methods")}
              className={`text-base font-display transition-colors ${
                viewMode === "methods" ? "text-foreground" : "text-muted-foreground/40 hover:text-muted-foreground"
              }`}
            >
              Methods
            </button>
            <span className="text-muted-foreground/30 font-body">/</span>
            <button
              onClick={() => setViewMode("tools")}
              className={`text-base font-display transition-colors ${
                viewMode === "tools" ? "text-foreground" : "text-muted-foreground/40 hover:text-muted-foreground"
              }`}
            >
              Tools
            </button>
          </div>

          <ScrollArea className="h-[calc(100vh-220px)]">
            {viewMode === "methods" ? (
              <div className="pb-6">
                {phases.map((phase) => {
                  const phaseMethods = methods.filter((m) => m.phase === phase);
                  return (
                    <div key={phase}>
                      <div className="category-label">{phase}</div>
                      {phaseMethods.map((method) => (
                        <button
                          key={method.id}
                          onClick={() => {
                            setActiveMethodId(method.id);
                            setViewMode("methods");
                          }}
                          className={`method-item w-full text-left ${
                            activeMethodId === method.id && viewMode === "methods" ? "active" : ""
                          }`}
                        >
                          <span className="truncate font-body text-sm">{method.title}</span>
                          <div className="flex items-center gap-1.5 shrink-0">
                            {method.context.includes("Team") || method.context.includes("Cross-functional") ? (
                              <Users className="w-3.5 h-3.5 text-muted-foreground/40" />
                            ) : null}
                            {method.aiTools.length > 0 && (
                              <Bot className="w-3.5 h-3.5 text-clay/50" />
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
            ) : (
              <ToolsSidebar />
            )}
          </ScrollArea>
        </aside>

        {/* ── Mobile nav (visible on small screens) ── */}
        <MobileNav
          viewMode={viewMode}
          setViewMode={setViewMode}
          activeMethodId={activeMethodId}
          setActiveMethodId={setActiveMethodId}
        />

        {/* ── Right detail panel ── */}
        <main className="flex-1 overflow-y-auto hidden md:block">
          {viewMode === "methods" ? (
            <MethodDetail method={activeMethod} onMethodClick={handleMethodClick} />
          ) : (
            <ToolsView />
          )}

          {/* Feedback at bottom */}
          <FeedbackForm />
        </main>
      </div>
    </div>
  );
};

/* ── Tools sidebar list ── */
function ToolsSidebar() {
  const toolCategories = getToolCategories();
  return (
    <div className="pb-6">
      {toolCategories.map(({ category, tools }) => (
        <div key={category}>
          <div className="category-label">{category}</div>
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="method-item"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <ToolLogo name={tool.name} type={tool.type} size="sm" />
                <span className="truncate font-body text-sm">{tool.name}</span>
              </div>
              {tool.type === "ai" ? (
                <Bot className="w-3.5 h-3.5 text-clay/50 shrink-0" />
              ) : (
                <ThumbsUp className="w-3.5 h-3.5 text-muted-foreground/30 shrink-0" />
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function getToolCategories() {
  const toolMap = new Map<string, { name: string; type: "ai" | "traditional"; phases: string[] }>();
  methods.forEach((method) => {
    [...method.aiTools, ...method.traditionalTools].forEach((tool) => {
      const existing = toolMap.get(tool.name);
      if (existing) {
        if (!existing.phases.includes(method.phase)) existing.phases.push(method.phase);
      } else {
        toolMap.set(tool.name, { name: tool.name, type: tool.type, phases: [method.phase] });
      }
    });
  });

  const aiTools = Array.from(toolMap.values()).filter((t) => t.type === "ai").sort((a, b) => a.name.localeCompare(b.name));
  const tradTools = Array.from(toolMap.values()).filter((t) => t.type === "traditional").sort((a, b) => a.name.localeCompare(b.name));

  return [
    { category: "AI Tools", tools: aiTools },
    { category: "Traditional Tools", tools: tradTools },
  ];
}

/* ── Mobile Navigation ── */
function MobileNav({
  viewMode,
  setViewMode,
  activeMethodId,
  setActiveMethodId,
}: {
  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;
  activeMethodId: string;
  setActiveMethodId: (id: string) => void;
}) {
  const [showList, setShowList] = useState(true);
  const activeMethod = methods.find((m) => m.id === activeMethodId) || methods[0];

  return (
    <div className="md:hidden flex-1 flex flex-col">
      {/* Mobile toggle */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setViewMode("methods")}
            className={`text-sm font-display ${viewMode === "methods" ? "text-foreground" : "text-muted-foreground/40"}`}
          >
            Methods
          </button>
          <span className="text-muted-foreground/30">/</span>
          <button
            onClick={() => setViewMode("tools")}
            className={`text-sm font-display ${viewMode === "tools" ? "text-foreground" : "text-muted-foreground/40"}`}
          >
            Tools
          </button>
        </div>
        {viewMode === "methods" && (
          <button
            onClick={() => setShowList(!showList)}
            className="text-xs text-muted-foreground font-body"
          >
            {showList ? "View detail →" : "← Back to list"}
          </button>
        )}
      </div>

      {viewMode === "methods" && showList ? (
        <ScrollArea className="flex-1">
          <div className="pb-6">
            {phases.map((phase) => {
              const phaseMethods = methods.filter((m) => m.phase === phase);
              return (
                <div key={phase}>
                  <div className="category-label">{phase}</div>
                  {phaseMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => {
                        setActiveMethodId(method.id);
                        setShowList(false);
                      }}
                      className={`method-item w-full text-left ${
                        activeMethodId === method.id ? "active" : ""
                      }`}
                    >
                      <span className="truncate font-body text-sm">{method.title}</span>
                    </button>
                  ))}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      ) : viewMode === "methods" ? (
        <div className="flex-1 overflow-y-auto">
          <MethodDetail
            method={activeMethod}
            onMethodClick={(id) => {
              setActiveMethodId(id);
            }}
          />
          <FeedbackForm />
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto">
          <ToolsView />
        </div>
      )}
    </div>
  );
}

/* ── Feedback Form ── */
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
    <div className="px-4 sm:px-6 lg:px-12 pb-16 pt-8">
      <div className="max-w-3xl mx-auto rounded-2xl border border-border bg-card p-6 sm:p-8">
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
