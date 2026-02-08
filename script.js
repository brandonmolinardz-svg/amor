const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let scale = 0;

function drawHeart() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.save();
  ctx.translate(150, 180);
  ctx.scale(scale, scale);

  ctx.beginPath();
  ctx.moveTo(0, -40);
  ctx.bezierCurveTo(-50, -80, -120, -10, 0, 80);
  ctx.bezierCurveTo(120, -10, 50, -80, 0, -40);
  ctx.fillStyle = "#e63946";
  ctx.fill();

  ctx.restore();

  if (scale < 1) {
    scale += 0.02;
    requestAnimationFrame(drawHeart);
  }
}

// Tronco
function drawTrunk() {
  ctx.fillStyle = "#8b4513";
  ctx.fillRect(145, 180, 10, 80);
}

setTimeout(() => {
  drawTrunk();
  drawHeart();
}, 1000);

// ⏱ CONTADOR DE AMOR
const inicio = new Date("2024-02-14T00:00:00"); // CAMBIA ESTA FECHA

setInterval(() => {
  const ahora = new Date();
  const diff = ahora - inicio;

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  const horas = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutos = Math.floor((diff / (1000 * 60)) % 60);
  const segundos = Math.floor((diff / 1000) % 60);

  document.getElementById("contador").innerText =
    `Mi amor por ti comenzó hace…
     ${dias} días ${horas} horas ${minutos} minutos ${segundos} segundos`;
}, 1000);
