const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const observedSections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

const setActiveLink = (sectionId) => {
  navLinks.forEach((link) => {
    const isCurrent = link.getAttribute("href") === `#${sectionId}`;
    link.classList.toggle("is-active", isCurrent);
  });
};

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveLink(entry.target.id);
      }
    });
  },
  {
    rootMargin: "-42% 0px -48% 0px",
    threshold: 0,
  }
);

observedSections.forEach((section) => sectionObserver.observe(section));

const surpriseButton = document.querySelector("#surpriseButton");
const surpriseText = document.querySelector("#surpriseText");

surpriseButton?.addEventListener("click", () => {
  const isHidden = surpriseText.hasAttribute("hidden");
  surpriseText.toggleAttribute("hidden", !isHidden);
  surpriseButton.setAttribute("aria-expanded", String(isHidden));
  surpriseButton.textContent = isHidden ? "Ocultar" : "Revelar";
});

const progressBar = document.querySelector("#scrollProgress");

const updateProgress = () => {
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  progressBar.style.width = `${progress}%`;
};

window.addEventListener("scroll", updateProgress, { passive: true });
window.addEventListener("resize", updateProgress);
updateProgress();

const yearElement = document.querySelector("#currentYear");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}