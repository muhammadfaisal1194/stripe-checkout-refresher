"use client"
import {loadStripe} from "@stripe/stripe-js";
export default function Home() {

    

    const cartDetails =    [{
        id: 'price_1McBQBC4V4bOyW0m4sCYXwDz',
        name: 'Focus Paper Refill',
        price: 100,
        currency: 'USD',
        imageSrc: 'https://source.unsplash.com/user/c_v_r/100x100',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
        quantity:2
    }];

    const redirectToCheckout = async () => {
        try {
            const stripe = await loadStripe(process.env.NEXT_PUBLIC_TEST_STRIPE_PUBLISHABLE_KEY as string);

            if (!stripe) throw new Error('Stripe failed to initialize.');

            const checkoutResponse = await fetch('/api/checkout_sessions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({cartDetails}),
            });

            const {sessionId} = await checkoutResponse.json();
            const stripeError = await stripe.redirectToCheckout({sessionId});

            if (stripeError) {
                console.error(stripeError);
            }
        } catch (error) {
            console.error(error);
        }
    };

   


    return (
        <section className="w-full h-full mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8 bg-white">
          <button onClick={()=>(redirectToCheckout())} type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Checkout</button>
        </section>
    )
}