import axios from 'axios';
import {
  SCHEDULE_LIST_REQUEST,
  SCHEDULE_LIST_SUCCESS,
  SCHEDULE_LIST_FAIL,
  SCHEDULE_CREATE_REQUEST,
  SCHEDULE_CREATE_SUCCESS,
  SCHEDULE_CREATE_FAIL
} from '../constants/scheduleConstants';

export const fetchSchedules = () => async (dispatch, getState) => {
  try {
    dispatch({ type: SCHEDULE_LIST_REQUEST });

    const {
      user: { userInfo },
    } = getState();

    const { data } = await axios.get('http://localhost:5000/api/schedules', {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });

    dispatch({ type: SCHEDULE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SCHEDULE_LIST_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const createSchedule = (scheduleData) => async (dispatch, getState) => {
  try {
    dispatch({ type: SCHEDULE_CREATE_REQUEST });

    const {
      user: { userInfo },
    } = getState();

    const { data } = await axios.post(
      'http://localhost:5000/api/schedules',
      scheduleData,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    dispatch({ type: SCHEDULE_CREATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SCHEDULE_CREATE_FAIL,
      payload: error.response?.data?.message || error.message,
    });
  }
};
