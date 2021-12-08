const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data;
    case "CLEAR_NOTIFICATION":
      return null;
    default:
      return state;
  }
};

let prevId = 0;

export const setNotification = (notification, notificationType, time) => {
  return async (dispatch) => {
    clearTimeout(prevId);
    dispatch({
      type: "SET_NOTIFICATION",
      data: { message: notification, type: notificationType },
    });
    prevId = setTimeout(() => {
      dispatch({
        type: "CLEAR_NOTIFICATION",
      });
    }, time * 1000);
  };
};

export default notificationReducer;
