import React, { useContext, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const {
    seekSong,
    seekBg,
    seekBar,
    playStatus,
    play,
    pause,
    track,
    time,
    previous,
    next,
    isShuffle,
    setIsShuffle,
    isLoop,
    toggleLoop,
    audioRef,
    toggleMute,
    isMuted,
    volume,
    handleVolumeChange,
    handleSongEnd,

    
    
  } = useContext(PlayerContext);

  const toggleShuffle = () => setIsShuffle((prev) => !prev);

  useEffect(() => {
    if (!audioRef.current) return;

    const updateTime = () => {
      if (!audioRef.current.duration) return;
      seekBar.current.style.width = `${Math.floor(
        (audioRef.current.currentTime / audioRef.current.duration) * 100
      )}%`;
      setTime({
        currentTime: {
          second: String(
            Math.floor(audioRef.current.currentTime % 60)
          ).padStart(2, "0"),
          minute: Math.floor(audioRef.current.currentTime / 60),
        },
        totalTime: {
          second: String(Math.floor(audioRef.current.duration % 60)).padStart(
            2,
            "0"
          ),
          minute: Math.floor(audioRef.current.duration / 60),
        },
      });
    };

    audioRef.current.addEventListener("timeupdate", updateTime);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateTime);
      }
    };
  }, [audioRef]);

  return track ? (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="h-[90px] bg-black flex justify-between items-center text-white px-4 border-t border-[#282828]">
        <div className="hidden lg:flex items-center gap-4">
          <img className="w-12" src={track.image} alt="Track" />
          <div>
            <p>{track.name}</p>
            <p>{track.desc?.slice(0, 12)}</p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-1 m-auto">
          <div className="flex gap-4">
            <img
              className="w-4 cursor-pointer"
              src={assets.shuffle_icon}
              alt="shuffle"
              onClick={toggleShuffle}
            />
            <img
              onClick={previous}
              className="w-4 cursor-pointer"
              src={assets.prev_icon}
              alt="previous"
            />
            {!playStatus ? (
              <img
                onClick={play}
                className="w-4 cursor-pointer"
                src={assets.play_icon}
                alt="play"
              />
            ) : (
              <img
                onClick={pause}
                className="w-4 cursor-pointer"
                src={assets.pause_icon}
                alt="pause"
              />
            )}
            <img
              onClick={next}
              className="w-4 cursor-pointer"
              src={assets.next_icon}
              alt="next"
            />
            <img
              onClick={toggleLoop}
              className="w-4 cursor-pointer"
              src={assets.loop_icon}
              alt="loop"
              
            />
          </div>

          <div className="flex items-center gap-5">
            <p>
              {time.currentTime.minute}:{time.currentTime.second}
            </p>
            <div
              ref={seekBg}
              onClick={seekSong}
              className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
            >
              <hr
                ref={seekBar}
                className="h-1 border-none w-0 bg-green-800 rounded-full"
              />
            </div>
            <p>
              {time.totalTime.minute}:{time.totalTime.second}
            </p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-2 opacity-75">
          <img className="w-4" src={assets.plays_icon} alt="play" />
          <img className="w-4" src={assets.mic_icon} alt="mic" />
          <img className="w-4" src={assets.queue_icon} alt="queue" />
          
          

          <img
            onClick={toggleMute}
            className={`w-4 cursor-pointer ${isMuted ? 'opacity-50' : ''}`}
            src={assets.volume_icon}
            alt="speaker"
          />
          
        
         
           <input
           type="range"
           min="0"
           max="1"
           step="0.01"
           value={volume}
           onChange={handleVolumeChange}
           className="w-20 bg-slate-50 h-1 rounded"
         />
          
         
          <img
            className="w-4"
            src={assets.mini_player_icon}
            alt="mini player"
          />
          <img className="w-4" src={assets.zoom_icon} alt="zoom" />
        </div>
      </div>
    </div>
  ) : null;
};

export default Player;

// import React, { useContext } from 'react'
// import { assets,songsData } from '../assets/assets'
// import { PlayerContext } from '../context/PlayerContext'

// const Player = () => {
//   const {seekSong,seekBg, seekBar, PlayStatus, play, pause, track, time, previous, next} = useContext(PlayerContext)

//   return track ? (
//     <div>
//      <div className='h-[10%] bg-black flex justify-between items-center text-white px-4'>
//       <div className='hidden lg:flex items-center gap-4'>
//          <img className='w-12' src={track.image} alt="" />
//          <div>
//             <p>{track.name}</p>
//             <p>{track.desc?.slice(0,12)}</p>
//          </div>
//       </div>
//       <div className='flex flex-col items-center gap-1 m-auto'>
//           <div className='flex gap-4'>
//             <img className='w-4 cursor-pointer' src={assets.shuffle_icon} alt="shuffle" />
//             <img onClick={previous} className='w-4 cursor-pointer' src={assets.prev_icon} alt="previous" />
//             {!PlayStatus ?
//               <img onClick={play} className='w-4 cursor-pointer' src={assets.play_icon} alt="play" /> :
//               <img onClick={pause} className='w-4 cursor-pointer' src={assets.pause_icon} alt="pause" />
//             }
//             <img onClick={next} className='w-4 cursor-pointer' src={assets.next_icon} alt="next" />
//             <img className='w-4 cursor-pointer' src={assets.loop_icon} alt="loop" />
//           </div>
//           <div className='flex items-center gap-5'>
//             <p>{time.currentTime.minute}:{time.currentTime.second}</p>
//             <div ref={seekBg} onClick={seekSong} className='w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer'>
//                <hr ref={seekBar} className='h-1 border-none w-0 bg-green-800 rounded-full'/>
//             </div>
//             <p>{time.totalTime.minute}:{time.totalTime.second}</p>
//           </div>
//         </div>
//         <div className='hidden lg:flex items-center gap-2 opacity-75'>
//             <img className='w-4' src={assets.plays_icon} alt="" />
//             <img className='w-4' src={assets.mic_icon} alt="" />
//             <img className='w-4' src={assets.queue_icon} alt="" />
//             <img className='w-4' src={assets.speaker_icon} alt="" />
//             <img className='w-4' src={assets.volume_icon} alt="" />
//             <div className='w-20 bg-slate-50 h-1 rounded'></div>
//             <img className='w-4' src={assets.mini_player_icon} alt="" />
//             <img className='w-4' src={assets.zoom_icon} alt="" />
//         </div>
//      </div>
//    </div>
//   ) : null
// }

// export default Player
