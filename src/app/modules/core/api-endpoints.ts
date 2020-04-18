export class ApiEndpoints {

  // public static readonly SERVER_URL = 'http://localhost:3000';
  public static readonly NGINX_SERVER_URL = 'http://localhost:8080';


  // User Api
  public static readonly GET_USERS_API = '/api/user/all';
  public static readonly FIND_USER_API = '/api/user/findone';
  public static readonly FIND_EMAIL_API = '/api/user/findEmail';
  public static readonly UPLOAD_DESIGN_IMAGE = '/api/user/new-design';

  // Auth Api
  public static readonly AUTH_TOKEN = '/api/auth/token';
  public static readonly LOGIN = '/api/auth/login';
  public static readonly SIGNUP = '/api/auth/signup';
  public static readonly USER_EMAIL_VERIFY = '/api/auth/verifyEmail';

  public static readonly HOME_URL = '/home';

}
