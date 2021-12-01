// Store/Reducers/avatarReducer.js

const initialState = {
  avatar: require("../../Images/avatar.png"),
};

function setAvatar(state = initialState, action) {
  let nextState;
  switch (action.type) {
    case "SET_AVATAR":
      nextState = {
        ...state,
        avatar: action.value,
      };
      return nextState || state;
    default:
      return state;
  }
}

export default setAvatar;
