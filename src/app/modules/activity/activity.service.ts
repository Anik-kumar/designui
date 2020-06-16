import {EventEmitter, Injectable} from '@angular/core';
import { AuthorizationService } from '@core/services/authorization.service';
import { HttpClient } from '@angular/common/http';
import {ApiEndpoints} from '@core/api-endpoints';
import {Observable} from 'rxjs';
import {isNil} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private activityData: PeriodicElement[] = [];
  private dataCount = 0;
  public dataOnLoad: EventEmitter<any> = new EventEmitter();
  constructor( private http: HttpClient, private authorizationService: AuthorizationService) { }

  public getNavs() {
    return this.authorizationService.getNavs();
  }

  public getMyActivities(start: number, limit: number): Observable<any> {
    return this.http.get<any>(ApiEndpoints.MY_ACTIVITIES_API + '/' + start + '/' + limit);
  }

  public getAllActivities(start: number, limit: number) {
    return this.http.get<any>(ApiEndpoints.ALL_ACTIVITIES_API + '/' + start + '/' + limit);
  }

  public loadData(offset: number, limit: number) {
    this.getMyActivities(offset, limit).subscribe((observer) => {
      console.log('observer: ', observer);
      if (!isNil(observer) && !isNil(observer.data)) {
        let newdata: PeriodicElement[] = [];
        observer.data.forEach((activity: any) => {
          newdata.push({
            position: this.dataCount++,
            timestamp: new Date(activity.date_created).toISOString(),
            description: activity.description,
            moreInfo: activity.more
          });
        });
        this.dataOnLoad.emit(newdata);
        console.log('ActivityData: ', this.activityData);
        // this.displayTable = true;
      }
      // this.activityData = observer;
    });
  }
}

export interface PeriodicElement {
  position: number;
  timestamp: string;
  description: string;
  moreInfo: any[];
}
