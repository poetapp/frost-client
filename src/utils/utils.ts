export enum Path {
  HOST = 'http://localhost:3000',
  ACCOUNTS = '/accounts',
  ACCOUNTS_VERIFY = '/accounts/verify',
  ACCOUNTS_VERIFY_TOKEN = '/accounts/verify/:token',
  LOGIN = '/login',
  PASSWORD_RESET = '/password/reset',
  PASSWORD_CHANGE = '/password/change',
  WORKS = '/works',
  TOKENS = '/tokens',
  ACCOUNTS_PROFILE = '/accounts/profile'
}

export enum Method {
  POST = 'post',
  GET = 'get',
  PUT = 'put',
  DEL = 'del',
  ALL = 'all'
}
