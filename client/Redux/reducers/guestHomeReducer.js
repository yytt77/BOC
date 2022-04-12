const guestHomeReducer = (state = 'home', action) => {
  switch (action.type) {
    case 'home':
      return 'home'
    case 'auth':
      return 'auth'
    default:
      return state
  }
}

export default guestHomeReducer;
