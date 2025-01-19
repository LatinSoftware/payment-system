import stripe from "@/app/StripeCustom";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse> {
    const body = await request.json();
    const event = body as any;

    switch (event.type) {
        case 'payment_intent.succeeded':
            const paymentIntent = event.data.object;
            console.log('PaymentIntent was successful!', paymentIntent.id);
            const checkout = await stripe.checkout.sessions.list({ payment_intent: paymentIntent.id, limit: 1 });
            if(checkout.data.length > 0) {
                const session = checkout.data[0];
                const table_id = session.metadata?.table_id;

                console.log('Order received from table:', table_id);

                const items = await stripe.checkout.sessions.listLineItems(session.id);

                items.data.forEach(async (item) => {
                    console.log('Item:', item.description, item.quantity);
                });
            }



            break;
        case 'payment_method.attached':
            const paymentMethod = event.data.object;
            console.log('PaymentMethod was attached to a Customer!', paymentMethod.id);
            break;
        default:
            console.log(`Unhandled event type ${event.type}`);	
    }

    return NextResponse.json(
      { received: true },
    );
}