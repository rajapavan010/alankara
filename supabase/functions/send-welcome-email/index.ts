import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { Resend } from "npm:resend";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods":
    "POST, OPTIONS",
};

const resend = new Resend(
  Deno.env.get("RESEND_API_KEY")
);

serve(async (req) => {
  // Handle browser preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    });
  }

  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({
          error: "Email is required",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    const { data, error } =
      await resend.emails.send({
        // IMPORTANT:
        // Use onboarding@resend.dev until your domain is verified.
        from:
          "Alankara <onboarding@resend.dev>",

        to: [email],

        subject:
          "✨ Welcome to Alankara",

        html: `
<div style="background:#faf7f4;padding:50px;font-family:Arial,sans-serif;color:#5a3d31;">

<div style="max-width:600px;margin:auto;background:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 10px 35px rgba(0,0,0,.08);">

<div style="background:#6f4b3e;color:#ffffff;text-align:center;padding:35px;">
<h1 style="margin:0;">✦ ALANKARA ✦</h1>
<p style="margin-top:12px;">A Little Sparkle, Every Day</p>
</div>

<div style="padding:40px;">

<h2>Welcome to Alankara 💛</h2>

<p>
Thank you for joining our community.
</p>

<p>
You'll now be among the first to discover:
</p>

<ul>
<li>✨ New Collections</li>
<li>💍 Exclusive Jewellery</li>
<li>🎁 Gift Hampers</li>
<li>💛 Special Offers</li>
</ul>

<p>
We're excited to have you with us and can't wait to share our latest creations.
</p>

<div style="text-align:center;margin:45px 0;">
<a
href="https://yourwebsite.com"
style="
display:inline-block;
padding:14px 34px;
background:#6f4b3e;
color:#ffffff;
text-decoration:none;
border-radius:40px;
font-weight:bold;">
Explore Our Collection
</a>
</div>

<hr style="border:none;border-top:1px solid #eee;">

<p style="text-align:center;font-size:13px;color:#888;">
With Love,<br>
<b>Team Alankara</b>
</p>

</div>

</div>

</div>
`,
      });

    if (error) {
      console.error(error);

      return new Response(
        JSON.stringify(error),
        {
          status: 500,
          headers: {
            ...corsHeaders,
            "Content-Type":
              "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data,
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type":
            "application/json",
        },
      }
    );
  } catch (err) {
    console.error(err);

    return new Response(
      JSON.stringify({
        error: err.message,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type":
            "application/json",
        },
      }
    );
  }
});