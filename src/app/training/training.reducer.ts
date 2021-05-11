import { Exercise } from './exercise.model';
import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromRoot from './../app.reducer'
import { 
  TrainingActions,
  SET_AVAILABLE_EXERCISES,
  SET_FINISHED_EXERCISES,
  START_TRAINING,
  STOP_TRAINING, 
  SetFinishedExercises
} from './training.actions'

export interface TrainingState {
  availableExercises: Exercise[]
  finishedExercises: Exercise[]
  runningExercise: Exercise
}

export interface NewGlobalState extends fromRoot.GlobalState {
  training: TrainingState
}

const initialState: TrainingState = {
  availableExercises: [],
  finishedExercises: [],
  runningExercise: null
}



export function trainingReducer(state = initialState, action: TrainingActions) {
  switch(action.type) {
    case SET_AVAILABLE_EXERCISES: 
      return {
        ...state,
        availableExercises: action.payload
      };
    case SET_FINISHED_EXERCISES:
      return {
        ...state,
        finishedExercises: action.payload
      };
    case START_TRAINING:
      return {
        ...state,
        // ? 011 LAZY LOADED STATE; get the running exercise through the passed id (immutable copy)
        runningExercise: {...state.availableExercises.find(ex => ex.id === action.payload)} 
      };
    case STOP_TRAINING:
      return {
        ...state,
        runningExercise: null
      }
    default: {
      return {
        ...state
      }
    }
  }
}

// ? 004 LAZY LOADED STATE; createFeatureSelector 'training' here should be the same as in // ? 003 LAZY LOADED STATE

export const getTrainingState = createFeatureSelector<TrainingState>('training');

// ? 005 LAZY LOADED STATE; export helper funcions (createSelector with 2 arguments, getTrainingState and an arrow function pointing to a property of the trainingState)
export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getRunningTraining = createSelector(getTrainingState, (state: TrainingState) => state.runningExercise);
export const getIsRunningTraining = createSelector(getTrainingState, (state: TrainingState) => state.runningExercise != null)



// export const getAvailableExercises = (state: TrainingState) => state.availableExercises;
// export const getFinishedExercises = (state: TrainingState) => state.finishedExercises;
// export const getRunningTraining = (state: TrainingState) => state.runningExercise;