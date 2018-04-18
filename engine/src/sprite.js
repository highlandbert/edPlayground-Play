import Style from './style';

const sprite = (x, y, name, styles) => {


  const style = new Style(styles);

  const g = PIXI.Sprite.fromImage(`assets/${name}`);

  g.anchor.set(0.5);
  g.x = x;
  g.y = y;

  return g;
};

export default sprite;