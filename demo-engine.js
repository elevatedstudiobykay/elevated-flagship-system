// =====================================
// DEMO THEME SWITCHER (MULTI-THEME)
// =====================================

const themeButtons = document.querySelectorAll(".swatch");

const allThemes = [
  "dark-theme",
  "soft-theme",
  "midnight-theme",
  "champagne-theme",
  "power-theme",
  "rose-noir-theme",
  "emerald-theme",
  "warm-neutral-theme",
  "mauve-theme"
];

// Load saved theme on page load
const savedTheme = localStorage.getItem("selectedTheme");

if (savedTheme && allThemes.includes(savedTheme)) {

  document.body.classList.add(savedTheme);

  const savedSwatch = document.querySelector(`.swatch[data-theme="${savedTheme}"]`);
  if (savedSwatch) savedSwatch.classList.add("active");

} else {

  // If no saved theme, activate default swatch
  const defaultSwatch = document.querySelector('.swatch[data-theme=""]');
  if (defaultSwatch) defaultSwatch.classList.add("active");
}

themeButtons.forEach(button => {
  button.addEventListener("click", () => {

    // Remove all theme classes
    document.body.classList.remove(...allThemes);

    // Remove active states
    themeButtons.forEach(b => b.classList.remove("active"));

    // Get selected theme
    const theme = button.getAttribute("data-theme") || "";

    // Apply theme if valid
    if (allThemes.includes(theme)) {
      document.body.classList.add(theme);
    }

    // Save theme selection
    localStorage.setItem("selectedTheme", theme);

    // Activate swatch visually
    button.classList.add("active");

  });
}); 
