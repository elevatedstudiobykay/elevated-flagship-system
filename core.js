// =====================================
// TEMPLATE VARIABLE ENGINE
// =====================================

document.addEventListener("DOMContentLoaded", () => {

  if (typeof CLIENT === "undefined") return;

  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );

  let node;

  while (node = walker.nextNode()) {

    if (node.nodeValue && node.nodeValue.includes("{{")) {

      node.nodeValue = node.nodeValue.replace(/{{(.*?)}}/g, (match, key) => {

        if (key === "YEAR") return new Date().getFullYear();

        return CLIENT[key] || "";

      });

    }

  }

});


// =====================================
// EXPANDABLE ARRANGEMENTS
// =====================================

const expandButtons = document.querySelectorAll(".expand-btn");

if (expandButtons.length > 0) {

  expandButtons.forEach(button => {

    button.addEventListener("click", () => {

      const card = button.closest(".card");

      if (!card) return;

      card.classList.toggle("active");

      button.textContent = card.classList.contains("active")
        ? "Hide Details"
        : "View Details";

    });

  });

}


// =====================================
// EMAILJS BOOKING SYSTEM (DUAL CONFIRMATION)
// =====================================

const bookingForm = document.getElementById("booking-form");

if (bookingForm && typeof emailjs !== "undefined" && typeof CLIENT !== "undefined") {

  emailjs.init(CLIENT.EMAILJS_PUBLIC_KEY);

  bookingForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const form = this;
    const status = document.getElementById("form-status");
    const submitBtn = form.querySelector("button");

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    emailjs.sendForm(
      CLIENT.EMAILJS_SERVICE_ID,
      CLIENT.COMPANION_TEMPLATE_ID,
      form
    )

    .then(() => {

      return emailjs.sendForm(
        CLIENT.EMAILJS_SERVICE_ID,
        CLIENT.CLIENT_CONFIRMATION_TEMPLATE_ID,
        form
      );

    })

    .then(() => {

      if (status) {
        status.innerText = "Inquiry received. Please check your email for confirmation.";
      }

      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Inquiry";

      form.reset();

    })

    .catch(() => {

      if (status) {
        status.innerText = "There was an issue sending your inquiry. Please verify your information and try again.";
      }

      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Inquiry";

    });

  });

}


// =====================================
// SCROLL FADE SYSTEM
// =====================================

const faders = document.querySelectorAll("section");

if (faders.length > 0 && "IntersectionObserver" in window) {

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

}


// =====================================
// ACTIVE NAV LINK
// =====================================

const currentPage = window.location.pathname.split("/").pop();
const navLinks = document.querySelectorAll("nav a");

if (navLinks.length > 0) {

  navLinks.forEach(link => {

    if (link.getAttribute("href") === currentPage) {

      link.style.color = "var(--accent-color)";

    }

  });

}
