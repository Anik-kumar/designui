import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dp-top-nav',
  templateUrl: './dp-top-nav.component.html',
  styleUrls: ['./dp-top-nav.component.scss']
})
export class DpTopNavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Output() toggleValue = new EventEmitter();
  private toggleFlag = false;

  toggleSideNav() {
    this.toggleFlag = !this.toggleFlag;
    this.toggleValue.emit(this.toggleFlag);
  }

}
