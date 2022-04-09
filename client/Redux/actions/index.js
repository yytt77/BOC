export const increment = (amount) => {
  return (dispatch) => {
    dispatch({
      type: 'increment',
      payload: amount
    });
  }
}

export const decrement = (amount) => {
  return (dispatch) => {
    dispatch({
      type: 'decrement',
      payload: amount
    });
  }
}

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