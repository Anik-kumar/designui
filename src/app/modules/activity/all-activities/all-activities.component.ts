import {AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {ActivityService, PeriodicElement} from '@modules/activity/activity.service';
import { isNil } from 'lodash';

@Component({
  selector: 'app-all-activities',
  templateUrl: './all-activities.component.html',
  styleUrls: ['./all-activities.component.scss']
})
export class AllActivitiesComponent implements OnInit {
  public sideNavStat;
  public sideNavList = [];
  public activityData: PeriodicElement[] = [];
  displayedColumns = ['#', 'Timestamp', 'Description'];
  dataCount = 0;
  displayTable = false;
  public showMoreFlag = new Map<string, boolean>();
  private offset = 0;
  private limit = 10;
  private loadMoreDataEvent: EventEmitter<any> = new EventEmitter();

  constructor(private activityService: ActivityService) {
    this.sideNavList = this.activityService.getNavs();
  }

  ngOnInit(): void {
    console.log('---- ngOnInit ---');
    this.activityService.loadData(this.offset, this.limit);
    this.loadMoreDataEvent.emit({offset: this.offset, limit: this.limit});
    this.loadMoreDataEvent.subscribe((config) => {
      console.log('loadMoreDataEvent: ', config);
      this.activityService.loadData(this.offset, this.limit);
      console.log('config: ', config);
    }, (error) => {
      console.log(' loadMoreDataEvent on Error', error);
    }, (complete) => {
      console.log(' loadMoreDataEvent on Complete', complete);
    });

    this.activityService.dataOnLoad.subscribe((data) => {
      console.log('Data Received: ', data);
      this.offset += 10;
      if (!isNil(data)) {
        data.forEach(item => {
          this.activityData.push(item);
        });
      }
      console.log('this.activityData: ', this.activityData.length);
      if (this.activityData.length > 0) {
        this.displayTable = true;
      }

    }, (error) => {
      console.log(' dataOnLoad on Error', error);
    }, (complete) => {
      console.log(' dataOnLoad on Complete', complete);
    });
  }

  toggleNavClass(event) {
    this.sideNavStat = event;
  }

  toggleShowMore(i: number) {
    const key = 'ix_' + i.toString();
    let value = false;
    if (this.showMoreFlag.has(key)) {
      value = !this.showMoreFlag.get(key);
    } else {
      value = true;
    }
    this.showMoreFlag.set(key, value);
  }

  formatMoreInfo(moreInfo): string {
    const jsonStr = JSON.stringify(moreInfo, null, 4);
    return jsonStr.trim();
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    // visible height + pixel scrolled >= total height
    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      console.log("At End");
      this.loadMoreDataEvent.emit({offset: this.offset, limit: this.limit});
    }
  }
}
