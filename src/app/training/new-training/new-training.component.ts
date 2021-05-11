import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { UIService } from '../../shared/ui.service';
import { Store } from '@ngrx/store';
// ? 013 LAZY LOADED STATE; use the trainingReducer instead of the appReducer
import * as fromRoot from './../../app.reducer';
import * as fromTraining from './../training.reducer'

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  
  exercises$: Observable<Exercise[]>
  isLoading$: Observable<boolean>;
  
  

  constructor(
    private trainingService: TrainingService,
  
    // ? 013 LAZY LOADED STATE; use NewGlobalState instead of the Globalstate, adjust template
    private store: Store<fromTraining.NewGlobalState>) {}

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises)
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
