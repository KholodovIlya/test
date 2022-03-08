const canvas = document.getElementById('canvas');
const objects = [];


function Vector2(x, y) {
  this.x = x;
  this.y = y;
}

function Transform(x, y, width, height) {
  this.position = new Vector2(x, y);
  this.size = new Vector2(width, height);
}

class GameObject {
  constructor(x, y, width, height) {
    this.transform = new Transform(x, y, width, height);
    this.destroyed = false;
  }
}


function update() {
  objects.forEach((object, i) => {
    if(object.destroyed) objects.splice(i, 1);
    else { if(object.update) object.update(); }
  });
}

function collisions() {
  objects.forEach((object1, x) => {
    if(object1.collision) {
      for (let y = objects.length-1; y > 0; y--) {
        if (x === y) break;
        const object2 = objects[y];
        if(object2.collision) {
          if(abs(object1.transform.position.x - object2.transform.position.x) < (object1.transform.size.x + object2.transform.size.x) / 2 &
             abs(object1.transform.position.y - object2.transform.position.y) < (object1.transform.size.y + object2.transform.size.y) / 2) {
            object1.collision(object2);
            object2.collision(object1);
          }
        }
      }
    }
  });
}

function render() { objects.forEach((object) => { if(object.render) object.render(); }); }


function tick() {
  requestAnimationFrame(tick);
  update(); collisions(); render();
}


requestAnimationFrame(tick);
