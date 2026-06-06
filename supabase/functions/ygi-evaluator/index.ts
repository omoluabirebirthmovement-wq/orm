import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Set up CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { record } = await req.json();

    // Check if we have the record and it's a new application
    if (!record || !record.id) {
      return new Response(JSON.stringify({ error: "No record provided" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // This is a placeholder for actual LLM integration (e.g., OpenAI, Gemini)
    // You would pass the application details (essay, school, experience) to the LLM
    // and receive a score and evaluation notes.
    
    // Simulate AI evaluation delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulated evaluation logic based on data length/presence
    let score = 50; // Base score
    let notes = "Application received and processed.\n";

    if (record.school && record.school.length > 5) score += 10;
    if (record.essay && record.essay.length > 100) {
      score += 20;
      notes += "- Comprehensive essay provided.\n";
    } else {
      notes += "- Essay is brief or missing.\n";
    }
    
    // Add some random variance for demonstration
    score += Math.floor(Math.random() * 10);
    if(score > 100) score = 100;

    notes += `\nAI Evaluation Score: ${score}/100`;

    // Update the record in Supabase
    const { error: updateError } = await supabase
      .from("ygi_applications")
      .update({
        screening_score: score,
        ai_evaluation_notes: notes,
        status: score >= 70 ? "Approved" : "Pending", // Auto-approve if score is high enough, otherwise manual review
      })
      .eq("id", record.id);

    if (updateError) {
      throw updateError;
    }

    return new Response(
      JSON.stringify({ message: "Evaluation complete", score }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Evaluation error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
