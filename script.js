var gameCanvas = document.getElementById("gameCanvas");
var startButton = document.getElementById("startButton");
var startMenu = document.getElementById("startMenu");

var ctx = gameCanvas.getContext("2d");
var gameState = "menu";
var keys = {};

function resizeCanvas() {
  gameCanvas.width = window.innerWidth;
  gameCanvas.height = window.innerHeight;
}

var startTime = 0;
var lastTime = 0;
var frames = 0;
var fps = 0;
var lastFPSCheck = 500;

var map = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

var gridSize = 60;

resizeCanvas();

window.addEventListener("resize", resizeCanvas);

startButton.addEventListener("click", function (currentTime) {
  startMenu.classList.add("hidden");
  gameState = "running";
  startTime = currentTime;
  gameloop();
});

window.addEventListener("keydown", function (event) {
  keys[event.key] = true;
});

window.addEventListener("keyup", function (event) {
  keys[event.key] = false;
});

function startGL(currentTime) {
  deltaTime = currentTime - lastTime;
  lastTime = currentTime;
  if (currentTime > lastFPSCheck + 500) {
    fps = frames * 2;
    frames = 0;
    lastFPSCheck = currentTime;
  }
}

function endGL() {
  frames++;
}

function drawMap() {
  for (row = 0; row < map.length; row++) {
    for (col = 0; col < map[row].length; col++) {
      if (map[row][col] === 0) {
        ctx.fillStyle = "rgb(0,0,0)";
      } else if (map[row][col] === 1) {
        ctx.fillStyle = "rgb(255, 0, 0)";
      } else if (map[row][col] === 2) {
        ctx.fillStyle = "rgb(217, 255, 0)";
      }
      ctx.fillRect(col * gridSize, row * gridSize, gridSize, gridSize);
    }
  }
}

function gameloop(currentTime) {
  if (!gameState === "running") return;
  startGL(currentTime);

  ctx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  
  drawMap();

  endGL();
  requestAnimationFrame(gameloop);
}
