const container = document.getElementById("container");
const dotArr = [];
const rows = 15;
const cols = 15;

// Create dots
for (let i = 0; i < rows; i++) {
  for (let j = 0; j < cols; j++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    container.appendChild(dot);
  }
}
