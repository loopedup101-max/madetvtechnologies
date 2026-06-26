import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { email } = await req.json();

    if (!email) {
      return Response.json({ error: "Email required" }, { status: 400 });
    }

    const [subscriptions, invoices, domains, tickets] = await Promise.all([
      base44.asServiceRole.entities.Subscription.filter({ buyer_email: email }, "-created_date", 50),
      base44.asServiceRole.entities.Invoice.filter({ customer_email: email }, "-created_date", 50),
      base44.asServiceRole.entities.Domain.filter({ buyer_email: email }, "-created_date", 50),
      base44.asServiceRole.entities.SupportTicket.filter({ customer_email: email }, "-created_date", 50),
    ]);

    return Response.json({ subscriptions, invoices, domains, tickets });
  } catch (error) {
    console.error("Dashboard error:", error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});