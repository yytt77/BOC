// change register to login once login finished
const authScreenReducer = (state = 'register', action) => {
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
