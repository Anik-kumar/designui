import { Component, OnInit } from '@angular/core';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dp-top-nav-documents',
  templateUrl: './dp-top-nav-documents.component.html',
  styleUrls: ['./dp-top-nav-documents.component.scss']
})
export class DpTopNavDocumentsComponent implements OnInit {
  dropdownArrow = faChevronRight;
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
        transform: 'translate(-206px, 42px)'
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
