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
        showProfileForm: false,
      }
    case 'EDIT_PROFILE':
      return {
        ...state,
        profiles: state.profiles.map((profile) =>
          profile._id === action.payload._id ? action.payload : profile
        ),
        activeProfile: action.payload,
        isEdit: false,
        showProfileForm: false,
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
    case 'SET_EDIT_STATE':
      return {
        ...state,
        isEdit: action.payload,
      }
    default:
      return state
  }
}

export default profileReducer
