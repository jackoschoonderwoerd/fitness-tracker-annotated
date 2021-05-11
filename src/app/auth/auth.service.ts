import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { MatSnackBar } from '@angular/material';


import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UIService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
// ? 018 CREATE REDUCER / import * fromRoot
import * as fromRoot from './../app.reducer';
// ? 020 CREATE REDUCER / import the applicable actions
import * as UI from './../shared/ui.actions';
import * as AUTH from './auth.actions'


@Injectable()
export class AuthService {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    // ? 019 CREATE REDUCER / inject the store, specify the requested slice from the GobalState
    private store: Store<{
      ui: fromRoot.GlobalState
    }>
  ) {}

  initAuthListener() {
    // ? 021 CREATE REDUCER / dispatch an action as defined in -.actions.ts
    this.store.dispatch(new UI.StartLoading)
    this.afAuth.authState.subscribe(user => {
      if (user) {
        // ? 021 CREATE REDUCER / dispatch an action as defined in -.actions.ts
        this.store.dispatch(new UI.StopLoading);
        this.store.dispatch(new AUTH.SetAuthenticated(user.email));
        this.router.navigate(['/training']);
      } else {
        // ? 021 CREATE REDUCER / dispatch an action as defined in -.actions.ts
        this.store.dispatch(new UI.StopLoading)
        this.store.dispatch(new AUTH.SetUnauthenticated());
        this.trainingService.cancelSubscriptions();
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    // ? 021 CREATE REDUCER / dispatch an action as defined in -.actions.ts
    this.store.dispatch(new UI.StartLoading)
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // ? 021 CREATE REDUCER / dispatch an action as defined in -.actions.ts
        this.store.dispatch(new UI.StopLoading)
        this.store.dispatch(new AUTH.SetAuthenticated(result.user.email));
      })
      .catch(error => {
        // ? 021 CREATE REDUCER / dispatch an action as defined in -.actions.ts
        this.store.dispatch(new UI.StopLoading)
        this.store.dispatch(new AUTH.SetUnauthenticated());
        this.uiService.showSnackbar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    // ? 021 CREATE REDUCER / dispatch an action as defined in -.actions.ts
    this.store.dispatch(new UI.StartLoading)
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // ? 021 CREATE REDUCER / dispatch an action as defined in -.actions.ts
        this.store.dispatch(new UI.StopLoading)
        this.store.dispatch(new AUTH.SetAuthenticated(result.user.email));
      })
      .catch(error => {
        // ? 021 CREATE REDUCER / dispatch an action as defined in -.actions.ts
        this.store.dispatch(new UI.StopLoading);
        this.store.dispatch(new AUTH.SetUnauthenticated());
      });
  }

  logout() {
    this.afAuth.auth.signOut();
    this.store.dispatch(new AUTH.SetUnauthenticated());
  }
}
