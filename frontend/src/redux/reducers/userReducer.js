const initialState = {
    loading: false,
    userInfo: JSON.parse(localStorage.getItem("userInfo")) || null,
    error: null,
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "LOGIN_REQUEST":
      case "UPDATE_PROFILE_REQUEST":
        return {
          ...state,
          loading: true,
          error: null,
        };
  
      case "LOGIN_SUCCESS":
        return {
          ...state,
          loading: false,
          userInfo: action.payload,
          error: null,
        };
  
      case "UPDATE_PROFILE_SUCCESS":
        return {
          ...state,
          loading: false,
          userInfo: { ...state.userInfo, user: action.payload.user },
          error: null,
        };
  
      case "LOGIN_FAILURE":
      case "UPDATE_PROFILE_FAILURE":
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
  
      case "USER_LOGOUT":
        return {
          loading: false,
          userInfo: null,
          error: null,
        };
  
      default:
        return state;
    }
  };
  
  export default userReducer;
  