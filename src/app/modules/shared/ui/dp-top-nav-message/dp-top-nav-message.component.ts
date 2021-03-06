import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dp-top-nav-message',
  templateUrl: './dp-top-nav-message.component.html',
  styleUrls: ['./dp-top-nav-message.component.scss']
})
export class DpTopNavMessageComponent implements OnInit {

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
        transform: 'translate(-258px, 42px)'
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
