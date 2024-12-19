const checkinController = require('../ModModel/checkinModel');
const jwt = require("jsonwebtoken");

exports.createCheckIn = async (req, res) => {
  console.log("Incoming data:", req.body);
  const { moodrating, stressLevel, feelings, userId } = req.body;
  
  if ( !moodrating || !stressLevel ||!feelings || !userId) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const newCheckIn = new checkinController({moodrating, stressLevel, feelings, userId});
    await newCheckIn.save();
    res.status(201).json({ message: 'Check-in created successfully', data: newCheckIn });
  } catch (error) {
    res.status(500).json({ message: 'Error creating check-in', error });
  }
};

exports.getLoggedInUserCheckins = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const checkins = await checkinController.find({ userId });
    if (!checkins || checkins.length === 0) {
      return res.status(404).json({ message: "No check-ins found for the user" });
    }

    res.status(200).json(checkins);
  } catch (error) {
    console.error("Error fetching user check-ins:", error);
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired. Please log in again." });
    }
    res.status(500).json({ message: "Error fetching check-ins", error });
  }
};

