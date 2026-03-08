import { useState, useEffect } from "react";
import { methods, phases, type Phase } from "@/data/methods";
import { phaseColors } from "@/data/phaseColors";
import MethodDetail from "@/components/MethodDetail";
import ToolsView from "@/components/ToolsView";
import ToolLogo from "@/components/ToolLogo";

import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, Users, MessageSquare, ArrowRight, Compass, Target,
  Lightbulb, PenTool, FlaskConical, Handshake, Menu, X,
} from "lucide-react";

type ViewMode = "methods" | "tools";

const phaseIcons: Record<Phase, React.ElementType> = {
  Discover: Compass,
  Define: Target,
  Ideate: Lightbulb,
  Prototype: PenTool,
  Validate: FlaskConical,
  Align: Handshake,
};

const Index = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("methods");
  const [activeMethodId, setActiveMethodId] = useState<string>(methods[0]?.id || "");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const methodParam = params.get("method");
    if (methodParam && methods.find((m) => m.id === methodParam)) {
      setActiveMethodId(methodParam);
      setViewMode("methods");
    }
  }, []);

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
    setMobileOpen(false);
  };

  const sidebarContent = (
    <>
      {/* Methods / Tools toggle */}
      <div className="flex items-center gap-1 px-5 pt-5 pb-4">
        <button
          onClick={() => setViewMode("methods")}
          className={`text-[15px] font-display transition-all duration-200 ${
            viewMode === "methods"
              ? "text-foreground"
              : "text-muted-foreground/30 hover:text-muted-foreground/60"
          }`}
        >
          Methods
        </button>
        <span className="text-muted-foreground/20 font-body mx-2">/</span>
        <button
          onClick={() => setViewMode("tools")}
          className={`text-[15px] font-display transition-all duration-200 ${
            viewMode === "tools"
              ? "text-foreground"
              : "text-muted-foreground/30 hover:text-muted-foreground/60"
          }`}
        >
          Tools
        </button>
      </div>

      <ScrollArea className="flex-1">
        {viewMode === "methods" ? (
          <div className="pb-8">
            {phases.map((phase) => {
              const phaseMethods = methods.filter((m) => m.phase === phase);
              const colors = phaseColors[phase];
              const PhaseIcon = phaseIcons[phase];

              return (
                <div key={phase} className="mb-1">
                  {/* Phase header */}
                  <div className="flex items-center gap-2 px-5 pt-5 pb-2">
                    <div
                      className="w-5 h-5 rounded-md flex items-center justify-center"
                      style={{ background: colors.accentBg }}
                    >
                      <PhaseIcon className="w-3 h-3" style={{ color: colors.accent }} />
                    </div>
                    <span
                      className="text-[10px] font-body font-semibold uppercase tracking-[0.15em]"
                      style={{ color: colors.accent }}
                    >
                      {phase}
                    </span>
                    <span className="text-[9px] text-muted-foreground/30 font-body ml-auto">
                      {phaseMethods.length}
                    </span>
                  </div>

                  {/* Method items */}
                  {phaseMethods.map((method) => {
                    const isActive = activeMethodId === method.id && viewMode === "methods";
                    return (
                      <button
                        key={method.id}
                        onClick={() => handleMethodClick(method.id)}
                        className="w-full text-left group relative"
                      >
                        {/* Active indicator bar */}
                        {isActive && (
                          <motion.div
                            layoutId="activeMethod"
                            className="absolute left-0 top-1 bottom-1 w-[3px] rounded-r-full"
                            style={{ background: colors.accent }}
                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                          />
                        )}
                        <div
                          className={`flex items-center justify-between px-5 py-2.5 mx-2 rounded-lg transition-all duration-150 ${
                            isActive
                              ? "bg-foreground/5"
                              : "hover:bg-foreground/[0.03]"
                          }`}
                        >
                          <span
                            className={`text-[13px] font-body transition-colors truncate ${
                              isActive
                                ? "text-foreground font-medium"
                                : "text-muted-foreground/70 group-hover:text-foreground/80"
                            }`}
                          >
                            {method.title}
                          </span>
                          <div className="flex items-center gap-1 shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            {method.aiTools.length > 0 && (
                              <Bot className="w-3 h-3 text-clay/40" />
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : (
          <ToolsSidebarList />
        )}
      </ScrollArea>
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="px-5 sm:px-8 lg:px-10 pt-8 pb-5 sm:pt-12 sm:pb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display text-foreground leading-tight">
            AI × UX Design Framework
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground/60 mt-1.5 max-w-xl font-body leading-relaxed">
            {methods.length} methods across {phases.length} phases — a practical toolkit for integrating AI into every stage of UX design.
          </p>
        </div>
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg bg-card border border-border"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Two-panel layout */}
      <div className="flex border-t border-border" style={{ height: "calc(100vh - 100px)" }}>
        {/* ── Desktop Sidebar ── */}
        <aside className="w-[300px] lg:w-[340px] shrink-0 border-r border-border bg-card/50 hidden md:flex flex-col">
          {sidebarContent}
        </aside>

        {/* ── Mobile Sidebar Overlay ── */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setMobileOpen(false)}
              />
              <motion.aside
                initial={{ x: -320 }}
                animate={{ x: 0 }}
                exit={{ x: -320 }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
                className="fixed left-0 top-0 bottom-0 w-[300px] bg-card border-r border-border z-50 flex flex-col md:hidden"
              >
                <div className="flex items-center justify-between px-5 pt-4 pb-2">
                  <span className="text-sm font-display text-foreground">Navigate</span>
                  <button onClick={() => setMobileOpen(false)} className="p-1">
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
                {sidebarContent}
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* ── Main Detail Panel ── */}
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            {viewMode === "methods" ? (
              <motion.div
                key={activeMethodId}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <MethodDetail method={activeMethod} onMethodClick={handleMethodClick} />
              </motion.div>
            ) : (
              <motion.div
                key="tools"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <ToolsView />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Double Diamond */}
          <div className="px-6 sm:px-8 lg:px-12 pt-8">
            <DoubleDiamond />
          </div>

          <FeedbackForm />
        </main>
      </div>
    </div>
  );
};

/* ── Tools sidebar list ── */
function ToolsSidebarList() {
  const toolCategories = getToolCategories();
  return (
    <div className="pb-8">
      {toolCategories.map(({ category, tools }) => (
        <div key={category} className="mb-1">
          <div className="flex items-center gap-2 px-5 pt-5 pb-2">
            <span className="text-[10px] font-body font-semibold uppercase tracking-[0.15em] text-muted-foreground/50">
              {category}
            </span>
            <span className="text-[9px] text-muted-foreground/30 font-body ml-auto">{tools.length}</span>
          </div>
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="flex items-center gap-2.5 px-5 py-2 mx-2 rounded-lg hover:bg-foreground/[0.03] transition-colors cursor-default"
            >
              <ToolLogo name={tool.name} type={tool.type} size="sm" />
              <span className="text-[13px] font-body text-muted-foreground/70 truncate">{tool.name}</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function getToolCategories() {
  const toolMap = new Map<string, { name: string; type: "ai" | "traditional" }>();
  methods.forEach((method) => {
    [...method.aiTools, ...method.traditionalTools].forEach((tool) => {
      if (!toolMap.has(tool.name)) {
        toolMap.set(tool.name, { name: tool.name, type: tool.type });
      }
    });
  });
  const aiTools = Array.from(toolMap.values()).filter((t) => t.type === "ai").sort((a, b) => a.name.localeCompare(b.name));
  const tradTools = Array.from(toolMap.values()).filter((t) => t.type === "traditional").sort((a, b) => a.name.localeCompare(b.name));
  return [
    { category: "AI Tools", tools: aiTools },
    { category: "Traditional", tools: tradTools },
  ];
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
    <div className="px-6 sm:px-8 lg:px-12 pb-16 pt-6">
      <div className="max-w-3xl rounded-xl border border-border bg-card/60 p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-3">
          <MessageSquare className="w-4 h-4 text-clay" />
          <span className="text-sm font-display text-foreground">Feedback</span>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          {sent ? (
            <div className="text-sm font-body text-foreground/70 py-2">✓ Thanks for your feedback!</div>
          ) : (
            <>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, maxLen))}
                placeholder="What would you add, change, or improve?"
                rows={2}
                disabled={sending}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring resize-none disabled:opacity-50"
              />
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-muted-foreground/30 font-body">{message.length}/{maxLen}</span>
                <button
                  type="submit"
                  disabled={!message.trim() || sending}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-body font-medium bg-foreground text-background hover:opacity-90 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed"
                >
                  {sending ? "Sending…" : "Send"}
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Index;
