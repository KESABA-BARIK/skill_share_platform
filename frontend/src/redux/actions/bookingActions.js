import axios from "axios";

export const createBooking = (skillId, message, token) => async (dispatch) => {
  try {
    await axios.post(
      "http://localhost:5000/api/bookings",
      { skillId, message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // You can dispatch something like:
    // dispatch({ type: 'BOOKING_REQUEST_SUCCESS' });
  } catch (error) {
    console.error("Booking creation failed", error);
  }
};

export const getMyBookings = (token) => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/bookings/my-requests", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "SET_OUTGOING_BOOKINGS",
      payload: res.data,
    });
  } catch (error) {
    console.error("Failed to fetch my bookings", error);
  }
};

export const getIncomingBookings = (token) => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:5000/api/bookings/incoming", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch({
      type: "SET_INCOMING_BOOKINGS",
      payload: res.data,
    });
  } catch (error) {
    console.error("Failed to fetch incoming bookings", error);
  }
};

export const updateBookingStatus = (id, status, token) => async (dispatch) => {
  try {
    await axios.put(
      `http://localhost:5000/api/bookings/${id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(getIncomingBookings(token));
  } catch (error) {
    console.error("Failed to update booking status", error);
  }
};
