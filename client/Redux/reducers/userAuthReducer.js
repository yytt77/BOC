const userAuthReducer = (state = null, action) => {
  switch (action.type) {
    case 'authorized':
      return action.payload;
    case 'unauthorized':
      return null;
    default:
      return state;
  }
}

export default userAuthReducer;
