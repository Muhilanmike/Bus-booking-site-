const navbar = document.getElementById("navbar");
const navWrap = document.getElementById("navWrap");
const navMenu = document.getElementById("navMenu");
const hamburger = document.getElementById("hamburger");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 24);
});

hamburger.addEventListener("click", () => {
  const open = navWrap.classList.toggle("open");
  hamburger.setAttribute("aria-expanded", String(open));
  hamburger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

navMenu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navWrap.classList.remove("open");
    hamburger.setAttribute("aria-expanded", "false");
    hamburger.setAttribute("aria-label", "Open menu");
  });
});

const fromInput = document.getElementById("fromCity");
const toInput = document.getElementById("toCity");
const swapBtn = document.getElementById("swapBtn");

swapBtn.addEventListener("click", () => {
  [fromInput.value, toInput.value] = [toInput.value, fromInput.value];
  swapBtn.classList.toggle("rotated");
});

const minusBtn = document.getElementById("minusBtn");
const plusBtn = document.getElementById("plusBtn");
const passengerCount = document.getElementById("passengerCount");
let count = 1;

const renderCount = () => {
  passengerCount.textContent = count;
};

plusBtn.addEventListener("click", () => {
  if (count < 9) {
    count += 1;
    renderCount();
  }
});

minusBtn.addEventListener("click", () => {
  if (count > 1) {
    count -= 1;
    renderCount();
  }
});

const dateInput = document.getElementById("travelDate");
const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");
const minDate = `${yyyy}-${mm}-${dd}`;
dateInput.min = minDate;
dateInput.value = minDate;

const counters = document.querySelectorAll(".counter-number");
const stats = document.getElementById("stats");
let counted = false;

const animateCounter = (node) => {
  const target = Number(node.dataset.target);
  let current = 0;
  const step = Math.max(1, Math.round(target / 60));

  const tick = () => {
    current += step;
    if (current >= target) {
      node.textContent = target;
      return;
    }
    node.textContent = current;
    requestAnimationFrame(tick);
  };

  tick();
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !counted) {
        counters.forEach(animateCounter);
        counted = true;
      }
    });
  },
  { threshold: 0.4 }
);

observer.observe(stats);

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");
let particles = [];

const setupCanvas = () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
};

const makeParticles = () => {
  const total = Math.max(26, Math.round(window.innerWidth / 55));
  particles = Array.from({ length: total }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2.1 + 0.4,
    vx: (Math.random() - 0.5) * 0.22,
    vy: (Math.random() - 0.5) * 0.22,
    alpha: Math.random() * 0.45 + 0.2,
  }));
};

const draw = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p) => {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
    ctx.fill();
  });

  requestAnimationFrame(draw);
};

setupCanvas();
makeParticles();
draw();

window.addEventListener("resize", () => {
  setupCanvas();
  makeParticles();
});

document.getElementById("searchForm").addEventListener("submit", (event) => {
  event.preventDefault();
});
