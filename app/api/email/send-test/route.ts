import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export async function POST(request: NextRequest) {
  try {
    const { subject, html, text } = await request.json();

    if (!subject || !html) {
      return NextResponse.json(
        { error: 'Subject and HTML content are required' },
        { status: 400 }
      );
    }

    // Check SendGrid API key
    if (!process.env.SENDGRID_API_KEY) {
      return NextResponse.json(
        { error: 'SendGrid API key not configured' },
        { status: 500 }
      );
    }

    // Send test email to m.ball@agile36.com
    const msg = {
      to: 'm.ball@agile36.com',
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@agile36.com',
      subject: `[TEST] ${subject}`,
      html: html,
      text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML tags for text version
    };

    await sgMail.send(msg);

    return NextResponse.json({
      success: true,
      message: 'Test email sent to m.ball@agile36.com',
    });
  } catch (error: any) {
    console.error('Error sending test email:', error);
    return NextResponse.json(
      { error: `Failed to send test email: ${error.message}` },
      { status: 500 }
    );
  }
}
