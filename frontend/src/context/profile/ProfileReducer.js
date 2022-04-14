const profileReducer = (state, action) => {
  switch (action.type) {
    case 'GET_PROFILES':
      return {
        ...state,
        profiles: action.payload,
        loading: false,
      }
    case 'CREATE_PROFILE':
      return {
        ...state,
        profiles: [...state.profiles, action.payload],
        activeProfile: action.payload,
        showProfileForm: false,
        loading: false,
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
        loading: false,
      }
    case 'DELETE_PROFILE':
      return {
        ...state,
        profiles: state.profiles.filter((profile) => profile._id !== action.payload),
        activeProfile: {},
      }
    case 'MAKE_ACTIVE':
      return {
        ...state,
        activeProfile: state.profiles.find((profile) => profile._id === action.payload),
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
    case 'SET_LOADING':
      return {
        ...state,
        loading: true,
      }
    default:
      return state
  }
}

export default profileReducer
