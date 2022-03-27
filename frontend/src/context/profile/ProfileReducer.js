const profileReducer = (state, action) => {
  switch (action.type) {
    case 'GET_PROFILES':
      return {
        ...state,
        profiles: action.payload,
      }
    case 'CREATE_PROFILE':
      return {
        ...state,
        profiles: [...state.profiles, action.payload],
        activeProfile: action.payload,
      }
    case 'MAKE_ACTIVE':
      return {
        ...state,
        activeProfile: state.profiles.find(
          (profile) => profile._id === action.payload
        ),
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
