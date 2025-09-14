import nodemailer from 'nodemailer';

// Clean HTML email template - no React dependencies needed
function createEmailHTML(name: string, email: string, message: string): string {
  return `
    <div style="font-family: 'Inter', Arial, sans-serif; background-color: #f9fafb; color: #111827; margin: 0; padding: 2rem; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; padding: 2rem; background-color: #ffffff; border-radius: 8px;">
        <!-- Header / Branding -->
        <div style="margin-bottom: 3rem; text-align: center;">
          <a href="https://kotfood.vercel.app" style="text-decoration: none; color: inherit;">
            <h1 style="font-size: 2.5rem; font-weight: 900; margin: 0;">KotFood</h1>
          </a>
        </div>
        
        <!-- Email Content -->
        <h2 style="font-size: 1.5rem; margin-bottom: 1rem;">New Contact Form Submission</h2>
        
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <div style="padding: 0.5rem 1rem 0.5rem 0.5rem; background-color: #f3f4f6; border-radius: 4px; white-space: pre-wrap;">
        ${message}
        </div>
        
        <div style="margin-top: 3rem; font-size: 0.875rem; color: #6b7280; text-align: center;">
          This email was sent via the KotFood contact form.
        </div>
      </div>
    </div>
  `;
}

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const html = createEmailHTML(name, email, message);

    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission from ${name}`,
      html,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Email send failed:', err);
    return new Response(JSON.stringify({ error: 'Failed to send email' }), {
      status: 500,
    });
  }
}
