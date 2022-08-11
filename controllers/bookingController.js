const stripe = require('stripe');
const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handleFactory');
const AppError = require('../utils/appError');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  console.log(process.env.STRIPE_SECRET_KEY, 'STRIPE SECRET');

  // 1) get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);
  // 2) create checkout session
  const Stripe = stripe(process.env.STRIPE_SECRET_KEY);
  const session = await Stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.user._id,
    currency: 'usd',
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
          },
          unit_amount: tour.price * 100,
        },
        quantity: 1,
      },
    ],
  });
  // 3) create session as a response
  res.status(200).json({
    status: 'success',
    session,
  });
});
