import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getIncomingBookings, updateBookingStatus } from "../redux/actions/bookingActions";

const IncomingRequests = () => {
  const dispatch = useDispatch();
  const { incoming } = useSelector((state) => state.booking);
  const { userInfo } = useSelector((state) => state.user);

  useEffect(() => {
    if (userInfo?.token) {
      dispatch(getIncomingBookings(userInfo.token));
    }
  }, [dispatch, userInfo]);

  const handleAction = (id, status) => {
    dispatch(updateBookingStatus(id, status, userInfo.token));
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Incoming Booking Requests</h2>
      <div style={styles.list}>
        {(incoming || []).map((b) => (
          <div key={b.id} style={styles.card} className="card-hover">
            <p><strong>Skill:</strong> {b.Skill?.title}</p>
            <p><strong>From:</strong> {b.requester?.name} ({b.requester?.email})</p>
            <p><strong>Message:</strong> {b.message}</p>
            <p><strong>Status:</strong> <span style={styles.status(b.status)}>{b.status}</span></p>
            <div style={styles.actions}>
              <button onClick={() => handleAction(b.id, "accepted")} className="btn btn-accept">Accept</button>
              <button onClick={() => handleAction(b.id, "rejected")} className="btn btn-reject">Reject</button>
            </div>
          </div>
        ))}
      </div>

      {/* Hover Styles */}
      <style>{`
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(255, 64, 129, 0.6);
        }

        .btn {
          flex: 1;
          padding: 0.6rem;
          color: #fff;
          border: none;
          border-radius: 6px;
          cursor: none;
          font-weight: bold;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }

        .btn:hover {
          transform: scale(1.05);
        }

        .btn:active {
          transform: scale(0.98);
        }

        .btn-accept {
          background-color: #28a745;
        }

        .btn-accept:hover {
          background-color: #38c172;
        }

        .btn-reject {
          background-color: #dc3545;
        }

        .btn-reject:hover {
          background-color: #e4606d;
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
  actions: {
    marginTop: "1rem",
    display: "flex",
    gap: "10px",
  },
  status: (status) => ({
    color: status === "accepted" ? "#28a745" : status === "rejected" ? "#dc3545" : "#ffc107",
    fontWeight: "bold",
  }),
};

export default IncomingRequests;
