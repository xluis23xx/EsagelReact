import { types } from "../types/types";

const initialState = {
  sidebarShow: true,
};

export const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.nav.set:
      return { ...state, sidebarShow: action.payload };
    default:
      return state;
  }
};
