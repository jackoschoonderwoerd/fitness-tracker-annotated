import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot, 
  RouterStateSnapshot,
  CanLoad,
  Route
} from '@angular/router';


import * as fromRoot from './../app.reducer';
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanLoad {

  isAuth$: Observable<boolean>

  constructor(
    private store: Store<fromRoot.GlobalState>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }

  canLoad(route: Route) {
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));
  }
}
