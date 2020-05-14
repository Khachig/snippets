class Ball {
  constructor() {
    this.height = 10;
    this.width = 10;
    this.x = (canvas.width / 2) - (this.width / 2);
    this.y = (canvas.height / 2) - (this.height / 2);
    this.colour = "#FFF";
    this.x_inc = Math.random() < 0.5 ? 5 : -5;
    this.y_inc = Math.random() < 0.5 ? 5 : -5;
  }

  set set_xInc(value) {
    this.x_inc = value;
  }

  set set_yInc(value) {
    this.y_inc = value;
  }

  get get_xInc() {
    return this.x_inc;
  }

  get get_xPos() {
    return this.x;
  }

  get get_yPos() {
    return this.y;
  }

  get get_height() {
    return this.height;
  }

  get get_width() {
    return this.width;
  }

  draw() {
    c.fillStyle = this.colour;
    c.fillRect(this.x, this.y, this.width, this.height);
  }

  update() {
    if (this.x >= canvas.width - this.width || this.x <= 0) {
      this.x_inc = -this.x_inc;
    }
    if (this.y >= canvas.height - this.height || this.y <= 0) {
      this.y_inc = -this.y_inc;
    }

    this.x += this.x_inc;
    this.y += this.y_inc;
  }
}
