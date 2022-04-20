export const updateUser = (userData) => {
  return {
    type: 'UPDATE',
    payload: userData
  }
}

export const updateProfilePhoto = (profilePhotoUrl) => {
  return {
    type: 'UPDATE_PROF_PHOTO',
    payload: profilePhotoUrl
  }
}

export const login = (user) => {
  return {
    type: 'AUTHORIZED',
    payload: user
  }
}

export const logout = () => {
  return {
    type: 'UNAUTHORIZED',
    payload: null
  }
}

export const authLog = () => {
  return {
    type: 'authLog',
    payload: 'login'
  }
}

export const authReg = () => {
  return {
    type: 'authReg',
    payload: 'register'
  }
}

export const guestHome = () => {
  return {
    type: 'home',
    payload: 'home'
  }
}

export const guestAuth = () => {
  return {
    type: 'auth',
    payload: 'auth'
  }
}

export const updateColorScheme = () => {
  return {
    type: 'CHANGE_COLOR_SCHEME',
  }
}

export const notificationToUser = (toUser, url, caption) => {
  console.log('we have', toUser);
  return (dispatch) => {
    dispatch({
      type: 'toUser',
      payload: toUser,
      url: url,
      caption: caption
    })
  }
}
