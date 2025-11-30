/* document.addEventListener("DOMContentLoaded", () => {
// --- Scroll-shrink header ---
  const header = document.querySelector(".site-header");

  function handleScroll() {
    if (!header) return;
    const threshold = 80; // px from top before it shrinks
    if (window.scrollY > threshold) {
      header.classList.add("header--scrolled");
    } else {
      header.classList.remove("header--scrolled");
    }
  }

  // Run once on load in case the page opens scrolled
  handleScroll();

  // Listen for scroll
  window.addEventListener("scroll", handleScroll);
}); */

window.addEventListener("scroll", () => {
  document.querySelector("header")
    .classList.toggle("header--scrolled", window.scrollY > 20);
});