import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dp-top-nav-user',
  templateUrl: './dp-top-nav-user.component.html',
  styleUrls: ['./dp-top-nav-user.component.scss']
})
export class DpTopNavUserComponent implements OnInit {

  isOpen = false;
  styles = {};

  constructor() { }

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

}
