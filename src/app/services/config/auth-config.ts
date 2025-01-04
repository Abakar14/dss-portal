import { AuthConfig } from 'angular-oauth2-oidc';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8081/dss/api/v1', // Your Authorization Server URL
  redirectUri: window.location.origin + '/login/callback', // Redirect URI after login
  clientId: 'your-client-id', // OAuth2 Client ID
  responseType: 'code', // Use Authorization Code flow
  scope: 'openid profile email', // Scopes requested from the server
  requireHttps: false, // Set to true for production
  showDebugInformation: true, // Enable for debugging purposes
  timeoutFactor: 0.75, // Token refresh timing adjustment
};
