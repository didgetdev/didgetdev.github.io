import dotenv from "dotenv";
dotenv.config();

import express from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // i øre (100 = 1 kr)
      currency: "nok",
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));
