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
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-transparent text-gray-100 font-[Poppins]">
      <h1 className="text-5xl font-bold text-indigo-400 mb-6 tracking-tight">
        Emoji Tic Tac Toe
      </h1>

      <div className="w-full max-w-md bg-transparent my-10">
        <Model />
      </div>

      <button
        onClick={handleClick}
        className="bg-indigo-600 hover:bg-indigo-500 transition-colors text-white text-xl px-10 py-4 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-900 transform hover:scale-105 active:scale-95"
      >
        Play
      </button>

    </div>
  );
}

export default Playpage;