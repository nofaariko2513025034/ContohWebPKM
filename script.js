const modal = document.getElementById("storyModal");
const openStory = document.getElementById("openStory");
const closeStory = document.getElementById("closeStory");
const closeStory2 = document.getElementById("closeStory2");
const backTop = document.getElementById("backTop");

function setModal(open) {
  modal.classList.toggle("show", open);
  modal.setAttribute("aria-hidden", String(!open));
  document.body.classList.toggle("modal-open", open);
}

openStory?.addEventListener("click", () => setModal(true));
closeStory?.addEventListener("click", () => setModal(false));
closeStory2?.addEventListener("click", () => setModal(false));
modal?.addEventListener("click", e => {
  if (e.target === modal) setModal(false);
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") setModal(false);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold: 0.12});

document.querySelectorAll(".reveal, .section > .section-label, .activity-card, .info-box, .testimonial-grid blockquote").forEach(el => {
  el.classList.add("reveal");
  observer.observe(el);
});

window.addEventListener("scroll", () => {
  backTop.classList.toggle("visible", window.scrollY > 500);
});
backTop.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));

// Efek parallax ringan pada hero image
window.addEventListener("scroll", () => {
  const img = document.querySelector(".hero-image-wrap img");
  if (!img || window.innerWidth < 800) return;
  const y = Math.min(window.scrollY * 0.08, 35);
  img.style.transform = `translateY(${y}px) scale(1.03)`;
});

// Highlight navigasi sederhana
const sections = [...document.querySelectorAll("main section[id]")];
const links = [...document.querySelectorAll(".navbar nav a")];
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
    }
  });
}, {rootMargin:"-30% 0px -60% 0px"});
sections.forEach(section => navObserver.observe(section));
