const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE':
      return {
        ...state,
        posts: action.payload.posts,
        userInfo: action.payload.userInfo
      }
    case 'authorized':
      return {
        ...state,
        username: action.payload
      };
    case 'unauthorized':
      return {
        ...state,
        username: null
      };
    default:
      return state
  }
}

export default userReducer