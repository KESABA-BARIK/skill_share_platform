import axios from 'axios';

export const fetchSkills = () => async (dispatch) => {
  try {
    dispatch({ type: 'SKILLS_REQUEST' });

    const { data } = await axios.get('http://localhost:5000/api/skills');
    dispatch({ type: 'SKILLS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'SKILLS_FAIL',
      payload: error.response?.data?.message || error.message,
    });
  }
};
