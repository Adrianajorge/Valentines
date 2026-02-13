// ========= PERSONALIZE THESE =========
const boyfriendName = "Babe"; // change this
const letter =
  "My love,\n\nI coded this for you because you’re my favorite person.\n\nThank you for being my safe place, my best friend, and my heart.\n\nHappy Valentine’s Day. 🖤";
const signature = "— Adriana 🖤"; // change to your name/nickname

const reasons = [
  "You make me feel safe.",
  "You make me laugh.",
  "You always show up for me.",
  "You listen to me.",
  "You’re patient with me.",
  "You motivate me.",
  "You’re my favorite person to talk to.",
  "You make life feel softer.",
  "You love me the way I need.",
  "You’re you — and I adore you."
];

// ========= DOM =========
document.addEventListener("DOMContentLoaded", () => {
  // set names
  const bfNameEl = document.getElementById("bfName");
  const letterTextEl = document.getElementById("letterText");
  const sigEl = document.getElementById("sig");

  bfNameEl.textContent = boyfriendName;
  sigEl.textContent = signature;

  // buttons + envelope
  const envelope = document.getElementById("envelope");
  const openBtn = document.getElementById("openBtn");
  const resetBtn = document.getElementById("resetBtn");
  const moreHeartsBtn = document.getElementById("moreHeartsBtn");

  // reasons
  const reasonsBtn = document.getElementById("reasonsBtn");
  const reasonsCard = document.getElementById("reasonsCard");
  const reasonsList = document.getElementById("reasonsList");

  // typewriter
  let typing = null;
  function typeLetter(){
    if (typing) cancelAnimationFrame(typing);
    letterTextEl.textContent = "";
    const chars = [...letter];
    let i = 0;

    const tick = () => {
      letterTextEl.textContent += chars[i] ?? "";
      i++;
      if (i < chars.length) typing = requestAnimationFrame(tick);
    };
    tick();
  }

  function openEnvelope(){
    envelope.classList.add("open");
    typeLetter();
    burst(28);
  }

  function closeEnvelope(){
    envelope.classList.remove("open");
    letterTextEl.textContent = "";
    burst(10);
  }

  // click/tap envelope itself
  envelope.addEventListener("click", () => {
    envelope.classList.contains("open") ? closeEnvelope() : openEnvelope();
  });

  openBtn.addEventListener("click", openEnvelope);
  resetBtn.addEventListener("click", closeEnvelope);
  moreHeartsBtn.addEventListener("click", () => burst(45));

  reasonsBtn.addEventListener("click", () => {
    reasonsCard.hidden = false;
    reasonsList.innerHTML = "";
    reasons.forEach(r => {
      const li = document.createElement("li");
      li.textContent = r;
      reasonsList.appendChild(li);
    });
    burst(18);
    reasonsCard.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  // ===== HEARTS CANVAS =====
  const canvas = document.getElementById("hearts");
  const ctx = canvas.getContext("2d");
  let W, H;
  let hearts = [];

  function resize(){
    W = canvas.width = window.innerWidth * devicePixelRatio;
    H = canvas.height = window.innerHeight * devicePixelRatio;
  }
  window.addEventListener("resize", resize);
  resize();

  function spawnHeart(x = Math.random()*W, y = H + 60){
    const size = (10 + Math.random()*16) * devicePixelRatio;
    const color = Math.random() < 0.5 ? "rgba(255,59,141,1)" : "rgba(168,85,255,1)";
    return {
      x, y,
      vx: (-0.7 + Math.random()*1.4) * devicePixelRatio,
      vy: (-1.8 - Math.random()*2.6) * devicePixelRatio,
      size,
      rot: Math.random()*Math.PI,
      vr: (-0.07 + Math.random()*0.14),
      a: 0.95,
      color
    };
  }

  function drawHeart(h){
    ctx.save();
    ctx.translate(h.x, h.y);
    ctx.rotate(h.rot);
    ctx.scale(h.size/120, h.size/120);

    ctx.beginPath();
    ctx.moveTo(0, 0.3);
    ctx.bezierCurveTo(0, -0.3, -0.5, -0.3, -0.5, 0.1);
    ctx.bezierCurveTo(-0.5, 0.55, 0, 0.8, 0, 1);
    ctx.bezierCurveTo(0, 0.8, 0.5, 0.55, 0.5, 0.1);
    ctx.bezierCurveTo(0.5, -0.3, 0, -0.3, 0, 0.3);
    ctx.closePath();

    ctx.restore();
  }

  function burst(n=24){
    const cx = (window.innerWidth * devicePixelRatio)/2;
    const cy = (window.innerHeight * devicePixelRatio)/2;
    for(let i=0;i<n;i++){
      hearts.push(
        spawnHeart(
          cx + (Math.random()*320 - 160) * devicePixelRatio,
          cy + (Math.random()*160 - 80) * devicePixelRatio
        )
      );
    }
  }

  function loop(){
    ctx.clearRect(0,0,W,H);

    if (Math.random() < 0.18) hearts.push(spawnHeart());

    hearts.forEach(h => {
      h.x += h.vx;
      h.y += h.vy;
      h.rot += h.vr;
      h.a -= 0.0036;

      ctx.globalAlpha = Math.max(0, h.a);
      ctx.fillStyle = h.color;
      drawHeart(h);
      ctx.fill();
    });

    hearts = hearts.filter(h => h.a > 0 && h.y > -80*devicePixelRatio);
    ctx.globalAlpha = 1;
    requestAnimationFrame(loop);
  }

  burst(14);
  loop();
});
