import React from "react";
import "../pages/Dashboard.css"; 

function SlotCard({ date, startTime, endTime }) {
  return (
    <div className="slot-card">
      <h4>{date}</h4>
      <p>{startTime} - {endTime}</p>
    </div>
  );
}

export default SlotCard;
