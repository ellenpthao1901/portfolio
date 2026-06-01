const cursor = document.querySelector(".cursor-dot");
const localTime = document.querySelector("#local-time");

function updateLocalTime() {
  if (!localTime) return;

  localTime.textContent = new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "America/Los_Angeles",
  }).format(new Date());
}

updateLocalTime();
setInterval(updateLocalTime, 30_000);

if (cursor) {
  window.addEventListener("pointermove", (event) => {
    cursor.style.opacity = "1";
    cursor.style.transform = `translate3d(${event.clientX - 5}px, ${event.clientY - 5}px, 0)`;
  });

  window.addEventListener("pointerleave", () => {
    cursor.style.opacity = "0";
  });
}
