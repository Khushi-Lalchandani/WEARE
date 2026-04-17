const express = require('express');
const router = express.Router();
const { createStripePaymentIntent, verifyStripePayment } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/stripe/intent', protect, createStripePaymentIntent);
router.post('/stripe/verify', protect, verifyStripePayment);

module.exports = router;
