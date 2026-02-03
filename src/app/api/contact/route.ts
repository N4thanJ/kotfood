import nodemailer from 'nodemailer';

function createEmailHTML(name: string, email: string, message: string): string {
  return `
    <div style="font-family: 'Inter', Arial, sans-serif; background-color: #f9fafb; color: #111827; margin: 0; padding: 2rem; line-height: 1.6;">
      <div style="max-width: 600px; margin: 0 auto; padding: 2rem; background-color: #ffffff; border-radius: 8px; border: 1px solid #e5e7eb;">
        <div style="margin-bottom: 2rem; text-align: center;">
          <h1 style="font-size: 2rem; font-weight: 900; margin: 0; color: #15803d;">KotFood</h1>
        </div>
        <h2 style="font-size: 1.25rem; margin-bottom: 1rem; border-bottom: 1px solid #e5e7eb; padding-bottom: 0.5rem;">Nieuwe Contactaanvraag</h2>
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p style="margin-bottom: 0.5rem;"><strong>Bericht:</strong></p>
        <div style="padding: 1rem; background-color: #f3f4f6; border-radius: 6px; white-space: pre-wrap; color: #374151;">${message}</div>
      </div>
    </div>
  `;
}

// Simple in-memory store for IP timestamps
const ipCache = new Map<string, number>();

export async function POST(req: Request) {
  try {
    const { name, email, message, subject } = await req.json();

    // Honeypot check
    if (subject) {
      console.warn('Spam attempt blocked: Honeypot triggered.');
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    // Rate limit
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    const lastRequestTime = ipCache.get(ip);
    const now = Date.now();
    const minutes = 10;
    const COOLDOWN_TIME = minutes * 60 * 1000;

    if (lastRequestTime && now - lastRequestTime < COOLDOWN_TIME) {
      const totalSeconds = Math.ceil(
        (COOLDOWN_TIME - (now - lastRequestTime)) / 1000,
      );
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      const timeStamp =
        minutes > 0
          ? `${minutes} ${minutes === 1 ? 'minuut' : 'minuten'} en ${seconds} ${seconds === 1 ? 'seconde' : 'seconden'}`
          : `${seconds} ${seconds === 1 ? 'seconde' : 'seconden'}`;

      return new Response(
        JSON.stringify({
          error: `Te veel verzoeken. Probeer het over ${timeStamp} opnieuw.`,
        }),
        { status: 429 },
      );
    }

    ipCache.set(ip, now);

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
      subject: `KotFood Contact: ${name}`,
      html,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Email error:', err);
    return new Response(
      JSON.stringify({ error: 'Kon e-mail niet verzenden' }),
      {
        status: 500,
      },
    );
  }
}
