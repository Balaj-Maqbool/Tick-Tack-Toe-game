const modeContainer = document.querySelector(".mode-container")
const mainContainer = document.querySelector(".container")
const modes = document.querySelectorAll(`input[name= "gameMode"]`)

const boxes = document.querySelectorAll(".box");
const reset = document.querySelector(".reset");
const changeMode = (document.getElementsByClassName("mode-change"))[0]
const msg = document.getElementById("msg");
const game = document.getElementById("game");

modes.forEach((mode) => {
  mode.addEventListener("change", (e) => {

    if (e.target.value) {
      let selectedMode = (e.target.value)
      modeContainer.style.display = "none";
      mainContainer.style.display = "flex";
      if (selectedMode == "single") {
        SingleMode()
      }
      else {
        DoubleMode()
      }
    }
  })

})
changeMode.addEventListener("click", () => {
  location.reload()
})
const patterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const SingleMode = () => {

  let turnX = true;
  let buttonClicks = 0;
  let box_filled = [];

  for (let i = 0; i < boxes.length; i++) {
    boxes[i].value = i;
  }

  const generateCompTurns = (box_filled) => {
    let compIdx;
    do {
      compIdx = Math.floor(Math.random() * 9);
    } while (box_filled.includes(compIdx));
    box_filled.push(compIdx);
    boxes[compIdx].style.color = "#34ff65";
    boxes[compIdx].innerText = "O";
    boxes[compIdx].disabled = true;
    buttonClicks++;
    winnerCheck();
  };

  for (let box of boxes) {
    box.addEventListener("click", (evt) => {
      let boxId = Number(evt.target.value);
      if (box.innerText === "") {
        if (turnX) {
          box.innerText = "X";
          box.style.color = "orange";
        }
        box.disabled = true;
        buttonClicks++;
        box_filled.push(boxId);
        winnerCheck();
        if (buttonClicks < 9) {
          setTimeout(() => {
            generateCompTurns(box_filled);
          }, 700);
        }
      }
    });
  }

  let winnerCheck = () => {
    for (let patrn of patterns) {
      let pos1 = boxes[patrn[0]].innerText;
      let pos2 = boxes[patrn[1]].innerText;
      let pos3 = boxes[patrn[2]].innerText;
      if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
        if (pos1 === pos2 && pos2 === pos3) {
          disable();
          changes(pos1);
        } else if (buttonClicks === 9 && msg.innerText === "") {
          drawMsg();
        }
      }
    }
  };

  const drawMsg = () => {
    msg.style.display = "flex";
    game.style.display = "none";
    msg.innerText = "Draw, Play Again";
    reset.innerText = "New Game";
  };

  const changes = (winner) => {
    setTimeout(() => {
      msg.style.display = "flex";
      game.style.display = "none";
      if (winner == "X") {
        msg.innerText = `Congratulations!!! You won  the game`;
      } else {
        msg.innerText = `Oops!!! Computer  won the game`;
      }
      reset.innerText = "New Game";
    }, 700);
  };

  const disable = () => {
    for (let box of boxes) {
      box.disabled = true;
    }
  };

  let enable = () => {
    game.style.display = "grid";
    msg.style.display = "none";
    reset.innerText = "Reset Game";
    msg.innerText = "";
    buttonClicks = 0;
    box_filled = [];
    for (let box of boxes) {
      box.disabled = false;
      box.innerText = "";
    }
  };

  reset.addEventListener("click", enable);
}


///////////////////////////////////////////////////////////////////////////////
const DoubleMode = () => {
  let turnX = true;
  let buttonClicks = 0;
  for (let box of boxes) {
    box.addEventListener("click", () => {
      if (box.innerText === "") {
        if (turnX) {
          box.innerText = "X";
          box.style.color = "#ffd123";
          turnX = false;
        } else {
          box.innerText = "O";
          box.style.color = "#34ff65";
          turnX = true;
        }
        box.disabled = true;
        buttonClicks++;
        winnerCheck();
      }
    });
  }
  const winnerCheck = () => {
    for (let patrn of patterns) {
      let pos1 = boxes[patrn[0]].innerText;
      let pos2 = boxes[patrn[1]].innerText;
      let pos3 = boxes[patrn[2]].innerText;
      if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
        if (pos1 === pos2 && pos2 === pos3) {
          disable();
          changes(pos1);
        }
      }
    }
    if (buttonClicks === 9 && msg.innerText === "") {
      drawMsg();
    }
  };

  const drawMsg = () => {
    msg.style.display = "flex";
    game.style.display = "none";
    msg.innerText = "Draw , Play Again";
    reset.innerText = "New Game";
  };

  const changes = (winner) => {
    msg.style.display = "flex";
    game.style.display = "none";
    msg.innerText = `Congratulations!!! Player ${winner} has won the game`;
    reset.innerText = "New Game";

    return winner === "X" ? (turnX = true) : (turnX = false);


  };

  let disable = () => {
    for (let box of boxes) {
      box.disabled = true;
    }
  };

  let enable = () => {
    game.style.display = "grid";
    msg.style.display = "none";
    reset.innerText = "Reset Game";
    msg.innerText = "";
    buttonClicks = 0; // Reset buttonClicks

    for (let box of boxes) {
      box.disabled = false;
      box.innerText = "";
    }
  };

  reset.addEventListener("click", enable);
}
