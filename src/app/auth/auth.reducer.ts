import {
  AuthActions,
  SET_AUTHENITCATED,
  SET_UNAUTHENITCATED
} from './auth.actions';

export interface AuthState {
  isAuth: boolean,
  userEmail: string
}

const initialState: AuthState = {
  isAuth: false,
  userEmail: null
}

export function authReducer(state = initialState, action: AuthActions) {
  switch(action.type) {
    case SET_AUTHENITCATED:
      return {
        ...state,
        isAuth: true,
        userEmail: action.userEmail
      };
    case SET_UNAUTHENITCATED:
      return {
        ...state,
        isAuth: false,
        userEmail: null
      };
    default: 
      return {
        ...state
      }
  }
}

export const getIsAuth = (state: AuthState) => state.isAuth;
export const getUserEmail = (state: AuthState) => state.userEmail