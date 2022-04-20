<<<<<<< HEAD
=======
// change register to login once login finished
>>>>>>> eed2da9f7404e09c5b9a4915c95e35689291a7b7
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
