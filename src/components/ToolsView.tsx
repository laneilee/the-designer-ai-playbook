import { useState } from "react";
import { methods } from "@/data/methods";
import { getPromptsForTool, type PersonaPrompt } from "@/data/personaPrompts";
import ToolLogo from "@/components/ToolLogo";
import {
  Copy, Check, X, Sparkles, Wrench, Bot, User,
  Layers, FlaskConical, PenTool, Users, FileText, BarChart3, Eye, Search as SearchIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export type ToolCategory =
  | "AI Assistants"
  | "Research"
  | "Design"
  | "Prototyping"
  | "Collaboration"
  | "Testing"
  | "Accessibility"
  | "Documentation"
  | "Analytics";

const toolCategoryMap: Record<string, ToolCategory> = {
  "ChatGPT": "AI Assistants",
  "Claude": "AI Assistants",
  "Perplexity": "Research",
  "Otter.ai": "Research",
  "Dovetail": "Research",
  "Zoom / Teams": "Research",
  "Optimal Workshop": "Research",
  "Figma": "Design",
  "Figma AI": "Design",
  "Midjourney / DALL-E": "Design",
  "Lovable": "Prototyping",
  "v0 by Vercel": "Prototyping",
  "Cursor / Copilot": "Prototyping",
  "Framer": "Prototyping",
  "Miro / FigJam": "Collaboration",
  "Maze": "Testing",
  "Lookback / UserTesting": "Testing",
  "axe AI": "Accessibility",
  "axe DevTools": "Accessibility",
  "Notion / Confluence": "Documentation",
  "Storybook": "Documentation",
  "Zeplin": "Documentation",
  "Amplitude / Mixpanel": "Analytics",
  "Hotjar / FullStory": "Analytics",
};

const categoryOrder: ToolCategory[] = [
  "AI Assistants",
  "Research",
  "Design",
  "Prototyping",
  "Collaboration",
  "Testing",
  "Accessibility",
  "Documentation",
  "Analytics",
];

const categoryIcons: Record<ToolCategory, React.ElementType> = {
  "AI Assistants": Bot,
  "Research": SearchIcon,
  "Design": PenTool,
  "Prototyping": Layers,
  "Collaboration": Users,
  "Testing": FlaskConical,
  "Accessibility": Eye,
  "Documentation": FileText,
  "Analytics": BarChart3,
};

interface ToolInfo {
  name: string;
  description: string;
  type: "ai" | "traditional";
  usedIn: string[];
  category: ToolCategory;
  personaPrompts: PersonaPrompt[];
}

function getUniqueTools(): ToolInfo[] {
  const toolMap = new Map<string, ToolInfo>();
  methods.forEach((method) => {
    [...method.aiTools, ...method.traditionalTools].forEach((tool) => {
      const existing = toolMap.get(tool.name);
      if (existing) {
        if (!existing.usedIn.includes(method.title)) existing.usedIn.push(method.title);
      } else {
        toolMap.set(tool.name, {
          name: tool.name,
          description: tool.description,
          type: tool.type,
          usedIn: [method.title],
          category: toolCategoryMap[tool.name] || "Documentation",
          personaPrompts: getPromptsForTool(tool.name),
        });
      }
    });
  });
  return Array.from(toolMap.values());
}

export function getToolsByCategory() {
  const tools = getUniqueTools();
  return categoryOrder
    .map((cat) => ({
      category: cat,
      tools: tools.filter((t) => t.category === cat).sort((a, b) => a.name.localeCompare(b.name)),
    }))
    .filter((g) => g.tools.length > 0);
}

/* ── Prompt Guide Card ── */
function PersonaPromptCard({ prompt }: { prompt: PersonaPrompt }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="rounded-xl border border-border bg-background p-5 space-y-4">
      {/* Persona header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-9 h-9 rounded-full bg-clay/10 flex items-center justify-center shrink-0 mt-0.5">
            <User className="w-4 h-4 text-clay" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-display font-semibold text-foreground leading-snug">{prompt.persona}</p>
            <p className="text-xs font-body text-muted-foreground mt-0.5">{prompt.subtitle}</p>
          </div>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 shrink-0 text-xs font-body text-muted-foreground hover:text-foreground transition-colors px-2.5 py-1.5 rounded-lg border border-border hover:border-foreground/20 bg-secondary/50"
        >
          {copied ? <><Check className="w-3 h-3" />Copied</> : <><Copy className="w-3 h-3" />Copy</>}
        </button>
      </div>

      {/* Description */}
      <p className="text-xs font-body text-muted-foreground/80 leading-relaxed">{prompt.description}</p>

      {/* Prompt body */}
      <div className="rounded-lg bg-foreground/[0.03] border border-border/50 p-4">
        <p className="text-sm font-body text-foreground/80 leading-relaxed whitespace-pre-line">{prompt.prompt}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {prompt.tags.map((tag) => (
          <span key={tag} className="text-[10px] font-body font-medium px-2 py-0.5 rounded-full bg-clay/10 text-clay">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Tool Card ── */
function ToolCard({ tool, onOpenPrompts }: { tool: ToolInfo; onOpenPrompts: (tool: ToolInfo) => void }) {
  const promptCount = tool.personaPrompts.length;
  return (
    <div className="flex flex-col rounded-xl border border-border bg-card hover:border-foreground/15 hover:shadow-sm transition-all duration-200">
      <div className="flex items-start gap-4 p-5">
        <div className="w-12 h-12 rounded-xl shrink-0 flex items-center justify-center bg-background border border-border/60 overflow-hidden">
          <ToolLogo name={tool.name} type={tool.type} size="md" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <span className="text-sm font-display font-medium text-foreground leading-snug">{tool.name}</span>
            {tool.type === "ai" ? (
              <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-body font-semibold px-2 py-0.5 rounded-full bg-clay/10 text-clay">
                <Sparkles className="w-2.5 h-2.5" /> AI
              </span>
            ) : (
              <span className="shrink-0 inline-flex items-center gap-1 text-[10px] font-body font-medium px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">
                <Wrench className="w-2.5 h-2.5" />
              </span>
            )}
          </div>
          <p className="text-xs font-body text-muted-foreground leading-relaxed mt-1.5">
            {tool.description}
          </p>
        </div>
      </div>

      <div className="px-5 pb-4 mt-auto">
        <div className="pt-3 border-t border-border/50 flex items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5 min-w-0">
            {tool.usedIn.slice(0, 2).map((m) => (
              <span key={m} className="text-[10px] font-body px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground truncate max-w-[120px]">
                {m}
              </span>
            ))}
            {tool.usedIn.length > 2 && (
              <span className="text-[10px] font-body text-muted-foreground/60">+{tool.usedIn.length - 2}</span>
            )}
          </div>
      {promptCount > 0 && (
            <button
              onClick={() => onOpenPrompts(tool)}
              className="shrink-0 inline-flex items-center gap-1.5 text-[11px] font-body font-semibold px-3 py-1.5 rounded-lg bg-clay/10 text-clay hover:bg-clay/20 border border-clay/20 transition-all whitespace-nowrap"
            >
              <Sparkles className="w-3 h-3" />
              {promptCount} Prompt Guide{promptCount > 1 ? "s" : ""}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Prompt Guides Panel ── */
function PromptPanel({ tool, onClose }: { tool: ToolInfo; onClose: () => void }) {
  const prompts = tool.personaPrompts;
  const uniquePersonas = [...new Set(prompts.map((p) => p.persona))];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end"
    >
      <div className="absolute inset-0 bg-foreground/10 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative w-full max-w-2xl bg-card border-l border-border shadow-xl overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-5 flex items-center justify-between z-10">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl overflow-hidden flex items-center justify-center bg-background border border-border/60">
              <ToolLogo name={tool.name} type={tool.type} size="md" />
            </div>
            <div>
              <h2 className="text-base font-display font-medium text-foreground">{tool.name}</h2>
              <p className="text-xs font-body text-muted-foreground mt-0.5">
                {uniquePersonas.length} expert role{uniquePersonas.length > 1 ? "s" : ""} · {prompts.length} prompt guide{prompts.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-accent transition-colors">
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          <div className="rounded-xl bg-clay/5 border border-clay/15 p-4 space-y-2">
            <p className="text-sm font-body text-foreground font-medium">🎯 Ready-to-use prompt guides for {tool.name}</p>
            <p className="text-xs font-body text-muted-foreground leading-relaxed">
              Whether you're just starting out or a seasoned pro — each guide gives you an expert-level prompt you can copy and paste directly. Just fill in the <span className="text-foreground font-medium">[bracketed fields]</span> with your project details.
            </p>
          </div>

          {prompts.map((prompt) => (
            <PersonaPromptCard key={prompt.id} prompt={prompt} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Main View ── */
export default function ToolsView() {
  const grouped = getToolsByCategory();
  const allTools = grouped.flatMap((g) => g.tools);
  const [selectedTool, setSelectedTool] = useState<ToolInfo | null>(null);
  const [filter, setFilter] = useState<"all" | "ai" | "traditional">("all");

  const aiCount = allTools.filter((t) => t.type === "ai").length;
  const tradCount = allTools.filter((t) => t.type === "traditional").length;

  return (
    <div className="px-6 lg:px-10 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-xl lg:text-2xl font-display text-foreground">Tools Directory</h2>
          <p className="text-sm font-body text-muted-foreground mt-0.5">
            {allTools.length} tools across the playbook
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-1 p-1 bg-secondary/60 rounded-xl border border-border">
          {(["all", "ai", "traditional"] as const).map((f) => {
            const label = f === "all" ? `All (${allTools.length})` : f === "ai" ? `AI (${aiCount})` : `Traditional (${tradCount})`;
            const icon = f === "ai" ? <Sparkles className="w-3 h-3" /> : f === "traditional" ? <Wrench className="w-3 h-3" /> : null;
            return (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex items-center gap-1.5 text-xs font-body font-medium px-3 py-2 rounded-lg transition-all whitespace-nowrap ${
                  filter === f
                    ? "bg-background text-foreground shadow-sm border border-border"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {icon}{label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-8">
        {grouped.map(({ category, tools }) => {
          const filtered = tools.filter((t) => filter === "all" || t.type === filter);
          if (filtered.length === 0) return null;
          const CategoryIcon = categoryIcons[category];

          return (
            <section key={category}>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-lg bg-foreground/[0.06] flex items-center justify-center">
                  <CategoryIcon className="w-3.5 h-3.5 text-foreground/50" />
                </div>
                <span className="text-sm font-display font-medium text-foreground">{category}</span>
                <div className="h-px flex-1 bg-border" />
                <span className="text-xs font-body text-muted-foreground">{filtered.length}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {filtered.map((tool) => (
                  <ToolCard key={tool.name} tool={tool} onOpenPrompts={setSelectedTool} />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Prompt slide-out panel */}
      <AnimatePresence>
        {selectedTool && (
          <PromptPanel tool={selectedTool} onClose={() => setSelectedTool(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
