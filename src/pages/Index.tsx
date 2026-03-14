import { useState, useEffect } from "react";
import { methods, phases, type Phase } from "@/data/methods";
import { phaseColors } from "@/data/phaseColors";
import MethodDetail from "@/components/MethodDetail";
import ToolsView, { getToolsByCategory } from "@/components/ToolsView";
import ToolLogo from "@/components/ToolLogo";
import DoubleDiamond from "@/components/DoubleDiamond";
import FoundationsView, { foundationSections, type FoundationSectionId } from "@/components/FoundationsView";

import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot, Users, MessageSquare, ArrowRight, Compass, Target,
  Lightbulb, PenTool, FlaskConical, Handshake, Menu, X, Search,
  Shield,
} from "lucide-react";

type ViewMode = "foundations" | "methods" | "tools";

const phaseIcons: Record<Phase, React.ElementType> = {
  Align: Handshake,
  Discovery: Compass,
  Define: Target,
  Design: PenTool,
  Validate: FlaskConical,
  Handoff: ArrowRight,
};

const Index = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("foundations");
  const [activeMethodId, setActiveMethodId] = useState<string>("review-previous-research");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFoundationSection, setActiveFoundationSection] = useState<FoundationSectionId>("to-ai-or-not");

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

  const handlePhaseClick = (phase: Phase) => {
    const firstMethod = methods.find((m) => m.phase === phase);
    if (firstMethod) {
      setActiveMethodId(firstMethod.id);
      setViewMode("methods");
    }
  };

  const handleFoundationSectionClick = (sectionId: FoundationSectionId) => {
    setActiveFoundationSection(sectionId);
    setViewMode("foundations");
    setMobileOpen(false);
  };

  const sidebarContent = (
    <>
      {/* Methods / Tools toggle */}
      <div className="flex items-center gap-1 px-5 pt-5 pb-4">
        <button
          onClick={() => setViewMode("foundations")}
          className={`text-[15px] font-display transition-all duration-200 ${
            viewMode === "foundations"
              ? "text-foreground"
              : "text-muted-foreground/30 hover:text-muted-foreground/60"
          }`}
        >
          Foundations
        </button>
        <span className="text-muted-foreground/20 font-body mx-2">/</span>
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

      {viewMode === "foundations" ? (
        <ScrollArea className="flex-1">
          <div className="pb-8">
            <div className="flex items-center gap-2 px-5 pt-5 pb-2">
              <Shield className="w-4 h-4 text-clay" />
              <span className="text-xs font-body font-semibold uppercase tracking-[0.15em] text-clay">
                Foundations
              </span>
            </div>
            {foundationSections.map((section) => {
              const isActive = activeFoundationSection === section.id;
              const SectionIcon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => handleFoundationSectionClick(section.id)}
                  className="w-full text-left group relative"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFoundation"
                      className="absolute left-0 top-1 bottom-1 w-[3px] rounded-r-full bg-clay"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <div
                    className={`flex items-center gap-2.5 px-5 py-2.5 mx-2 rounded-lg transition-all duration-150 ${
                      isActive
                        ? "bg-foreground/5"
                        : "hover:bg-foreground/[0.03]"
                    }`}
                  >
                    <SectionIcon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-clay" : "text-muted-foreground/40"}`} />
                    <span
                      className={`text-sm font-body transition-colors ${
                        isActive
                          ? "text-foreground font-medium"
                          : "text-muted-foreground group-hover:text-foreground/80"
                      }`}
                    >
                      {section.label}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>
      ) : (
        <>
          {/* Search input */}
          <div className="px-4 pb-3">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={viewMode === "methods" ? "Search methods…" : "Search tools…"}
                className="w-full h-8 pl-8 pr-3 rounded-lg border border-border bg-background text-sm font-body text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-0.5"
                >
                  <X className="w-3 h-3 text-muted-foreground/50" />
                </button>
              )}
            </div>
          </div>

          <ScrollArea className="flex-1">
            {viewMode === "methods" ? (
              <div className="pb-8">
                {phases.map((phase) => {
                  const phaseMethods = methods.filter((m) => m.phase === phase && m.title.toLowerCase().includes(searchQuery.toLowerCase()));
                  if (searchQuery && phaseMethods.length === 0) return null;
                  const colors = phaseColors[phase];
                  const PhaseIcon = phaseIcons[phase];

                  return (
                    <div key={phase} className="mb-1">
                      <div className="flex items-center gap-2 px-5 pt-5 pb-2">
                        <div
                          className="w-5 h-5 rounded-md flex items-center justify-center"
                          style={{ background: colors.accentBg }}
                        >
                          <PhaseIcon className="w-3 h-3" style={{ color: colors.accent }} />
                        </div>
                        <span
                          className="text-xs font-body font-semibold uppercase tracking-[0.15em]"
                          style={{ color: colors.accent }}
                        >
                          {phase}
                        </span>
                        <span className="text-[11px] text-muted-foreground/50 font-body ml-auto">
                          {phaseMethods.length}
                        </span>
                      </div>

                      {phaseMethods.map((method) => {
                        const isActive = activeMethodId === method.id && viewMode === "methods";
                        return (
                          <button
                            key={method.id}
                            onClick={() => handleMethodClick(method.id)}
                            className="w-full text-left group relative"
                          >
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
                                className={`text-sm font-body transition-colors truncate ${
                                  isActive
                                    ? "text-foreground font-medium"
                                    : "text-muted-foreground group-hover:text-foreground/80"
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
              <ToolsSidebarList searchQuery={searchQuery} />
            )}
          </ScrollArea>
        </>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <header className="px-5 sm:px-8 lg:px-10 pt-8 pb-5 sm:pt-12 sm:pb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-display text-foreground leading-tight">
            The AI Design Playbook
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground/60 mt-1.5 max-w-xl font-body leading-relaxed">
            Practical methods and AI tools to elevate every phase of your UX process.
          </p>
          {/* Quick nav cards */}
          <div className="flex flex-col sm:flex-row items-stretch gap-3 mt-4">
            <button
              onClick={() => setViewMode("foundations")}
              className={`group flex items-start gap-3 px-4 py-3 rounded-xl border text-left transition-all w-full sm:w-auto ${
                viewMode === "foundations"
                  ? "bg-foreground/[0.06] border-foreground/20"
                  : "bg-card/40 border-border hover:border-foreground/15 hover:bg-foreground/[0.03]"
              }`}
            >
              <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                viewMode === "foundations" ? "bg-foreground text-background" : "bg-foreground/10 text-foreground/60 group-hover:bg-foreground/15"
              }`}>
                <Shield className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-sm font-display font-medium text-foreground">Foundations</span>
                <p className="text-xs font-body text-muted-foreground/60 mt-0.5 leading-relaxed">
                  Should you use AI? Evaluate fit, ethics, and readiness first.
                </p>
                <span className={`inline-flex items-center gap-1 text-[11px] font-body font-medium mt-1.5 transition-colors ${
                  viewMode === "foundations" ? "text-foreground" : "text-muted-foreground/40 group-hover:text-foreground/60"
                }`}>
                  Start here <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </button>

            <button
              onClick={() => setViewMode("methods")}
              className={`group flex items-start gap-3 px-4 py-3 rounded-xl border text-left transition-all w-full sm:w-auto ${
                viewMode === "methods"
                  ? "bg-foreground/[0.06] border-foreground/20"
                  : "bg-card/40 border-border hover:border-foreground/15 hover:bg-foreground/[0.03]"
              }`}
            >
              <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                viewMode === "methods" ? "bg-foreground text-background" : "bg-foreground/10 text-foreground/60 group-hover:bg-foreground/15"
              }`}>
                <Lightbulb className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-sm font-display font-medium text-foreground">Methods</span>
                <p className="text-xs font-body text-muted-foreground/60 mt-0.5 leading-relaxed">
                  Step-by-step UX techniques powered by AI — from research to handoff.
                </p>
                <span className={`inline-flex items-center gap-1 text-[11px] font-body font-medium mt-1.5 transition-colors ${
                  viewMode === "methods" ? "text-foreground" : "text-muted-foreground/40 group-hover:text-foreground/60"
                }`}>
                  Explore methods <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </button>

            <button
              onClick={() => setViewMode("tools")}
              className={`group flex items-start gap-3 px-4 py-3 rounded-xl border text-left transition-all w-full sm:w-auto ${
                viewMode === "tools"
                  ? "bg-foreground/[0.06] border-foreground/20"
                  : "bg-card/40 border-border hover:border-foreground/15 hover:bg-foreground/[0.03]"
              }`}
            >
              <div className={`mt-0.5 w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                viewMode === "tools" ? "bg-foreground text-background" : "bg-foreground/10 text-foreground/60 group-hover:bg-foreground/15"
              }`}>
                <Bot className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-sm font-display font-medium text-foreground">Tools</span>
                <p className="text-xs font-body text-muted-foreground/60 mt-0.5 leading-relaxed">
                  AI and traditional tools curated for every design workflow.
                </p>
                <span className={`inline-flex items-center gap-1 text-[11px] font-body font-medium mt-1.5 transition-colors ${
                  viewMode === "tools" ? "text-foreground" : "text-muted-foreground/40 group-hover:text-foreground/60"
                }`}>
                  Browse tools <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </button>
          </div>
        </div>
        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg bg-card border border-border"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Process Diagram */}
      <div className="px-5 sm:px-8 lg:px-10 pb-5">
        <DoubleDiamond onPhaseClick={handlePhaseClick} />
      </div>

      {/* Two-panel layout */}
      <div className="flex border-t border-border" style={{ height: "calc(100vh - 280px)" }}>
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
            {viewMode === "foundations" ? (
              <motion.div
                key="foundations"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <FoundationsView />
              </motion.div>
            ) : viewMode === "methods" ? (
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


          <FeedbackForm />
        </main>
      </div>
    </div>
  );
};

/* ── Tools sidebar list ── */
function ToolsSidebarList({ searchQuery = "" }: { searchQuery?: string }) {
  const toolCategories = getToolsByCategory();
  return (
    <div className="pb-8">
      {toolCategories.map(({ category, tools: catTools }) => {
        const filtered = catTools.filter((t) => t.name.toLowerCase().includes(searchQuery.toLowerCase()));
        if (searchQuery && filtered.length === 0) return null;
        return (
          <div key={category} className="mb-1">
            <div className="flex items-center gap-2 px-5 pt-5 pb-2">
              <span className="text-xs font-body font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                {category}
              </span>
              <span className="text-[11px] text-muted-foreground/50 font-body ml-auto">{filtered.length}</span>
            </div>
            {filtered.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center gap-2.5 px-5 py-2 mx-2 rounded-lg hover:bg-foreground/[0.03] transition-colors cursor-default"
              >
                <ToolLogo name={tool.name} type={tool.type} size="sm" />
                <span className="text-sm font-body text-muted-foreground truncate">{tool.name}</span>
              </div>
            ))}
          </div>
        );
      })}
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
