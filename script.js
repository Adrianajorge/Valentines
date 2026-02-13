// script.js
const boyfriendName = "Babe";
const message =
`My love,

I made this website just for you.

You are my safe place, my happiness, and my heart.

Happy Valentine’s Day 🖤`;

const signature = "— Adriana 🖤";

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

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("bfName").textContent = boyfriendName;
  document.getElementById("sig").textContent = signature;

  const envelope = document.getElementById("envelope");
  const openBtn = document.getElementById("openBtn");
  const resetBtn = document.getElementById("resetBtn");
  const moreHeartsBtn = document.getElementById("moreHeartsBtn");

  const letterText = document.getElementById("letterText");

  const reasonsBtn = document.getElementById("reasonsBtn");
  const reasonsCard = document.getElementById("reasonsCard");
  const reasonsList = document.getElementById("reasonsList");

  let typingTimer = null;

  function typeMessage(){
    if (typingTimer) clearTimeout(typingTimer);
    letterText.textContent = "";
    let i = 0;

    const tick = () => {
      letterText.textContent += message[i] ?? "";
      i++;
      if (i < message.length) typingTimer = setTimeout(tick, 18);
    };
    tick();
  }

  function openEnvelope(){
    envelope.classList.add("open");
    typeMessage();
    burst(24);
  }

  function resetEnvelope(){
    envelope.classList.remove("open");
    letterText.textContent = "";
  }

  openBtn.addEventListener("click", openEnvelope);
  resetBtn.addEventListener("click", resetEnvelope);

  envelope.addEventListener("click", () => {
    envelope.classList.contains("open") ? resetEnvelope() : openEnvelope();
  });

  reasonsBtn.addEventListener("click", () => {
    reasonsCard.hidden = false;
    reasonsList.innerHTML = "";
    reasons.forEach(r => {
      const li = document.createElement("li");
      li.textContent = r;
      reasonsList.appendChild(li);
    });
    burst(12);
    reasonsCard.scrollIntoView({behavior:"smooth", block:"start"});
  });

  // ===== hearts canvas =====
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
    return { x,y,size,color,
      vx:(-0.7 + Math.random()*1.4)*devicePixelRatio,
      vy:(-1.8 - Math.random()*2.6)*devicePixelRatio,
      rot:Math.random()*Math.PI,
      vr:(-0.07 + Math.random()*0.14),
      a:0.95
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
    const cx = (window.innerWidth*devicePixelRatio)/2;
    const cy = (window.innerHeight*devicePixelRatio)/2;
    for(let i=0;i<n;i++){
      hearts.push(spawnHeart(
        cx + (Math.random()*320 - 160) * devicePixelRatio,
        cy + (Math.random()*160 - 80) * devicePixelRatio
      ));
    }
  }

  function loop(){
    ctx.clearRect(0,0,W,H);
    if (Math.random() < 0.16) hearts.push(spawnHeart());

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

  moreHeartsBtn.addEventListener("click", () => burst(45));
  burst(10);
  loop();
});
