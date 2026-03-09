import { useState } from "react";
import { methods } from "@/data/methods";
import ToolLogo from "@/components/ToolLogo";
import { ChevronDown, ChevronRight } from "lucide-react";

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
  "dscout": "Research",
  "Zoom / Teams": "Research",
  "Optimal Workshop": "Research",
  "Figma": "Design",
  "Figma AI": "Design",
  "Midjourney / DALL-E": "Design",
  "Paper & pen": "Design",
  "Lovable": "Prototyping",
  "v0 by Vercel": "Prototyping",
  "Cursor / Copilot": "Prototyping",
  "Framer": "Prototyping",
  "Miro / FigJam": "Collaboration",
  "Sticky notes": "Collaboration",
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

interface ToolInfo {
  name: string;
  description: string;
  type: "ai" | "traditional";
  usedIn: string[];
  category: ToolCategory;
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
      } else {
        toolMap.set(tool.name, {
          name: tool.name,
          description: tool.description,
          type: tool.type,
          usedIn: [method.title],
          category: toolCategoryMap[tool.name] || "Documentation",
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

export default function ToolsView() {
  const grouped = getToolsByCategory();
  const allTools = grouped.flatMap((g) => g.tools);
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(categoryOrder)
  );

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
                  {tools.map((tool) => (
                    <div key={tool.name} className="flex items-start gap-3 p-3 rounded-lg bg-accent/40">
                      <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-background">
                        <ToolLogo name={tool.name} type={tool.type} size="md" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium text-foreground truncate block">{tool.name}</span>
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
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
