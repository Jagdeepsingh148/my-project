const svg = document.getElementById("drawing-area");
let drawing = false;
let currentPath = null;

svg.addEventListener("mousedown", (e) => {
  drawing = true;
  currentPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  currentPath.setAttribute("stroke", "blue");
  currentPath.setAttribute("stroke-width", "2");
  currentPath.setAttribute("fill", "none");
  currentPath.setAttribute("d", `M${e.offsetX},${e.offsetY}`);
  svg.appendChild(currentPath);
});

svg.addEventListener("mousemove", (e) => {
  if (!drawing) return;
  const d = currentPath.getAttribute("d");
  currentPath.setAttribute("d", `${d} L${e.offsetX},${e.offsetY}`);
});

svg.addEventListener("mouseup", () => {
  drawing = false;
  currentPath = null;
});

svg.addEventListener("mouseleave", () => {
  drawing = false;
  currentPath = null;
});
