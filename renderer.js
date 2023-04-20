const iframe = document.getElementById("iframe");

document.addEventListener("mouseenter", () => {
  window.api.mouseEnter();
});

document.addEventListener("mouseleave", () => {
  window.api.mouseLeave();
});

(async () => {
  iframe.src = await window.api.page();
})();

window.addEventListener("resize", () => {
  localStorage.w = window.innerWidth;
  localStorage.h = window.innerHeight;
});

if (localStorage.w && localStorage.h) {
  let width = Number(localStorage.w);
  let height = Number(localStorage.h);
  api.setSize(width, height);
}
