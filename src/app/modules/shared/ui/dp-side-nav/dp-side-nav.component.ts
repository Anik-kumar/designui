import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dp-side-nav',
  templateUrl: './dp-side-nav.component.html',
  styleUrls: ['./dp-side-nav.component.scss']
})
export class DpSideNavComponent implements OnInit {

  leftNavMenu1 = [
    {
      name: 'CORE',
      menu: [
        {
          name: 'Dashboard',
          'active': false,
          'collapsed': true,
          style: { 'height': '0px'},
          subMenu: [
            {
              name: 'Default',
              'collapsed': true,
              'active': false,
              'badge': null
            },
            {
              name: 'Multipurpose',
              'collapsed': true,
              'active': false,
              'badge': 'New!'
            },
            {
              name: 'Affiliate',
              'collapsed': true,
              'active': false,
              'badge': 'New!'
            }
          ]
        }
      ]
    },
    {
      name: 'INTERFACE',
      menu: [
        {
          name: 'Layout',
          'active': true,
          'collapsed': false,
          style: {},
          subMenu: [
            {
              name: 'Static Nav',
              'collapsed': true,
              'active': false,
              'badge': null
            },
            {
              name: 'Dark Side',
              'collapsed': false,
              'active': true,
              'badge': 'New!'
            },
            {
              name: 'RTL Layout',
              'collapsed': true,
              'active': false,
              'badge': 'New!'
            },
            {
              name: 'Page Header',
              'collapsed': true,
              'active': false,
              'badge': 'New!'
            }
          ]
        },
        {
          name: 'Components',
          'active': false,
          'collapsed': true,
          style: { 'height': '0px'},
          subMenu: [
            {
              name: 'Alarts',
              'collapsed': true,
              'active': false,
              'badge': null
            },
            {
              name: 'Avaters',
              'collapsed': true,
              'active': false,
              'badge': 'New!'
            },
            {
              name: 'Badges',
              'collapsed': true,
              'active': false,
              'badge': 'New!'
            }
          ]
        },
        {
          name: 'Utilities',
          'active': false,
          'collapsed': true,
          style: { 'height': '0px'},
          subMenu: [
            {
              name: 'Static Nav',
              'collapsed': true,
              'active': false,
              'badge': null
            },
            {
              name: 'Dark Side',
              'collapsed': true,
              'active': false,
              'badge': 'New!'
            },
            {
              name: 'Page Header',
              'collapsed': true,
              'active': false,
              'badge': 'New!'
            }
          ]
        },
        {
          name: 'Pages',
          'active': false,
          'collapsed': true,
          style: { 'height': '0px'},
          subMenu: [
            {
              name: 'Static Nav',
              'collapsed': true,
              'active': false,
              'badge': null
            },
            {
              name: 'Dark Side',
              'collapsed': true,
              'active': false,
              'badge': 'New!'
            },
            {
              name: 'Page Header',
              'collapsed': true,
              'active': false,
              'badge': 'New!'
            }
          ]
        }
      ]
    }
  ];



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
    this.leftNavMenu1.forEach(navItem => {
      navItem.menu.forEach(item => {
        if (item.name == event) {
          item.collapsed = !item.collapsed;
          item.active = true;
          if (item.collapsed) {
            item.style = { 'height': '0px'};
          } else {
            item.style = null;
          }
        } else {
          item.active = false;
          item.collapsed = true;
          item.subMenu.forEach(subMenu => {
            subMenu.active = false;
            
          });

          // item.collapsed = false;
          // item.style = { 'height': '0px'};
        }
      });
    });
  }

  onClickSubSubMenu(event) {
    console.log('onClickSubSubMenu: ', event);
    this.leftNavMenu1.forEach(navItem => {
      navItem.menu.forEach(subNav => {
        if (subNav.name == event.subMenu) {
          subNav.subMenu.forEach(subSubNav => {
            console.log('>>> ', subSubNav.name, event.subSubMenuItem);
            if (subSubNav.name == event.subSubMenuItem) {
              subSubNav.active = true;
            } else {
              subSubNav.active = false;
            }
          })
        }
      })      
    });
    console.log('>> ', this.leftNavMenu1);
  }
}
