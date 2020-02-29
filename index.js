const container = document.getElementById("container");
const dotsArr = [];
const rows = 15;
const cols = 15;

// Create dots
for (let i = 0; i < rows; i++) {
  dotsArr[i] = [];
  for (let j = 0; j < cols; j++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    container.appendChild(dot);
    dotsArr[i].push(dot);
  }
}

dotsArr.forEach((cols, i) => {
  cols.forEach((dot, j) => {
    dot.addEventListener("click", () => {
      growDot(i, j);
    });
  });
});

function growDot(i, j) {
  if (!dotsArr[i][j].classList.contains("grow")) {
    dotsArr[i][j].classList.add("grow");
  }
}
