import { Action } from '@ngrx/store';

export const SET_AUTHENITCATED = '[Auth] Set Authenticated';
export const SET_UNAUTHENITCATED = '[Auth] Set Unautheinticated';

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENITCATED
  constructor(public userEmail: string) {}
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENITCATED
  
}

export type AuthActions = SetAuthenticated | SetUnauthenticated