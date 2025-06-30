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
  const [gender, setGender] = useState("");
  const [slots, setSlots] = useState([]);
  const [isActive, setIsActive] = useState(false);

  const userId = localStorage.getItem("userId");

  const bookSlot = async () => {
    if (!userId) {
      alert("User not logged in");
      return;
    }
    if (!date || !startTime || !endTime || !gender) {
      alert("Please fill all fields including gender");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/slots/book-slot", {
        userId,
        date,
        startTime,
        endTime,
        gender,
      });

      alert(response.data.message);
      fetchSlots();
    } catch (err) {
      console.error("Error booking slot:", err);
      if (err.response && err.response.data && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Failed to book slot");
      }
    }
  };

  const fetchSlots = async () => {
    if (!userId) return;
    try {
      const res = await axios.get(`http://localhost:8080/api/slots/my-slots/${userId}`);
      // console.log("Fetched slots: ", res.data);
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
        <Link to="/" className="home-button"> Back To Home </Link>
      </div>

      <div className="booking-form">
        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <input type="time" onChange={(e) => setStartTime(e.target.value)} />
        <input type="time" onChange={(e) => setEndTime(e.target.value)} />

        <select onChange={(e) => setGender(e.target.value)} defaultValue="">
          <option value="" disabled>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

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
          {isActive ? " Active in Gym" : " Not Active"}
        </span>
      </h3>
    </div>
  );
}

export default Dashboard;
