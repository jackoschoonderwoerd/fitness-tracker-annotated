// ? 001 CREATE REDUCER / create ui.reducer.ts

// ? 010 CREATE REDUCER / import actions and classes
import { 
  UIActions, 
  START_LOADING, 
  STOP_LOADING 
} from './ui.actions'


// ? 002 CREATE REDUCER / create interface
export interface UIState {
  isLoading: boolean
}

// ? 003 CREATE REDUCER / create initialState
const initialState: UIState = {
  isLoading: false
}

// ? 004 CREATE REDUCER / export a reducer that returns the state
export function uiReducer (state = initialState, action: UIActions) {
  switch(action.type) {
    case START_LOADING: 
      return {
        ...state,
        isLoading: true
      };
    case STOP_LOADING: {
      return {
        ...state,
        isLoading: false,
        
      };
    }
    default: {
      return {
        ...state
      }
    }
  }
}
// ? 011 CREATE REDUCER / export a function that returns a specific segment of the state
export const getIsLoading = (state: UIState) => state.isLoading;