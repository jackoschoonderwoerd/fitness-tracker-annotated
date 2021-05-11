import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import * as fromRoot from './../../app.reducer';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  userEmail$: Observable<string>;

  constructor(
    private authService: AuthService,
    private store: Store<fromRoot.GlobalState>) { }

  ngOnInit() {
    this.store.subscribe(data => console.log(data));
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
    this.userEmail$ = this.store.select(fromRoot.getUserEmail);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }
}
