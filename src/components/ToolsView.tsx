import { ScrollArea } from "@/components/ui/scroll-area";
import { methods } from "@/data/methods";
import { Bot, Wrench } from "lucide-react";

interface ToolInfo {
  name: string;
  description: string;
  type: "ai" | "traditional";
  usedIn: string[];
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
        });
      }
    });
  });

  return Array.from(toolMap.values()).sort((a, b) => {
    if (a.type !== b.type) return a.type === "ai" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

export default function ToolsView() {
  const tools = getUniqueTools();
  const aiTools = tools.filter((t) => t.type === "ai");
  const traditionalTools = tools.filter((t) => t.type === "traditional");

  const renderSection = (title: string, items: ToolInfo[], icon: React.ReactNode) => (
    <div className="mb-10">
      <h3 className="text-[11px] font-body font-medium uppercase tracking-widest text-muted-foreground mb-4 px-6 lg:px-12">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 lg:px-12">
        {items.map((tool) => (
          <div key={tool.name} className="tool-card">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center shrink-0">
              {icon}
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">{tool.name}</div>
              <div className="text-xs text-muted-foreground leading-relaxed mb-2">{tool.description}</div>
              <div className="flex flex-wrap gap-1">
                {tool.usedIn.slice(0, 3).map((m) => (
                  <span
                    key={m}
                    className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground"
                  >
                    {m}
                  </span>
                ))}
                {tool.usedIn.length > 3 && (
                  <span className="text-[10px] text-muted-foreground">
                    +{tool.usedIn.length - 3} more
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <ScrollArea className="flex-1 h-screen">
      <div className="max-w-3xl mx-auto py-8 lg:py-12">
        <h2 className="text-2xl lg:text-3xl font-display mb-2 px-6 lg:px-12">Tools Directory</h2>
        <p className="text-sm text-muted-foreground mb-8 px-6 lg:px-12">
          Every AI and traditional tool referenced across the framework.
        </p>
        {renderSection("AI Tools", aiTools, <Bot className="w-4 h-4 text-clay" />)}
        {renderSection("Traditional Tools", traditionalTools, <Wrench className="w-4 h-4 text-muted-foreground" />)}
      </div>
    </ScrollArea>
  );
}
