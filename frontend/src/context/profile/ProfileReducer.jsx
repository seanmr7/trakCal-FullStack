const profileReducer = (state, action) => {
  switch (action.type) {
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
