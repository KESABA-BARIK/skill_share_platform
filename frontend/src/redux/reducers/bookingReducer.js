const initialState = {
    incoming: [],
    outgoing: [],
  };
  
  const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_OUTGOING_BOOKINGS":
        return { ...state, outgoing: action.payload };
      case "SET_INCOMING_BOOKINGS":
        return { ...state, incoming: action.payload };
      default:
        return state;
    }
  };
  
  export default bookingReducer;
  