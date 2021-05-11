import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable} from 'rxjs';

import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
// ? 022 CREATE REDUCER / Import * fromRoot
import * as fromRoot from './../../app.reducer'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  // ? 024 CREATE REDUCER / add the $ (Observable) DON'T FORGET THE TEMPLATE !( -$ | ASYNC) !!!
  isLoading$: Observable<boolean>;

  constructor(
    private authService: AuthService,
    // ? 023 CREATE REDUCER / Inject the GlobalStore
    private store: Store<fromRoot.GlobalState>) {}

  ngOnInit() {
   
    // ? 025 CREATE REDUCER / Subscribe to the store
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    });
  }
}
