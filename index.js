const timeButtons = document.querySelectorAll(".profile__period-btn");

timeButtons.forEach((button) => {
  button.addEventListener("click", function () {
    const selectedTime = this.getAttribute("data-time");

    timeButtons.forEach((button) => {
      button.classList.remove("profile__period-btn--active");
    });

    this.classList.add("profile__period-btn--active");

    updateActivityDisplay(selectedTime);
  });
});

function updateActivityDisplay(selectedTime) {
  const allHours = document.querySelectorAll(".activity__hours");
  const allPrevious = document.querySelectorAll(".activity__previous");

  allHours.forEach((hour) => {
    hour.classList.add("activity__hours--hidden");
  });

  allPrevious.forEach((prev) => {
    prev.classList.add("activity__previous--hidden");
  });

  const selectedHours = document.querySelectorAll(`.activity__hours[data-hours="${selectedTime}"]`);
  const selectedPrevious = document.querySelectorAll(`.activity__previous[data-previous="${selectedTime}"]`);

  selectedHours.forEach((hour) => {
    hour.classList.remove("activity__hours--hidden");
  });

  selectedPrevious.forEach((prev) => {
    prev.classList.remove("activity__previous--hidden");
  });
}
