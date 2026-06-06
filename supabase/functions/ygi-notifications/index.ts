import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Placeholder for Email service integration (e.g., Resend, SendGrid)
async function sendEmail(to: string, subject: string, body: string) {
  console.log(`[EMAIL MOCK] Sending to: ${to}`);
  console.log(`[EMAIL MOCK] Subject: ${subject}`);
  console.log(`[EMAIL MOCK] Body: ${body}`);
  // In a real scenario, you would make an API call to your email provider here
  return true;
}

// Placeholder for SMS service integration (e.g., Twilio)
async function sendSMS(to: string, message: string) {
  console.log(`[SMS MOCK] Sending to: ${to}`);
  console.log(`[SMS MOCK] Message: ${message}`);
  // In a real scenario, you would make an API call to your SMS provider here
  return true;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { type, record } = await req.json();

    if (!record) {
       return new Response(JSON.stringify({ error: "No record provided" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    let subject = "";
    let emailBody = "";
    let smsBody = "";

    // Determine notification content based on the event type
    switch (type) {
      case "APPLICATION_RECEIVED":
        subject = "YGI Application Received";
        emailBody = `Dear ${record.full_name},\n\nWe have received your application for the position of ${record.position_title} in the Young Government Initiative. Your reference code is ${record.ref_code}.\n\nWe will review your application and get back to you shortly.\n\nBest regards,\nThe YGI Team`;
        smsBody = `YGI: Application received! Ref: ${record.ref_code}. Check email for details.`;
        break;

      case "APPLICATION_APPROVED":
        subject = "Congratulations! YGI Application Approved";
        emailBody = `Dear ${record.full_name},\n\nCongratulations! Your application for ${record.position_title} has been approved. You are now officially part of the Young Government Initiative.\n\nPlease log in to your dashboard using your reference code (${record.ref_code}) to view your orientation schedule and begin your leadership training modules.\n\nBest regards,\nThe YGI Team`;
        smsBody = `YGI: Congrats ${record.full_name}! Your application is approved. Log in to your dashboard to start.`;
        break;

      case "INTERVIEW_SCHEDULED":
         subject = "YGI Interview Scheduled";
         emailBody = `Dear ${record.full_name},\n\nYou have been scheduled for an interview for the Young Government Initiative. Please check your dashboard for the exact date, time, and panel details.\n\nBest regards,\nThe YGI Team`;
         smsBody = `YGI: Your interview has been scheduled. Check your dashboard for details.`;
         break;

      default:
        return new Response(JSON.stringify({ message: "Unknown event type, no notification sent" }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
    }

    // Send notifications if contact info is available
    if (record.email) {
      await sendEmail(record.email, subject, emailBody);
    }
    if (record.phone) {
      await sendSMS(record.phone, smsBody);
    }

    return new Response(
      JSON.stringify({ message: "Notifications sent successfully" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Notification error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
