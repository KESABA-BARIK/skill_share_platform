import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBookings } from "../redux/actions/bookingActions";

const MyRequests = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.user);
  const { outgoing } = useSelector((state) => state.booking);

  useEffect(() => {
    if (userInfo?.token) {
      dispatch(getMyBookings(userInfo.token));
    }
  }, [dispatch, userInfo]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>My Booking Requests</h2>
      <div style={styles.list}>
        {(outgoing || []).map((b) => (
          <div key={b.id} style={styles.card} className="card-hover">
            <p><strong>Skill:</strong> {b.Skill?.title || "Unknown Skill"}</p>
            <p><strong>Message:</strong> {b.message}</p>
            <p><strong>Status:</strong> <span style={styles.status(b.status)}>{b.status}</span></p>
          </div>
        ))}
      </div>

      {/* Hover + Responsive Styles */}
      <style>{`
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(255, 64, 129, 0.6);
        }

        @media (max-width: 600px) {
          .card-hover {
            padding: 1rem;
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "2rem auto",
    padding: "1.5rem",
    fontFamily: "'Courier New', Courier, monospace",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "1.5rem",
    color: "#ff4081",
    textAlign: "center",
    textShadow: "1px 1px 0 #000",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#2d2d2d",
    borderRadius: "12px",
    padding: "1.5rem",
    color: "#e0e0e0",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
    border: "2px solid #ff4081",
  },
  status: (status) => ({
    color:
      status === "accepted"
        ? "#28a745"
        : status === "rejected"
        ? "#dc3545"
        : "#ffc107",
    fontWeight: "bold",
  }),
};

export default MyRequests;
