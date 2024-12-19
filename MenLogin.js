import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './MenLogin.css'; 
import api from '../Api.js';
const Login = () => {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState(true); 
  const [errorMessage, setErrorMessage] = useState(""); 
  const [successMessage, setSuccessMessage] = useState("");

  const handleSignup = async () => {
    try {
      // await axios.post(`${api}modapi/signup`, formData);
      await axios.post(`http://moderatedb.allwinzola.tech/modapi/signup`, formData);
      setSuccessMessage("Signup successful!");
      alert("Account created successfully!");
      setFormData({
        email: "",
        password: "",
        name: "",
      });

      setIsLogin(true);

    } catch (error) {
      console.error("Signup error:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Signup failed!");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://moderatedb.allwinzola.tech/modapi/login`, formData);
      setSuccessMessage(response.data.message || "Login successful!");
      console.log(response.data);
      alert("login successful")
      if (response.data.token) {
        sessionStorage.setItem("authToken", response.data.token);
        sessionStorage.setItem("userId", response.data.userId);  
  
        navigate("/checkin"); 
      }

    } catch (error) {
      console.error("Login error:", error);
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data.message || "Login failed!");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="login-container">
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={isLogin ? handleLogin : handleSignup}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
        </div>
        {!isLogin && (
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
        )}
        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <p>{errorMessage}</p>
      <p>{successMessage}</p>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <span
          onClick={() => {
            setIsLogin(!isLogin);
            setErrorMessage("");
            setSuccessMessage("");
          }}
        >
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </p>
    </div>
  );
};

export default Login;



