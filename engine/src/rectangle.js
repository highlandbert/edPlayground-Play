import Style from './style';

const rectangle = (x, y, w, h, styles) => {

  const style = new Style(styles);

  const g = new PIXI.Graphics();
  g.lineStyle(style.lineWidth, style.lineColor, style.alpha);
  g.beginFill(style.fillColor, style.alpha);
  g.drawRoundedRect(-w/2, -h/2, w, h, style.borderRadius);
  g.endFill();

  g.x = x;
  g.y = y;

  return g;
};

export default rectangle;