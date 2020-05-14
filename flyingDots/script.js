class Square {

  constructor(x_pos, y_pos, size) {
    this.x_pos = x_pos;
    this.y_pos = y_pos;
    this.size = size;
    this.x_increment = Math.random() < 0.5 ? -(Math.floor(Math.random() * 6)) : Math.floor(Math.random() * 6);
    this.y_increment = Math.random() < 0.5 ? -(Math.floor(Math.random() * 6)) : Math.floor(Math.random() * 6);
    this.colour = "#" + Math.floor(Math.random() * (Math.pow(16, 6))).toString(16);
    this.x_edge = window.innerWidth - size;
    this.y_edge = window.innerHeight - size;
  }


  update() {
    if (this.x_pos >= this.x_edge || this.x_pos <= 0) {
      this.x_increment = -this.x_increment;
    }
    if (this.y_pos >= this.y_edge || this.y_pos <= 0) {
      this.y_increment = -this.y_increment;
    }

    this.x_pos += this.x_increment;
    this.y_pos += this.y_increment;
  }

  draw() {
    c.fillStyle = this.colour;
    c.beginPath();
    c.arc(this.x_pos, this.y_pos, this.size, 0, Math.PI * 2, false);
    c.fill();
  }

}


const animate = () => {
  requestAnimationFrame(animate);
  c.fillStyle = "rgba(0, 0, 0, 0.2)";
  c.fillRect(0, 0, window.innerWidth, window.innerHeight);

  for (var i=0; i<boxes.length; i++) {
    boxes[i].update();
    boxes[i].draw();
  }
}


let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext("2d");

let boxes = [];
for (var i=0; i<150; i++) {
  let size = 5;
  let rand_x = Math.floor(Math.random() * (window.innerWidth - size));
  let rand_y = Math.floor(Math.random() * (window.innerHeight- size));
  let square = new Square(rand_x, rand_y, size);
  boxes.push(square);
}

animate();

