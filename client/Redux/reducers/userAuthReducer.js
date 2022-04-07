const userAuthReducer = (state = null, action) => {
  switch (action.type) {
    case 'authorized':
      return {
        ...state,
        user: action.payload
      }.user
    case 'unauthorized':
      return {
        ...state,
        user: null
      }.user
    default:
      return state;
  }
}

export default userAuthReducer;
