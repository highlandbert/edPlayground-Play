import AuthService from './auth.service'
import ApiService from './api.service'

if (!AuthService.hasCredentials()) {
  AuthService.doLogin();
}

console.log(AuthService.getUsername());

document.getElementById('user').innerText = AuthService.getUsername();

const levelId = location.search.replace('?level=', ''); // '5aa27062a8669d1a785f511b';

ApiService.get(`levels/${levelId}`).then(level => {
  console.log(level);
  document.getElementById('name').innerText = level.name;
})
.catch(() => {
  console.log('Not Found');
  document.getElementById('e404').className = 'show';
});
