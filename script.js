const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let scale = 1;
let growing = true;

function drawHeart(s) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(150, 150);
  ctx.scale(s, s);

  ctx.beginPath();
  ctx.moveTo(0, -40);
  ctx.bezierCurveTo(-50, -80, -120, -10, 0, 80);
  ctx.bezierCurveTo(120, -10, 50, -80, 0, -40);
  ctx.fillStyle = "#ff5fa2";
  ctx.fill();

  ctx.restore();
}

function animate() {
  if (growing) {
    scale += 0.005;
    if (scale >= 1.15) growing = false;
  } else {
    scale -= 0.005;
    if (scale <= 0.95) growing = true;
  }

  drawHeart(scale);
  requestAnimationFrame(animate);
}

animate();
