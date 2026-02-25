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
