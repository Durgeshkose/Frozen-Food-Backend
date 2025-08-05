const PaymentMethod = require('../models/PaymentMethod');

exports.addPaymentMethod = async (req, res) => {
  try {
    const { methodType, details } = req.body;

    const paymentMethod = new PaymentMethod({
      user: req.user._id,
      methodType,
      details
    });

    await paymentMethod.save();
    res.status(201).json(paymentMethod);
  } catch (error) {
    res.status(500).json({ message: 'Error adding payment method', error });
  }
};

exports.getPaymentMethods = async (req, res) => {
  try {
    const methods = await PaymentMethod.find({ user: req.user._id });
    res.status(200).json(methods);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching payment methods', error });
  }
};
