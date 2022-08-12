/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alert';
const stripe = Stripe(
  'pk_test_51LUtV0ICry0AjEOSkXUNMQ1gI9PzMCdRBWNcMUtfy7A9JnpuXoxZ2fdBRbqEHABIX7gU0fS37WVsRplRzUZE97HP00si1gXi9Y'
);

export const bookTour = async (tourId) => {
  try {
    // 1) get session from the server
    const session = await axios(
      `/api/v1/bookings/checkout-session/${tourId}`
    );

    // 2) create checkout form + charge credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
