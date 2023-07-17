import UserActionTypes from "./action-types";

export const selectUser = (payload) => ({
  type: UserActionTypes.SELECT,
  payload,
});
