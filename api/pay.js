export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();
  
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'aed',
        product_data: { name: 'ASMAR WIFI' },
        unit_amount: req.body.amount,
      },
      quantity: 1,
    }],
    mode: 'payment',
    success_url: `${req.headers.origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/cancel.html`,
  });

  res.json({ id: session.id });
}

