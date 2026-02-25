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
