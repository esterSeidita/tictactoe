const qAll = (selector) => document.querySelectorAll(selector);
const q = (selector) => document.querySelector(selector);

const startBtn = q(".startBtn");
const startDiv = q(".start");
const overlay = q(".overlay");
const title = q(".title");
const player1Input = q("#player1");
const player2Input = q("#player2");
const alert = q(".alert");
let player1Name, player2Name;

  startBtn.addEventListener("click", () => {
    player1Name = player1.value;
    player2Name = player2.value;

    if(player1.value !== "" && player2.value !== ""){

    startDiv.innerHTML = `<p><strong>Ricorda:</strong> ${player1Name} ha lo zero e inizia per primo/a, mentre ${player2Name} ha X ed è secondo/a<br><br>Chi vince inizierà per primo durante il round successivo.</p><button class="goBtn">Ho capito!</button>`;
    
    q(".goBtn").addEventListener("click", () => {
      startDiv.classList.add("d-none");
      overlay.classList.add("d-none");
    })

    title.textContent = `${player1Name} VS ${player2Name}!!`;
  }
  else alert.textContent = "Inserisci prima i due nomi, checcavolo!!";
  })
  

const tickCircle = "O";
const tickX = "X";
let currentPlayer = tickCircle;
let positions = [];

const generateSymbol = (e) => {
  const square = e.target;
  if (!positions[square.id]) positions[square.id] = currentPlayer;
  else return;
  square.textContent = currentPlayer;
  if (isGameEnded().winner) {
    restartModal(`Il gioco è finito! Ha vinto ${isGameEnded().winner}`);
      return;
    }
  if (isGameEnded().result) {
    restartModal("Il gioco è finito! Non ha vinto nessuno :(");
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
      return  { result: true, winner: player1Name };
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
      return  { result: true, winner: player2Name };
  }

  if (positions.filter((pos) => pos).length === 9) return { result: true, winner: false };
    
  return { result: false, winner: false };
};

const restartModal = (text) => {
  startDiv.classList.remove("d-none");
  overlay.classList.remove("d-none");
  startDiv.innerHTML = `<p>${text}</p><button class="go">Ricomincia!</button>`;
  q(".go").addEventListener("click", () => {
    startDiv.classList.add("d-none");
    overlay.classList.add("d-none");
    restart();
  })
}


const restart = () => {
  qAll(".square").forEach(square=>square.textContent = "");
  positions = [];
}

qAll(".square").forEach((square, index) => {
    square.id = index;
    square.addEventListener("click", generateSymbol);
});