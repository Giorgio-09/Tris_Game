// Sezione dichiarativa
const cells = document.querySelectorAll(".cell");
const restartBtn = document.getElementById("restart");
const friendBtn = document.getElementById("friend");
const soloBtn = document.getElementById("solo");
const consoleDiv = document.getElementById("console");
const prova = document.getElementById("prova");

let isXTurn = true; // Alternanza tra X e O
let valeu;

// Funzione per resettare il gioco
function resetGame() {
    friendBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    soloBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
    cells.forEach(cell => cell.textContent = "");
    isXTurn = true;
}

// Combinazioni vincenti
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Righe
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonne
    [0, 4, 8], [2, 4, 6]  // Diagonali
];

// Funzione per controllare la vittoria
function checkWin(player) {
    return winningCombinations.some(combination => 
        combination.every(index => cells[index].textContent === player)
    );
}

// Modalità "Amico"
friendBtn.addEventListener("click", function () {
    resetGame();
    friendBtn.style.backgroundColor = "Green";
    soloBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";

    cells.forEach(cell => {
        cell.addEventListener("click", function () {
            if (this.textContent === "") { // Evita di sovrascrivere una cella già piena
                this.textContent = isXTurn ? "X" : "O";
                if (checkWin(this.textContent)) {
                    this.textContent = isXTurn ? "X" : "O";
                    alert(`${this.textContent} ha vinto!`);
                    resetGame();
                    return;
                }
                isXTurn = !isXTurn; // Cambia turno
            }
        }, { once: true }); // Evita di aggiungere più event listener
    });
});

// Modalità "Solo"
soloBtn.addEventListener("click", function () {
    resetGame();
    soloBtn.style.backgroundColor = "Green";
    friendBtn.style.backgroundColor = "rgba(255, 255, 255, 0.2)";

    cells.forEach(cell => {
        cell.addEventListener("click", function () {
            if (this.textContent === "") {
                this.textContent = "X";
                if (checkWin("X")) {
                    alert("X ha vinto!");
                    resetGame();
                    return;
                }
                isXTurn = false;

                setTimeout(computerMove, 500); // Ritardo per la mossa del computer
            }
        }, { once: true });
    });
});

// Funzione per la mossa del computer
function computerMove() {
    let emptyCells = Array.from(cells).filter(cell => cell.textContent === "");
    if (emptyCells.length === 0) return; // Nessuna mossa possibile

    let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    randomCell.textContent = "O";

    if (checkWin("O")) {
        alert("O ha vinto!");
        resetGame();
    }
    
    isXTurn = true; // Torna il turno del giocatore
}

// Pulsante di restart
restartBtn.addEventListener("click", resetGame);
