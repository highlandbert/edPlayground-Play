import AuthService from './auth.service'
import ApiService from './api.service'
import Config from './config';

if (!AuthService.hasCredentials()) {
  AuthService.doLogin();
}

console.log(AuthService.getUsername());

document.getElementById('user').innerText = AuthService.getUsername();

const params = location.search.replace('?', '').split('&');

let levelId = 0; // '5aa27062a8669d1a785f511b';
let redirect = '';

for (const param of params) {
  if (param.includes('level=')) {
    levelId = param.replace('level=', '');
  }
  if (param.includes('redirect=')) {
    redirect = param.replace('redirect=', '');
  }
}

console.log(levelId);
console.log(redirect);

if (redirect !== '') {
  const links = document.getElementsByClassName('back');
  for (const link of links) {
    link.innerText = 'Return';
    link.href = redirect;
  };
}

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


