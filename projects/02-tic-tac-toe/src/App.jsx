import { useEffect, useState } from "react"
import confetti from "canvas-confetti";
import { Square } from './components/Square';
import { TURNS } from "./constants";
import { checkWinnerFrom, checkEndGame } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { saveGameToStorage, resetGameStorage } from "./logic/storage";


function App() {
  
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');

    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });
  
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');

    return turnFromStorage ?? TURNS.X;
  });

  const [winner, setWinner] = useState(null); // null: No hay ganador, false: Empate

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null);

    resetGameStorage();
  }


  const updateBoard = (index) => {
    // Si ya tiene algo
    if (board[index] || winner) return;
    // Actualizar el tablero
    const newBoard = [...board];
    // const newBoard = structuredClone(board); // Copia profunda
    newBoard[index] = turn;
    setBoard(newBoard);

    // Cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn);

    // Guardar aqui partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    });

    // Revisar si hay ganador
    // Le pasamos el newBoard y no el del estado
    // porque React es asíncrono en sus actualizaciones
    const newWinner = checkWinnerFrom(newBoard);

    if (newWinner) {
      // setWinner((prevWinner) => {
      //   console.log(`Ganador: ${newWinner}, el anterior era ${prevWinner}`)
      //   return newWinner
      // });
      confetti();
      setWinner(newWinner);
    } else if (checkEndGame(newBoard)) {
      setWinner(false);
    }

  }

  useEffect(() => {
    console.log('useEffect');
  }, [winner]);

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Restart</button>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {/* {board[index]} */}
                {square}
              </Square>
            )
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn == TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>
          {TURNS.O}
          </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />

    </main>
  )
}

export default App
