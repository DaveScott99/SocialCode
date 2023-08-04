import { useEffect, useState } from "react";
import { updateProgressOnServer } from "../services/StreamingAPI";

export function usePlayerState(videoPlayer) {
    const [playerState, setPlayerState] = useState({
      playing: false,
      percentage: 0,
      bufferedPercentage: 0,
      volume: 1,
      isMuted: false,
      duration: "0:00",
      currentTime: "0:00",
      theaterMode: false,
      fullScreenMode: false,
      selectedQuality: "360p",
    });

    useEffect(() => {
      playerState.playing
        ? videoPlayer.current.play()
        : videoPlayer.current.pause()
    }, [videoPlayer, playerState.playing, playerState.screenSize]);
  
    const toggleVideoPlay = () => {
      setPlayerState({
        ...playerState,
        playing: !playerState.playing,
      });
    };

    const toggleVideoScreenSizeTheater = () => {
      setPlayerState({
        ...playerState,
        theaterMode: !playerState.theaterMode
      })
    }

    const handleSeclectVideoQuality = async (quality) =>  {
      updateProgressOnServer(quality, Math.floor(videoPlayer.current.currentTime));
      setPlayerState({
        ...playerState,
        selectedQuality: quality,
        playing: !playerState.playing,
      })
    }

    const handleForward10Seconds = (seconds) => {
      videoPlayer.current.currentTime = seconds;
    }

    const toggleVideoFullScreenSize = () => { 
      setPlayerState({
        ...playerState,
        fullScreenMode: !playerState.fullScreenMode
      })
    }
  
    const toggleMuteVideo = () => {
      setPlayerState({
        ...playerState,
        isMuted: !playerState.isMuted,
      });
      videoPlayer.current.muted = playerState.isMuted;
    };
  
    function handleTimeUpdate() {
      const currentPercentage =
        (videoPlayer.current.currentTime / videoPlayer.current.duration) * 100;
  
      const minutes = Math.floor(videoPlayer.current.currentTime / 60);
      const seconds = Math.floor(videoPlayer.current.currentTime % 60);
      const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

      const buffered = videoPlayer.current.buffered;
      let bufferedProgress;

      if (buffered.length > 0) {
        const loadedEnd = buffered.end(buffered.length - 1);
        const durationVideo = videoPlayer.current.duration;
        bufferedProgress = (loadedEnd / durationVideo) * 100;
      }

      setPlayerState({
        ...playerState,
        percentage: currentPercentage,
        currentTime: `${minutes}:${formattedSeconds}`,
        bufferedPercentage: bufferedProgress,
      });
    }
    
    const updatePlayerProgress = (progressData) => {
      const { segmentNumber, currentTime } = progressData;
      setPlayerState((prevState) => ({
        ...prevState,
        segmentNumber: segmentNumber,
      }));
      videoPlayer.current.currentTime = currentTime;
    };
  
    function handleChangeVideoPercentage(event) {
      const currentPercentageValue = event.target.value;
      videoPlayer.current.currentTime =
        (videoPlayer.current.duration / 100) * currentPercentageValue;

      setPlayerState({
        ...playerState,
        percentage: event.target.value,
      });
    }
  
    function handleVideoTotalDuration() {
      const durationInSeconds = Math.floor(videoPlayer.current.duration);
      const minutes = Math.floor(durationInSeconds / 60);
      const seconds = durationInSeconds % 60;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      const formattedDuration = `${minutes}:${formattedSeconds}`; 
      setPlayerState({
        ...playerState,
        duration: formattedDuration,
      });
    }
  
    function handleChangeVolume(event) {
      const currentPercentageValue = event.target.value;
      videoPlayer.current.volume = currentPercentageValue;
      setPlayerState({
        ...playerState,
        volume: event.target.value,
      });
    }
  
    return {
      playerState,
      toggleVideoPlay,
      toggleMuteVideo,
      toggleVideoScreenSizeTheater,
      toggleVideoFullScreenSize,
      handleTimeUpdate,
      handleChangeVideoPercentage,
      handleVideoTotalDuration,
      handleChangeVolume,
      handleSeclectVideoQuality,
      handleForward10Seconds,
      updatePlayerProgress
    };
  }