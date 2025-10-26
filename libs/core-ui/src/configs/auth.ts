// libs/core-ui/src/configs/auth.ts
export const authConfig = {
  meEndpoint: '/auth/me',
  loginEndpoint: 'auth/login',
  registerEndpoint: '/auth/register',
  storageTokenKeyName: 'accessToken',
  storageUserDataKeyName: 'userData',
  jwtHttpHeaderName: 'Authorization',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
