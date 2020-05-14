class Peg {
  constructor(size, side) {
    this.height = size * 3;
    this.width = size;
    this.increment = 10;
    this.colour = "#FFF";
    this.pressedKeys = [false, false] // up, down
    this.y = (canvas.height / 2) - (this.height / 2);
    if (side == "l") {
      this.x = 50;
      this.upArrow = 87;
      this.downArrow = 83;
    } else {
      this.x = canvas.width - 50 - this.width;
      this.upArrow = 38;
      this.downArrow = 40;
    }
    document.addEventListener("keydown", (event) => this.keypress(event, "d"));
    document.addEventListener("keyup", (event) => this.keypress(event, "u"));
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

  keypress(event, eventType) {
    switch (event.keyCode) {
      case this.upArrow: this.pressedKeys[0] = eventType == "d" ? true : false;
        break;
      case this.downArrow: this.pressedKeys[1] = eventType == "d" ? true : false;
        break;
    }
  }

  update() {
    if (this.pressedKeys[1] && this.y < (canvas.height - (this.height))) {
      this.y += this.increment;
    }
    if (this.pressedKeys[0] && this.y >= 0) {
      this.y -= this.increment;
    }
  }
}
