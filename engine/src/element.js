import circle from './circle';
import rectangle from './rectangle';
import sprite from './sprite';

const element = (app) => ({

  create: (container, isInteractive) => {
    app.stage.addChild(container);

    container.interact = (fun) => {
      container.interactive = true;
      container.buttonMode = true;
      container.onpointerdown = fun;
      container.on('pointerdown', (event) => {
        container.onpointerdown(event);
      });
    };

    return container;
  },

  circle: (x, y, r, styles) => element(app).create(circle(x, y, r, styles)),

  rectangle: (x, y, w, h, styles) => element(app).create(rectangle(x, y, w, h, styles)),

  sprite: (x, y, name, styles) => element(app).create(sprite(x, y, name, styles))

});
  
export default element;