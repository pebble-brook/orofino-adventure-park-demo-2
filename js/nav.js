document.addEventListener("DOMContentLoaded", () => {
    // --- mobile nav toggle ---
    const navToggle = document.getElementById("navToggle");
    const mobileNav = document.getElementById("mobileNav");

    if (navToggle && mobileNav) {
        navToggle.addEventListener("click", () => {
        // toggle visibility
        mobileNav.classList.toggle("hidden");

        const isOpen = !mobileNav.classList.contains("hidden");

        // accessibility + icon swap
        navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        navToggle.textContent = isOpen ? "✕" : "☰";
        });
    }
});