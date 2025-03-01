import React, { useEffect } from "react";

const PlaybackControls: React.FC = () => {
  useEffect(() => {
    playNextAudio();
  }, []);

  async function playNextAudio() {
    try {
      const response = await fetch("http://localhost:3000/playback/next-audio");
      const data = await response.json();
      if (data.audioUrl) {
        const audio = new Audio(`http://localhost:3000${data.audioUrl}`);
        audio.play();
        audio.onended = playNextAudio;
      } else {
        // No audio available, retry after 1 second
        setTimeout(playNextAudio, 1000);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      setTimeout(playNextAudio, 1000); // Retry on error
    }
  }

  return (
    <div>
      <h2>Audio Playback</h2>
      {/* Add play/pause buttons or other controls here if desired */}
    </div>
  );
};

export default PlaybackControls;
