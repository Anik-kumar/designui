import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-public-home',
  templateUrl: './public-home.component.html',
  styleUrls: ['./public-home.component.scss']
})
export class PublicHomeComponent implements OnInit {
  
  public sideNavList = [];
  sideNavStat;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toggleNavClass(event) {
    this.sideNavStat = event;
  }

  toSignup() {
    this.router.navigate(['/signup']);
  }

  toSignin() {
    this.router.navigate(['/signin']);
  }

}
