import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./CheckInForm.css";
import api from "../Api";

const CheckInForm = () => {
  const [moodrating, setMood] = useState(1);
  const [stressLevel, setStressLevel] = useState("");
  const [feelings, setFeelings] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    const userId = sessionStorage.getItem("userId");
    console.log("Retrieved userId:", userId);
    const authToken = sessionStorage.getItem("authToken");
    e.preventDefault();
    
    if (!userId || !authToken) {
      setMessage("User is not logged in or token is missing!");
      return;
    }

    if (!moodrating || !stressLevel || !feelings) {
      setMessage("All fields are required!");
      console.log("Missing fields:", { moodrating, stressLevel, feelings });
      return;
    }

    const checkinData = { moodrating, stressLevel, feelings, userId };

    console.log("Submitting check-in data:", checkinData);

    try {
      const response = await axios.post(`${api}modapi/createcheckins`, checkinData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`, 
        },
      });

      console.log("API Response:", response.data);
      setMessage("Check-in submitted successfully!");
    setMood(""); 
    setStressLevel("");
    setFeelings(""); 
    navigate('/dashboard');
    } catch (error) {
      console.error("Error submitting check-in:", error.response || error);
      console.log("Error details:", error.response ? error.response.data : "No response data");
      setMessage("Failed to submit check-in. Please try again.");
    }
  };

  return (
    <div className="checkin-container">
      <form className="checkin-form">
        <h2 className="checkin-title">Daily Check-In</h2>

        <label className="checkin-label">Mood Rating: {moodrating}</label>
        <input
          type="range"
          min="1"
          max="10"
          value={moodrating}
          className="checkin-slider"
          onChange={(e) => setMood(e.target.value)}
        />

        <label className="checkin-label">Stress Level:</label>
        <select
          className="checkin-select"
          value={stressLevel}
          onChange={(e) => setStressLevel(e.target.value)}
        >
          <option value="">Select</option>
          <option>Low</option>
          <option>Moderate</option>
          <option>High</option>
        </select>

        <label className="checkin-label">Feelings:</label>
        <textarea
          className="checkin-textarea"
          placeholder="How are you feeling today?"
          value={feelings}
          onChange={(e) => setFeelings(e.target.value)}
        ></textarea>

        <button type="button" onClick={handleSubmit} className="checkin-button">
          Submit
        </button>

        {message && <p className="checkin-message">{message}</p>} 
      </form>
    </div>
  );
};

export default CheckInForm;
