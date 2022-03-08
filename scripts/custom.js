for (let i = 0; i < 2; i++) layers.push(new Layer());

const bg = new Image();
bg.src = "resources/images/main_bg.png";
bg.onload = () => renderImage(bg, 0, new Transform(540, 540, 1080, 1080));

const icon = new Image();
icon.src = "resources/images/icon.svg";


class MouseFollower extends GameObject{
  constructor() {
    super(540, 540, 200, 200);
    this.transform.position = mouse.transform.position;
    this.lastTransform = new Transform(
      this.transform.position.x,
      this.transform.position.y,
      this.transform.size.x,
      this.transform.size.y);
  }

  render() {
    clearTransform(1, this.lastTransform)
    renderImage(icon, 1, this.transform);
    this.setLastTransform();
  }

  setLastTransform() {
    this.lastTransform.position.x = this.transform.position.x;
    this.lastTransform.position.y = this.transform.position.y;
  }
}
objects.push(new MouseFollower());
