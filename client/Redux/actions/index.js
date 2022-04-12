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

export const authLog = () => {
  return (dispatch) => {
    dispatch({
      type: 'authLog',
      payload: 'login'
    })
  }
}

export const authReg = () => {
  return (dispatch) => {
    dispatch({
      type: 'authReg',
      payload: 'register'
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