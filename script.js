
document.addEventListener("DOMContentLoaded", () => {
  const openButton = document.getElementById("openInvite");
  const coverStage = document.getElementById("coverStage");

  if (openButton && coverStage) {
    openButton.addEventListener("click", (event) => {
      event.preventDefault();
      coverStage.classList.add("opening");

      setTimeout(() => {
        window.location.href = openButton.getAttribute("href") || "convite.html";
      }, 1150);
    });
  }

  const countdownIds = {
    days: document.getElementById("count-days"),
    hours: document.getElementById("count-hours"),
    minutes: document.getElementById("count-minutes"),
    seconds: document.getElementById("count-seconds")
  };

  if (countdownIds.days && countdownIds.hours && countdownIds.minutes && countdownIds.seconds) {
    const targetDate = new Date("2026-09-13T10:30:00-03:00").getTime();

    const two = (n) => String(n).padStart(2, "0");

    const updateCountdown = () => {
      const now = Date.now();
      const diff = targetDate - now;

      if (diff <= 0) {
        countdownIds.days.textContent = "00";
        countdownIds.hours.textContent = "00";
        countdownIds.minutes.textContent = "00";
        countdownIds.seconds.textContent = "00";
        return;
      }

      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      countdownIds.days.textContent = String(days);
      countdownIds.hours.textContent = two(hours);
      countdownIds.minutes.textContent = two(minutes);
      countdownIds.seconds.textContent = two(seconds);
    };

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  const items = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach((item, index) => {
    item.style.transitionDelay = `${Math.min(index * 70, 420)}ms`;
    observer.observe(item);
  });
});
