import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { UserApiService } from '@core/services/user-api.service';

@Component({
  selector: 'app-dp-top-nav-user',
  templateUrl: './dp-top-nav-user.component.html',
  styleUrls: ['./dp-top-nav-user.component.scss']
})
export class DpTopNavUserComponent implements OnInit {

  isOpen = false;
  styles = {};
  activeUser;

  constructor(private router: Router, private authService: AuthService, private localStore: LocalStorageService, private userApiService: UserApiService) { 
    this.activeUser = this.localStore.getUserDetails();
  }

  ngOnInit(): void {
  }

  toggle() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.styles = {
        top: '0px',
        left: '0px',
        willChange: 'transform',
        position: 'absolute',
        transform: 'translate(-166px, 42px)'
      };
    } else {
      this.styles = {
        top: '0px',
        left: '0px',
        willChange: 'transform',
      };
    }
  }

  logout(): void {
    let user = this.authService.getLoggedInUser();
    this.userApiService.logout({
      userId: user._id,
      name: user.name,
      email: user.email
    }).subscribe((observer) => {
      this.localStore.actionOnLogout(); // remove everything from local store and auth service
      this.authService.actionOnLogout();
      this.router.navigate(['/']);
    });
  }

}
