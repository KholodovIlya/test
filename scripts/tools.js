// Maths
function abs(value) { return value > 0 ? value : -value; }

let seed = 0; function random() { return ((seed = (71 * seed + 1) % 100000) / 100000); }

function float2int (value) { return value | 0; }
// Maths


// Render
const layers = [];
class Layer {
  constructor() {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');

    document.querySelector('body').appendChild(this.canvas);
    this.canvas.width = canvas.width;
    this.canvas.height = canvas.height;
  }
}

function renderImage(image, layer, transform) {
  layers[layer].context.drawImage(image,
    transform.position.x - transform.size.x / 2,
    transform.position.y - transform.size.y / 2,
    transform.size.x,
    transform.size.y);
}
function clearTransform(layer, transform) {
  layers[layer].context.clearRect(
    transform.position.x - transform.size.x / 2 - 1,
    transform.position.y - transform.size.y / 2 - 1,
    transform.size.x + 2,
    transform.size.y + 2);
}
// Render


// Input
class Mouse extends GameObject {
  constructor() {
    super(0, 0, 0, 0); this.down = false;

    document.addEventListener('mousemove', (event) => this.move(event.clientX, event.clientY));
    document.addEventListener('mousedown', () => this.down = true);
    document.addEventListener('mouseup', () => this.down = false);

    document.addEventListener('touchmove', (event) => this.touch(event));
    document.addEventListener('touchstart', (event) => this.touch(event), () => this.down = true);
    document.addEventListener('touchend', () => this.down = false);
  }

  move(x, y) {
    this.transform.position.x = (x - canvas.offsetLeft) / (canvas.offsetWidth / canvas.width);
    this.transform.position.y = (y - canvas.offsetTop) / (canvas.offsetHeight / canvas.height);
  }

  touch(event) { if (event.touches.length > 0) this.move(event.touches[0].clientX, event.touches[0].clientY); }

  collision(other) {}
}
const mouse = new Mouse(); objects.push(mouse);
// Input


// UI
class Button extends GameObject {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.isStartPoint = false;
    this.pressed = false;
    this.collide = false;
  }
  update() {
    if(this.pressed) {
      if(this.onRelease & !mouse.down) this.onRelease();
      if(this.onInterrupt & !mouse.collide) this.onInterrupt();
    }

    this.isStartPoint = !mouse.down;
    this.pressed = !(mouse.down || this.collide);
    this.collide = false;
  }
  collision(other) {
    if(other.constructor.name === "Mouse") {
      if(mouse.down & !this.pressed & this.isStartPoint) { this.pressed = true; if (this.onPress) this.onPress(); }
      this.collide = true;
    }
  }
}
// UI
