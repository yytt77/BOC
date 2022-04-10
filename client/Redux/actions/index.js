export const updateUser = (userData) => {
  return {
    type: 'UPDATE',
    payload: userData
  }
}

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

export const updateColorScheme = () => {
  return (dispatch) => {
    dispatch({
      type: 'CHANGE_COLOR_SCHEME',
    })
  }
}