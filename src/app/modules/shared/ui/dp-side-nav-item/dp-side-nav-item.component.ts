import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
import { Router } from '@angular/router';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

interface ISubMenu { 
  name: string,
  collapsed: boolean,
  active: boolean,
  badge: string
}
interface INavItem { 
  name:string, 
  active:boolean, 
  collapsed: boolean,
  style: object,
  subMenu: ISubMenu[]
} 

@Component({
  selector: 'app-dp-side-nav-item',
  templateUrl: './dp-side-nav-item.component.html',
  styleUrls: ['./dp-side-nav-item.component.scss']
})
export class DpSideNavItemComponent implements OnInit {

  downArrow = faAngleDown;
  isDashboardCollapsed = false;
  // collapsableList = new Map([
  //   ['dashboard', {
  //     'collapsed': true,
  //     'style': { 'height': '0px'}
  //   }]])
  // collapsableList = new Map([
  //   ['dashboard', {
  //     'collapsed': true,
  //     'style': { 'height': '0px'}
  //   }],
  //   ['layout', true],
  //   ['components', true],
  //   ['utilities', true],
  //   ['pages', true],
  //   ['flows', true],
  //   ['dashboard', true],
  //   ['dashboard', true],
  //   ['dashboard', true]
  // ]); 
  activeNavItem = {
    name: 'Dashboard',
    active: false,
    collapsed: true,
    subMenu: [],
    style: {}
  }

  activeNavName = '';
  activeSubMenuName = '';
  @Output() onClickSubMenu = new EventEmitter();
  @Output() onClickSubSubMenu = new EventEmitter();
  @Input()
  set navItem(item: INavItem) {
    this.activeNavItem = item;
    console.log('Input navItem: ', item);
  }

  @Input()
  set navName(item: string) {
    this.activeNavName = item;
    console.log('Input navMenuItem: ', item);
  }

  @Input()
  set navSubMenuItem(item: string) {
    this.activeSubMenuName = item;
    console.log('Input navMenuItem: ', item);
  }


  constructor() { }

  ngOnInit(): void {
  }

  toggleCollapse(listName) {
    this.onClickSubMenu.emit(listName);
  }

  onSubSubMenuClick(subMenuName, subSubMenuName) {
    this.onClickSubSubMenu.emit({'subMenu':subMenuName, 'subSubMenuItem':subSubMenuName });
  }

}
