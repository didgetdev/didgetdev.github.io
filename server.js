import express from "express";
import Stripe from "stripe";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

const stripe = new Stripe("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"); // SK_xxx

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