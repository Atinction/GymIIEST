import React, { useState } from "react";
import axios from "axios";

const SlotBookingForm = ({ userId }) => {
  const [form, setForm] = useState({
    date: "",
    startTime: "",
    endTime: "",
    gender: "Male",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/slot/book-slot", {
        userId,
        ...form,
      });
      alert(response.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Error booking slot");
    }
  };

  return (
    <div className="slot-booking-form" style={{ maxWidth: 400, margin: "0 auto", padding: 20 }}>
      <h2>Book a Gym Slot</h2>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "15px" }}>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="startTime"
          value={form.startTime}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="endTime"
          value={form.endTime}
          onChange={handleChange}
          required
        />
        <select name="gender" value={form.gender} onChange={handleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <button type="submit" style={{ padding: "10px", fontWeight: "bold" }}>
          Book Slot
        </button>
      </form>
    </div>
  );
};

export default SlotBookingForm;
