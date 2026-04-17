const Stripe = require('stripe');
const Order = require('../models/Order');

// Use dummy keys if environment variables are not securely set
const stripe = Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_dummy1234567890');

const createStripePaymentIntent = async (req, res) => {
    try {
        const order = await Order.findById(req.body.orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(order.totalPrice * 100), // amount in cents
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            metadata: {
                orderId: order._id.toString(),
            },
        });

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const verifyStripePayment = async (req, res) => {
    try {
        const { paymentIntentId, orderId } = req.body;

        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status === 'succeeded') {
            const order = await Order.findById(orderId);
            if (order) {
                order.isPaid = true;
                order.paidAt = Date.now();
                order.paymentResult = {
                    id: paymentIntent.id,
                    status: paymentIntent.status,
                    update_time: new Date().toISOString(),
                    email_address: req.user ? req.user.email : ''
                };
                const updatedOrder = await order.save();
                res.status(200).json({ message: 'Payment verified successfully', order: updatedOrder });
            } else {
                res.status(404).json({ message: 'Order not found' });
            }
        } else {
            res.status(400).json({ message: 'Payment intent not successful' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createStripePaymentIntent, verifyStripePayment };
