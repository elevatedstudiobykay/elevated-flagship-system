// =====================================
// DEMO THEME SWITCHER ENGINE
// =====================================

const themeButtons = document.querySelectorAll(".swatch");
const identityLabel = document.getElementById("active-identity");

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

// Identity Display Names
const identityNames = {
  "": "The Heiress",
  "champagne-theme": "The Muse",
  "warm-neutral-theme": "The Intimate",
  "soft-theme": "The Romantic",
  "mauve-theme": "The Seductress",
  "rose-noir-theme": "The Femme Fatale",
  "emerald-theme": "The Old Money",
  "dark-theme": "The Night Elite",
  "midnight-theme": "The Editorial",
  "power-theme": "The Executive"
};

// Load saved theme on page load
const savedTheme = localStorage.getItem("selectedTheme");

if (savedTheme && allThemes.includes(savedTheme)) {
  document.body.classList.add(savedTheme);

  const savedSwatch = document.querySelector(`.swatch[data-theme="${savedTheme}"]`);
  if (savedSwatch) savedSwatch.classList.add("active");

  if (identityLabel) {
    identityLabel.textContent = identityNames[savedTheme];
  }

} else {

  // Default identity
  const defaultSwatch = document.querySelector('.swatch[data-theme=""]');
  if (defaultSwatch) defaultSwatch.classList.add("active");

  if (identityLabel) {
    identityLabel.textContent = identityNames[""];
  }
}

themeButtons.forEach(button => {
  button.addEventListener("click", () => {

    document.body.classList.remove(...allThemes);
    themeButtons.forEach(b => b.classList.remove("active"));

    const theme = button.getAttribute("data-theme") || "";

    if (allThemes.includes(theme)) {
      document.body.classList.add(theme);
    }

    localStorage.setItem("selectedTheme", theme);

    button.classList.add("active");

 if (identityLabel) {

  // Clear any previous fade timers
  if (identityLabel.fadeTimeout) {
    clearTimeout(identityLabel.fadeTimeout);
  }

  identityLabel.style.opacity = 0;

  identityLabel.fadeTimeout = setTimeout(() => {
    identityLabel.textContent = identityNames[theme];
    identityLabel.style.opacity = 1;
  }, 120);

}

  });
});
