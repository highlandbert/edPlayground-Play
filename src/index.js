import AuthService from './auth.service'
import ApiService from './api.service'
import Config from './config';

if (!AuthService.hasCredentials()) {
  AuthService.doLogin();
}

console.log(AuthService.getUsername());

document.getElementById('user').innerText = AuthService.getUsername();

const levelId = location.search.replace('?level=', ''); // '5aa27062a8669d1a785f511b';

const addScript = (id) => {
  const script = document.createElement('script');
  script.src = `${Config.scripts}/level_${id}`;
  document.body.appendChild(script);
};

ApiService.get(`levels/${levelId}`).then(level => {
  console.log(level);
  document.getElementById('name').innerText = level.name;
  addScript(levelId);
})
.catch(() => {
  console.log('Not Found');
  document.getElementById('e404').className = 'show';
});


