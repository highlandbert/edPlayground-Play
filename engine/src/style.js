export default class Style {
  constructor(obj) {
    this.lineWidth = obj && obj.lineWidth || 0;
    this.lineColor = obj && obj.lineColor || 0xcccccc;
    this.fillColor = obj && obj.fillColor || 0xcccccc;
    this.alpha = obj && obj.alpha || 1;
    this.borderRadius = obj && obj.borderRadius || 0;
  }
}