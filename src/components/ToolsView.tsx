import { useState } from "react";
import { methods } from "@/data/methods";
import ToolLogo from "@/components/ToolLogo";
import { Bot, Wrench, ChevronDown, ChevronRight } from "lucide-react";

interface ToolInfo {
  name: string;
  description: string;
  type: "ai" | "traditional";
  usedIn: string[];
  categories: string[];
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
        if (!existing.categories.includes(method.category)) {
          existing.categories.push(method.category);
        }
      } else {
        toolMap.set(tool.name, {
          name: tool.name,
          description: tool.description,
          type: tool.type,
          usedIn: [method.title],
          categories: [method.category],
        });
      }
    });
  });

  return Array.from(toolMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}

type GroupBy = "type" | "category";

const categoryOrder = ["Discovery", "Ideation", "Testing", "Design", "Handoff"];

export default function ToolsView() {
  const tools = getUniqueTools();
  const [groupBy, setGroupBy] = useState<GroupBy>("category");
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(categoryOrder));

  const toggleGroup = (group: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      if (next.has(group)) next.delete(group);
      else next.add(group);
      return next;
    });
  };

  const grouped = (() => {
    if (groupBy === "type") {
      return [
        { key: "AI-Powered Tools", items: tools.filter((t) => t.type === "ai") },
        { key: "Traditional Tools", items: tools.filter((t) => t.type === "traditional") },
      ];
    }
    return categoryOrder.map((cat) => ({
      key: cat,
      items: tools.filter((t) => t.categories.includes(cat)),
    }));
  })();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl lg:text-3xl font-display mb-1">Tools Directory</h2>
          <p className="text-sm text-muted-foreground">
            {tools.length} tools referenced across the framework.
          </p>
        </div>
        <div className="flex items-center gap-1 bg-secondary rounded-lg p-0.5 shrink-0">
          <button
            onClick={() => setGroupBy("category")}
            className={`text-xs px-3 py-1.5 rounded-md font-body transition-colors ${
              groupBy === "category"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            By Phase
          </button>
          <button
            onClick={() => setGroupBy("type")}
            className={`text-xs px-3 py-1.5 rounded-md font-body transition-colors ${
              groupBy === "type"
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            By Type
          </button>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/5 border border-primary/10">
          <Bot className="w-4 h-4 text-primary" />
          <div>
            <div className="text-lg font-display text-foreground">{tools.filter((t) => t.type === "ai").length}</div>
            <div className="text-[11px] text-muted-foreground font-body">AI-Powered Tools</div>
          </div>
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-accent border border-border">
          <Wrench className="w-4 h-4 text-muted-foreground" />
          <div>
            <div className="text-lg font-display text-foreground">{tools.filter((t) => t.type === "traditional").length}</div>
            <div className="text-[11px] text-muted-foreground font-body">Traditional Tools</div>
          </div>
        </div>
      </div>

      {/* Grouped sections */}
      <div className="space-y-3">
        {grouped.map(({ key, items }) => {
          const isExpanded = expandedGroups.has(key);
          return (
            <div key={key} className="rounded-xl border border-border bg-card overflow-hidden">
              <button
                onClick={() => toggleGroup(key)}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-display text-foreground">{key}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground font-body">
                    {items.length} tools
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
                  {items.map((tool) => (
                    <div key={tool.name} className="flex items-start gap-3 p-3 rounded-lg bg-accent/40">
                      <div className="w-9 h-9 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-background">
                        <ToolLogo name={tool.name} type={tool.type} size="md" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-foreground truncate">{tool.name}</span>
                          {tool.type === "ai" ? (
                            <Bot className="w-3 h-3 text-primary shrink-0" />
                          ) : (
                            <Wrench className="w-3 h-3 text-muted-foreground shrink-0" />
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
