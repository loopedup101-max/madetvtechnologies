import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const ticket = body?.data;

    if (!ticket) {
      return Response.json({ error: 'No ticket data in payload' }, { status: 400 });
    }

    const ticketNum = ticket.ticket_number || 'N/A';
    const subject = ticket.subject || 'No subject';
    const category = ticket.category || 'general';
    const priority = ticket.priority || 'medium';
    const customerEmail = ticket.customer_email || 'Unknown';
    const description = ticket.description || 'No description provided';

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: 'support@madetechnologies.com',
      subject: `[New Ticket] ${ticketNum} - ${subject}`,
      body: `A new support ticket has been submitted.\n\nTicket #: ${ticketNum}\nSubject: ${subject}\nCategory: ${category}\nPriority: ${priority}\nFrom: ${customerEmail}\n\nDescription:\n${description}\n\nView and respond in the support dashboard.`,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Failed to send ticket notification:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});