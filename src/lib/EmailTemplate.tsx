// lib/EmailTemplate.tsx
import React from 'react';

interface Props {
  name: string;
  email: string;
  message: string;
}

export default function EmailTemplate({ name, email, message }: Props) {
  return (
    <html>
      <body
        style={{
          fontFamily: "'Inter', Arial, sans-serif",
          backgroundColor: '#f9fafb',
          color: '#111827',
          margin: 0,
          padding: 0,
          lineHeight: 1.6,
        }}
      >
        <div
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            padding: '2rem',
            backgroundColor: '#ffffff',
            borderRadius: '8px',
          }}
        >
          {/* Header / Branding */}
          <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
            <a
              href='https://kotfood.vercel.be'
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <h1 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0 }}>
                KotFood
              </h1>
            </a>
          </div>

          {/* Email Content */}
          <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
            New Contact Form Submission
          </h2>

          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Message:</strong>
          </p>
          <p
            style={{
              padding: '1rem',
              backgroundColor: '#f3f4f6',
              borderRadius: '4px',
            }}
          >
            {message}
          </p>

          <footer
            style={{
              marginTop: '3rem',
              fontSize: '0.875rem',
              color: '#6b7280',
              textAlign: 'center',
            }}
          >
            This email was sent via the KotFood contact form.
          </footer>
        </div>
      </body>
    </html>
  );
}
