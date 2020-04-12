import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';
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
  @Output() onClick = new EventEmitter();
  @Input()
  set navItem(item: INavItem) {
    this.activeNavItem = item;
    console.log('Input navItem: ', item);
  }


  constructor() { }

  ngOnInit(): void {
  }

  toggleCollapse(listName) {
    this.onClick.emit(listName);

    // this.collapsableList.forEach((value, key) => {
    //   if(key == listName) {
    //     value.collapsed = !value.collapsed;
    //     if (value.collapsed){
    //       value.style = { 'height': '0px'};
    //     } else {
    //       value.style = {};
    //     }
        
    //   }else {
    //     value.collapsed = false;
    //     value.style = { 'height': '0px'};
    //   }
    // });
    // this.collapsableList.get('dashboard');

  
  }

}
