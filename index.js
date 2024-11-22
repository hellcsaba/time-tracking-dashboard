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

const updateActivityDisplay = (selectedTime) => {
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
};

const getActivities = async () => {
  const response = await fetch("/data.json");
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

const renderActivites = (data) => {
  data.forEach(appendItem);
};

const appendItem = (item) => {
  const container = document.getElementsByClassName("activities")[0];

  // Utility function to normalize the title for the class name
  const formatClassName = (title) => title.toLowerCase().replace(/\s+/g, "-");

  const activityClass = `activity--${formatClassName(item.title)}`;

  container.innerHTML += `
    <section class="activity ${activityClass}">
      <div class="activity__content">
        <div class="activity__header">
          <h3 class="activity__title">${item.title}</h3>
          <button class="activity__menu-btn">
            <img src="./images/icon-ellipsis.svg" alt="menu" class="activity__menu-icon" />
          </button>
        </div>
        <div class="activity__time">
          <p class="activity__hours activity__hours--hidden" data-hours="daily">${item.timeframes.daily.current}hrs</p>
          <p class="activity__previous activity__previous--hidden" data-previous="daily">Previous - ${item.timeframes.daily.previous}hrs</p>
          <p class="activity__hours" data-hours="weekly">${item.timeframes.weekly.current}hrs</p>
          <p class="activity__previous" data-previous="weekly">Previous - ${item.timeframes.weekly.previous}hrs</p>
          <p class="activity__hours activity__hours--hidden" data-hours="monthly">${item.timeframes.monthly.current}hrs</p>
          <p class="activity__previous activity__previous--hidden" data-previous="monthly">Previous - ${item.timeframes.monthly.previous}hrs</p>
        </div>
      </div>
    </section>
  `;
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await getActivities();
    renderActivites(data);
  } catch (error) {
    console.error("Failed to fetch activities:", error.message);
  }
});
