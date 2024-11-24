import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {

  issuer: 'https://accounts.google.com',

  redirectUri: (typeof window !== 'undefined' ? window.location.origin : '') + '/pageprincipal',

  clientId: '794407899362-nfg7bbnnk23072i9domsdnktg35o4rk6.apps.googleusercontent.com',

  scope: 'openid profile email',

  strictDiscoveryDocumentValidation: false,

};