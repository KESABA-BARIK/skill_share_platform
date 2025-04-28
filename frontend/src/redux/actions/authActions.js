import axios from "axios";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGOUT = "LOGOUT";

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post("/api/users/login", { email, password });
    const { token } = res.data;

    localStorage.setItem("token", token);

    dispatch({ type: LOGIN_SUCCESS, payload: token });
  } catch (err) {
    console.error(err);
    alert("Login failed");
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: LOGOUT });
};
