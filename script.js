const qAll = (selector) => document.querySelectorAll(selector);
const q = (selector) => document.querySelector(selector);

const startBtn = q(".startBtn");
const startDiv = q(".start");
const overlay = q(".overlay");

let player1, player2;

startBtn.addEventListener("click", () => {
    startDiv.classList.add("d-none");
    overlay.classList.add("d-none");
     player1 = q(".player1").value;
     player2 = q(".player2").value;
})

const tickCircle = "O";
const tickX = "X";
let currentPlayer = tickCircle;
let positions = [];

const generateSymbol = (e) => {
  const square = e.target;
  if (!positions[square.id]) positions[square.id] = currentPlayer;
  square.textContent = currentPlayer;
  if (isGameEnded().winner) {
      alert(`Il gioco è finito! Ha vinto ${isGameEnded().winner}`);
      restart();
      return;
    }
  if (isGameEnded().result) {
    alert("Il gioco è finito! Non ha vinto nessuno :(");
    restart();
    return;
  }
  changePlayer();
};

const changePlayer = () => {
  currentPlayer = currentPlayer === tickCircle ? tickX : tickCircle;
};

const isGameEnded = () => {
  let counterX = 0;
  let counterO = 0;
  let xPositions = [];
  let oPositions = [];

  if(
      (positions[0] === tickCircle && positions[1] === tickCircle && positions[2] === tickCircle)
      |       
      (positions[3] === tickCircle && positions[4] === tickCircle && positions[5] === tickCircle)
      |       
      (positions[6] === tickCircle && positions[7] === tickCircle && positions[8] === tickCircle)
      |       
      (positions[0] === tickCircle && positions[3] === tickCircle && positions[6] === tickCircle)
      |       
      (positions[1] === tickCircle && positions[4] === tickCircle && positions[7] === tickCircle)
      |       
      (positions[2] === tickCircle && positions[5] === tickCircle && positions[8] === tickCircle)
      |       
      (positions[0] === tickCircle && positions[4] === tickCircle && positions[8] === tickCircle)
      |       
      (positions[2] === tickCircle && positions[4] === tickCircle && positions[6] === tickCircle)
      ){
      return  { result: true, winner: tickCircle };
  }

  if(
      (positions[0] === tickX && positions[1] === tickX && positions[2] === tickX)
      |       
      (positions[3] === tickX && positions[4] === tickX && positions[5] === tickX)
      |       
      (positions[6] === tickX && positions[7] === tickX && positions[8] === tickX)
      |       
      (positions[0] === tickX && positions[3] === tickX && positions[6] === tickX)
      |       
      (positions[1] === tickX && positions[4] === tickX && positions[7] === tickX)
      |       
      (positions[2] === tickX && positions[5] === tickX && positions[8] === tickX)
      |       
      (positions[0] === tickX && positions[4] === tickX && positions[8] === tickX)
      |       
      (positions[2] === tickX && positions[4] === tickX && positions[6] === tickX)
      ){
      return  { result: true, winner: tickX };
  }

  if (positions.filter((pos) => pos).length === 9) return { result: true, winner: false };
    
  return { result: false, winner: false };
};

const restart = () => {
    qAll(".square").forEach(square=>square.textContent = "");
    positions = [];
}

qAll(".square").forEach((square, index) => {
    square.id = index;
    square.addEventListener("click", generateSymbol);
});