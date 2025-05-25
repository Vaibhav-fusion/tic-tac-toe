import Box from "./component/Box";
import { useState } from "react";
import Board from "./component/Board";
import Model from "./component/Model";
import Playpage from "./component/Playpage";


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
  
  const [showGame, setShowGame] = useState(false);
  const [use3D, setUse3D] = useState(true);


  const [squares, setSquare] = useState(Array(9).fill(null));
  const [isnext, setNext] = useState(true);
  const [xMoves, setXMoves] = useState([]);
  const [oMoves, setOMoves] = useState([]);
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

  const handleClick = (idx) => {
    if (!catsReady) return;

    if (squares[idx] || winner) return;

    const currentMoves = isnext ? xMoves : oMoves;
    const setCurrentMoves = isnext ? setXMoves : setOMoves;

    if (currentMoves.length === 3 && idx === currentMoves[0]) {
      return;
    }

    const nextSquares = [...squares];
    const nextDisplay = [...displaySquares];

    if (currentMoves.length === 3) {
      const oldestIndex = currentMoves[0];
      nextSquares[oldestIndex] = null;
      nextDisplay[oldestIndex] = null;
    }

    nextSquares[idx] = isnext ? "X" : "O";
    const catArr = isnext ? emojiCategories[p1Cat] : emojiCategories[p2Cat];
    nextDisplay[idx] = rand(catArr);

    setSquare(nextSquares);
    setDisplaySquares(nextDisplay);
    setCurrentMoves([...currentMoves.slice(-2), idx]);
    setNext(!isnext);
  };

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
      
     
      {!showGame ? (

        <Playpage click_fun={setShowGame} />

      
      ) : (
        <>
          {/*  2 Emoji selectors thingy */}
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

          {/* mark-1 */}
          {catsReady && (
            <div className="mb-4">
              <button
                onClick={() => setUse3D((prev) => !prev)}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Switch to {use3D ? "2D" : "3D"}
              </button>
            </div>
          )}

          {/* mark-2 */}
          {catsReady && (
            <>
              {use3D ? (
                <Board tiles={displaySquares} onclick={handleClick} />
              ) : (
                <section className="grid grid-cols-3 gap-2">
                  {squares.map((e, i) => (
                    <Box
                      key={i}
                      value={displaySquares[i]}
                      onClick={() => handleClick(i)}
                    />
                  ))}
                </section>
              )}

              <p className="mt-4 text-xl text-amber-500"> {winner_text}</p>
              <button
                onClick={reset}
                className="mt-4 px-4 py-2 rounded bg-teal-500 text-white
                 font-semibold hover:bg-teal-600"
              >
                Restart
              </button>
            </>
          )}
        </>
      )}
    </main>
  );
}
