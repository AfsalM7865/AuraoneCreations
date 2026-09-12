import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Resend } from 'resend';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const resend = new Resend(process.env.RESEND_API_KEY);

const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('CORS policy: origin not allowed'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Accept'],
  }),
);

app.options('*', (_, res) => {
  res.sendStatus(204);
});

app.use(express.json({ limit: '1mb' }));

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, service, details } = req.body || {};

    if (!name || !email || !phone || !service || !details) {
      return res.status(400).json({
        message: 'Please complete all required fields before submitting.',
      });
    }

    const senderEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
    const toEmail = process.env.TO_EMAIL;

    if (!toEmail) {
      return res.status(500).json({
        message: 'Email recipient is not configured on the server.',
      });
    }

    const emailResponse = await resend.emails.send({
      from: senderEmail,
      to: [toEmail],
      reply_to: email,
      subject: `New AuraOne inquiry from ${name}`,
      html: `
        <h2>New AuraOne Project Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Project Details:</strong></p>
        <p>${details.replace(/\n/g, '<br />')}</p>
      `,
    });

    if (emailResponse.error) {
      throw new Error(emailResponse.error.message || 'Unable to send email.');
    }

    return res.status(200).json({
      success: true,
      message: 'Inquiry sent successfully.',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({
      message: error.message || 'Unable to send inquiry right now. Please email us directly.',
    });
  }
});

app.get('/api/health', (_req, res) => {
  res.status(200).json({ ok: true });
});

app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
