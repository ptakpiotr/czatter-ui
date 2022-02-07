import { ActionTypes, IAction, IGlobalState } from "./Types";

export const initialState: IGlobalState = {
  email: "",
  isAuth: false,
};

export const reducer = (state: IGlobalState, action: IAction) => {
  if (action.type === ActionTypes.Login) {
    return {
      ...state,
      email: action.newEmail,
      isAuth: true,
    };
  }

  if (action.type === ActionTypes.Logout) {
    return {
      ...state,
      email: "",
      isAuth: false,
    };
  }
};
