import React from "react";
import "../pages/Dashboard.css";

function SlotCard({ date, startTime, endTime, onDelete, slotId }) {
  return (
    <div className="slot-card">
      <p>Date: {date}</p>
      <p>Start: {startTime}</p>
      <p>End: {endTime}</p>
      <button
        className="delete-btn"
        onClick={() => onDelete(slotId)}
        title="Delete Slot"
      >
        <img
          src={`${process.env.PUBLIC_URL}/delete.png`}
          alt="Delete"
          className="delete-icon"
        />
      </button>
    </div>
  );
}

export default SlotCard;
