import AuthService from './auth.service'
import ApiService from './api.service'
import Config from './config';

if (!AuthService.hasCredentials()) {
  AuthService.doLogin();
}

let levelId = 0; // 5ae83a4eaef23b03bc566220;
let redirect = '';
let hasScores = false;
let startDate = undefined;

document.getElementById('user').innerText = AuthService.getUsername();

const params = location.search.replace('?', '').split('&');
for (const param of params) {
  if (param.includes('level=')) {
    levelId = param.replace('level=', '');
  }
  if (param.includes('redirect=')) {
    redirect = param.replace('redirect=', '');
  }
}

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


ApiService.get(`levels/${levelId}`).then(level => {
  console.log(level);
  startDate = new Date();
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

  const endDate = new Date();
  const seconds = Math.floor((endDate - startDate) / 1000);

  var params = new URLSearchParams();
  params.set('levelId', levelId);
  params.set('userId', userId);
  params.set('seconds', seconds);

  console.log(userId);
  console.log(seconds);
  document.getElementById('finished').className = 'show';
  document.getElementById('time').innerText = hasScores ? renderSeconds(seconds) : '';
  return ApiService.post(`levelsResults`, params);
};

function renderSeconds(seconds) {
  let h = 0, m = 0, s = 0;
  s = seconds % 60;
  m = Math.floor((seconds / 60) % 60);
  h = Math.floor((seconds / 60) / 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

