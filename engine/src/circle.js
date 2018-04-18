import Style from './style';

const circle = (x, y, r, styles) => {

  const style = new Style(styles);
  
  const g = new PIXI.Graphics();
  g.lineStyle(style.lineWidth, style.lineColor, style.alpha);
  g.beginFill(style.fillColor, style.alpha);
  g.drawCircle(0, 0, r);
  g.endFill();

  g.x = x;
  g.y = y;

  return g;
};

export default circle;