require('dotenv').config();

// Set your secret key. Remember to switch to your live secret key in production.
// See your keys here: https://dashboard.stripe.com/apikeys
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// This example uses Express to receive webhooks
const express = require('express');
const app = express();

async function main () {
  const price = await stripe.prices.create({
    currency: 'brl',
    unit_amount: 30000,
    product: 'prod_LuNT2hPVIub1ZO',
  });

  console.log(price);

  const paymentLink = await stripe.paymentLinks.create({
    line_items: [{ price: price.id, quantity: 1 }],
  });

  console.log(paymentLink);
}

main()

// Match the raw body to content type application/json
// If you are using Express v4 - v4.16 you need to use body-parser, not express, to retrieve the request body
app.post('/webhook', express.json({type: 'application/json'}), (request, response) => {
  const event = request.body;

  console.log(Object.keys(event), event.type)

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Then define and call a method to handle the successful payment intent.
      // handlePaymentIntentSucceeded(paymentIntent);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      // Then define and call a method to handle the successful attachment of a PaymentMethod.
      // handlePaymentMethodAttached(paymentMethod);
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
});

app.listen(8000, () => console.log('Running on port 8000'));
