import React, { useRef, useEffect, useContext } from "react";
import DisplayHome from "./DisplayHome";
import { useLocation, useParams } from "react-router-dom";
import DisplayAlbum from "./DisplayAlbum";
import { PlayerContext } from "../context/PlayerContext";

const Display = () => {
  const { albumsData } = useContext(PlayerContext);
  const location = useLocation();
  const displayRef = useRef();
  
  // Check if the current path is for an album
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split("/album/")[1] : "";
  
  const bgColor =
    isAlbum && albumsData?.length > 0
      ? albumsData.find((x) => x._id === albumId)?.bgColor || "#121212"
      : "#121212";

  useEffect(() => {
    if (displayRef.current) {
      if (isAlbum) {
        displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
      } else {
        displayRef.current.style.background = `#121212`;
      }
    }
  }, [isAlbum, bgColor, albumId]);

  // Render the appropriate component based on the path
  const renderContent = () => {
    if (isAlbum) {
      return <DisplayAlbum />;
    } else {
      return <DisplayHome />;
    }
  };

  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg-ml-0"
    >
      {albumsData && albumsData.length > 0 ? (
        renderContent()
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Display;
