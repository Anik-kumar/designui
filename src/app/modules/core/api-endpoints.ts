export class ApiEndpoints {

  // public static readonly SERVER_URL = 'http://localhost:3000';
  public static readonly NGINX_SERVER_URL = 'http://localhost:8080';


  // User Api
  public static readonly GET_USERS_API = '/api/user/all';
  public static readonly FIND_USER_API = '/api/user/findone';
  public static readonly FIND_EMAIL_API = '/api/user/findEmail';
  public static readonly SEND_RESET_PASS = '/api/user/send-reset-pass';
  public static readonly VERIFY_RESET_PASS = '/api/user/verify-reset-pass';
  public static readonly GET_USER_PROFILE = '/api/user/profile';
  
  // Design Api
  public static readonly UPLOAD_DESIGN_IMAGE = '/api/design/new';
  public static readonly GET_USERS_DESIGNS = '/api/design/get-all';
  public static readonly GET_USERS_DESIGNS_UNRESTRICT = '/api/design//get-all-unrestrict';
  public static readonly GET_ONE_DESIGN = '/api/design/find-one';
  public static readonly UPDATE_DESIGN = '/api/design/update';
  public static readonly GET_DESIGN_BY_TITLE = '/api/design/details/';
  public static readonly MAKE_STATE_SUBMIT = '/api/design/state/submit/';
  public static readonly MAKE_STATE_REVIEW = '/api/design/state/review/';
  public static readonly MAKE_STATE_APPROVE = '/api/design/state/approve/';
  public static readonly MAKE_STATE_REJECT = '/api/design/state/reject/';

  // Auth Api
  public static readonly AUTH_TOKEN = '/api/auth/token';
  public static readonly LOGIN = '/api/auth/login';
  public static readonly SIGNUP = '/api/auth/signup';
  public static readonly USER_EMAIL_VERIFY = '/api/auth/verify-email';
  public static readonly RESET_PASS = '/api/auth/reset-pass';

  // Token Api
  public static readonly VALIDATE_TOKEN_HS = '/api/token/verify-hs';
  public static readonly VALIDATE_TOKEN_RS = '/api/token/verify-rs';
  public static readonly RENEW_TOKEN = '/api/token/renew';

  public static readonly HOME_URL = '/home';

  // Authorization
  public static readonly AUTHORIZE_ROUTES = '/api/authorize/routes';
  public static readonly AUTHORIZE_NAV = '/api/authorize/navigations';

  // New Design File
  public static readonly UPLOAD_API = '/api/files/upload';
  public static readonly UPDATE_DESIGN_FILE = '/api/files/update-file';
  public static readonly UPDATE_USER_DESIGN = '/api/files/update';

}
