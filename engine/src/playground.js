import * as PIXI from 'pixi.js';
import _element from './element';
import circle from './circle';
import rectangle from './rectangle';

const app = new PIXI.Application(1280, 720, { 
  antialias: true,
  backgroundColor: 0xffffff
});

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const element = _element(app);

document.getElementById('level').appendChild(app.view);

const addBehaviour = (fun) => {
  app.ticker.add(delta => fun(delta));
};

export { app, addBehaviour, element, circle, rectangle };