import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSchedules, createSchedule } from "../redux/actions/scheduleActions";

const ScheduleDashboard = () => {
  const dispatch = useDispatch();
  const { schedules, loading, error } = useSelector((state) => state.schedule);

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    dispatch(fetchSchedules());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSchedule(form));
    setForm({ title: "", date: "", time: "" });
  };

  return (
    <div style={styles.container}>
      <h2>Schedule Dashboard</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="title"
          placeholder="Session title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          required
        />
        <input
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Schedule</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Upcoming Schedules</h3>
      <ul>
        {schedules.map((s) => (
          <li key={s.id}>
            <strong>{s.title}</strong> on {s.date} at {s.time}
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "1rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    marginBottom: "1rem",
  },
};

export default ScheduleDashboard;
