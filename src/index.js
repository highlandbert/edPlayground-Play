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
  script.src = `${Config.cdn}/levels/${id}`;
  document.body.appendChild(script);
};

let hasScores = false;

ApiService.get(`levels/${levelId}`).then(level => {
  console.log(level);
  hasScores = level.hasScores;
  document.getElementById('name').innerText = level.name;
  addScript(levelId);
})
.catch(() => {
  console.log('Not Found');
  document.getElementById('e404').className = 'show';
});

playground.events.onLevelFinished = () => {
  console.log('Finished');
  const auth = AuthService.getCredentials();
  const userId = auth._id;

  var params = new URLSearchParams();
  params.set('levelId', levelId);
  params.set('userId', userId);
  params.set('seconds', 0);

  console.log(userId);
  document.getElementById('finished').className = 'show';
  document.getElementById('time').innerText = hasScores ? '00:00:00' : '';
  return ApiService.post(`levelsResults`, params);
};


