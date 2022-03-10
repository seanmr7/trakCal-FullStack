const authReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      }
    case 'AUTH_ERROR':
      return {
        ...state,
        message: action.payload.message,
        isError: true,
      }
    default:
      return state
  }
}

export default authReducer
