const User = require('../ModModel/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.modsignupUser = async (req, res) => {
    try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
}

exports.modloginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    } else {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid credentials' });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        return res.status(200).json({
          message: 'Login successful',
          token,
          userId: user._id 
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};


