import axios from "axios";
import { LOGIN_SUCCESS } from "../constants/userConstants";

export const loginUser = (credentials) => async (dispatch) => {
  try {
    dispatch({ type: "LOGIN_REQUEST" });

    const { data } = await axios.post("http://localhost:5000/api/users/login", credentials);

    dispatch({
        type: 'LOGIN_SUCCESS',
        payload: {
          user: data.user, // make sure this line exists
          token: data.token,
        },
      });

      localStorage.setItem('userInfo', JSON.stringify({
        user: data.user,
        token: data.token,
      }));
  } catch (error) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const registerUser = (formData, navigate) => async (dispatch) => {
    try {
      const res = await axios.post("http://localhost:5000/api/users/register", formData);
  
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data, // assuming backend returns { token, user }
      });
  
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      navigate("/"); // redirect to homepage or dashboard
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
      console.error("Registration error:", error);
    }
  };

export const updateProfile = (updatedUser, token) => async (dispatch) => {
    try {
      dispatch({ type: "UPDATE_PROFILE_REQUEST" });
  
      const { data } = await axios.put(
        "http://localhost:5000/api/users/me",
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Update Redux store with new data
      dispatch({
        type: "UPDATE_PROFILE_SUCCESS",
        payload: data,
      });
  
      // 🔥 Also update the LOGIN_SUCCESS state so UI reflects the change
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: {
          user: data.user, // or data depending on what the backend returns
          token,
        },
      });
  
      // Update localStorage
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          user: data.user,
          token,
        })
      );
    } catch (error) {
      dispatch({
        type: "UPDATE_PROFILE_FAILURE",
        payload: error.response?.data?.message || error.message,
      });
    }
  };

  export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("userInfo");
    dispatch({ type: "USER_LOGOUT" });
  };
  
