import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// All method IDs and summaries so the model can pick from them
const METHOD_CATALOG = [
  { id: "okr-alignment", title: "OKR Alignment Workshop", phase: "Align", when: "Connecting design work to business outcomes" },
  { id: "stakeholder-mapping", title: "Stakeholder Mapping", phase: "Align", when: "Identifying who influences or is affected by design decisions" },
  { id: "design-maturity-assessment", title: "Design Maturity Assessment", phase: "Align", when: "Understanding current design capability and setting growth goals" },
  { id: "design-strategy-canvas", title: "Design Strategy Canvas", phase: "Align", when: "Creating a strategic framework for design decisions" },
  { id: "desk-research", title: "Desk Research & Landscape Audit", phase: "Discovery", when: "Understanding the competitive landscape and existing solutions" },
  { id: "user-interviews", title: "User Interviews", phase: "Discovery", when: "Gathering qualitative insights directly from users" },
  { id: "contextual-inquiry", title: "Contextual Inquiry", phase: "Discovery", when: "Observing users in their natural environment" },
  { id: "survey-design", title: "Survey Design & Analysis", phase: "Discovery", when: "Collecting quantitative data from a large user base" },
  { id: "analytics-review", title: "Analytics & Data Review", phase: "Discovery", when: "Understanding user behavior through quantitative data" },
  { id: "affinity-mapping", title: "Affinity Mapping", phase: "Define", when: "Organizing research findings into themes and patterns" },
  { id: "persona-development", title: "Persona Development", phase: "Define", when: "Creating representative user archetypes" },
  { id: "journey-mapping", title: "Journey Mapping", phase: "Define", when: "Visualizing the end-to-end user experience" },
  { id: "problem-framing", title: "Problem Framing (HMW)", phase: "Define", when: "Defining the right problem to solve" },
  { id: "jobs-to-be-done", title: "Jobs-to-be-Done Framework", phase: "Define", when: "Understanding what users are trying to accomplish" },
  { id: "design-sprint", title: "Design Sprint", phase: "Design", when: "Rapidly prototyping and testing ideas in a week" },
  { id: "crazy-eights", title: "Crazy 8s & Rapid Ideation", phase: "Design", when: "Generating many ideas quickly" },
  { id: "wireframing", title: "Wireframing & Prototyping", phase: "Design", when: "Creating low to high fidelity representations" },
  { id: "design-system", title: "Design System Development", phase: "Design", when: "Building consistent, reusable UI components" },
  { id: "content-design", title: "Content Design & UX Writing", phase: "Design", when: "Crafting clear, user-centered content" },
  { id: "usability-testing", title: "Usability Testing", phase: "Validate", when: "Evaluating designs with real users" },
  { id: "a-b-testing", title: "A/B Testing", phase: "Validate", when: "Comparing design variations with data" },
  { id: "heuristic-evaluation", title: "Heuristic Evaluation", phase: "Validate", when: "Expert review against usability principles" },
  { id: "accessibility-audit", title: "Accessibility Audit", phase: "Validate", when: "Ensuring designs work for all users" },
  { id: "design-qa", title: "Design QA & Spec Handoff", phase: "Handoff", when: "Ensuring implementation matches design intent" },
  { id: "design-documentation", title: "Design Documentation", phase: "Handoff", when: "Creating comprehensive design documentation" },
  { id: "retrospective", title: "Design Retrospective", phase: "Handoff", when: "Reflecting on what worked and what to improve" },
];

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { challenge } = await req.json();
    if (!challenge || typeof challenge !== "string" || challenge.trim().length === 0) {
      return new Response(JSON.stringify({ error: "Please describe your design challenge." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are an expert UX design advisor. Given a designer's challenge, recommend 3-5 methods from the catalog below that best fit their situation.

METHOD CATALOG:
${METHOD_CATALOG.map((m) => `- ${m.id}: "${m.title}" (${m.phase}) — ${m.when}`).join("\n")}

Return recommendations using the suggest_methods tool.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: challenge.trim().slice(0, 1000) },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "suggest_methods",
              description: "Return 3-5 recommended UX methods for the user's challenge.",
              parameters: {
                type: "object",
                properties: {
                  recommendations: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        methodId: { type: "string", description: "The method id from the catalog" },
                        reason: { type: "string", description: "One sentence explaining why this method fits the user's situation" },
                      },
                      required: ["methodId", "reason"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["recommendations"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "suggest_methods" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI usage limit reached. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI service error");
    }

    const data = await response.json();
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("No recommendations returned");

    const parsed = JSON.parse(toolCall.function.arguments);
    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("recommend-methods error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
