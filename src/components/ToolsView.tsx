import { methods } from "@/data/methods";
import ToolLogo from "@/components/ToolLogo";

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

  const renderSection = (title: string, items: ToolInfo[]) => (
    <div className="mb-10">
      <h3 className="text-[11px] font-body font-medium uppercase tracking-widest text-muted-foreground mb-4">
        {title}
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((tool) => (
          <div key={tool.name} className="tool-card">
            <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-accent">
              <ToolLogo name={tool.name} type={tool.type} size="lg" />
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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 py-8 lg:py-12">
      <h2 className="text-2xl lg:text-3xl font-display mb-2">Tools Directory</h2>
      <p className="text-sm text-muted-foreground mb-8">
        Every AI and traditional tool referenced across the framework.
      </p>
      {renderSection("AI Tools", aiTools)}
      {renderSection("Traditional Tools", traditionalTools)}
    </div>
  );
}
