const initialState = {
    skills: [],
    loading: false,
    error: null,
  };
  
  const skillReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SKILLS_REQUEST':
        return { ...state, loading: true };
      case 'SKILLS_SUCCESS':
        return { loading: false, skills: action.payload, error: null };
      case 'SKILLS_FAIL':
        return { loading: false, error: action.payload, skills: [] };
      default:
        return state;
    }
  };
  
  export default skillReducer;
  