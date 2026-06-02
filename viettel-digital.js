const navRow = document.querySelector(".nav-row");
const videoSection = document.querySelector(".case-video");
const wireframeSection = document.querySelector(".wireframe-section");
const contentBlock = document.querySelector(".content-block");

function isOver(el, navBottom) {
  if (!el) return false;
  const r = el.getBoundingClientRect();
  return r.top < navBottom && r.bottom > 0;
}

function updateNav() {
  const navBottom = navRow.getBoundingClientRect().bottom;
  const onDark = isOver(videoSection, navBottom) ||
                 isOver(wireframeSection, navBottom) ||
                 isOver(contentBlock, navBottom);
  navRow.classList.toggle("nav-on-dark", onDark);
}

if (navRow) {
  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();
}

const cursor = document.querySelector(".cursor-dot");

if (cursor) {
  window.addEventListener("pointermove", (event) => {
    cursor.style.opacity = "1";
    cursor.style.transform = `translate3d(${event.clientX - 5}px, ${event.clientY - 5}px, 0)`;
  });

  window.addEventListener("pointerleave", () => {
    cursor.style.opacity = "0";
  });
}

const solutionSlides = Array.from(document.querySelectorAll("[data-solution-slide]"));
const solutionDots = Array.from(document.querySelectorAll(".solution-dots button"));
const solutionCarousel = document.querySelector(".solution-carousel");
const previousSolutionButton = document.querySelector(".solution-nav-prev");
const nextSolutionButton = document.querySelector(".solution-nav-next");
let activeSolutionIndex = 0;
let solutionTransitionTimer;

function updateSolutionNavVisibility() {
  if (previousSolutionButton) {
    previousSolutionButton.classList.toggle("is-hidden", activeSolutionIndex === 0);
  }
  if (nextSolutionButton) {
    nextSolutionButton.classList.toggle("is-hidden", activeSolutionIndex === solutionSlides.length - 1);
  }
}

function showSolution(index, direction = "next") {
  if (!solutionSlides.length) return;

  const nextIndex = (index + solutionSlides.length) % solutionSlides.length;
  if (nextIndex === activeSolutionIndex) return;

  window.clearTimeout(solutionTransitionTimer);
  solutionSlides.forEach((slide) => slide.classList.remove("is-exiting"));

  solutionCarousel?.classList.toggle("is-prev", direction === "prev");
  solutionSlides[activeSolutionIndex]?.classList.add("is-exiting");
  solutionSlides[activeSolutionIndex]?.classList.remove("is-active");
  activeSolutionIndex = nextIndex;

  solutionSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === activeSolutionIndex);
  });

  solutionDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === activeSolutionIndex);
  });

  updateSolutionNavVisibility();

  solutionTransitionTimer = window.setTimeout(() => {
    solutionSlides.forEach((slide) => slide.classList.remove("is-exiting"));
  }, 620);
}

previousSolutionButton?.addEventListener("click", () => {
  if (activeSolutionIndex === 0) return;
  showSolution(activeSolutionIndex - 1, "prev");
});

nextSolutionButton?.addEventListener("click", () => {
  if (activeSolutionIndex === solutionSlides.length - 1) return;
  showSolution(activeSolutionIndex + 1, "next");
});

solutionDots.forEach((dot, dotIndex) => {
  dot.addEventListener("click", () => {
    showSolution(dotIndex, dotIndex < activeSolutionIndex ? "prev" : "next");
  });
});

updateSolutionNavVisibility();

const flowSlides = Array.from(document.querySelectorAll("[data-flow-slide]"));
const flowDots = Array.from(document.querySelectorAll(".flow-dots button"));
const flowCarousel = document.querySelector(".flow-carousel");
const previousFlowButton = document.querySelector(".flow-nav-prev");
const nextFlowButton = document.querySelector(".flow-nav-next");
let activeFlowIndex = 0;
let flowTransitionTimer;

function showFlow(index, direction = "next") {
  if (!flowSlides.length) return;

  const nextIndex = (index + flowSlides.length) % flowSlides.length;
  if (nextIndex === activeFlowIndex) return;

  window.clearTimeout(flowTransitionTimer);
  flowSlides.forEach((slide) => slide.classList.remove("is-exiting"));

  flowCarousel?.classList.toggle("is-prev", direction === "prev");
  flowSlides[activeFlowIndex]?.classList.add("is-exiting");
  flowSlides[activeFlowIndex]?.classList.remove("is-active");
  activeFlowIndex = nextIndex;

  flowSlides.forEach((slide, slideIndex) => {
    slide.classList.toggle("is-active", slideIndex === activeFlowIndex);
  });

  flowDots.forEach((dot, dotIndex) => {
    dot.classList.toggle("is-active", dotIndex === activeFlowIndex);
  });

  flowTransitionTimer = window.setTimeout(() => {
    flowSlides.forEach((slide) => slide.classList.remove("is-exiting"));
  }, 620);
}

previousFlowButton?.addEventListener("click", () => {
  showFlow(activeFlowIndex - 1, "prev");
});

nextFlowButton?.addEventListener("click", () => {
  showFlow(activeFlowIndex + 1, "next");
});

flowDots.forEach((dot, dotIndex) => {
  dot.addEventListener("click", () => {
    showFlow(dotIndex, dotIndex < activeFlowIndex ? "prev" : "next");
  });
});
