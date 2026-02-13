// ===== Personalize these 3 things =====
const boyfriendName = "Babe"; // <- change this
const message =
  "I love you so much. Thank you for being my safe place, my best friend, and my favorite person. 💖\n\nI’m choosing you today, tomorrow, and always.";
const reasons = [
  "You make me feel loved.",
  "You make me laugh.",
  "You’re supportive of my goals.",
  "You listen to me.",
  "You’re my favorite adventure.",
  "You’re kind to people.",
  "You’re patient with me.",
  "You inspire me.",
  "You make life sweeter.",
  "You’re you — and I love that."
];

// ===== Wiring =====
document.getElementById("name").textContent = boyfriendName;

const messageCard = document.getElementById("messageCard");
const reasonsCard = document.getElementById("reasonsCard");
const messageText = document.getElementById("messageText");
const reasonsList = document.getElementById("reasonsList");

document.getElementById("revealBtn").addEventListener("click", () => {
  messageCard.hidden = false;
  typeMessage();
  burst(24);
});

document.getElementById("typeBtn").addEventListener("click", () => {
  typeMessage();
});

document.getElementById("reasonsBtn").addEventListener("click", () => {
  reasonsCard.hidden = false;
  reasonsList.innerHTML = "";
  reasons.forEach(r => {
    const li = document.createElement("li");
    li.textContent = r;
    reasonsList.appendChild(li);
  });
  burst(18);
});

document.getElementById("confettiBtn").addEventListener("click", () => burst(32));

let noCount = 0;
document.getElementById("yesBtn").addEventListener("click", () => {
  document.getElementById("gameText").textContent =
    `YAY 💞 Date idea: you pick the movie, I’ll bring the snacks.`;
  burst(40);
});

document.getElementById("noBtn").addEventListener("click", () => {
  noCount++;
  const lines = [
    "Are you sure? 🥺",
    "Try again 😌",
    "No button is kinda suspicious…",
    "Okay but… what if I say please? 💗",
    "Fine. I’ll just keep loving you anyway 😘"
  ];
  document.getElementById("gameText").textContent = lines[Math.min(noCount-1, lines.length-1)];
  wiggleNo();
  burst(10);
});

document.querySelectorAll(".chip").forEach(btn => {
  btn.addEventListener("click", () => {
    document.body.dataset.theme = btn.dataset.theme;
    burst(12);
  });
});

// ===== Typewriter effect =====
let typing = null;
function typeMessage(){
  if (typing) cancelAnimationFrame(typing);
  messageText.textContent = "";
  const chars = [...message];
  let i = 0;
  const tick = () => {
    messageText.textContent += chars[i] ?? "";
    i++;
    if (i < chars.length) typing = requestAnimationFrame(tick);
  };
  tick();
}

// ===== Cute hearts canvas =====
const canvas = document.getElementById("hearts");
const ctx = canvas.getContext("2d");
let W, H, hearts = [];

function resize(){
  W = canvas.width = window.innerWidth * devicePixelRatio;
  H = canvas.height = window.innerHeight * devicePixelRatio;
}
window.addEventListener("resize", resize);
resize();

function spawnHeart(x = Math.random()*W, y = H + 40){
  const s = (8 + Math.random()*14) * devicePixelRatio;
  return {
    x, y,
    vx: (-0.6 + Math.random()*1.2) * devicePixelRatio,
    vy: (-1.6 - Math.random()*2.2) * devicePixelRatio,
    s,
    rot: Math.random()*Math.PI,
    vr: (-0.06 + Math.random()*0.12),
    a: 0.9
  };
}

function heartPath(x,y,s,rot){
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(rot);
  ctx.scale(s, s);
  ctx.beginPath();
  ctx.moveTo(0, 0.3);
  ctx.bezierCurveTo(0, -0.3, -0.5, -0.3, -0.5, 0.1);
  ctx.bezierCurveTo(-0.5, 0.55, 0, 0.8, 0, 1);
  ctx.bezierCurveTo(0, 0.8, 0.5, 0.55, 0.5, 0.1);
  ctx.bezierCurveTo(0.5, -0.3, 0, -0.3, 0, 0.3);
  ctx.closePath();
  ctx.restore();
}

function burst(n=20){
  for(let i=0;i<n;i++){
    hearts.push(spawnHeart((window.innerWidth*devicePixelRatio)/2 + (Math.random()*260-130)*devicePixelRatio,
                          (window.innerHeight*devicePixelRatio)/2 + (Math.random()*120-60)*devicePixelRatio));
  }
}

function loop(){
  ctx.clearRect(0,0,W,H);
  // gentle background sprinkle
  if (Math.random() < 0.25) hearts.push(spawnHeart());

  hearts.forEach(h => {
    h.x += h.vx;
    h.y += h.vy;
    h.rot += h.vr;
    h.a -= 0.003;

    ctx.globalAlpha = Math.max(0, h.a);
    ctx.fillStyle = "rgba(255, 59, 122, 1)";
    heartPath(h.x, h.y, h.s/100, h.rot);
    ctx.fill();
  });

  hearts = hearts.filter(h => h.a > 0 && h.y > -60*devicePixelRatio);
  ctx.globalAlpha = 1;
  requestAnimationFrame(loop);
}
loop();

// little "no" wiggle
function wiggleNo(){
  const b = document.getElementById("noBtn");
  b.animate(
    [{transform:"translateX(0px)"},{transform:"translateX(-8px)"},{transform:"translateX(8px)"},{transform:"translateX(0px)"}],
    {duration:240, iterations:1}
  );
}

// start with a tiny burst
burst(10);
