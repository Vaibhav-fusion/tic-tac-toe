import React from 'react';
import Model from './Model';
import { Howl } from 'howler';

function Playpage({ click_fun }) {

     const clickSound = new Howl({
    src: ['/sounds/retro-1.mp3'], 
    volume: 0.5
  });

   const handleClick = () => {
    clickSound.play();
    setTimeout(() => {
      click_fun(true);
    }, 300); 
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-indigo-950 text-indigo-100">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-indigo-200 tracking-tight">
        Emoji Tic Tac Toe
      </h1>

      <div className="w-full max-w-md mb-8">
        <Model />
      </div>

      <button
        onClick={handleClick}
        className="bg-indigo-800 hover:bg-indigo-700 border border-indigo-600/30 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500/50 
                   font-medium rounded-lg text-lg px-6 py-3 transition-all 
                   shadow-sm hover:shadow-indigo-500/20"
      >
        Play
      </button>
    </div>
  );
}

export default Playpage;