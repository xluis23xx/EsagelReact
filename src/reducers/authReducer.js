import { types } from "../types/types";
/*
    {
        uid: 'jagdfjahdsf127362718',
        name: 'Fernando',
    }

*/

const INITIAL_STATE = {
  user: null,
  error: false,
  loading: false,
  accessToken: false,
};

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.auth.success:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        accessToken: action.payload.token,
      };
    case types.auth.verify:
      return {
        ...state,
        loading: action.payload,
      };
    case types.auth.fail:
      return {
        ...state,
        name: null,
        error: action.payload,
        loading: false,
      };
    case types.auth.logout:
      return {};

    default:
      return state;
  }
};
