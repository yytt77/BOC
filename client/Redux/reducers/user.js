import { userData } from "../../Templates/sampleData";

const userReducer = (state = userData, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        posts: action.payload.posts,
        userInfo: action.payload.userInfo,
      };
    case "AUTHORIZED":
      return {
        ...state,
        username: action.payload,
      };
    case "UNAUTHORIZED":
      return {
        ...state,
        userInfo: {
          username: "defaultUser",
        },
        username: null,
      };
    case "UPDATE_PROF_PHOTO":
      return {
        ...state,
        userInfo: {
          profPhoto: action.payload,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
