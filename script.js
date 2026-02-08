// ===========================
// FLOATING HEARTS BACKGROUND
// ===========================
function createFloatingHearts() {
  const container = document.getElementById("heartsContainer");
  const heartCount = 15;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement("div");
    heart.classList.add("floating-heart");
    heart.innerHTML = "❤️";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDuration = Math.random() * 10 + 10 + "s";
    heart.style.animationDelay = Math.random() * 5 + "s";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";
    container.appendChild(heart);
  }
}

// ===========================
// SMOOTH SCROLL
// ===========================
document.getElementById("beginStory")?.addEventListener("click", () => {
  document.getElementById("timeline").scrollIntoView({
    behavior: "smooth",
  });
});

// ===========================
// TIMELINE SCROLL ANIMATIONS
// ===========================
function revealTimelineItems() {
  const items = document.querySelectorAll(".timeline-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.2,
    },
  );

  items.forEach((item) => {
    observer.observe(item);
  });
}

// ===========================
// CONFETTI ANIMATION
// ===========================
class Confetti {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.colors = ["#8B0000", "#FFB6C1", "#FFD700", "#FF69B4", "#FFC0CB"];

    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createParticle() {
    return {
      x: Math.random() * this.canvas.width,
      y: -10,
      size: Math.random() * 8 + 4,
      speedY: Math.random() * 3 + 2,
      speedX: Math.random() * 2 - 1,
      color: this.colors[Math.floor(Math.random() * this.colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() * 10 - 5,
    };
  }

  start() {
    this.canvas.classList.add("active");

    // Create initial burst
    for (let i = 0; i < 150; i++) {
      this.particles.push(this.createParticle());
    }

    this.animate();

    // Stop after 5 seconds
    setTimeout(() => this.stop(), 5000);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.particles.forEach((particle, index) => {
      particle.y += particle.speedY;
      particle.x += particle.speedX;
      particle.rotation += particle.rotationSpeed;

      // Remove particles that are off screen
      if (particle.y > this.canvas.height) {
        this.particles.splice(index, 1);
      }

      // Draw particle
      this.ctx.save();
      this.ctx.translate(particle.x, particle.y);
      this.ctx.rotate((particle.rotation * Math.PI) / 180);
      this.ctx.fillStyle = particle.color;
      this.ctx.fillRect(
        -particle.size / 2,
        -particle.size / 2,
        particle.size,
        particle.size,
      );
      this.ctx.restore();
    });

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.animate());
    }
  }

  stop() {
    this.particles = [];
    this.canvas.classList.remove("active");
  }
}

// ===========================
// HEARTS ANIMATION
// ===========================
class HeartsAnimation {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.hearts = [];

    this.resize();
    window.addEventListener("resize", () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  createHeart() {
    return {
      x: Math.random() * this.canvas.width,
      y: this.canvas.height + 20,
      size: Math.random() * 30 + 20,
      speedY: Math.random() * 2 + 1,
      speedX: Math.random() * 2 - 1,
      opacity: 1,
    };
  }

  drawHeart(x, y, size) {
    this.ctx.save();
    this.ctx.translate(x, y);
    this.ctx.scale(size / 20, size / 20);

    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.bezierCurveTo(-10, -10, -20, 0, -10, 10);
    this.ctx.bezierCurveTo(-10, 15, 0, 20, 0, 25);
    this.ctx.bezierCurveTo(0, 20, 10, 15, 10, 10);
    this.ctx.bezierCurveTo(20, 0, 10, -10, 0, 0);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.restore();
  }

  start() {
    this.canvas.classList.add("active");

    // Create hearts continuously
    this.interval = setInterval(() => {
      for (let i = 0; i < 3; i++) {
        this.hearts.push(this.createHeart());
      }
    }, 200);

    this.animate();

    // Stop after 5 seconds
    setTimeout(() => this.stop(), 5000);
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.hearts.forEach((heart, index) => {
      heart.y -= heart.speedY;
      heart.x += heart.speedX;
      heart.opacity -= 0.005;

      // Remove hearts that are off screen or faded
      if (heart.y < -50 || heart.opacity <= 0) {
        this.hearts.splice(index, 1);
      }

      // Draw heart
      this.ctx.fillStyle = `rgba(139, 0, 0, ${heart.opacity})`;
      this.drawHeart(heart.x, heart.y, heart.size);
    });

    if (this.hearts.length > 0 || this.interval) {
      requestAnimationFrame(() => this.animate());
    }
  }

  stop() {
    clearInterval(this.interval);
    this.interval = null;
    setTimeout(() => {
      this.hearts = [];
      this.canvas.classList.remove("active");
    }, 2000);
  }
}

// ===========================
// PROPOSAL BUTTONS
// ===========================
function handleProposalAcceptance() {
  const modal = document.getElementById("celebrationModal");
  const canvas = document.getElementById("confettiCanvas");
  const kissingGif = document.getElementById("kissingGif");

  // Set to user's image file
  kissingGif.src = "Image.png";

  // Show modal
  modal.classList.add("active");

  // Start confetti
  const confetti = new Confetti(canvas);
  confetti.start();

  // Start hearts after 1 second
  setTimeout(() => {
    const hearts = new HeartsAnimation(canvas);
    hearts.start();
  }, 1000);

  // Close modal after 8 seconds
  setTimeout(() => {
    modal.classList.remove("active");
    // Scroll to final section
    document.getElementById("final").scrollIntoView({
      behavior: "smooth",
    });
  }, 8000);
}

// Add event listener to YES button
document
  .getElementById("yesButton1")
  ?.addEventListener("click", handleProposalAcceptance);

// ===========================
// NO BUTTON - MOVING FUNCTIONALITY
// ===========================
const noButton = document.getElementById("noButton");
const noMessages = [
  "Why? 😢",
  "Please... 🥺",
  "Think again! 💔",
  "Are you sure? 😭",
  "Please accept! 🙏",
  "Give me a chance! 💝",
  "Don't say no! 😣",
  "Please please! 🥹",
  "I love you! ❤️",
  "One more chance! 💕",
];
let messageIndex = 0;

function moveNoButton() {
  if (!noButton) return;

  const buttonsContainer = document.querySelector(".proposal-buttons");
  const containerRect = buttonsContainer.getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();

  // Calculate boundaries to keep button within the buttons container
  const padding = 30;
  const maxX = containerRect.width - buttonRect.width - padding;
  const maxY = containerRect.height - buttonRect.height - padding;
  const minX = padding;
  const minY = 80; // Start below the YES button

  // Generate random position within the container
  let randomX = Math.random() * (maxX - minX) + minX;
  let randomY = Math.random() * (maxY - minY) + minY;

  // Ensure values are within bounds
  randomX = Math.max(minX, Math.min(randomX, maxX));
  randomY = Math.max(minY, Math.min(randomY, maxY));

  // Move button to new position (relative to container)
  noButton.style.left = randomX + "px";
  noButton.style.top = randomY + "px";
  noButton.style.transform = "none"; // Remove centering transform

  // Change button text
  messageIndex = (messageIndex + 1) % noMessages.length;
  noButton.textContent = noMessages[messageIndex];
}

// Add hover and click event listeners to NO button
if (noButton) {
  noButton.addEventListener("mouseenter", moveNoButton);
  noButton.addEventListener("click", (e) => {
    e.preventDefault();
    moveNoButton();
  });

  // For touch devices
  noButton.addEventListener("touchstart", (e) => {
    e.preventDefault();
    moveNoButton();
  });
}

// Close modal on click
document
  .getElementById("celebrationModal")
  ?.addEventListener("click", function (e) {
    if (e.target === this) {
      this.classList.remove("active");
    }
  });

// ===========================
// SCROLL REVEAL ANIMATIONS
// ===========================
function initScrollAnimations() {
  const sections = document.querySelectorAll(
    ".letter-section, .emotion-section, .proposal-section, .final-section",
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    {
      threshold: 0.1,
    },
  );

  sections.forEach((section) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
    section.style.transition = "all 1s ease-out";
    observer.observe(section);
  });
}

// ===========================
// INITIALIZE ON PAGE LOAD
// ===========================
window.addEventListener("DOMContentLoaded", () => {
  createFloatingHearts();
  revealTimelineItems();
  initScrollAnimations();
});

// ===========================
// SMOOTH SCROLL FOR ALL LINKS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ===========================
// PARALLAX EFFECT ON SCROLL
// ===========================
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  // Parallax for hero section
  const hero = document.querySelector(".hero-section");
  if (hero) {
    hero.style.transform = `translateY(${scrollY * 0.5}px)`;
  }

  lastScrollY = scrollY;
});

// ===========================
// PREVENT CONTEXT MENU (OPTIONAL)
// ===========================
// Uncomment if you want to prevent right-click
// document.addEventListener('contextmenu', (e) => e.preventDefault());

// ===========================
// EASTER EGG: CLICK ANYWHERE FOR HEARTS
// ===========================
let clickCount = 0;
document.addEventListener("click", (e) => {
  // Only trigger on background clicks, not on buttons
  if (!e.target.closest("button") && !e.target.closest("a")) {
    clickCount++;

    // Create a small heart at click position
    const heart = document.createElement("div");
    heart.innerHTML = "❤️";
    heart.style.position = "fixed";
    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";
    heart.style.fontSize = "20px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "9999";
    heart.style.animation = "floatUpFade 2s ease-out forwards";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 2000);
  }
});

// Add CSS for click hearts animation
const style = document.createElement("style");
style.textContent = `
    @keyframes floatUpFade {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(0.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
