import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const origin = req.headers.get("Origin") || "https://madetvtechnologies.com";

    const { plan_name, plan_category, price, billing_period, domain } = await req.json();

    if (!plan_name || !price) {
      return Response.json({ error: "Missing plan details" }, { status: 400 });
    }

    const apiKey = Deno.env.get("WIX_PAYMENTS_API_KEY");
    const siteId = Deno.env.get("WIX_PAYMENTS_SITE_ID");

    if (!apiKey || !siteId) {
      console.error("Missing WIX_PAYMENTS_API_KEY or WIX_PAYMENTS_SITE_ID");
      return Response.json({ error: "Payment configuration missing" }, { status: 500 });
    }

    const checkoutResponse = await fetch(
      "https://www.wixapis.com/payments/platform/v1/checkout-sessions/construct",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": apiKey,
          "wix-site-id": siteId,
        },
        body: JSON.stringify({
          cart: {
            items: [{
              name: `${plan_name} — ${billing_period || 12} Month Plan`,
              quantity: 1,
              price: String(price),
              subscriptionInfo: {
                subscriptionSettings: {
                  frequency: "MONTH",
                  autoRenewal: true,
                },
                title: `${plan_name} Hosting Plan`,
                description: `${plan_name} hosting plan billed monthly. ${billing_period || 12}-month locked-in rate.`,
              },
            }],
          },
          callbackUrls: {
            postFlowUrl: origin,
            thankYouPageUrl: `${origin}/thank-you`,
          },
        }),
      }
    );

    if (!checkoutResponse.ok) {
      const errorText = await checkoutResponse.text();
      console.error("Wix checkout error:", errorText);
      return Response.json({ error: "Payment provider error. Check API key and site ID permissions." }, { status: 500 });
    }

    const data = await checkoutResponse.json();
    const checkoutId = data.checkoutSession.id;
    const redirectUrl = data.checkoutSession.redirectUrl;

    await base44.asServiceRole.entities.Subscription.create({
      plan_name,
      plan_category: plan_category || "standard",
      billing_cycle: "monthly",
      billing_period_months: parseInt(billing_period) || 12,
      price: parseFloat(price),
      domain: domain || "",
      status: "pending",
      provisioning_status: "queued",
      checkout_id: checkoutId,
      buyer_email: "",
      auto_renew: true,
    });

    return Response.json({ redirectUrl, checkoutId });
  } catch (error) {
    console.error("Checkout error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});