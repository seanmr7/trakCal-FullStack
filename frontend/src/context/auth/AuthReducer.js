const authReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      }
    case 'AUTH_ERROR':
    case 'LOGIN_ERROR':
      return {
        ...state,
        message: action.payload.message,
        isError: true,
      }
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      }
    case 'CLEAR_ERRORS':
      return {
        ...state,
        isError: false,
        message: '',
      }
    default:
      return state
  }
}

export default authReducer
