import Box from "./component/Box";
import { useState } from "react";

export default function App() {
  const [squares, setSquare] = useState(Array(9).fill(null));
  const [isnext, setNext] = useState(true);

  const handleClick = (idx) => {
    if (squares[idx]) {
      return; //click on same cell ignore
    }

    const next = [...squares];
    next[idx] = isnext ? "X" : "O";
    setSquare(next);
    setNext(!isnext);

    
  };
  return (
    <main className="min-h-screen grid place-items-center bg-slate-100">
      <section className="grid grid-cols-3 gap-2">
        {Array.from({ length: 9 }).map((val, i) => (
          <Box key={i} value={val} onClick={()=>{ handleClick(i) }}  />
        ))}
      </section>

       <p className="mt-4 text-xl">
        Next player: {isnext ? "X" : "O"}
      </p>
    </main>
  );
}
