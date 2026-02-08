const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const centerX = canvas.width / 2;
const baseY = canvas.height - 40;

let trunkHeight = 0;
let branchProgress = 0;
let leaves = [];
let stage = 0;

// 🌱 TRONCO
function drawTrunk() {
  ctx.strokeStyle = "#8b4513";
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.moveTo(centerX, baseY);
  ctx.lineTo(centerX, baseY - trunkHeight);
  ctx.stroke();

  if (trunkHeight < 120) {
    trunkHeight += 1.5;
    requestAnimationFrame(drawTrunk);
  } else {
    stage = 1;
    drawBranches();
  }
}

// 🌿 RAMAS
function drawBranches() {
  ctx.strokeStyle = "#8b4513";
  ctx.lineWidth = 4;

  const angle = branchProgress * 0.04;

  ctx.beginPath();
  ctx.moveTo(centerX, baseY - 100);
  ctx.lineTo(centerX - angle * 30, baseY - 130);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(centerX, baseY - 100);
  ctx.lineTo(centerX + angle * 30, baseY - 130);
  ctx.stroke();

  branchProgress++;

  if (branchProgress < 40) {
    requestAnimationFrame(drawBranches);
  } else {
    stage = 2;
    createLeaves();
  }
}

// 🍃 HOJAS EN FORMA DE CORAZÓN
function createLeaves() {
  for (let t = 0; t < Math.PI * 2; t += 0.15) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t);

    leaves.push({
      x: centerX + x * 5,
      y: baseY - 140 - y * 5,
      size: Math.random() * 4 + 3,
      alpha: 0
    });
  }

  drawLeaves();
}

function drawLeaves() {
  leaves.forEach(l => {
    ctx.fillStyle = `rgba(230,57,70,${l.alpha})`;
    ctx.beginPath();
    ctx.arc(l.x, l.y, l.size, 0, Math.PI * 2);
    ctx.fill();

    if (l.alpha < 1) l.alpha += 0.02;
  });

  if (leaves.some(l => l.alpha < 1)) {
    requestAnimationFrame(drawLeaves);
  }
}

// 💖 INTERACCIÓN: tocar el árbol
canvas.addEventListener("click", () => {
  for (let i = 0; i < 10; i++) {
    ctx.fillStyle = "rgba(255,0,80,0.8)";
    ctx.beginPath();
    ctx.arc(
      centerX + Math.random() * 60 - 30,
      baseY - 160 + Math.random() * 60 - 30,
      3,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
});

// ⏱ CONTADOR
const inicio = new Date("2024-02-14T00:00:00"); // CAMBIA ESTA FECHA

setInterval(() => {
  const ahora = new Date();
  const diff = ahora - inicio;

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  document.getElementById("contador").innerText =
    `Mi amor por ti comenzó hace…
     ${d} días ${h} horas ${m} minutos ${s} segundos`;
}, 1000);

// 🚀 INICIAR
drawTrunk();
