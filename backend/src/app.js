const express = require('express');
const cors = require("cors");
const morgan = require('morgan');
const userRoutes = require('./routes/user.routes');
const skillRoutes = require('./routes/skill.routes');
const bookingRoutes = require("./routes/booking.routes");
const messageRoutes = require("./routes/message.routes");
const reviewRoutes = require("./routes/review.routes");
const scheduleRoutes = require("./routes/schedule.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true // if you use cookies or auth headers
}));
app.use('/api/users', userRoutes);
app.use('/api/skills',skillRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/reviews", reviewRoutes);   
app.use("/api/schedules", scheduleRoutes);

// Default Route
app.get('/', (req, res) => {
  res.send('Skill Sharing Platform API is running...');
});

module.exports = app;
