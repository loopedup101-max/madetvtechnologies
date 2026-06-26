import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { subscription_id, immediate, reason } = await req.json();

    if (!subscription_id) {
      return Response.json({ error: "Missing subscription_id" }, { status: 400 });
    }

    const apiKey = Deno.env.get("WIX_PAYMENTS_API_KEY");
    const siteId = Deno.env.get("WIX_PAYMENTS_SITE_ID");

    const response = await fetch(
      `https://www.wixapis.com/payments/base44/v1/subscriptions/${subscription_id}/cancel`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": apiKey,
          "wix-site-id": siteId,
        },
        body: JSON.stringify({
          subscription_id,
          reason: reason || "Customer requested cancellation",
          immediate: immediate ?? false,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Wix cancel error:", errorText);
      return Response.json({ error: "Failed to cancel subscription" }, { status: 500 });
    }

    const data = await response.json();

    const subs = await base44.asServiceRole.entities.Subscription.filter({ wix_subscription_id: subscription_id });
    if (subs.length > 0) {
      await base44.asServiceRole.entities.Subscription.update(subs[0].id, {
        status: immediate ? "cancelled" : "suspended",
        auto_renew: false,
      });
    }

    return Response.json({ success: true, status: data.subscription?.status });
  } catch (error) {
    console.error("Cancel subscription error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});