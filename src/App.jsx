import Box from "./component/Box";
import { useState } from "react";


function WinnerCal(arr) {
  const lines = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6],
  ];
  for (const [a,b,c] of lines)
    if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c])
      return arr[a];
  return null;
}

export default function App() {
  const [squares, setSquare] = useState(Array(9).fill(null));
  const [isnext, setNext] = useState(true);

  const winner = WinnerCal(squares)

  const winner_text  = winner?winner:'No'

  console.assert.log(winner)

  const handleClick = (idx) => {
    if (squares[idx]) {
      return; //click on the same thingy 😭
    }

    const next = [...squares];
    next[idx] = isnext ? "X" : "O";
    setSquare(next);
    setNext(!isnext);

    
  };
  return (
    <main className="min-h-screen grid place-items-center bg-slate-100">
      <section className="grid grid-cols-3 gap-2">
        {squares.map((val, i) => (
          <Box key={i} value={val} onClick={()=>{ handleClick(i) }}  />
        ))}
      </section>

       <p className="mt-4 text-xl">
        Next player: {isnext ? "X" : "O"}
      </p>
    </main>
  );
}
