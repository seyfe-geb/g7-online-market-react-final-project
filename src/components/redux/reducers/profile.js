import { PROFILE_FAIL, PROFILE_SUCCESS } from "../actions/types";

const initialState = { profile: null };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload.profile,
      };
    case PROFILE_FAIL:
      return {
        ...state,
        profile: null,
      };
    default:
      return state;
  }
}