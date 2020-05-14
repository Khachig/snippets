const animate = () => {
  c.fillStyle = "#000";
  c.fillRect(0, 0, window.innerWidth, window.innerHeight);
  c.fillStyle = "#FFF";
  c.font = objects[0].get_height + "px Courier";
  c.textAlign = "center";
  c.textBaseline = "middle";
  if (gameOver) {
    let winner = score[0] > score[1] ? "1" : "2";
    c.font = objects[0].get_height + "px Courier";
    c.fillText("Player" + winner + " wins!", canvas.width / 2, (canvas.height / 5) * 2);
    c.fillText("Press Enter to play again.", canvas.width / 2, (canvas.height / 5) * 3);
    return;
  }
  if (isRunning) {
    requestAnimationFrame(animate);
  }
  c.fillText(score[0], (canvas.width / 5) * 2, canvas.height / 2);
  c.fillText(score[1], (canvas.width / 5) * 3, canvas.height / 2);
  c.fillRect((canvas.width / 2) - 5, 0, 10, canvas.height);

  for (let i=0; i<objects.length; i++) {
    objects[i].update();
    objects[i].draw();
  }
  
  collision_checks();
}

const collision_checks = () => {
  let ballx = objects[2].get_xPos;
  let bally = objects[2].get_yPos;
  let ballSize = objects[2].get_height;
  let lpegx = objects[0].get_xPos;
  let lpegy = objects[0].get_yPos;
  let rpegx = objects[1].get_xPos;
  let rpegy = objects[1].get_yPos;

  if (score[0] == winScore || score[1] == winScore) {
    gameOver = true;
    return;
  }
  if (ballx >= canvas.width - ballSize) {
    score[0] += 1;
    objects[2] = new Ball();
  } else if (ballx <= 0) {
    score[1] += 1;
    objects[2] = new Ball();
  } else if (ballx <= lpegx + objects[0].get_width && ballx >= lpegx) {
    if (bally >= lpegy && bally + ballSize <= lpegy + objects[0].get_height) {
      objects[2].set_xInc = -objects[2].get_xInc;
    }
  } else if (ballx >= rpegx && ballx <= rpegx + objects[1].get_width) {
    if (bally >= rpegy && bally + ballSize <= rpegy + objects[1].get_height) {
      objects[2].set_xInc = -objects[2].get_xInc;
    }
  }
}

const togglePause = (event) => {
  if (event.keyCode == 32) {
    isRunning = !isRunning;
    if (isRunning) {
      animate();
    }
  }
  // console.log(isRunning);

}

const reset = () => {
  objects = [];
  score = [0, 0];
  isRunning = true;
  gameOver = false;

  p1 = new Peg(15, "l");
  p2 = new Peg(15, "r");
  b = new Ball();
  objects.push(p1);
  objects.push(p2);
  objects.push(b);
  animate();
}

let canvas = document.querySelector("canvas");
canvas.width = window.innerWidth / 1.5;
canvas.height = window.innerHeight / 1.5;
let c = canvas.getContext("2d");
document.addEventListener("keydown", (event) => togglePause(event));
document.addEventListener("keydown", function(event) {
  if (event.keyCode == 13 && gameOver) {
    reset();
  }
});


let objects = []
let score = [0, 0]
let winScore = 5;
let isRunning = false;
let gameOver = false;

let p1 = new Peg(15, "l");
let p2 = new Peg(15, "r");
let b = new Ball();
objects.push(p1);
objects.push(p2);
objects.push(b);
animate();
