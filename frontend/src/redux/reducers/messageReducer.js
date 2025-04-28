import {
    FETCH_CONVERSATION_SUCCESS,
    FETCH_CONVERSATION_FAIL,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAIL,
  } from "../constants/messageConstants";
  
  const initialState = {
    conversation: [],
    error: null,
  };
  
  const messageReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CONVERSATION_SUCCESS:
        return { ...state, conversation: action.payload, error: null };
      case FETCH_CONVERSATION_FAIL:
        return { ...state, error: action.payload };
      case SEND_MESSAGE_SUCCESS:
        return { ...state, conversation: [...state.conversation, action.payload] };
      case SEND_MESSAGE_FAIL:
        return { ...state, error: action.payload };
      default:
        return state;
    }
  };
  
  export default messageReducer;
  