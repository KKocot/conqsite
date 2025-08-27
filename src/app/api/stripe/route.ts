// app/api/checkout/route.ts
// import { stripe } from "@/lib/stripe";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const { priceId, quantity, amount, currency } = data;

    // Get origin from data or fallback to request headers
    // const origin =
    //   data.origin || req.headers.get("origin") || "http://localhost:3000";

    let lineItems;

    if (priceId) {
      // Use existing price ID
      lineItems = [{ price: priceId, quantity: quantity ?? 1 }];
    } else if (amount && currency) {
      // Create dynamic price
      lineItems = [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: "Product",
            },
            unit_amount: amount,
          },
          quantity: quantity ?? 1,
        },
      ];
    } else {
      return new NextResponse("Either priceId or amount+currency is required", {
        status: 400,
      });
    }

    // const session = await stripe.checkout.sessions.create({
    //   mode: "payment",
    //   line_items: lineItems,
    //   success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    //   cancel_url: `${origin}/cancel`,
    // });

    // return NextResponse.json({ url: session.url });
    return NextResponse.json({});
  } catch (error: any) {
    console.error("Stripe API error:", error);
    return new NextResponse(error.message || "Server error", { status: 500 });
  }
}
