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

// Radio Selection
const radios = document.forms["effects"].elements["effect"];
let effect = "";
for (let i = 0; i < radios.length; i++) {
  radios[i].addEventListener("click", () => {
    effect = radios[i].value;
  });
}

// Input Speed Selection
let growSpeed = 100;
let shrinkSpeed = 300;

const growSpeedInput = document.forms["speed"].elements["growSpeed"];
const shrinkSpeedInput = document.forms["speed"].elements["shrinkSpeed"];

growSpeedInput.addEventListener("input", e => {
  growSpeed = e.target.value;
});

shrinkSpeedInput.addEventListener("input", e => {
  shrinkSpeed = e.target.value;
});

// Checkbox Selection
let loop = false;
let loopSpeed = 1000;

const checkboxLoop = document.forms["loop"].elements["loop"];
const loopSpeedInput = document.forms["loop"].elements["loopSpeed"];

checkboxLoop.addEventListener("click", () => {
  loop = checkboxLoop.checked;
});

loopSpeedInput.addEventListener("input", e => {
  loopSpeed = e.target.value;
});

// Run Effect
function runEffect(i, j) {
  switch (effect) {
    case "waves":
    default:
      waveDot(i, j);
    case "trickle":
      trickleRow = i;
      trickleCol = j;
      trickleDot(i, j);
  }
}

// Loop Effect
function loopEffect(i, j) {
  if (loop) {
    runEffect(i, j);

    setTimeout(() => {
      loopEffect(i, j);
    }, loopSpeed);
  }
}

// Trigger Effect
dotsArr.forEach((cols, i) => {
  cols.forEach((dot, j) => {
    dot.addEventListener("click", () => {
      if (loop) {
        loopEffect(i, j);
      } else {
        runEffect(i, j);
      }
    });
  });
});

// Wave Effect
function waveDot(i, j) {
  if (dotsArr[i] && dotsArr[i][j]) {
    if (!dotsArr[i][j].classList.contains("grow")) {
      dotsArr[i][j].classList.add("grow");
      setTimeout(() => {
        waveDot(i - 1, j);
        waveDot(i + 1, j);
        waveDot(i, j + 1);
        waveDot(i, j - 1);
      }, growSpeed);

      setTimeout(() => {
        dotsArr[i][j].classList.remove("grow");
      }, shrinkSpeed);
    }
  }
}

let trickleRow = "";
let trickleCol = "";

function trickleDot(i, j) {
  if (dotsArr[i] && dotsArr[i][j]) {
    if (!dotsArr[i][j].classList.contains("grow")) {
      dotsArr[i][j].classList.add("grow");

      if (i === trickleRow) {
        if (j === trickleCol) {
          // Dot clicked
          setTimeout(() => {
            trickleDot(i + 1, j);
            trickleDot(i - 1, j);
            trickleDot(i, j + 1);
            trickleDot(i, j - 1);
          }, growSpeed);
        } else if (j > trickleCol) {
          // Move right
          setTimeout(() => {
            trickleDot(i + 1, j);
            trickleDot(i - 1, j);
            trickleDot(i, j + 1);
          }, growSpeed);
        } else if (j < trickleCol) {
          // Move left
          setTimeout(() => {
            trickleDot(i + 1, j);
            trickleDot(i - 1, j);
            trickleDot(i, j - 1);
          }, growSpeed);
        }
      } else {
        if (i > trickleRow) {
          // Move up
          setTimeout(() => {
            trickleDot(i + 1, j);
          }, growSpeed);
        } else if (i < trickleRow) {
          // Mode down
          setTimeout(() => {
            trickleDot(i - 1, j);
          }, growSpeed);
        }
      }

      setTimeout(() => {
        dotsArr[i][j].classList.remove("grow");
      }, shrinkSpeed);
    }
  }
}
