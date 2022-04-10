const updateColorSchemeReducer = (state=true, action) => {
  switch (action.type) {
    case 'CHANGE_COLOR_SCHEME':
      if (state === true) {
        return false;
      } else {
        return true;
      }
    default:
        return state;
  }
};

export default updateColorSchemeReducer;