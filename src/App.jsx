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

const rand = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};

const emojiCategories = {
  Animals: ["🐶", "🐱", "🐵", "🐰"],
  Food: ["🍕", "🍟", "🍔", "🍩"],
  Sports: ["⚽", "🏀", "🏈", "🎾"],
  Faces: ["😀", "😂", "🥳", "😡"],
  Weather: ["☀️", "🌧️", "❄️", "🌪️"],
  Nature: ["🌲", "🌸", "🍄", "🍁"],
  Vehicles: ["🚗", "🚀", "🚲", "🛴"],
  Symbols: ["❤️", "⭐", "⚡", "🔥"],
};

export default function App() {
  const [squares, setSquare] = useState(Array(9).fill(null));
  const [isnext, setNext] = useState(true);
  //queue
  const [xMoves, setXMoves] = useState([]);
  const [oMoves, setOMoves] = useState([]);

  //display  array thingy
  const [displaySquares, setDisplaySquares] = useState(Array(9).fill(null));

  const [p1Cat, setP1Cat] = useState("");
  const [p2Cat, setP2Cat] = useState("");
  const cats = Object.keys(emojiCategories);
  const catsReady = p1Cat && p2Cat && p1Cat !== p2Cat;

  const winner = WinnerCal(squares);

  const winner_text = winner
    ? `🏆 Winner: ${winner}`
    : squares.every(Boolean)
    ? "😅 Draw!"
    : `Next player: ${isnext ? "X" : "O"}`;

  console.log(winner);

  const handleClick = (idx) => {
    if (!catsReady) return; //lock beforre chosing emojies categoryi

    if (squares[idx] || winner) return; // check for filled and empty

    const currentMoves = isnext ? xMoves : oMoves;
    const setCurrentMoves = isnext ? setXMoves : setOMoves; //adding

    // len-3 check
    if (currentMoves.length === 3 && idx === currentMoves[0]) {
      // alert("You can’t place on your oldest emoji!"); //for debug
      return;
    }

    const nextSquares = [...squares];
    //
    const nextDisplay = [...displaySquares];

    if (currentMoves.length === 3) {
      const oldestIndex = currentMoves[0];
      nextSquares[oldestIndex] = null;
      nextDisplay[oldestIndex] = null;
    }

    nextSquares[idx] = isnext ? "X" : "O";
    //
    const catArr = isnext ? emojiCategories[p1Cat] : emojiCategories[p2Cat];
    nextDisplay[idx] = rand(catArr);

    setSquare(nextSquares);
    setDisplaySquares(nextDisplay);

    setCurrentMoves([...currentMoves.slice(-2), idx]);

    setNext(!isnext);
  };

  //reset
  const reset = () => {
    setSquare(Array(9).fill(null));
    setDisplaySquares(Array(9).fill(null));
    setNext(true);
    setXMoves([]);
    setOMoves([]);
    setP1Cat("");
    setP2Cat("");
  };

  return (
    <main className="min-h-screen grid place-items-center bg-slate-100">
      {/* UI thingy*/}
      {!catsReady && (
        <div className="mb-6 flex gap-6">
          <div>
            <p className="font-semibold mb-1">Player 1 :</p>
            <select
              value={p1Cat}
              onChange={(e) => setP1Cat(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">-- choose --</option>
              {cats.map((c) => (
                <option key={c} value={c} disabled={c === p2Cat}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="font-semibold mb-1">Player 2 :</p>
            <select
              value={p2Cat}
              onChange={(e) => setP2Cat(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">-- choose --</option>
              {cats.map((c) => (
                <option key={c} value={c} disabled={c === p1Cat}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      {/* UI thingy edns  */}

      <section className="grid grid-cols-3 gap-2">
        {squares.map((e, i) => (
          <Box
            key={i}
            value={displaySquares[i]}
            onClick={() => handleClick(i)}
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
