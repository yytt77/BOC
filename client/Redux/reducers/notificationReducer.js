let notificationInfo = {
  'touser': null,
  'url': null,
  'caption': null,
}

const notificationReducer = (state = notificationInfo, action) => {
  switch (action.type) {
    case 'toUser':
      return {
        touser: action.payload,
        url: action.url,
        caption: action.caption,
      }
    default:
      return state
  }
}

export default notificationReducer;