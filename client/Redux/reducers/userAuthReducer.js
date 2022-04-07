const userAuthReducer = (state = null, action) => {
  switch (action.type) {
    case 'authorized':
      return {
        ...state,
        userT: action.payload
      }
    case 'unauthorized':
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
}

export default userAuthReducer;
