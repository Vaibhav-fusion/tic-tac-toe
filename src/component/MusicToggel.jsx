import React, { useState, useEffect, useRef } from "react";
import { Howl, Howler } from "howler";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";

export default function MusicToggle() {
  const music = useRef(null);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    music.current = new Howl({
      src: ["/sounds/game-loop.mp3"],
      loop: true,
      volume: 0.5,
    });

    music.current.play();

   
  }, []);

  function handleToggleMute() {
    const newMuted = !muted;
    Howler.mute(newMuted);
    setMuted(newMuted);
  }

  return (
    <button
      onClick={handleToggleMute}
      className="absolute top-4 right-4 text-3xl text-gray-700 hover:text-gray-900"
      title={muted ? "Unmute background music" : "Mute background music"}
      aria-label={muted ? "Unmute background music" : "Mute background music"}
    >
      {muted ? <FaVolumeMute /> : <FaVolumeUp />}
    </button>
  );
}
