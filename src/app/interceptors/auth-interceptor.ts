import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';
import { isNil } from 'lodash';
import { AuthService } from '@core/services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private toastrService: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    const authToken = this.authService.getAuthorizationToken();
    const userType = this.authService.getUserType();

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.

    if (!isNil(userType)) {
      let rh = req.headers;
      console.log('>> ', userType, rh);

      // req.headers.set('ut', userType.toString());
      rh.append('Authorization', '8');
      console.log('>>> ', rh);
    }

    const authReq1 = req.clone({
      headers: req.headers.set('ut', '8')
    });
    console.log('authReq1: ', authReq1);

    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + authToken)
    });
    console.log('authReq; ', authReq);
    // send cloned request with header to the next handler.
    return next.handle(authReq).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            // x-auth-token
            console.log('x-auth-token: ', event.headers.get('x-auth-token'));
            console.log('headers: ', event.headers);
            if (event.headers.get('x-auth-token') != null) {
              this.authService.setAuthorizationToken(event.headers.get('x-auth-token'));
            }

            if (event.headers.get('x-ut') != null) {
              this.authService.setUserType(parseInt(event.headers.get('x-ut'), 10));
            }

            if (event.headers.get('x-atu') != null) {
              this.authService.setAdminTypeUser(event.headers.get('x-atu') === 'true');
            }
          }
        },
        error => {
          console.log('Error in AuthInterceptor ', error);
        }));
  }
}
