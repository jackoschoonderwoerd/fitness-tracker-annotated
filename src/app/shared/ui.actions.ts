// ? 005 CREATE REDUCER / create ui.actions.ts 

// ? 007 CREATE REDUCER / import Action
import { Action } from '@ngrx/store';

// ? 006 CREATE REDUCER / export consts 
export const START_LOADING = '[UI] Start Loading';
export const STOP_LOADING = '[UI] Stop Loading';

// ? 008 CREATE REDUCER / export classes
export class StartLoading implements Action {
  readonly type = START_LOADING;
  // constructor(public payload: null) {};
}

export class StopLoading implements Action {
  readonly type = STOP_LOADING;
  // constructor(public payload: string) {};
}
// ? 009 CREATE REDUCER / export actions
export type UIActions = StartLoading | StopLoading