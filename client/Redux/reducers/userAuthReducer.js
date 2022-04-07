const userAuthReducer = (state = null, action) => {
  console.log('ACTION ', action.payload);
  switch (action.type) {
    case 'authorized':
      return {
        ...state,
        user: {
          ...state.user,
          user: action.payload
        }
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
