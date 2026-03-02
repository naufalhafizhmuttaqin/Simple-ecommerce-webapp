/* NAVBAR ACTIVE */
const navItems = document.querySelectorAll(".nav-item");

navItems.forEach(item => {
  item.addEventListener("click", () => {
    navItems.forEach(i => i.classList.remove("active"));
    item.classList.add("active");
  });
});

/* CARD CURSOR EFFECT */
document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", e.clientX - rect.left + "px");
    card.style.setProperty("--y", e.clientY - rect.top + "px");
  });
});

/* SCROLL REVEAL */
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("active");
  });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* TYPEWRITER EFFECT LOOP*/
const words = [
  "Welcome to TOKOku",
  "Belanja jadi lebih mudah",
  "Satu toko, semua kebutuhan"
];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const speed = 100;
const delayAfterType = 1500;

const typeText = document.getElementById("type-text");

function typeLoop() {
  const currentWord = words[wordIndex];

  if (!isDeleting) {
    typeText.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentWord.length) {
      setTimeout(() => isDeleting = true, delayAfterType);
    }
  } else {
    typeText.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeLoop, isDeleting ? speed / 2 : speed);
}

window.addEventListener("load", typeLoop);

/* SCROLL DIRECTION DETECTION */
let lastScroll = window.scrollY;
let direction = "down";

window.addEventListener("scroll", () => {
  direction = window.scrollY > lastScroll ? "down" : "up";
  lastScroll = window.scrollY;
});

/* CARD SCROLL ANIMATION */
const cardObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      const card = entry.target;

      if (entry.isIntersecting) {
        card.classList.remove("from-up", "from-down", "show");
        card.classList.add("animate");

        card.classList.add(
          direction === "down" ? "from-down" : "from-up"
        );

        requestAnimationFrame(() => {
          card.classList.add("show");
        });
      } else {
        // reset supaya bisa animasi ulang
        card.classList.remove("show");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".card").forEach(card => {
  cardObserver.observe(card);
});

// PINDAH KE HALAMAN DETAIL PRODUK
function goDetail(id) {
  window.location.href = `detail.html?id=${id}`;
}

/* ================= SEARCH & FILTER LOGIC ================= */
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-btn");
const sections = document.querySelectorAll(".product-section");

let activeFilter = "all";

function applyFilter() {
  const keyword = searchInput.value.toLowerCase();

  sections.forEach(section => {
    const cards = section.querySelectorAll(".card");
    let visibleCount = 0;

    cards.forEach(card => {
      const name = card.querySelector("p").textContent.toLowerCase();
      const category = card.dataset.category;

      const matchSearch = name.includes(keyword);
      const matchCategory =
        activeFilter === "all" || category === activeFilter;

      if (matchSearch && matchCategory) {
        card.style.display = "block";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    // 🔥 INI KUNCINYA
    section.style.display = visibleCount > 0 ? "block" : "none";
  });
}

/* SEARCH */
searchInput.addEventListener("input", applyFilter);

/* FILTER BUTTON */
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    activeFilter = btn.dataset.filter;
    applyFilter();
  });
});

