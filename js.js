const X_co = `x`;
const O_co = `o`;
const Win_com = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
const cElement = document.querySelectorAll(`[data-num]`);
const board = document.getElementById(`go`);
const WinMes = document.querySelector(`[win-mes]`);
const Rbtn = document.getElementById(`btn`);
const TextWin = document.getElementById(`text`);
let xturn;

startGame();
Rbtn.addEventListener(`click`, startGame);
function startGame() {
  xturn = false;
  cElement.forEach(cell => {
    cell.classList.remove(X_co);
    cell.classList.remove(O_co);
    cell.removeEventListener(`click`, handleCli);
    cell.addEventListener(`click`, handleCli, { once: true });
  });
  setBHoC();
  TextWin.classList.remove(`so`);
}
function handleCli(e) {
  const cell = e.target;
  const Pclass = xturn ? X_co : O_co;
  PMark(cell, Pclass);
  if (checkWin(Pclass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurn();
    setBHoC();
  }
}
function PMark(cell, Pclass) {
  cell.classList.add(Pclass);
}
function swapTurn() {
  xturn = !xturn;
}
function setBHoC() {
  board.classList.remove(X_co);
  board.classList.remove(O_co);
  if (xturn) {
    board.classList.add(X_co);
  } else {
    board.classList.add(O_co);
  }
}
function checkWin(Pclass) {
  return Win_com.some(com => {
    return com.every(index => {
      return cElement[index].classList.contains(Pclass);
    });
  });
}
function endGame(draw) {
  if (draw) {
    WinMes.innerText = `Draw!`;
  } else {
    WinMes.innerText = `${xturn ? `x´s` : `o´s`} Wins!`;
  }
  TextWin.classList.add(`so`);
}
function isDraw() {
  return [...cElement].every(cell => {
    return cell.classList.contains(X_co) || cell.classList.contains(O_co);
  });
}
