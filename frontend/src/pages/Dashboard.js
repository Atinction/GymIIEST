import React, { useState, useEffect, useCallback } from "react"; // Added useCallback
import axios from "axios";
import { Link } from "react-router-dom"; // Added Link import
import './Dashboard.css'; // Importing the external CSS file

// SlotCard Component
function SlotCard({ date, startTime, endTime, onDelete, slotId, onBookEquipment }) {
    return (
        <div className="slot-card">
            {/* Delete button moved to top-right */}
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
            <p>Date: {date}</p>
            <p>Start: {startTime}</p>
            <p>End: {endTime}</p>
            {/* Book Equipment button will now be at the bottom */}
            <button
                className="book-equipment-btn"
                onClick={onBookEquipment}
                title="Book Gym Equipment"
            >
                Book Equipment
            </button>
        </div>
    );
}

// EquipmentBookingModal Component
const equipmentData = [
    { name: 'Chest Press', imageUrl: 'https://placehold.co/100x100/007bff/ffffff?text=Chest', spec: 'The chest press machine is a staple in strength training, designed to target the pectoral muscles, triceps, and anterior deltoids. This equipment mimics the motion of a bench press but offers added safety and control, making it ideal for beginners and experienced lifters alike. The user sits in an upright or slightly reclined position, grips the handles, and pushes them forward against adjustable resistance. One of the key advantages of the chest press machine is its ability to isolate the chest muscles, minimizing the involvement of stabilizing muscles. This allows users to focus on building strength and muscle mass in the chest without the complexity of balancing free weights. The machine’s adjustable settings make it suitable for people of various fitness levels and body sizes. Regular use of the chest press can enhance upper body strength, improve posture, and support other pushing movements in daily life and sports. It’s especially beneficial for those looking to increase muscle definition in the chest and arms. When incorporated into a balanced workout routine, the chest press complements other exercises like push-ups and dumbbell presses, contributing to a well-rounded upper body training program.' },
    { name: 'Butterfly Machine', imageUrl: 'https://placehold.co/100x100/007bff/ffffff?text=Butterfly', spec: 'The Butterfly Machine, also known as the Pec Deck, is a specialized strength training machine designed primarily to target the pectoralis major muscles of the chest. It simulates the motion of a dumbbell chest fly but offers more control and safety, making it an excellent choice for beginners as well as seasoned lifters. The user sits upright with their back firmly against a padded support, arms bent at a 90-degree angle or extended slightly, and grips the handles attached to weighted arms.As the handles are brought together in front of the body in a hugging motion, the chest muscles contract intensely, while the shoulders and triceps also assist as secondary muscles. The machine’s design ensures that the movement stays in a controlled, isolated plane, which reduces the risk of improper form and injury compared to free-weight alternatives.The Butterfly Machine is highly effective for developing chest muscle definition, increasing upper body strength, and improving shoulder stability. Adjustments in seat height and arm position allow users to focus on different sections of the chest. It’s commonly incorporated into upper body routines to complement pressing movements like bench presses or push-ups, providing a complete and balanced chest workout that enhances both strength and aesthetic appeal.' },
    { name: 'Gym Benches', imageUrl: 'https://placehold.co/100x100/007bff/ffffff?text=Benches', spec: 'Gym benches are essential equipment in any fitness setting, providing a stable platform for a wide range of strength training exercises. Available in flat, incline, decline, and adjustable designs, gym benches support activities like bench presses, dumbbell flys, seated curls, and ab workouts. The adjustable nature of many benches allows users to target specific muscle groups by modifying the angle and position.A gym bench enhances both safety and exercise efficiency. It ensures proper form and posture, reducing the risk of injury when lifting weights or performing bodyweight exercises. The padding offers comfort while supporting the back and limbs, particularly during heavy lifts or longer sets.Incorporating gym benches into a fitness routine enables users to diversify their workouts. For example, an incline bench press targets the upper chest and shoulders, while a decline bench press emphasizes the lower chest. Beyond presses, benches serve as a base for step-ups, triceps dips, and core exercises. Their simplicity and versatility make them suitable for users of all fitness levels. When paired with free weights or machines, gym benches contribute to balanced muscle development, strength gains, and improved overall fitness, making them a fundamental piece of equipment in any gym.' },
    { name: 'Treadmill', imageUrl: 'https://placehold.co/100x100/007bff/ffffff?text=Treadmill', spec: 'A treadmill is one of the most widely used pieces of cardio equipment in gyms and homes. It provides a controlled environment for walking, jogging, or running at various speeds and inclines. Most treadmills feature adjustable settings for pace, incline, and workout duration, enabling users to customize their workouts to fit specific fitness goals, whether it’s weight loss, stamina building, or rehabilitation. The treadmill’s greatest advantage lies in its versatility and accessibility. It allows users to maintain consistent cardiovascular activity regardless of outdoor weather conditions. The cushioned running surface of a treadmill reduces the impact on joints compared to running on concrete or asphalt, making it a preferred choice for individuals seeking a lower-impact alternative for cardio. Modern treadmills come equipped with features like heart rate monitors, calorie counters, pre-set workout programs, and entertainment options such as built-in speakers or screen connectivity. High-end models often include virtual running routes and fitness tracking apps. Treadmills help strengthen the heart, burn calories, and improve endurance while offering a user-friendly platform for interval training or steady-state runs. Whether for seasoned runners or beginners starting a fitness journey, treadmills provide a convenient, effective way to stay active and healthy.' },
    { name: 'Dumbbells', imageUrl: 'https://placehold.co/100x100/007bff/ffffff?text=Dumbbells', spec: 'Dumbbells are versatile, compact strength training tools found in virtually every gym and home workout space. Consisting of a short bar with weights on either end, dumbbells come in various fixed and adjustable options to suit different fitness levels and exercises. They are integral for both upper and lower body workouts, enabling movements like bicep curls, shoulder presses, chest flys, lunges, and weighted squats.One of the major benefits of dumbbells is their ability to engage stabilizer muscles. Unlike machines that guide motion, dumbbells require balance and coordination, which enhances overall muscular control and joint stability. They also allow for a full range of motion, leading to more effective muscle activation and improved flexibility.Dumbbells are perfect for unilateral training, where one side of the body works independently of the other. This helps correct muscle imbalances and improves symmetry. Their portability and variety of available weights make them suitable for beginners, intermediate, and advanced lifters alike. Additionally, dumbbells are excellent for high-repetition, light-weight endurance training or heavy, low-rep strength building. Whether for hypertrophy, toning, rehabilitation, or general fitness, dumbbells remain one of the most practical, effective, and user-friendly tools in strength and conditioning programs.' },
    { name: 'Spin Bike', imageUrl: 'https://placehold.co/100x100/007bff/ffffff?text=SpinBike', spec: 'A spin bike is a stationary exercise bike designed to simulate the experience of outdoor cycling. Unlike regular exercise bikes, spin bikes have a heavier flywheel, which provides a smoother, more controlled ride and requires continuous pedaling, much like riding on the road. They typically come with adjustable resistance levels, allowing users to simulate flat roads, uphill climbs, and intense sprints. The handlebars and seat can usually be adjusted to accommodate different rider heights and riding positions, ensuring optimal posture and comfort.Spin bikes are a popular choice for cardio enthusiasts and those looking to burn calories quickly. A vigorous 45-minute spin session can burn up to 500–700 calories, making it one of the most effective workouts for weight loss. It also strengthens the legs, improves cardiovascular endurance, and enhances overall stamina. Many modern spin bikes include digital displays showing distance, time, calories burned, and heart rate monitoring. Whether used for high-intensity interval training (HIIT) or steady-state cardio, spin bikes offer a low-impact option that’s gentle on the joints, making them suitable for all fitness levels. Spin classes, often set to energetic music and guided by an instructor, further enhance the workout experience, boosting motivation and group camaraderie.' },
    { name: 'CrossCable machine', imageUrl: 'https://placehold.co/100x100/007bff/ffffff?text=Cable', spec: 'The cross cable machine, commonly known as a cable crossover machine, is a multifunctional piece of gym equipment designed to work virtually every muscle group in the body. It consists of two adjustable pulleys connected by a crossbeam, allowing users to perform a variety of exercises from different angles and positions. Equipped with adjustable weight stacks, the resistance can be customized to match the user’s strength level and workout intensity.One of the standout features of the cross cable machine is its versatility. It’s particularly effective for chest, shoulder, and arm exercises, like cable flys, triceps pushdowns, and bicep curls. The continuous tension provided by the cables ensures constant muscle engagement throughout the entire range of motion, promoting better muscle growth and endurance.Unlike free weights, the cross cable machine offers controlled, smooth movements that reduce strain on joints and lower the risk of injury. It also allows for functional training — exercises that mimic everyday activities and athletic movements — improving balance, coordination, and flexibility. With adjustable height settings, it accommodates a range of exercises for both upper and lower body, making it an indispensable tool for comprehensive strength training routines and rehabilitation programs.' },
    { name: 'Seated Leg Press', imageUrl: 'https://placehold.co/100x100/007bff/ffffff?text=LegPress', spec: 'The seated leg press machine is a popular lower-body strength training apparatus designed to target the quadriceps, hamstrings, glutes, and calves. The user sits in a reclined or upright position and pushes a weighted platform away from their body using their legs. The adjustable seat and backrest ensure proper posture and alignment, accommodating users of different heights and body types.A key advantage of the seated leg press is its ability to isolate the leg muscles without placing excessive stress on the lower back. This makes it a safer alternative to barbell squats, especially for beginners or those recovering from injury. The adjustable resistance levels allow for gradual strength progression, making it suitable for both novice and advanced gym-goers.Regular use of the seated leg press enhances lower-body muscle development, improves bone density, and increases joint stability. It’s also beneficial for athletes looking to boost their sprint speed, jumping ability, and overall leg power. By altering foot placement on the platform, users can target different parts of the leg muscles — a narrow stance emphasizes the quadriceps, while a wider stance engages the glutes and inner thighs. The seated leg press remains a cornerstone exercise for building strong, powerful legs.' },
];

function EquipmentBookingModal({ slot, userId, onClose }) {
    const [availableEquipment, setAvailableEquipment] = useState({});
    const [userBookedEquipment, setUserBookedEquipment] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState([]); // For new selections
    const [message, setMessage] = useState('');

    // useCallback to memoize fetchEquipmentData
    const fetchEquipmentData = useCallback(async () => {
        try {
            // Fetch global availability for this slot's time
            const availabilityRes = await axios.get(`http://localhost:8080/api/equipment/equipment-availability?date=${slot.date}&startTime=${slot.startTime}`);
            setAvailableEquipment(availabilityRes.data);

            // Fetch equipment already booked by the current user for this specific slot
            const userBookedRes = await axios.get(`http://localhost:8080/api/equipment/my-equipment/${userId}/${slot._id}`);
            setUserBookedEquipment(userBookedRes.data);
            // Initialize selectedEquipment with existing bookings to show them as 'selected'
            setSelectedEquipment(userBookedRes.data.map(item => item.equipmentName));
        } catch (err) {
            console.error("Error fetching equipment data:", err);
            setMessage("Failed to load equipment data.");
        }
    }, [slot, userId]); // Dependencies for useCallback

    // Fetch equipment data on component mount and when slot/user changes
    useEffect(() => {
        fetchEquipmentData();
    }, [fetchEquipmentData]); // Dependency for useEffect is the memoized function

    // Handler for selecting/deselecting equipment
    const handleEquipmentSelection = (equipmentName) => {
        // If the equipment is already booked by the user for this slot, prevent re-selection/deselection via this click
        if (userBookedEquipment.some(e => e.equipmentName === equipmentName)) {
            setMessage(`You have already booked ${equipmentName} for this slot. To remove, please delete it.`);
            return;
        }

        // Toggle selection for new equipment
        if (selectedEquipment.includes(equipmentName)) {
            setSelectedEquipment(selectedEquipment.filter(name => name !== equipmentName));
        } else {
            // Check if user has reached the max booking limit (3 equipment)
            if (selectedEquipment.length < 3) {
                setSelectedEquipment([...selectedEquipment, equipmentName]);
            } else {
                setMessage("You can select a maximum of 3 equipment.");
            }
        }
    };

    // Handler for booking the selected equipment
    const bookSelectedEquipment = async () => {
        // Filter out equipment that are already booked by the user, so we only try to book new selections
        const newSelectionsToBook = selectedEquipment.filter(name =>
            !userBookedEquipment.some(e => e.equipmentName === name)
        );

        if (newSelectionsToBook.length === 0) {
            setMessage("No new equipment selected to book.");
            return;
        }

        let successCount = 0;
        let failedMessages = [];

        // Iterate through selected new equipment and attempt to book each one
        for (const equipmentName of newSelectionsToBook) {
            try {
                const response = await axios.post("http://localhost:8080/api/equipment/book-equipment", {
                    userId,
                    slotId: slot._id,
                    date: slot.date,
                    startTime: slot.startTime,
                    equipmentName
                });
                if (response.data.message) {
                    successCount++;
                }
            } catch (err) {
                console.error(`Error booking ${equipmentName}:`, err);
                failedMessages.push(err.response?.data?.message || `Failed to book ${equipmentName}.`);
            }
        }

        // Provide feedback to the user
        if (successCount > 0) {
            setMessage(`Successfully booked ${successCount} equipment!`);
            fetchEquipmentData(); // Refresh data to show updated bookings and availability
        }
        if (failedMessages.length > 0) {
            setMessage(prev => (prev ? prev + "\n" : "") + failedMessages.join("\n"));
        }
    };

    // Handler for deleting an equipment booking
    const handleDeleteEquipmentBooking = async (bookingId) => {
        // Custom confirmation modal
        const confirmed = await new Promise(resolve => {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.7); display: flex; justify-content: center;
                align-items: center; z-index: 1001; /* Higher z-index than main modal */
            `;
            modal.innerHTML = `
                <div style="background: #1a1a1a; padding: 30px; border-radius: 10px;
                            box-shadow: 0 0 20px rgba(0,0,0,0.5); text-align: center; color: white;">
                    <p style="margin-bottom: 20px; font-size: 1.1rem;">Are you sure you want to delete this equipment booking?</p>
                    <button id="confirmYes" style="background: #4CAF50; color: white; padding: 10px 20px;
                                                    border: none; border-radius: 5px; cursor: pointer; margin-right: 10px;">Yes</button>
                    <button id="confirmNo" style="background: #f44336; color: white; padding: 10px 20px;
                                                   border: none; border-radius: 5px; cursor: pointer;">No</button>
                </div>
            `;
            document.body.appendChild(modal);

            document.getElementById('confirmYes').onclick = () => {
                document.body.removeChild(modal);
                resolve(true);
            };
            document.getElementById('confirmNo').onclick = () => {
                document.body.removeChild(modal);
                resolve(false);
            };
        });

        if (!confirmed) return; // If user cancels, stop here

        try {
            const res = await axios.delete("http://localhost:8080/api/equipment/delete-equipment-booking", {
                data: { bookingId, userId } // Use data property for DELETE requests with body
            });
            setMessage(res.data.message);
            fetchEquipmentData(); // Refresh data after deletion
        } catch (err) {
            console.error("Error deleting equipment booking:", err);
            setMessage("Failed to delete equipment booking.");
        }
    };


    return (
        <div className="equipment-modal-overlay">
            <div className="equipment-modal-content">
                <h2>Book Equipment for Slot</h2>
                <p>Date: {slot.date}</p>
                <p>Time: {slot.startTime} - {slot.endTime}</p>

                {message && <p className="modal-message">{message}</p>}

                <h3>Your Booked Equipment for this Slot ({userBookedEquipment.length}/3):</h3>
                <div className="user-booked-equipment">
                    {userBookedEquipment.length > 0 ? (
                        userBookedEquipment.map(item => (
                            <div key={item._id} className="booked-item">
                                <span>{item.equipmentName}</span>
                                <button onClick={() => handleDeleteEquipmentBooking(item._id)} className="delete-equipment-btn">Delete</button>
                            </div>
                        ))
                    ) : (
                        <p>No equipment booked for this slot yet.</p>
                    )}
                </div>

                <h3>Available Equipment:</h3>
                <div className="equipment-grid">
                    {equipmentData.map((equip) => {
                        const remaining = availableEquipment[equip.name] !== undefined ? availableEquipment[equip.name] : 0;
                        const isSelected = selectedEquipment.includes(equip.name);
                      
                        const isDisabled = remaining <= 0 && !isSelected;
                  
                        const isUserBooked = userBookedEquipment.some(e => e.equipmentName === equip.name);

                        return (
                            <div
                                key={equip.name}
                                className={`equipment-card ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''} ${isUserBooked ? 'user-booked' : ''}`}
                            
                                onClick={() => !isDisabled && !isUserBooked && handleEquipmentSelection(equip.name)}
                            >
                                <img
                                    src={equip.imageUrl}
                                    alt={equip.name}
                                    className="equipment-image"
                                    // Fallback for image loading errors
                                    onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x100/cccccc/000000?text=${encodeURIComponent(equip.name)}`; }}
                                />
                                <p className="equipment-name">{equip.name}</p>
                                <p className="equipment-remaining">Remaining: {remaining}</p>
                                {isUserBooked && <span className="booked-indicator">Booked</span>}
                            </div>
                        );
                    })}
                </div>

                <div className="modal-actions">
                    <button onClick={bookSelectedEquipment} className="modal-book-btn">Book Selected</button>
                    <button onClick={onClose} className="modal-close-btn">Close</button>
                </div>
            </div>
        </div>
    );
}


function Dashboard() {
    const [date, setDate] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [gender, setGender] = useState("");
    const [slots, setSlots] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [showEquipmentModal, setShowEquipmentModal] = useState(false); // State to control modal visibility
    const [selectedSlotForEquipment, setSelectedSlotForEquipment] = useState(null); // State to pass slot data to modal

    const userId = localStorage.getItem("userId");

    const fetchSlots = useCallback(async () => {
        if (!userId) return;
        try {
            const res = await axios.get(`http://localhost:8080/api/slots/my-slots/${userId}`);
            setSlots(res.data);
        } catch (err) {
            console.error("Error fetching slots:", err);
        }
    }, [userId]);

    const checkStatus = useCallback(async () => {
        if (!userId) return;
        try {
            const res = await axios.get(`http://localhost:8080/api/slots/check-status/${userId}`);
            setIsActive(res.data.active);
        } catch (err) {
            console.error("Error checking status:", err);
        }
    }, [userId]);


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
            if (err.response?.data?.message) {
                alert(err.response.data.message);
            } else {
                alert("Failed to book slot");
            }
        }
    };
    const handleDeleteSlot = async (slotId) => {
        if (!userId) return;
        const confirmed = await new Promise(resolve => {
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.7); display: flex; justify-content: center;
                align-items: center; z-index: 1000;
            `;
            modal.innerHTML = `
                <div style="background: #1a1a1a; padding: 30px; border-radius: 10px;
                            box-shadow: 0 0 20px rgba(0,0,0,0.5); text-align: center; color: white;">
                    <p style="margin-bottom: 20px; font-size: 1.1rem;">Are you sure you want to delete this slot?</p>
                    <button id="confirmYes" style="background: #4CAF50; color: white; padding: 10px 20px;
                                                    border: none; border-radius: 5px; cursor: pointer; margin-right: 10px;">Yes</button>
                    <button id="confirmNo" style="background: #f44336; color: white; padding: 10px 20px;
                                                   border: none; border-radius: 5px; cursor: pointer;">No</button>
                </div>
            `;
            document.body.appendChild(modal);

            document.getElementById('confirmYes').onclick = () => {
                document.body.removeChild(modal);
                resolve(true);
            };
            document.getElementById('confirmNo').onclick = () => {
                document.body.removeChild(modal);
                resolve(false);
            };
        });

        if (!confirmed) return;

        try {
            const res = await axios.delete("http://localhost:8080/api/slots/delete-slot", {
                data: { slotId, userId },
            });
            alert(res.data.message);
            fetchSlots();
        } catch (err) {
            console.error("Error deleting slot:", err);
            alert("Failed to delete slot");
        }
    };
    const handleBookEquipmentClick = (slot) => {
        setSelectedSlotForEquipment(slot);
        setShowEquipmentModal(true);
    };
    useEffect(() => {
        if (userId) {
            fetchSlots();
            checkStatus();
        } else {
            alert("User not logged in. Redirecting to home.");
            window.location.href = "/";
        }
    }, [userId, fetchSlots, checkStatus]);

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h2>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 576 512"
                        style={{ width: '24px', height: '24px', fill: 'currentColor', marginRight: '10px' }}
                    >
                        <path d="M96 64c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V224H96V64zm32 192H448V448c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V256zm-64-80c0-8.8 7.2-16 16-16H80c8.8 0 16 7.2 16 16V336c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V176zm480 16c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H512c-8.8 0-16 7.2-16 16V336c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16V192zM192 256H384V64H192V256z"/>
                    </svg>
                    Gym Dashboard
                </h2>
                <Link to="/Home" className="home-button"> Back To Home </Link>
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
                        slotId={slot._id}
                        onDelete={handleDeleteSlot}
                        onBookEquipment={() => handleBookEquipmentClick(slot)} // Pass the handler
                    />
                ))}
            </div>

            <h3 className="status-text">
                Status:{" "}
                <span className={isActive ? "active-status" : "inactive-status"}>
                    {isActive ? " Active in Gym" : " Not Active"}
                </span>
            </h3>
            {showEquipmentModal && selectedSlotForEquipment && (
                <EquipmentBookingModal
                    slot={selectedSlotForEquipment}
                    userId={userId}
                    onClose={() => {
                        setShowEquipmentModal(false);
                        setSelectedSlotForEquipment(null);
                        fetchSlots();
                    }}
                />
            )}
        </div>
    );
}

export default Dashboard;
