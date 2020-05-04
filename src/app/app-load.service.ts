import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {LocalStorageService} from '@core/services/local-storage.service';
import {AuthService} from '@core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppLoadService {

  constructor(private http: HttpClient, private authService: AuthService, private localStore: LocalStorageService) { }

  initializeApp(): Promise<any> {
    return new Promise((resolve, reject) => {
      setInterval(() => {
      new Promise((resolve1, reject1) => {
      try {
        if (this.authService.isAuthenticated()) {
        this.authService.renewToken({}).subscribe(observe => {
          console.log('Renew Token: ', observe);
        });
        }
        setTimeout( () => {
        resolve1('>>>> Success!');
        }, 9000);
      } catch (e) {
        reject1();
      }
      }).catch(err => {

      }).finally(() => console.log('>> Finally '));

      }, 60000);
      resolve();
    });
  }
     
  getSettings(): Promise<any> {
    console.log(`getSettings:: before http.get call`);
  
    // const promise = this.http.get('api//settings')
    //   .toPromise()
    //   .then(settings => {
    //     console.log(`Settings from API: `, settings);
    //     return settings;
    //   });
    //
    // return promise;
  
    return new Promise((resolve, reject) => {
      resolve();
    });
  }

}
