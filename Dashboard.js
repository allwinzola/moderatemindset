import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Alert } from "react-bootstrap";
import api from "../Api";

const Dashboard = () => {
  const [checkins, setCheckins] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchCheckins = async () => {
      try {
        const token = sessionStorage.getItem("authToken");
        const userId = sessionStorage.getItem("userId");

        if (!token || !userId) {
          setErrorMessage("User not logged in");
          return;
        }

        const response = await axios.get(`${api}modapi/getLoggedInUserCheckins`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCheckins(response.data);
      } catch (error) {
        console.error("Error fetching check-ins:", error);
        setErrorMessage("Unable to fetch check-ins");
      }
    };

    fetchCheckins();
  }, []);

  return (
    <Container className="text-center py-5">
      <h2 className="my-4" style={{ color: "#0d6efd" }}>Dashboard</h2>
      {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

      <Row className="justify-content-center">
        {checkins.length > 0 ? (
          <>
            <Row
              className="mb-3 w-100"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                textAlign: "center",
                fontWeight: "bold",
                color: "#495057",
                borderBottom: "2px solid #dee2e6", 
              }}
            >
              <div style={{ borderRight: "1px solid #dee2e6" }}>Mood Rating</div>
              <div style={{ borderRight: "1px solid #dee2e6" }}>Stress Level</div>
              <div style={{ borderRight: "1px solid #dee2e6" }}>Feelings</div>
            </Row>

            {checkins.map((checkin, index) => (
              <Row
                key={index}
                className="mb-3 w-100"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  textAlign: "center",
                  borderBottom: "1px solid #dee2e6", 
                }}
              >
                <div
                  style={{
                    padding: "10px 0",
                    borderRight: "1px solid #dee2e6", 
                  }}
                >
                  {checkin.moodrating}
                </div>
                <div
                  style={{
                    padding: "10px 0",
                    borderRight: "1px solid #dee2e6", 
                  }}
                >
                  {checkin.stressLevel}
                </div>
                <div style={{ padding: "10px 0",
                  borderRight: "1px solid #dee2e6" }}>{checkin.feelings}</div>
              </Row>
            ))}
          </>
        ) : (
          <p style={{ fontSize: "1.2rem", color: "#6c757d" }}>No check-ins available.</p>
        )}
      </Row>
    </Container>
  );
};

export default Dashboard;


