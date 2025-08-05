const Address = require('../models/Address');

// GET /api/addresses - Get all addresses for logged-in user
const getUserAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch addresses", error });
  }
};

// POST /api/addresses - Add new address
const addAddress = async (req, res) => {
  try {
    const address = new Address({ ...req.body, user: req.user.id });
    const savedAddress = await address.save();
    res.status(201).json(savedAddress);
  } catch (error) {
    res.status(500).json({ message: "Failed to add address", error });
  }
};

module.exports = {
  getUserAddresses,
  addAddress,
};
