import { NgModule } from '@angular/core';
import { TrainingRoutingModule } from './training-routing.module';
// ? 001 LAZY LOADED STATE; import StoreModule
import { StoreModule } from '@ngrx/store';
// ? 002 LAZY LOADED STATE; import trainingReducer
import { trainingReducer } from './training.reducer'
import { TrainingComponent } from './training.component';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule,
    // ? 003 LAZY LOADED STATE; add the training-slice to the store (compare 015 CREATE REDUCER)
    StoreModule.forFeature('training', trainingReducer)
  ],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {}
