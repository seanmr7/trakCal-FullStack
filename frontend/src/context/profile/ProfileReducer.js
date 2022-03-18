const profileReducer = (state, action) => {
  switch (action.type) {
    case 'GET_PROFILES':
      return {
        ...state,
        profiles: action.payload,
      }
    case 'TOGGLE_PROFILE_FORM':
      return {
        ...state,
        showProfileForm: !state.showProfileForm,
      }
    default:
      return state
  }
}

export default profileReducer
