// ---------------- DATA ----------------
const data = {
  names: "Bakhtee & Eva",
  date: "30.05.2026",
  venue: "Restaurant Royal Hall",
  rsvpLink: "https://forms.gle/N6WtZK3RkfsmtfPG6",
  images: {
    hero: "assets/images/main_photo.jpg",
    gallery: [
      "assets/images/photo_1.jpg",
      "assets/images/photo_2.jpg",
      "assets/images/photo_3.jpg",
      "assets/images/photo_4.jpg",
      "assets/images/photo_5.jpg",
      "assets/images/photo_6.jpg",
      "assets/images/photo_7.jpg",
      "assets/images/photo_8.jpg",
    ],
  },
};

// ---------------- DOM ----------------
const timerEl = document.getElementById("timer");

// ---------------- SET CONTENT ----------------
document.getElementById("names").textContent = data.names;
document.getElementById("date").textContent = data.date;
document.getElementById("dateDetail").textContent = data.date;
document.getElementById("venue").textContent = data.venue;
document.getElementById("rsvpLink").href = data.rsvpLink;
document.getElementById("heroImage").src = data.images.hero;

// ---------------- COUNTDOWN ----------------
function parseDate(dateStr) {
  const [day, month, year] = dateStr.split(".");
  return new Date(`${year}-${month}-${day}T00:00:00`).getTime();
}

const targetDate = parseDate(data.date);

function updateCountdown() {
  const now = Date.now();
  const diff = targetDate - now;

  if (!timerEl) return;

  if (diff <= 0) {
    timerEl.textContent = "Wedding day 🎉";
    return;
  }

  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  timerEl.textContent = `${d}d ${h}h ${m}m ${s}s`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ---------------- GALLERY ----------------
const gallery = document.getElementById("galleryGrid");

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

if (gallery && data.images.gallery.length > 0) {
  const selectedImages = shuffle([...data.images.gallery]).slice(0, 10);

  let current = 0;

  selectedImages.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;

    if (index === 0) img.classList.add("active");

    gallery.appendChild(img);
  });

  const images = gallery.querySelectorAll("img");

  setInterval(() => {
    if (images.length === 0) return;

    images[current].classList.remove("active");
    images[current].classList.add("hidden");

    current = (current + 1) % images.length;

    images[current].classList.remove("hidden");
    images[current].classList.add("active");
  }, 3000);
}

// ---------------- SCROLL ANIMATION ----------------
const sections = document.querySelectorAll("section");

function revealSections() {
  sections.forEach((sec) => {
    const top = sec.getBoundingClientRect().top;

    if (top < window.innerHeight - 100) {
      sec.style.opacity = 1;
      sec.style.transform = "translateY(0)";
    }
  });
}

// сразу показываем первый экран
revealSections();

window.addEventListener("scroll", revealSections);

// ---------------- SHARE ----------------
function share() {
  const url = window.location.href;

  if (navigator.share) {
    navigator.share({
      title: "Wedding Invitation",
      url,
    });
  } else {
    navigator.clipboard.writeText(url);
    alert("Link copied!");
  }
}
