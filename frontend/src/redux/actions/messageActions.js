import axios from "axios";
import {
  FETCH_CONVERSATION_SUCCESS,
  FETCH_CONVERSATION_FAIL,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
} from "../constants/messageConstants";

export const fetchConversation = (userId, token) => async (dispatch) => {
  try {
    const { data } = await axios.get(`http://localhost:5000/api/messages/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: FETCH_CONVERSATION_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_CONVERSATION_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const sendMessage = (receiverId, content, token) => async (dispatch) => {
  try {
    const { data } = await axios.post(
      `http://localhost:5000/api/messages`,
      { receiverId, content },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({ type: SEND_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SEND_MESSAGE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
