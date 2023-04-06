import styles from "./MusicPlayer.module.css";
import React, { useRef, useState, useEffect } from "react";
import {
  IconVolume,
  IconVolumeOff,
  IconPlayerTrackNextFilled,
  IconPlayerTrackPrevFilled,
} from "@tabler/icons-react";

const MusicPlayer = ({
  src,
  sourate,
  sourateSelectedNumber,
  setSourateSelected,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setIsMute] = useState(false);
  const audioRef = useRef(null);
  const [duration, setDuration] = useState(100);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  console.log(sourateSelectedNumber);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  function handleMuteButtonClick() {
    audioRef.current.volume = 0;
    setVolume(0);
    document.getElementById("volume-control").value = 0;
  }

  function toggleMute() {
    audioRef.current.volume = 1;
    setVolume(0);
    document.geteElementById("volume-control").value = 1;
  }

  function handleVolumeChange(event) {
    const newVolume = parseFloat(event.target.value);
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  }

  useEffect(() => {
    if (!audioRef.current) return;

    function handleDurationChange() {
      setDuration(audioRef.current.duration);
    }

    function handleTimeUpdate() {
      setProgress(audioRef.current.currentTime);
    }

    audioRef.current.addEventListener("durationchange", handleDurationChange);
    audioRef.current.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener(
          "durationchange",
          handleDurationChange
        );
        audioRef.current.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, [audioRef]);

  function handleProgressChange(event) {
    const newProgress = parseFloat(event.target.value);
    audioRef.current.currentTime = newProgress;
    setProgress(newProgress);
  }

  const progressBarWidth = (progress / duration) * 100 + "%";

  return (
    <div className={styles["button-player"]}>
      {/* gauche */}
      <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} />
      <div className={`${styles["music-player-left-part"]}`}>
        {volume === 0 ? (
          <button
            className={`${styles["button-volume"]}`}
            onClick={handleMuteButtonClick}
          >
            <IconVolumeOff
              className={`${styles["music-player-icon-volume-mute"]}`}
            />
          </button>
        ) : (
          <button
            className={`${styles["button-volume"]}`}
            onClick={handleMuteButtonClick}
          >
            <IconVolume
              className={`${styles["music-player-icon-volume-highest"]}`}
            />
          </button>
        )}

        <input
          id="volume-control"
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
      {/* milieu */}
      <div className={`${styles["music-player-middle-part"]}`}>
        <input
          className={`${styles["progress-bar"]}`}
          type="range"
          min="0"
          max={duration}
          value={progress}
          step="0.01"
          onChange={handleProgressChange}
          style={{ width: "70%" }}
        />

        <div>
          <div className={styles["progress-bar"]}>
            <div
              className={styles["progress-bar-inner"]}
              style={{ width: progressBarWidth }}
            ></div>
          </div>
        </div>
      </div>
      {/* droite */}
      {/* Associer cette icone à index -1 */}
      <div className={`${styles["music-player-right-part"]}`}>
        <IconPlayerTrackPrevFilled
          onCLick={() => {
            setSourateSelected(
              sourate[sourateSelectedNumber - 1].attributes?.audio?.data
                ?.attributes?.url
            );
          }}
          className={`${styles["icon-prev"]}`}
        />

        {!isPlaying ? (
          <svg
            className={`${styles["play-button"]}`}
            onClick={togglePlay}
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path fill="currentColor" d="M3 22v-20l18 10-18 10z"></path>
          </svg>
        ) : (
          <svg
            className={`${styles["play-button"]}`}
            onClick={togglePlay}
            viewBox="0 0 24 24"
            width="24"
            height="24"
            id="iconePause"
          >
            <path fill="currentColor" d="M6 4h4v16h-4zM14 4h4v16h-4z"></path>
          </svg>
        )}

        <IconPlayerTrackNextFilled className={`${styles["icon-next"]}`} />
      </div>

      <audio ref={audioRef} src={src} onEnded={() => setIsPlaying(false)} />
    </div>
  );
};

export default MusicPlayer;
