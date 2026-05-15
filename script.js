// ── Star Canvas ──
const canvas = document.getElementById('sc');
const ctx = canvas.getContext('2d');
let stars = [], shoots = [];

function resize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  buildStars();
}

function buildStars() {
  stars = Array.from({ length: 220 }, () => ({
    x:  Math.random() * canvas.width,
    y:  Math.random() * canvas.height,
    r:  Math.random() * 1.7 + 0.3,
    ph: Math.random() * Math.PI * 2,
    sp: Math.random() * 0.012 + 0.003
  }));
}

resize();
window.addEventListener('resize', resize);

// Shooting stars
setInterval(() => {
  shoots.push({
    x:   Math.random() * canvas.width * 0.65,
    y:   Math.random() * canvas.height * 0.4,
    len: Math.random() * 100 + 55,
    dx:  Math.random() * 2 + 2,
    dy:  Math.random() * 1.5 + 0.8,
    a:   1
  });
}, 2600);

function draw() {
  const now = Date.now() / 1000;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Twinkling stars
  stars.forEach(s => {
    const a = 0.35 + 0.65 * Math.abs(Math.sin(now * s.sp * 3 + s.ph));
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(210, 185, 255, ${a})`;
    ctx.fill();
  });

  // Shooting stars
  shoots = shoots.filter(s => s.a > 0.02);
  shoots.forEach(s => {
    const m = Math.sqrt(s.dx * s.dx + s.dy * s.dy);
    const g = ctx.createLinearGradient(
      s.x, s.y,
      s.x - s.len * s.dx / m,
      s.y - s.len * s.dy / m
    );
    g.addColorStop(0, `rgba(200, 155, 255, ${s.a})`);
    g.addColorStop(1, 'rgba(200, 155, 255, 0)');
    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.len * s.dx / m, s.y - s.len * s.dy / m);
    ctx.strokeStyle = g;
    ctx.lineWidth = 2;
    ctx.stroke();
    s.x += s.dx;
    s.y += s.dy;
    s.a -= 0.017;
  });

  requestAnimationFrame(draw);
}
draw();

// ── Floating Particles ──
const emojis = ['🌟', '✨', '💫', '⭐', '🌠', '💜', '🚀', '🌌'];
const fl = document.getElementById('floaties');

function spawnP() {
  const el = document.createElement('div');
  el.className = 'fp';
  el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  el.style.left = Math.random() * 95 + '%';
  const d = Math.random() * 6 + 7;
  el.style.animationDuration = d + 's';
  el.style.animationDelay = Math.random() * 2 + 's';
  el.style.fontSize = (Math.random() * 10 + 14) + 'px';
  fl.appendChild(el);
  setTimeout(() => el.remove(), (d + 3) * 1000);
}

for (let i = 0; i < 7; i++) setTimeout(spawnP, i * 250);
setInterval(spawnP, 800);

// ── Poem Tab Switch ──
function showKav(idx, btn) {
  document.querySelectorAll('.kav').forEach(k => k.classList.remove('show'));
  document.querySelectorAll('.ptab').forEach(b => b.classList.remove('active'));
  document.getElementById('kav' + idx).classList.add('show');
  btn.classList.add('active');
  for (let i = 0; i < 5; i++) setTimeout(spawnP, i * 100);
}

// ── Surprise Button ──
let done = false;

function boom() {
  if (done) return;
  done = true;
  document.getElementById('smsg').style.display = 'block';
  for (let i = 0; i < 24; i++) setTimeout(spawnP, i * 65);
  for (let i = 0; i < 5; i++) {
    setTimeout(() => shoots.push({
      x:   Math.random() * canvas.width * 0.7,
      y:   Math.random() * canvas.height * 0.4,
      len: 120, dx: 3, dy: 1.5, a: 1
    }), i * 150);
  }
}
