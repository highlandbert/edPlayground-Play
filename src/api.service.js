import Config from './config'
import AuthService from './auth.service'

export default class ApiService {

  static get(route) {
    const auth = AuthService.getCredentials();
    const token = auth.token;
    
    return fetch(`${Config.api}/${route}`, {
      headers: {
        'x-access-token': token, 
      },
      method: 'GET'
    })
    .then(response => {
      if (response.status === 403) {
        AuthService.doLogin();
      }
      else if (response.status === 404) {
        throw 'Not Found';
      } else {
        return response.json();
      }
    });
  }

  static post(route, params) {
    const auth = AuthService.getCredentials();
    const token = auth.token;

    return fetch(`${Config.api}/${route}`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-access-token': token,
      },
      body: params
    })
    .then(res => {
      if (res.status === 400) {
        return res.json().then(error => ({ error: error }));
      }
      return res.json()
    });
  }

  static delete(route) {
    const auth = AuthService.getCredentials();
    const token = auth.token;
    
    return fetch(`${Config.api}/${route}`, {
      headers: {
        'x-access-token': token, 
      },
      method: 'DELETE'
    })
    .then(response => {
      if (response.status === 403) {
        AuthService.doLogin();
      } else {
        return response.json();
      }
    });
  }
}