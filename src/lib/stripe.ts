// import Stripe from "stripe";
// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
import Stripe from "stripe";

export function getStripe() {
  if (!process.env.STRIPE_SECRET_KEY) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }
  return new Stripe(process.env.STRIPE_SECRET_KEY);
}

export const stripe = getStripe();
