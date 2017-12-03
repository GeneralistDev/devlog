import auth0 from 'auth0-js';
import history from '../history';
import { gql } from 'react-apollo';
import jwtDecode from 'jwt-decode';

class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'devlog.au.auth0.com',
    clientID: 'IPHipKEGzOkpZHT9wKoZJ0aMiw88ACD5',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://devlog.au.auth0.com/userinfo',
    responseType: 'token id_token',
    scope: 'openid'
  });

  constructor({ client }) {
    this.client = client;
    this.login = this._login.bind(this);
    this.logout = this._logout.bind(this);
    this.handleAuthentication = this._handleAuthentication.bind(this);
    this.isAuthenticated = this._isAuthenticated.bind(this);
  }

  _login() {
    this.auth0.authorize();
  }

  _handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult).then(() => {
          history.replace('/');
        });
      } else if (err) {
        history.replace('/');
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);

    const userId = jwtDecode(authResult.idToken).sub;

    return this.client.query({
      query: checkToken,
      variables: {
        auth0UserId: userId,
      },
    }).then(result => {
      debugger;
      if (!result.data.User) {
        // Create the user
        return this.client.mutate({
          mutation: createUser,
          variables: {
            authProvider: {
              auth0: {
                idToken: authResult.idToken,
              },
            },
          },
        }).then((result) => {
          console.log(result);
        });
      }
    }).catch(err => {
      console.error(err);
      this.logout();
    });
  }

  _logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/');
  }

  _isAuthenticated() {
    // Check whether the current time is past the 
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
}

const checkToken = gql`
  query User($auth0UserId: String!) {
    User(auth0UserId: $auth0UserId) {
      id
    }
  }`

const createUser = gql`
  mutation createUser($authProvider: AuthProviderSignupData!) {
    createUser(authProvider: $authProvider) {
      auth0UserId
    }
  }`

// createUser(authProvider: { auth0: { idToken } })

export default Auth;