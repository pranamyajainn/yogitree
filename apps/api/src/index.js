// apps/api/src/index.js — Fastify API server
import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import helmet from '@fastify/helmet';
import 'dotenv/config';

const app = Fastify({ logger: { level: process.env.LOG_LEVEL ?? 'info' } });

// ── Security ──────────────────────────────────────────────
await app.register(helmet, {
    contentSecurityPolicy: false, // Set at reverse proxy (Cloudflare)
});
await app.register(cors, {
    origin: process.env.ALLOWED_ORIGIN ?? 'http://localhost:4321',
    methods: ['GET', 'POST'],
});
await app.register(rateLimit, {
    max: 100,
    timeWindow: '1 minute',
});

// ── Health ────────────────────────────────────────────────
app.get('/health', async () => ({ status: 'ok', ts: new Date().toISOString() }));

// ── Contact form ──────────────────────────────────────────
app.post('/api/contact', async (req, reply) => {
    const { name, email, phone, message, website } = req.body as any;

    // Honeypot check
    if (website) return reply.status(200).send({ ok: true }); // silently drop spam

    // Basic validation
    if (!name || !email || !message) {
        return reply.status(422).send({ error: 'name, email, and message are required' });
    }
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRe.test(email)) {
        return reply.status(422).send({ error: 'Invalid email address' });
    }

    // TODO: Send email via Postmark/SES
    // await sendEmail({ to: process.env.HOTEL_EMAIL, subject: `New enquiry from ${name}`, ... });
    app.log.info({ name, email, phone }, 'Contact form submission');

    return reply.status(200).send({ ok: true, message: 'Enquiry received' });
});

// ── Newsletter ────────────────────────────────────────────
app.post('/api/newsletter', async (req, reply) => {
    const { email } = req.body as any;
    const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRe.test(email)) {
        return reply.status(422).send({ error: 'Valid email required' });
    }
    // TODO: Add to Mailchimp/Sendinblue list
    app.log.info({ email }, 'Newsletter subscription');
    return reply.status(200).send({ ok: true });
});

// ── Availability proxy (eZee) ─────────────────────────────
app.get('/api/availability', async (req, reply) => {
    const { checkin, checkout, adults = '2', children = '0' } = req.query as any;
    if (!checkin || !checkout) {
        return reply.status(422).send({ error: 'checkin and checkout are required' });
    }

    // STUB: In production, call eZee API with server-side API key
    // const EZEE_API_KEY = process.env.EZEE_API_KEY;
    // const EZEE_PROPERTY_ID = process.env.EZEE_PROPERTY_ID;
    // const ezeeUrl = `https://live.ipms247.com/...`;

    // Return stub data for development
    return reply.status(200).send({
        available: true,
        check_in: checkin,
        check_out: checkout,
        rooms: [
            {
                id: 'deluxe-room-balcony',
                name: 'Deluxe Room With Balcony',
                rate_per_night: 4500,
                meal_plan: 'CP',
                currency: 'INR',
                max_guests: 5,
            },
            {
                id: 'executive-room-balcony',
                name: 'Executive Room With Balcony',
                rate_per_night: 5500,
                meal_plan: 'CP',
                currency: 'INR',
                max_guests: 5,
            },
            {
                id: 'executive-room-balcony-pool-view',
                name: 'Executive Room With Balcony & Pool View',
                rate_per_night: 6500,
                meal_plan: 'CP',
                currency: 'INR',
                max_guests: 5,
            },
        ],
    });
});

// ── eZee Webhook handler ──────────────────────────────────
import crypto from 'node:crypto';

app.post('/api/webhooks/ezee', {
    config: { rawBody: true },
}, async (req, reply) => {
    const signature = req.headers['x-ezee-signature'] as string;
    const secret = process.env.EZEE_WEBHOOK_SECRET ?? '';

    if (secret && signature) {
        const expected = 'sha256=' + crypto
            .createHmac('sha256', secret)
            .update(JSON.stringify(req.body))
            .digest('hex');
        if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
            app.log.warn('Invalid eZee webhook signature');
            return reply.status(401).send({ error: 'Invalid signature' });
        }
    }

    const { event_type, booking_id, data } = req.body as any;
    app.log.info({ event_type, booking_id }, 'eZee webhook received');

    // TODO: Store in webhook_event table, update booking_reference, send email
    // await db.query('INSERT INTO webhook_event ...', [...]);

    return reply.status(200).send({ acknowledged: true });
});

// ── Start ─────────────────────────────────────────────────
try {
    await app.listen({ port: Number(process.env.PORT ?? 3001), host: '0.0.0.0' });
} catch (err) {
    app.log.error(err);
    process.exit(1);
}
