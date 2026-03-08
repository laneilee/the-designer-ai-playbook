import { useState } from "react";
import { methods } from "@/data/methods";
import MethodSidebar from "@/components/MethodSidebar";
import MethodDetail from "@/components/MethodDetail";
import ToolsView from "@/components/ToolsView";
import { Menu, X } from "lucide-react";

const Index = () => {
  const [activeMethod, setActiveMethod] = useState(methods[0].id);
  const [view, setView] = useState<"methods" | "tools">("methods");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const selectedMethod = methods.find((m) => m.id === activeMethod) || methods[0];

  const handleSelect = (id: string) => {
    setActiveMethod(id);
    setView("methods");
    setSidebarOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl lg:text-3xl font-display text-foreground">
              AI × UX Design Framework
            </h1>
            <p className="text-sm text-muted-foreground mt-1 font-body">
              Build with craft — AI-enhanced methods and tools for modern UX design.
            </p>
          </div>
          <button
            className="lg:hidden p-2 rounded-md hover:bg-secondary transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Content */}
      <div className="flex relative">
        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-ink/20 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div
          className={`fixed lg:static z-40 h-[calc(100vh-73px)] transition-transform duration-200 lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <MethodSidebar
            activeMethod={activeMethod}
            onSelect={handleSelect}
            view={view}
            onViewChange={(v) => {
              setView(v);
              setSidebarOpen(false);
            }}
          />
        </div>

        {/* Detail */}
        {view === "methods" ? (
          <MethodDetail method={selectedMethod} />
        ) : (
          <ToolsView />
        )}
      </div>
    </div>
  );
};

export default Index;
