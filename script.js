// Page fade transition
const pageFade = document.createElement("div");
pageFade.className = "page-fade";
document.body.appendChild(pageFade);

requestAnimationFrame(() => {
  requestAnimationFrame(() => pageFade.classList.add("is-loaded"));
});

window.addEventListener("pageshow", (e) => {
  if (e.persisted) {
    pageFade.classList.remove("is-leaving");
    pageFade.classList.add("is-loaded");
  }
});

document.addEventListener("click", (event) => {
  const link = event.target.closest("a");
  if (!link) return;
  const href = link.getAttribute("href");
  if (!href) return;
  if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
  if (link.target === "_blank" || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

  const url = new URL(link.href, window.location.href);
  if (url.origin !== window.location.origin) return;
  if (url.pathname === window.location.pathname) return;

  event.preventDefault();
  pageFade.classList.remove("is-loaded");
  pageFade.classList.add("is-leaving");
  setTimeout(() => {
    window.location.href = link.href;
  }, 380);
});

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

// Work-row hover video preview
const hoverPreview = document.querySelector(".work-hover-preview");
const hoverVideo = document.querySelector(".work-hover-video");
const hoverRows = document.querySelectorAll(".work-row[data-hover-video]");
const defaultHoverRow = document.querySelector(".work-row[data-hover-default]")
  || hoverRows[0];

if (hoverPreview && hoverVideo && hoverRows.length) {
  let activeSrc = null;
  let defaultActive = Boolean(defaultHoverRow);

  const showPreview = (src) => {
    if (activeSrc !== src) {
      hoverVideo.src = src;
      activeSrc = src;
    }
    hoverPreview.classList.add("is-active");
    const playPromise = hoverVideo.play();
    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {});
    }
  };

  const hidePreview = () => {
    if (defaultActive && defaultHoverRow) {
      const src = defaultHoverRow.getAttribute("data-hover-video");
      if (src) {
        showPreview(src);
        return;
      }
    }
    hoverPreview.classList.remove("is-active");
    hoverVideo.pause();
  };

  const clearDefaultState = () => {
    if (!defaultActive) return;
    defaultActive = false;
    if (defaultHoverRow) defaultHoverRow.classList.remove("is-default");
  };

  hoverRows.forEach((row) => {
    const src = row.getAttribute("data-hover-video");
    if (!src) return;
    row.addEventListener("pointerenter", () => {
      if (row !== defaultHoverRow) clearDefaultState();
      showPreview(src);
    });
    row.addEventListener("focus", () => {
      if (row !== defaultHoverRow) clearDefaultState();
      showPreview(src);
    });
    row.addEventListener("pointerleave", hidePreview);
    row.addEventListener("blur", hidePreview);
  });

  // Set default state: highlight default row + autoplay its video on load
  if (defaultHoverRow) {
    const defaultSrc = defaultHoverRow.getAttribute("data-hover-video");
    if (defaultSrc) {
      defaultHoverRow.classList.add("is-default");
      showPreview(defaultSrc);
    }
  }
}
