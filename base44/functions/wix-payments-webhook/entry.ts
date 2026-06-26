import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';
import jwt from 'npm:jsonwebtoken@9.0.2';

Deno.serve(async (req) => {
  try {
    const body = await req.text();
    const publicKey = Deno.env.get("WIX_PAYMENTS_WEBHOOK_PUBLIC_KEY");

    if (!publicKey) {
      console.error("Missing WIX_PAYMENTS_WEBHOOK_PUBLIC_KEY");
      return Response.json({ error: "Webhook not configured" }, { status: 500 });
    }

    const rawPayload = jwt.verify(body, publicKey, { algorithms: ["RS256"] });
    const event = JSON.parse(rawPayload.data);
    const eventData = JSON.parse(event.data);

    const base44 = createClientFromRequest(req);
    const today = new Date().toISOString().split("T")[0];
    const in30Days = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];
    const in1Year = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

    if (event.eventType === "wix.ecom.v1.order_approved") {
      const order = eventData.actionEvent.body.order;
      const checkoutId = order.checkoutId;
      const buyerEmail = order.buyerInfo?.email || "";
      const totalAmount = order.priceSummary?.total?.amount || "0";
      const currency = order.currency || "USD";
      const orderId = order.id;
      const wixSubId = order.lineItems?.[0]?.subscriptionInfo?.id || "";

      const subs = await base44.asServiceRole.entities.Subscription.filter({ checkout_id: checkoutId });

      if (subs.length > 0) {
        const sub = subs[0];

        await base44.asServiceRole.entities.Subscription.update(sub.id, {
          status: "active",
          buyer_email: buyerEmail,
          wix_subscription_id: wixSubId,
          wix_order_id: orderId,
          provisioning_status: "complete",
          start_date: today,
          renewal_date: in30Days,
        });

        const invoiceNum = `INV-${Date.now()}`;
        await base44.asServiceRole.entities.Invoice.create({
          invoice_number: invoiceNum,
          subscription_id: sub.id,
          plan_name: sub.plan_name,
          amount: parseFloat(totalAmount),
          currency,
          status: "paid",
          issue_date: today,
          paid_date: today,
          customer_email: buyerEmail,
          wix_order_id: orderId,
          wix_subscription_id: wixSubId,
          billing_period_start: today,
          billing_period_end: in30Days,
          items: [{
            description: `${sub.plan_name} — Monthly Hosting`,
            quantity: 1,
            unit_price: parseFloat(totalAmount),
            total: parseFloat(totalAmount),
          }],
        });

        if (sub.domain) {
          await base44.asServiceRole.entities.Domain.create({
            domain_name: sub.domain,
            status: "active",
            registration_date: today,
            expiry_date: in1Year,
            auto_renew: true,
            buyer_email: buyerEmail,
            subscription_id: sub.id,
            nameservers: ["ns1.madetechnologies.com", "ns2.madetechnologies.com"],
          });
        }
      }
    } else if (
      event.eventType === "wix.ecom.subscription_contracts.v1.subscription_contract_canceled" ||
      event.eventType === "wix.ecom.subscription_contracts.v1.subscription_contract_expired"
    ) {
      const subscriptionContract = eventData.actionEvent.body.subscriptionContract;
      const subscriptionId = subscriptionContract.id;

      const subs = await base44.asServiceRole.entities.Subscription.filter({ wix_subscription_id: subscriptionId });

      if (subs.length > 0) {
        await base44.asServiceRole.entities.Subscription.update(subs[0].id, {
          status: "cancelled",
          auto_renew: false,
        });
      }
    }

    return Response.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});