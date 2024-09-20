let choice = 0;
//  choice = Number(prompt("Enter your selection 0 for single player and 1 for double player"));

if (choice === 0) {
  let boxes = document.querySelectorAll(".box");
  let reset = document.querySelector(".reset");
  let msg = document.getElementById("msg");
  let game = document.getElementById("game");

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
      console.log(compIdx);
    } while (box_filled.includes(compIdx));
    box_filled.push(compIdx);
    boxes[compIdx].style.color = "#34ff65";
    boxes[compIdx].innerText = "O";
    boxes[compIdx].disabled = true;
    buttonClicks++;
    console.log(box_filled);
    winnerCheck();
  };

  for (let box of boxes) {
    box.addEventListener("click", (evt) => {
      let boxId = Number(evt.target.value);
      if (box.innerText === "") {
        // Check if box is empty
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
        // turnX = !turnX; // Toggle turn
      }
    });
  }

  let patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let winnerCheck = () => {
    for (let patrn of patterns) {
      let pos1 = boxes[patrn[0]].innerText;
      let pos2 = boxes[patrn[1]].innerText;
      let pos3 = boxes[patrn[2]].innerText;
      if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
        if (pos1 === pos2 && pos2 === pos3) {
          disable();
          changes(pos1);
          return; // Exit after finding a winner
        }
      }
    }
    if (buttonClicks === 9 && msg.innerText === "") {
      drawMsg();
    }
  };

  const drawMsg = () => {
    msg.style.visibility = "visible";
    game.style.visibility = "hidden";
    msg.innerText = "Draw, Play Again";
    reset.innerText = "New Game";
  };

  const changes = (winner) => {
    setTimeout(() => {
      msg.style.visibility = "visible";
      game.style.visibility = "hidden";
      msg.innerText = `Congratulations!!! Player ${winner} has won the game`;
      reset.innerText = "New Game";
    },700);
  };

  let disable = () => {
    for (let box of boxes) {
      box.disabled = true;
    }
  };

  let enable = () => {
    game.style.visibility = "visible";
    msg.style.visibility = "hidden";
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
} else if (choice === 1) {
  let boxes = document.querySelectorAll(".box");
  let reset = document.querySelector(".reset");
  let msg = document.getElementById("msg");
  let game = document.getElementById("game");
  let turnX = true;
  let buttonClicks = 0;

  for (let box of boxes) {
    box.addEventListener("click", () => {
      if (box.innerText === "") {
        // Check if box is empty
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

  let patterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let winnerCheck = () => {
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
    msg.style.visibility = "visible";
    game.style.visibility = "hidden";
    msg.innerText = "Draw , Play Again";
    reset.innerText = "New Game";
  };

  const changes = (winner) => {
    msg.style.visibility = "visible";
    game.style.visibility = "hidden";
    msg.innerText = `Congratulations!!! Player ${winner} has won the game`;
    reset.innerText = "New Game";
    return winner === "X" ? (turnX = true) : (turnX = false);

    // if (winner === "X") {
    //   turnX = true;
    // } else {
    //   turnX = false;
    // }
  };

  let disable = () => {
    for (let box of boxes) {
      box.disabled = true;
    }
  };

  let enable = () => {
    game.style.visibility = "visible";
    msg.style.visibility = "hidden";
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
