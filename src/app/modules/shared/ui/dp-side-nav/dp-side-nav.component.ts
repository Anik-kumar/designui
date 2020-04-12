import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dp-side-nav',
  templateUrl: './dp-side-nav.component.html',
  styleUrls: ['./dp-side-nav.component.scss']
})
export class DpSideNavComponent implements OnInit {

  leftNavMenu = [
    {
      name: 'Dashboard',
      'active': false,
      'collapsed': true,
      style: { 'height': '0px'},
      'subMenu': [
        {
          'name': 'Default',
          'collapsed': true,
          'active': false,
          'badge': null
        },
        {
          'name': 'Multipurpose',
          'collapsed': true,
          'active': false,
          'badge': 'New!'
        },
        {
          'name': 'Affiliate',
          'collapsed': true,
          'active': false,
          'badge': 'New!'
        }
      ]
    },
    {
      'name': 'Layout',
      'active': false,
      'collapsed': true,
      style: { 'height': '0px'},
      'subMenu': [
        {
          'name': 'Static Nav',
          'collapsed': true,
          'active': false,
          'badge': null
        },
        {
          'name': 'Dark Side',
          'collapsed': true,
          'active': false,
          'badge': 'New!'
        },
        {
          'name': 'Page Header',
          'collapsed': true,
          'active': false,
          'badge': 'New!'
        }
      ]
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

  onNavItemClick(event) {
    console.log('onNavItemClick: ', event);
    this.leftNavMenu.forEach(item => {
      if (item.name == event) {
        item.collapsed = !item.collapsed;
        if (item.collapsed) {
          item.style = { 'height': '0px'};
        } else {
          item.style = null;
        }
      } else {
        // item.collapsed = false;
        // item.style = { 'height': '0px'};
      }
    });
  }
}
