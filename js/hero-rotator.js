document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero");
  const dotsContainer = document.getElementById("heroDots");
  const btnPrev = document.querySelector("[data-hero-arrow='prev']");
  const btnNext = document.querySelector("[data-hero-arrow='next']");


  if (!hero) return;

  // --- Build image list ---

  let images = [];

  // Option 1: explicit JSON list, if provided
  const slidesAttr = hero.dataset.slides;
  if (slidesAttr) {
    try {
      images = JSON.parse(slidesAttr);
    } catch (e) {
      console.error("Invalid data-slides JSON on #hero", e);
    }
  }

  // Option 2: prefix + count + ext (hero1.jpg, hero2.jpg, etc.)
  if (!images.length) {
    const prefix = hero.dataset.slidePrefix || "hero";
    const count = parseInt(hero.dataset.slideCount || "1", 10);
    const ext = hero.dataset.slideExt || "avif";

    for (let i = 1; i <= count; i++) {
      images.push(`${prefix}${i}.${ext}`);
    }
  }

  if (!images.length) return;

  let currentIndex = 0;
  let isPaused = false;
  let timerId = null;

  // --- Create dots (with Tailwind classes) ---
  images.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.dataset.index = i;

    // Tailwind classes for default (inactive) state
    dot.className =
      "inline-block h-2.5 w-2.5 rounded-full border border-white/80 " +
      "opacity-60 cursor-pointer transition-opacity duration-200";

    dot.addEventListener("click", () => {
      goToSlide(i, true);
    });

    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll("span");

  // --- Core functions ---

  function render() {
    hero.style.backgroundImage = `url(${images[currentIndex]})`;

    // Reset all dots to inactive
    dots.forEach(dot => {
      dot.classList.remove("bg-white", "opacity-100");
      dot.classList.add("opacity-60");
    });

    // Highlight active dot
    if (dots[currentIndex]) {
      dots[currentIndex].classList.add("bg-white", "opacity-100");
      dots[currentIndex].classList.remove("opacity-60");
    }
  }

  function goToSlide(index, userAction = false) {
    currentIndex = (index + images.length) % images.length;
    render();

    // If user clicked dot/arrow, reset timer so it feels responsive
    if (userAction) restartTimer();
  }

  function nextSlide(userAction = false) {
    goToSlide(currentIndex + 1, userAction);
  }

  function prevSlide(userAction = false) {
    goToSlide(currentIndex - 1, userAction);
  }

  function startTimer() {
    stopTimer();
    timerId = setInterval(() => {
      if (!isPaused) nextSlide(false);
    }, 5000);
  }

  function stopTimer() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    }
  }

  function restartTimer() {
    stopTimer();
    startTimer();
  }

  // --- Events ---

  // Arrows
  if (btnNext) btnNext.addEventListener("click", () => nextSlide(true));
  if (btnPrev) btnPrev.addEventListener("click", () => prevSlide(true));

  // Pause on hover / focus within hero
  hero.addEventListener("mouseenter", () => { isPaused = true; });
  hero.addEventListener("mouseleave", () => { isPaused = false; });
  hero.addEventListener("focusin", () => { isPaused = true; });
  hero.addEventListener("focusout", () => { isPaused = false; });

  // --- Init slideshow ---
  render();
  startTimer();
});
