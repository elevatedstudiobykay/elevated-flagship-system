// Expandable Arrangements
document.querySelectorAll(".expand-btn").forEach(button => {
  button.addEventListener("click", () => {
    const card = button.closest(".card");
    card.classList.toggle("active");

    button.textContent = card.classList.contains("active")
      ? "Hide Details"
      : "View Details";
  });
});

// ===============================
// EMAILJS BOOKING SYSTEM
// ===============================

// Replace with client EmailJS Public Key
emailjs.init("{{EMAILJS_PUBLIC_KEY}}");

document.getElementById("booking-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const status = document.getElementById("form-status");

  emailjs.sendForm(
    "{{EMAILJS_SERVICE_ID}}",
    "{{EMAILJS_TEMPLATE_ID}}",
    this
  )
  .then(() => {
    status.innerText = "Inquiry sent successfully. Please check your email for confirmation.";
    this.reset();
  })
  .catch(() => {
    status.innerText = "There was an error sending your inquiry. Please try again.";
  });
});
// ===============================
// EMAILJS BOOKING SYSTEM
// ===============================

emailjs.init("{{EMAILJS_PUBLIC_KEY}}");

document.getElementById("booking-form").addEventListener("submit", function(e) {
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

// ===============================
// SCROLL FADE SYSTEM
// ===============================

const faders = document.querySelectorAll("section");

const appearOptions = {
  threshold: 0.15
};

const appearOnScroll = new IntersectionObserver(function(
  entries,
  appearOnScroll
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("visible");
    appearOnScroll.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  fader.classList.add("fade-in");
  appearOnScroll.observe(fader);
});
