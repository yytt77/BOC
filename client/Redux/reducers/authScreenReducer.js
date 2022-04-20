const authScreenReducer = (state = 'login', action) => {
  switch (action.type) {
    case 'authLog':
      return 'login'
    case 'authReg':
      return 'register'
    default:
      return state
  }
}

export default authScreenReducer;
