export const login = (user) => {
  return (dispatch) => {
    dispatch({
      type: 'authorized',
      payload: user
    })
  }
}

export const logout = () => {
  return (dispatch) => {
    dispatch({
      type: 'unauthorized',
      payload: user
    })
  }
}
