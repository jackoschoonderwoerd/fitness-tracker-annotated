

import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
// ? 012 CREATE REDUCER / import everything from a reducer.ts file
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';


// ? 013 CREATE REDUCER / export the application-wide (Global) state
export interface GlobalState {
  // ? 014 CREATE REDUCER / create a specific state within the GlobalState
  ui: fromUI.UIState,
  auth: fromAuth.AuthState
}

// ? 015 CREATE REDUCER / export mapped reducers
export const reducers: ActionReducerMap<GlobalState> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer
}
// ? 016 CREATE REDUCER / export getUIState featureSelector, pull the uiState out of the GlobalState
export const getUiState = createFeatureSelector<fromUI.UIState>('ui');

// ? 017 CREATE REDUCER / export getIsLoading, pull the getIsLoading function out of the getUiState
export const getIsLoading = createSelector(getUiState, fromUI.getIsLoading)

export const getAuthState = createFeatureSelector<fromAuth.AuthState>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);
export const getUserEmail = createSelector(getAuthState, fromAuth.getUserEmail);