export interface IGlobalState {
  isAuth: boolean;
  email: string;
}

export interface IGlobalContext {
  dispatch: (action: IAction) => void;
  state: IGlobalState;
}

export enum ActionTypes {
  Login = "LOGIN",
  Logout = "LOGOUT",
}

export interface IAction {
  type: ActionTypes;
  newAuthState?: boolean;
  newEmail?: string;
}
