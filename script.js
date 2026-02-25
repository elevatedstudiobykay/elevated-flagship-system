// =====================================
// EXPANDABLE ARRANGEMENTS
// =====================================

document.querySelectorAll(".expand-btn").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");
    card.classList.toggle("active");

    button.textContent = card.classList.contains("active")
      ? "Hide Details"
      : "View Details";
  });
});


// =====================================
// EMAILJS BOOKING SYSTEM (DUAL CONFIRMATION)
// =====================================

// Prevent errors on pages without booking form
const bookingForm = document.getElementById("booking-form");

if (bookingForm) {

  emailjs.init("{{EMAILJS_PUBLIC_KEY}}");

  bookingForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const form = this;
    const status = document.getElementById("form-status");

    // 1️⃣ Send to Companion
    emailjs.sendForm(
      "{{EMAILJS_SERVICE_ID}}",
      "{{COMPANION_TEMPLATE_ID}}",
      form
    )
    .then(() => {

      // 2️⃣ Send Confirmation to Client
      return emailjs.sendForm(
        "{{EMAILJS_SERVICE_ID}}",
        "{{CLIENT_CONFIRMATION_TEMPLATE_ID}}",
        form
      );

    })
    .then(() => {
      status.innerText = "Inquiry received. Please check your email for confirmation.";
      form.reset();
    })
    .catch(() => {
      status.innerText = "There was an issue sending your inquiry. Please try again.";
    });

  });
}


// =====================================
// SCROLL FADE SYSTEM
// =====================================

const faders = document.querySelectorAll("section");

const appearOptions = {
  threshold: 0.15
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  fader.classList.add("fade-in");
  appearOnScroll.observe(fader);
});


// =====================================
// ACTIVE NAV LINK
// =====================================

const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll("nav a");

navLinks.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.style.color = "var(--accent-color)";
  }
});
