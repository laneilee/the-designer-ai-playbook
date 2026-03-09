import { useState } from "react";
import { Sparkles, ArrowRight, X, Loader2 } from "lucide-react";
import { methods } from "@/data/methods";
import { phaseColors } from "@/data/phaseColors";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface Recommendation {
  methodId: string;
  reason: string;
}

interface AIAdvisorProps {
  onMethodClick: (id: string) => void;
}

export default function AIAdvisor({ onMethodClick }: AIAdvisorProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Recommendation[] | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || loading) return;

    setLoading(true);
    setError("");
    setResults(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("recommend-methods", {
        body: { challenge: trimmed },
      });

      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      setResults(data.recommendations || []);
    } catch (err: any) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults(null);
    setError("");
  };

  return (
    <div className="px-5 sm:px-8 lg:px-10 pb-4">
      <form onSubmit={handleSubmit} className="relative max-w-3xl">
        <div className="relative flex items-center">
          <Sparkles className="absolute left-3.5 w-4 h-4 text-muted-foreground/40 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe your design challenge and get method recommendations…"
            maxLength={500}
            disabled={loading}
            className="w-full h-10 pl-10 pr-24 rounded-xl border border-border bg-card/60 text-sm font-body text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-ring disabled:opacity-50 transition-all"
          />
          <button
            type="submit"
            disabled={!query.trim() || loading}
            className="absolute right-1.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-body font-medium bg-foreground text-background hover:opacity-90 transition-opacity disabled:opacity-20 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-3 h-3 animate-spin" />
            ) : (
              <>
                Advise
                <ArrowRight className="w-3 h-3" />
              </>
            )}
          </button>
        </div>
      </form>

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="text-xs text-destructive mt-2 max-w-3xl font-body"
          >
            {error}
          </motion.p>
        )}

        {results && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mt-3 max-w-3xl"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-body font-semibold uppercase tracking-[0.15em] text-muted-foreground">
                Recommended methods
              </span>
              <button onClick={clearResults} className="p-1 hover:bg-foreground/5 rounded-md transition-colors">
                <X className="w-3 h-3 text-muted-foreground/50" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {results.map((rec) => {
                const method = methods.find((m) => m.id === rec.methodId);
                if (!method) return null;
                const colors = phaseColors[method.phase];
                return (
                  <button
                    key={rec.methodId}
                    onClick={() => {
                      onMethodClick(rec.methodId);
                      clearResults();
                    }}
                    className="group flex items-start gap-2.5 px-3 py-2.5 rounded-lg border border-border bg-card/40 hover:bg-card/80 transition-all text-left max-w-sm"
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                      style={{ background: colors.accent }}
                    />
                    <div className="min-w-0">
                      <span className="text-sm font-body font-medium text-foreground group-hover:underline underline-offset-2 block truncate">
                        {method.title}
                      </span>
                      <span className="text-xs font-body text-muted-foreground/60 line-clamp-2">
                        {rec.reason}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
