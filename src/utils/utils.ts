export enum Path {
  HOST = 'http://localhost:3000',
  ACCOUNT = '/account',
  ACCOUNT_VERIFY = '/account/verify',
  ACCOUNT_VERIFY_TOKEN = '/account/verify/:token',
  LOGIN = '/login',
  PASSWORD_RESET = '/password/reset',
  PASSWORD_CHANGE = '/password/change',
  WORK = '/work'
}

export enum Method {
  POST = 'post',
  GET = 'get',
  PUT = 'put',
  DEL = 'del',
  ALL = 'all'
}
