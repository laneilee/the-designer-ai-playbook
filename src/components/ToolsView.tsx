import { useState } from "react";
import { methods } from "@/data/methods";
import ToolLogo from "@/components/ToolLogo";
import { Copy, Check, X, Sparkles, Wrench, Bot, Search as SearchIcon, Layers, FlaskConical, PenTool, Users, FileText, BarChart3, Eye } from "lucide-react";
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

interface PromptEntry {
  methodTitle: string;
  prompt: string;
}

interface ToolInfo {
  name: string;
  description: string;
  type: "ai" | "traditional";
  usedIn: string[];
  category: ToolCategory;
  prompts: PromptEntry[];
}

function getUniqueTools(): ToolInfo[] {
  const toolMap = new Map<string, ToolInfo>();

  methods.forEach((method) => {
    [...method.aiTools, ...method.traditionalTools].forEach((tool) => {
      const existing = toolMap.get(tool.name);
      if (existing) {
        if (!existing.usedIn.includes(method.title)) {
          existing.usedIn.push(method.title);
        }
        if (tool.promptGuide) {
          existing.prompts.push({ methodTitle: method.title, prompt: tool.promptGuide });
        }
      } else {
        toolMap.set(tool.name, {
          name: tool.name,
          description: tool.description,
          type: tool.type,
          usedIn: [method.title],
          category: toolCategoryMap[tool.name] || "Documentation",
          prompts: tool.promptGuide ? [{ methodTitle: method.title, prompt: tool.promptGuide }] : [],
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

function PromptCard({ entry }: { entry: PromptEntry }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(entry.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl bg-accent/30 border border-border/50 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-body font-semibold text-muted-foreground uppercase tracking-wider">
          {entry.methodTitle}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-body text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-background/50"
        >
          {copied ? (
            <><Check className="w-3.5 h-3.5" /> Copied</>
          ) : (
            <><Copy className="w-3.5 h-3.5" /> Copy</>
          )}
        </button>
      </div>
      <p className="text-sm font-body text-foreground/80 leading-relaxed">{entry.prompt}</p>
    </div>
  );
}

function ToolCard({ tool, onOpenPrompts }: { tool: ToolInfo; onOpenPrompts: (tool: ToolInfo) => void }) {
  const hasPrompts = tool.prompts.length > 0;

  return (
    <div className="group relative rounded-xl border border-border bg-card p-4 hover:border-foreground/20 hover:shadow-sm transition-all">
      {/* Type badge */}
      <div className="absolute top-3 right-3">
        {tool.type === "ai" ? (
          <span className="inline-flex items-center gap-1 text-[10px] font-body font-medium px-2 py-0.5 rounded-full bg-clay/10 text-clay">
            <Sparkles className="w-3 h-3" /> AI
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-[10px] font-body font-medium px-2 py-0.5 rounded-full bg-foreground/5 text-muted-foreground">
            <Wrench className="w-3 h-3" />
          </span>
        )}
      </div>

      <div className="flex items-start gap-3">
        <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 flex items-center justify-center bg-background border border-border/50">
          <ToolLogo name={tool.name} type={tool.type} size="md" />
        </div>
        <div className="flex-1 min-w-0 pr-12">
          <h3 className="text-sm font-display font-medium text-foreground truncate">{tool.name}</h3>
          <p className="text-xs font-body text-muted-foreground leading-relaxed mt-1 line-clamp-2">
            {tool.description}
          </p>
        </div>
      </div>

      {/* Used in */}
      <div className="mt-3 pt-3 border-t border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {tool.usedIn.slice(0, 2).map((m) => (
              <span
                key={m}
                className="text-[10px] px-2 py-0.5 rounded-md bg-secondary/80 text-secondary-foreground font-body"
              >
                {m}
              </span>
            ))}
            {tool.usedIn.length > 2 && (
              <span className="text-[10px] text-muted-foreground font-body">
                +{tool.usedIn.length - 2}
              </span>
            )}
          </div>
          {hasPrompts && (
            <button
              onClick={() => onOpenPrompts(tool)}
              className="text-[11px] font-body font-medium text-clay hover:text-clay/80 transition-colors"
            >
              {tool.prompts.length} guidance prompt{tool.prompts.length > 1 ? "s" : ""} →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function PromptPanel({ tool, onClose }: { tool: ToolInfo; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-foreground/10 backdrop-blur-sm" onClick={onClose} />
      
      {/* Panel */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative w-full max-w-lg bg-card border-l border-border shadow-xl overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center bg-background border border-border/50">
              <ToolLogo name={tool.name} type={tool.type} size="md" />
            </div>
            <div>
              <h2 className="text-base font-display font-medium text-foreground">{tool.name}</h2>
              <p className="text-xs font-body text-muted-foreground">
                {tool.prompts.length} guidance prompt{tool.prompts.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-accent transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        {/* Prompts */}
        <div className="p-6 space-y-4">
          <p className="text-xs font-body text-muted-foreground">
            Copy these guidance prompts to use {tool.name} effectively in different design workflows.
          </p>
          {tool.prompts.map((entry, idx) => (
            <PromptCard key={idx} entry={entry} />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ToolsView() {
  const grouped = getToolsByCategory();
  const allTools = grouped.flatMap((g) => g.tools);
  const [selectedTool, setSelectedTool] = useState<ToolInfo | null>(null);
  const [filter, setFilter] = useState<"all" | "ai" | "traditional">("all");

  const aiCount = allTools.filter((t) => t.type === "ai").length;
  const tradCount = allTools.filter((t) => t.type === "traditional").length;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 py-8 lg:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-2xl lg:text-3xl font-display text-foreground">Tools Directory</h2>
          <p className="text-sm font-body text-muted-foreground mt-1">
            {allTools.length} tools referenced across the playbook
          </p>
        </div>
        
        {/* Filter pills */}
        <div className="flex items-center gap-2 bg-accent/50 rounded-lg p-1">
          <button
            onClick={() => setFilter("all")}
            className={`text-xs font-body font-medium px-3 py-1.5 rounded-md transition-all ${
              filter === "all" 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All ({allTools.length})
          </button>
          <button
            onClick={() => setFilter("ai")}
            className={`text-xs font-body font-medium px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
              filter === "ai" 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Sparkles className="w-3 h-3" /> AI ({aiCount})
          </button>
          <button
            onClick={() => setFilter("traditional")}
            className={`text-xs font-body font-medium px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
              filter === "traditional" 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Wrench className="w-3 h-3" /> Traditional ({tradCount})
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-10">
        {grouped.map(({ category, tools }) => {
          const filteredTools = tools.filter((t) => 
            filter === "all" || t.type === filter
          );
          if (filteredTools.length === 0) return null;

          const CategoryIcon = categoryIcons[category];

          return (
            <section key={category}>
              {/* Category header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center">
                  <CategoryIcon className="w-4 h-4 text-foreground/60" />
                </div>
                <h3 className="text-lg font-display text-foreground">{category}</h3>
                <span className="text-xs font-body text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">
                  {filteredTools.length}
                </span>
              </div>

              {/* Tools grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredTools.map((tool) => (
                  <ToolCard 
                    key={tool.name} 
                    tool={tool} 
                    onOpenPrompts={setSelectedTool}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>

      {/* Prompt panel */}
      <AnimatePresence>
        {selectedTool && (
          <PromptPanel tool={selectedTool} onClose={() => setSelectedTool(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
