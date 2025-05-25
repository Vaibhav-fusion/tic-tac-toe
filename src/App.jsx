import Box from "./component/Box";
import { useState } from "react";

function WinnerCal(arr) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines)
    if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) return arr[a];
  return null;
}

export default function App() {
  const [squares, setSquare] = useState(Array(9).fill(null));
  const [isnext, setNext] = useState(true);
  //queue
  const [xMoves, setXMoves] = useState([]);
  const [oMoves, setOMoves] = useState([]);

  const winner = WinnerCal(squares);

  const winner_text = winner
    ? `🏆 Winner: ${winner}`
    : squares.every(Boolean)
    ? "😅 Draw!"
    : `Next player: ${isnext ? "X" : "O"}`;

  console.log(winner);

  const handleClick = (idx) => {
    if (squares[idx] || winner) return; // check for filled and empty 

    const currentMoves = isnext ? xMoves : oMoves;  
    const setCurrentMoves = isnext ? setXMoves : setOMoves;

    // len-3 check
    if (currentMoves.length === 3 && idx === currentMoves[0]) {
      // alert("You can’t place on your oldest emoji!"); //for debug
      return;
    }

    const nextSquares = [...squares]; 

    if (currentMoves.length === 3) {
      const oldestIndex = currentMoves[0];
      nextSquares[oldestIndex] = null;
    }

    nextSquares[idx] = isnext ? "X" : "O";
    setSquare(nextSquares);

    setCurrentMoves([...currentMoves.slice(-2), idx]);  

    setNext(!isnext); 
  };

  const reset = () => {
    setSquare(Array(9).fill(null));
    setNext(true);
    setXMoves([]);
    setOMoves([]);
  };

  return (
    <main className="min-h-screen grid place-items-center bg-slate-100">
      <section className="grid grid-cols-3 gap-2">
        {squares.map((val, i) => (
          <Box
            key={i}
            value={val}
            onClick={() => {
              handleClick(i);
            }}
          />
        ))}
      </section>

      {/* <p className="mt-4 text-xl">Next player: {isnext ? "X" : "O"}</p> */}
      <p className="mt-4 text-xl text-amber-500"> {winner_text}</p>
      <button
        onClick={reset}
        className="mt-4 px-4 py-2 rounded bg-teal-500 text-white
             font-semibold hover:bg-teal-600"
      >
        Restart
      </button>
    </main>
  );
}
