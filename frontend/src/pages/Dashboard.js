import React, { useState, useEffect } from "react";
import axios from "axios";
import SlotCard from "../components/SlotCard";
import { FaDumbbell } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [slots, setSlots] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const userId = localStorage.getItem("userId");

  const bookSlot = async () => {
    if (!userId) {
      alert("User not logged in");
      return;
    }
    if (!date || !startTime || !endTime) {
      alert("Please fill all fields");
      return;
    }
    try {
      await axios.post("http://localhost:8080/api/slots/book-slot", {
        userId,
        date,
        startTime,
        endTime,
      });
      fetchSlots();
    } catch (err) {
      console.error("Error booking slot:", err);
      alert("Failed to book slot");
    }
  };

  const fetchSlots = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:8080/api/slots/my-slots/${userId}`);
      setSlots(res.data);
    } catch (err) {
      console.error("Error fetching slots:", err);
    }
  };

  const checkStatus = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:8080/api/slots/check-status/${userId}`);
      setIsActive(res.data.active);
    } catch (err) {
      console.error("Error checking status:", err);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchSlots();
      checkStatus();
    } else {
      alert("User not logged in. Redirecting to home.");
      window.location.href = "/";
    }
  }, []);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>
          <FaDumbbell style={{ marginRight: "10px" }} /> Gym Dashboard
        </h2>
        <Link to="/" className="home-button">🏠 Home</Link>
      </div>

      <div className="booking-form">
        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <input type="time" onChange={(e) => setStartTime(e.target.value)} />
        <input type="time" onChange={(e) => setEndTime(e.target.value)} />
        <button onClick={bookSlot}>📅 Book Slot</button>
      </div>

      <h3>Your Bookings:</h3>
      <div className="slot-cards">
        {slots.map((slot) => (
          <SlotCard
            key={slot._id}
            date={slot.date}
            startTime={slot.startTime}
            endTime={slot.endTime}
          />
        ))}
      </div>

      <h3 className="status-text">
        Status:{" "}
        <span className={isActive ? "active-status" : "inactive-status"}>
          {isActive ? "🟢 Active in Gym" : "🔴 Not Active"}
        </span>
      </h3>
    </div>
  );
}

export default Dashboard;
