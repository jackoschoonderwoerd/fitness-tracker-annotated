import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { Subscription } from 'rxjs';
import 'rxjs/add/operator/map';

import { Exercise } from './exercise.model';
import { UIService } from '../shared/ui.service';
import * as UI from './../shared/ui.actions';
// ? 006 LAZY LOADED STATE; remove fromRoot import
// import * as fromRoot from'./../app.reducer';
// ? 008 LAZY LOADED STATE; import training.reducer.ts
import * as fromTraining from './training.reducer'
// ? 010 LAZY LOADED STATE; import training.actions.ts
import * as Training from './training.actions';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators'

@Injectable()
export class TrainingService {
 
  private fbSubs: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    // ? 009 LAZY LOADED STATE; fromRoot.GlobalState => fromTraining.NewGlobalState
    private store: Store<fromTraining.NewGlobalState>) {}

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading);
    
    this.fbSubs.push(this.db
      .collection('availableExercises')
      .snapshotChanges()
      .map(docArray => {
        // throw(new Error());
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data()['name'],
            duration: doc.payload.doc.data()['duration'],
            calories: doc.payload.doc.data()['calories']
          };
        });
      })
      .subscribe((exercises: Exercise[]) => {
        this.store.dispatch(new UI.StopLoading);
        // ? 011 LAZY LOADED STATE; dispatch
        this.store.dispatch(new Training.SetAvailableExercises(exercises));
       
      }, error => {
        this.store.dispatch(new UI.StopLoading);
        this.uiService.showSnackbar('Fetching Exercises failed, please try again later', null, 3000);

      }));
  }

  startExercise(selectedId: string) {
    // ? 011 LAZY LOADED STATE; dispatch
    this.store.dispatch(new Training.StartTraining(selectedId))
  }

  completeExercise() {
    this.store.select(fromTraining.getRunningTraining).subscribe((runningExercise: Exercise) => {

      this.addDataToDatabase({
        ...runningExercise,
        date: new Date(),
        state: 'completed'
      });
      // ? 011 LAZY LOADED STATE; dispatch
      this.store.dispatch(new Training.StopTraining);
    })
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getRunningTraining).pipe(take(1)).subscribe((runningExercise: Exercise) => {
      this.addDataToDatabase({
        ...runningExercise,
        duration: runningExercise.duration * (progress / 100),
        calories: runningExercise.calories * (progress / 100),
        date: new Date(),
        state: 'cancelled'
      });
      // ? 011 LAZY LOADED STATE; dispatch
      this.store.dispatch(new Training.StopTraining);
    })
  }


  fetchCompletedOrCancelledExercises() {
    this.fbSubs.push(this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        // ? 011 LAZY LOADED STATE; dispatch
        this.store.dispatch(new Training.SetFinishedExercises(exercises))
      }));
  }

  cancelSubscriptions() {
    this.fbSubs.forEach(sub => sub.unsubscribe());
  }

  private addDataToDatabase(exercise: Exercise) {
    const temp = {
      ...exercise,
      date: exercise.date.toISOString()
    }
    this.db.collection('finishedExercises').add(temp);
  }

  // private addDataToDatabase(exercise: Exercise) {
  //   this.db.collection('finishedExercises').add(exercise);
  // }
}
