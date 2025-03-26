import React, { createContext, useState, useEffect, useContext } from 'react';
import { PlayerContext } from './PlayerContext';

export const RadioContext = createContext();

export const RadioProvider = ({ children }) => {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStation, setCurrentStation] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio());

  const { pause: pauseSong } = useContext(PlayerContext);

  useEffect(() => {
    const handlePlaying = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleError = () => {
      setIsPlaying(false);
      setCurrentStation(null);
    };

    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
    };
  }, [audio]);

  const playStation = (station) => {
    if (currentStation?.id === station.id && isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setCurrentStation(null);
    } else {
      if (currentStation) {
        audio.pause();
      }
      pauseSong();
      setCurrentStation(station);
      audio.src = station.url_resolved;
      audio.play().catch(e => {
        console.error('Error playing station:', e);
        alert('Error playing this station. Please try another one.');
        setIsPlaying(false);
        setCurrentStation(null);
      });
    }
  };

  const stopRadio = () => {
    audio.pause();
    setIsPlaying(false);
    setCurrentStation(null);
  };

  return (
    <RadioContext.Provider
      value={{
        stations,
        setStations,
        loading,
        setLoading,
        currentStation,
        setCurrentStation,
        isPlaying,
        setIsPlaying,
        playStation,
        stopRadio
      }}
    >
      {children}
    </RadioContext.Provider>
  );
};

export const useRadio = () => {
  const context = useContext(RadioContext);
  if (!context) {
    throw new Error('useRadio must be used within a RadioProvider');
  }
  return context;
}; 