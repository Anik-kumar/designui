import { Injectable } from '@angular/core';
import { isNil, isNull} from 'lodash';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private activeUser: {
    _id: String,
    firstName: string, 
    lastName: string, 
    email: string, 
    token: string, 
  }

  constructor( private http: HttpClient ) { }

  checkUserLogin(usermail: String, userpass: String) {
    const result = Observable.create((observer: any) => {
      let found = {};
      this.http.post<any>('http://localhost:8081/api/user/login', {'email': usermail, 'password': userpass}).subscribe(user => {
        
        if(!isNil(user)) {
          console.log('Response : ', user);
          found = user;
          this.activeUser = {
            _id: user._id,
            email: user.email,
            firstName: user.name.first,
            lastName: user.name.last,
            token: user.token

          }
        }
        observer.next(found);
      });
    });

    return result;
  }

}
