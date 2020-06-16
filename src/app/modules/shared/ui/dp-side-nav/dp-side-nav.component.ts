import {Component, Input, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {isEmpty, isNil} from 'lodash';

@Component({
  selector: 'app-dp-side-nav',
  templateUrl: './dp-side-nav.component.html',
  styleUrls: ['./dp-side-nav.component.scss']
})
export class DpSideNavComponent implements OnInit {

  leftNavMenu = [];
  // leftNavMenu = [
  //   {
  //     name: 'CORE',
  //     menu: [
  //       {
  //         name: 'Dashboard',
  //         'active': false,
  //         'collapsed': true,
  //         style: { 'height': '0px'},
  //         subMenu: [
  //           {
  //             name: 'Default',
  //             'collapsed': true,
  //             'active': false,
  //             'badge': null
  //           },
  //           {
  //             name: 'Multipurpose',
  //             'collapsed': true,
  //             'active': false,
  //             'badge': 'New!'
  //           },
  //           {
  //             name: 'Affiliate',
  //             'collapsed': true,
  //             'active': false,
  //             'badge': 'New!'
  //           }
  //         ]
  //       }
  //     ]
  //   },
  //   {
  //     name: 'INTERFACE',
  //     menu: [
  //       {
  //         name: 'Layout',
  //         'active': true,
  //         'collapsed': false,
  //         style: {},
  //         subMenu: [
  //           {
  //             name: 'Static Nav',
  //             'collapsed': true,
  //             'active': false,
  //             'badge': null
  //           },
  //           {
  //             name: 'Dark Side',
  //             'collapsed': false,
  //             'active': true,
  //             'badge': 'New!'
  //           },
  //           {
  //             name: 'RTL Layout',
  //             'collapsed': true,
  //             'active': false,
  //             'badge': 'New!'
  //           },
  //           {
  //             name: 'Page Header',
  //             'collapsed': true,
  //             'active': false,
  //             'badge': 'New!'
  //           }
  //         ]
  //       },
  //       {
  //         name: 'Components',
  //         'active': false,
  //         'collapsed': true,
  //         style: { 'height': '0px'},
  //         subMenu: [
  //           {
  //             name: 'Alarts',
  //             'collapsed': true,
  //             'active': false,
  //             'badge': null
  //           },
  //           {
  //             name: 'Avaters',
  //             'collapsed': true,
  //             'active': false,
  //             'badge': 'New!'
  //           },
  //           {
  //             name: 'Badges',
  //             'collapsed': true,
  //             'active': false,
  //             'badge': 'New!'
  //           }
  //         ]
  //       },
  //       {
  //         name: 'Utilities',
  //         'active': false,
  //         'collapsed': true,
  //         style: { 'height': '0px'},
  //         subMenu: [
  //           {
  //             name: 'Static Nav',
  //             'collapsed': true,
  //             'active': false,
  //             'badge': null
  //           },
  //           {
  //             name: 'Dark Side',
  //             'collapsed': true,
  //             'active': false,
  //             'badge': 'New!'
  //           },
  //           {
  //             name: 'Page Header',
  //             'collapsed': true,
  //             'active': false,
  //             'badge': 'New!'
  //           }
  //         ]
  //       },
  //       {
  //         name: 'Pages',
  //         'active': false,
  //         'collapsed': true,
  //         style: { 'height': '0px'},
  //         subMenu: [
  //           {
  //             name: 'Static Nav',
  //             'collapsed': true,
  //             'active': false,
  //             'badge': null
  //           },
  //           {
  //             name: 'Dark Side',
  //             'collapsed': true,
  //             'active': false,
  //             'badge': 'New!'
  //           },
  //           {
  //             name: 'Page Header',
  //             'collapsed': true,
  //             'active': false,
  //             'badge': 'New!'
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // ];



  // leftNavMenu = [
  //   {
  //     name: 'Dashboard',
  //     'active': false,
  //     'collapsed': true,
  //     style: { 'height': '0px'},
  //     'subMenu': [
  //       {
  //         'name': 'Default',
  //         'collapsed': true,
  //         'active': false,
  //         'badge': null
  //       },
  //       {
  //         'name': 'Multipurpose',
  //         'collapsed': true,
  //         'active': false,
  //         'badge': 'New!'
  //       },
  //       {
  //         'name': 'Affiliate',
  //         'collapsed': true,
  //         'active': false,
  //         'badge': 'New!'
  //       }
  //     ]
  //   },
  //   {
  //     'name': 'Layout',
  //     'active': false,
  //     'collapsed': true,
  //     style: { 'height': '0px'},
  //     'subMenu': [
  //       {
  //         'name': 'Static Nav',
  //         'collapsed': true,
  //         'active': false,
  //         'badge': null
  //       },
  //       {
  //         'name': 'Dark Side',
  //         'collapsed': true,
  //         'active': false,
  //         'badge': 'New!'
  //       },
  //       {
  //         'name': 'Page Header',
  //         'collapsed': true,
  //         'active': false,
  //         'badge': 'New!'
  //       }
  //     ]
  //   }
  // ]

  @Input()
  set sideNavList(navList) {
    console.log('input sideNavList', navList)
    // this.leftNavMenu = navList['base_nav'];
    this.leftNavMenu = navList;
  }

  constructor(private router: Router) { }

  ngOnInit(): void {
    // console.log(JSON.stringify(this.leftNavMenu));
  }

  onNavItemClick(event) {
    console.log('onNavItemClick: ', event);
    this.leftNavMenu.forEach(navItem => {
      navItem.menu.forEach(item => {
        if (item.name == event) {
          console.log('item', item);
          item.collapsed = !item.collapsed;
          item.active = true;
          if (item.collapsed) {
            item.style = { 'height': '0px'};
          } else {
            item.style = null;
          }
          if (!isNil(item.subMenu) && isEmpty(item.subMenu) && !isNil(item.route)){
            this.router.navigate([item.route]);
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
    let activeSubSubMenu = null;
    console.log('onClickSubSubMenu: ', event);
    this.leftNavMenu.forEach(navItem => {
      navItem.menu.forEach(subNav => {
        if (subNav.name == event.subMenu) {
          subNav.subMenu.forEach(subSubNav => {
            console.log('>>> ', subSubNav.name, event.subSubMenuItem);
            if (subSubNav.name == event.subSubMenuItem) {
              subSubNav.active = true;
              activeSubSubMenu = subSubNav.route;
            } else {
              subSubNav.active = false;
            }
          })
        }
      })
    });
    if(!isNil(activeSubSubMenu)) {
      this.router.navigate([activeSubSubMenu]);
    }
    console.log('>> ', this.leftNavMenu);
  }
}
