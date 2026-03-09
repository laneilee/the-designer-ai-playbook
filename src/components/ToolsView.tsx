import { useState } from "react";
import { methods } from "@/data/methods";
import ToolLogo from "@/components/ToolLogo";
import { ChevronDown, ChevronRight, Copy, Check } from "lucide-react";

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

// Maps each tool name to its functional category
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
  "Google Docs": "Documentation",
  "Spreadsheets": "Documentation",
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

function PromptCard({ entry, idx }: { entry: PromptEntry; idx: number }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(entry.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg bg-background/60 border border-border/50 p-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[10px] font-body font-medium text-muted-foreground/60 uppercase tracking-wider">
          {entry.methodTitle}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[10px] font-body text-muted-foreground/40 hover:text-foreground/60 transition-colors"
        >
          {copied ? (
            <><Check className="w-3 h-3" /> Copied</>
          ) : (
            <><Copy className="w-3 h-3" /> Copy</>
          )}
        </button>
      </div>
      <p className="text-xs font-body text-foreground/60 leading-relaxed">{entry.prompt}</p>
    </div>
  );
}

export default function ToolsView() {
  const grouped = getToolsByCategory();
  const allTools = grouped.flatMap((g) => g.tools);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(categoryOrder)
  );
  const [expandedTool, setExpandedTool] = useState<string | null>(null);

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
      <div className="mb-6">
        <h2 className="text-2xl lg:text-3xl font-display mb-1">Tools Directory</h2>
        <p className="text-sm text-muted-foreground">
          {allTools.length} tools referenced across the playbook, organized by what they're for.
        </p>
      </div>

      <div className="space-y-3">
        {grouped.map(({ category, tools }) => {
          const isExpanded = expandedGroups.has(category);
          return (
            <div key={category} className="rounded-xl border border-border bg-card overflow-hidden">
              <button
                onClick={() => toggleGroup(category)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-display text-foreground">{category}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-body">
                    {tools.length}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <ChevronRight className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
              {isExpanded && (
                <div className="px-5 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {tools.map((tool) => {
                    const hasPrompts = tool.prompts.length > 0;
                    const isToolExpanded = expandedTool === tool.name;

                    return (
                      <div
                        key={tool.name}
                        className={`rounded-lg bg-accent/40 overflow-hidden transition-all ${
                          hasPrompts ? "cursor-pointer" : ""
                        } ${isToolExpanded ? "sm:col-span-2" : ""}`}
                      >
                        <div
                          className="flex items-start gap-3 p-3"
                          onClick={() => hasPrompts && setExpandedTool(isToolExpanded ? null : tool.name)}
                        >
                          <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-background">
                            <ToolLogo name={tool.name} type={tool.type} size="md" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-foreground truncate">{tool.name}</span>
                              {hasPrompts && (
                                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-foreground/10 text-foreground/50 font-body shrink-0">
                                  {tool.prompts.length} prompt{tool.prompts.length > 1 ? "s" : ""}
                                </span>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed mt-0.5 line-clamp-2">
                              {tool.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mt-1.5">
                              {tool.usedIn.slice(0, 2).map((m) => (
                                <span
                                  key={m}
                                  className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground"
                                >
                                  {m}
                                </span>
                              ))}
                              {tool.usedIn.length > 2 && (
                                <span className="text-[10px] text-muted-foreground">
                                  +{tool.usedIn.length - 2} more
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Prompt guides */}
                        {isToolExpanded && hasPrompts && (
                          <div className="px-3 pb-3 space-y-2">
                            <div className="text-[10px] font-body font-semibold uppercase tracking-widest text-muted-foreground/50 px-1">
                              Prompt guides
                            </div>
                            {tool.prompts.map((entry, idx) => (
                              <PromptCard key={idx} entry={entry} idx={idx} />
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
