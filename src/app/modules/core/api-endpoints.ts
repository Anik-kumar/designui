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
  public static readonly GET_ALL_USERS = '/api/user/get-all-users';
  public static readonly GET_ALL_USERS_BY_TYPE = '/api/user/get-users-by-type';

  // Design Api
  public static readonly UPLOAD_DESIGN_IMAGE = '/api/design/new';
  public static readonly GET_USERS_DESIGNS = '/api/design/get-all';
  public static readonly GET_SUBMITTED_DESIGNS = '/api/design/admin/get-submitted';
  public static readonly GET_REVIEWING_DESIGNS = '/api/design/admin/get-reviewing';
  public static readonly GET_APPROVED_DESIGNS = '/api/design/admin/get-approved';
  public static readonly GET_REJECTED_DESIGNS = '/api/design/admin/get-rejected';
  public static readonly GET_ALL_SUBMITTED_DESIGNS = '/api/design/admin/get-all-submitted';
  public static readonly GET_ALL_APPROVED_DESIGNS = '/api/design/admin/get-all-approved';
  public static readonly GET_ALL_REJECTED_DESIGNS = '/api/design/admin/get-all-rejected';
  public static readonly GET_ALL_REVIEWING_DESIGNS = '/api/design/admin/get-all-reviewing';
  public static readonly GET_USERS_DESIGNS_UNRESTRICT = '/api/design/admin/get-all';
  public static readonly GET_USERS_DESIGNS_BY_STATE = '/api/design/admin/get-all-by-state';
  public static readonly GET_USERS_DESIGNS_BY_ADMIN_STATE = '/api/design/admin/get-all-by-admin-state';
  public static readonly FIND_ONE_DESIGN_ADMIN = '/api/design/admin/find-one';
  public static readonly GET_ONE_DESIGN = '/api/design/find-one';
  public static readonly UPDATE_DESIGN = '/api/design/update';
  public static readonly GET_DESIGN_BY_TITLE = '/api/design/details/';
  public static readonly MAKE_STATE_SUBMIT = '/api/design/state/submit/';
  public static readonly MAKE_STATE_REVIEW = '/api/design/state/review/';
  public static readonly MAKE_STATE_APPROVE = '/api/design/state/approve/';
  public static readonly MAKE_STATE_REJECT = '/api/design/state/reject/';
  public static readonly GET_PUBLIC_DESIGNS = '/api/design/public-designs';

  // Communications Api
  public static readonly MAKE_COMMENT_ON_DESIGN = '/api/comm/admin/make-comment';
  public static readonly GET_COMMENTS = '/api/comm/get-comments';

  // Auth Api
  public static readonly AUTH_TOKEN = '/api/auth/token';
  public static readonly LOGIN = '/api/auth/login';
  public static readonly LOGOUT = '/api/auth/logout';
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

  // Activities API
  public static readonly MY_ACTIVITIES_API = '/api/activity/mine';
  public static readonly ALL_ACTIVITIES_API = '/api/activity/all';

}
