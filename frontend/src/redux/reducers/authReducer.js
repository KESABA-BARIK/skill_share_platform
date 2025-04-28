import { LOGIN_SUCCESS, LOGOUT } from "../actions/authActions";

const token = localStorage.getItem("token");

const initialState = {
  token: token || null,
  isAuthenticated: !!token,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, token: action.payload, isAuthenticated: true };
    case LOGOUT:
      return { ...state, token: null, isAuthenticated: false };
    default:
      return state;
  }
}
