
import {loadStripe} from "@stripe/stripe-js";

export default function CheckoutButton() {
    const cartDetails =    {
        id: 'price_1McBQBC4V4bOyW0m4sCYXwDz',
        name: 'Focus Paper Refill',
        price: 650,
        currency: 'USD',
        imageSrc: 'https://source.unsplash.com/user/c_v_r/100x100',
        imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    };

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
        <button
            onClick={() =>  redirectToCheckout()}
           
            className="rounded-md border border-transparent bg-sky-900 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-sky-700 mr-2 disabled:bg-gray-600">
            Checkout
        </button>
    );
}
