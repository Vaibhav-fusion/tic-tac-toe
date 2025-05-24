
import Box from "./component/Box";



export default function App() {
  return (

    <main className="min-h-screen grid place-items-center bg-slate-100">

      <section className="grid grid-cols-3 gap-2">  
        {Array.from({ length: 9 }).map((_, i) => (
          <Box key={i} value={null} />
        ))}
      </section>
    </main>
  );
}