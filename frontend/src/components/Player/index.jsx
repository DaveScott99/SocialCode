import React, { useRef, useState } from "react";
import { Button } from "../Generics/Button/Button";
import { usePlayerState } from "../../hooks/usePlayerState";
import { useEffect } from "react";
import { v4 as uuidV4 } from "uuid";
import Hls from "hls.js";
import { getProgress } from "../../services/StreamingAPI";

import {
  BufferedProgressBar,
  Container,
  Controls,
  ControlsContainer,
  Current,
  Duration,
  DurationProgressBar,
  Left,
  NormalMode,
  ProgressBarContainer,
  Right,
  TheaterMode,
  TotalDuration,
  VideoScreen,
  Volume,
  VolumeRange,
  VolumeRangeContainer,
} from "./styles";
import {
  BiPlay,
  BiPause,
  BiVolumeFull,
  BiVolumeMute,
  BiVolumeLow,
  BiVolume,
  BiFullscreen,
  BiCog,
  BiExitFullscreen,
} from "react-icons/bi";

export default function Player({ filename }) {

    const videoPlayer = useRef(null);
    const videoContainer = useRef(null);

    const {
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
    handleForward10Seconds
  } = usePlayerState(videoPlayer);

  const STREAMING_API = process.env.REACT_APP_STREAMING_API_URL;
  let hls = new Hls();

  const [isVolumeControl, setIsVolumeControl] = useState(false);
  const [isHud, setIsHud] = useState(false);
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    setSessionId(uuidV4());
  }, [])

  useEffect(() => {
    loadVideo(playerState.selectedQuality);
     return () => {
      if (hls) {
        hls.destroy();
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerState.selectedQuality])

  const loadVideo = async (quality) => {

    const streamUrl = `${STREAMING_API}/streaming/${filename}/${quality}/segmentsUnion.m3u8`;

    const response = await getProgress(quality);
    
    console.log(response);

    if (Hls.isSupported()) {
      hls.loadSource(streamUrl);
      hls.attachMedia(videoPlayer.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
       
        toggleVideoPlay();
      });
    }
    else if (videoPlayer.current.canPlayType('application/vnd.apple.mpegurl')) {
      videoPlayer.current.src = streamUrl;
      videoPlayer.current.addEventListener('canplay', () => {
        
        toggleVideoPlay();
      });
    }

    hls.on(Hls.Events.ERROR, (event, data) => {
      console.error('Error occurred:', data);
    });
  }

  function toggleFullScreenMode() {
    if (document.fullscreenElement == null) {
      videoContainer.current.requestFullscreen();
      toggleVideoFullScreenSize();
    } else {
      document.exitFullscreen();
      toggleVideoFullScreenSize();
    }
  }

  return (
    <Container
      onMouseEnter={() => setIsHud(true)}
      onMouseLeave={() => {
        if (playerState.playing && isHud) {
          setIsHud(false);
        }
      }}
      ishud={isHud.toString()}
      theater={playerState.theaterMode}
      ref={videoContainer}
    >
      <VideoScreen
        ref={videoPlayer}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleVideoTotalDuration}
        theater={playerState.theaterMode}
        fullscreen={playerState.fullScreenMode}
        onClick={toggleVideoPlay}
        onDoubleClick={toggleFullScreenMode}
        muted
      />

      <div>
        Quality:
        <select
          value={playerState.selectedQuality}
          onChange={(e) => handleSeclectVideoQuality(e.target.value)}
        >
          <option value="240p">240p</option>
          <option value="360p">360p</option>
          <option value="720p">720p</option>
        </select>
      </div>

      <button onClick={handleForward10Seconds}>
        +10
      </button>

      <ControlsContainer ishud={isHud.toString()}>
        <ProgressBarContainer>
          <DurationProgressBar
            type="range"
            onChange={handleChangeVideoPercentage}
            value={playerState.percentage}
            min="0"
            max="100"
          />
          <BufferedProgressBar
            type="range"
            onChange={(e) => e.preventDefault()}
            value={playerState.bufferedPercentage}
            min="0"
            max="100"
          />
        </ProgressBarContainer>

        <Controls onMouseLeave={() => setIsVolumeControl(false)}>
          <Left>
            <Button
              background="none"
              fontcolor="#FFF"
              hoverbackground="none"
              fontSize={2}
              onClick={toggleVideoPlay}
            >
              {playerState.playing ? <BiPause /> : <BiPlay />}
            </Button>

            <Volume onMouseEnter={() => setIsVolumeControl(true)}>
              {playerState.isMuted ? (
                playerState.volume > 0.7 ? (
                  <BiVolumeFull onClick={toggleMuteVideo} />
                ) : <BiVolumeLow onClick={toggleMuteVideo} /> ? (
                  playerState.volume < 0.2 ? (
                    <BiVolume onClick={toggleMuteVideo} />
                  ) : (
                    <BiVolumeLow onClick={toggleMuteVideo} />
                  )
                ) : (
                  <BiVolumeMute onClick={toggleMuteVideo} />
                )
              ) : (
                <BiVolumeMute onClick={toggleMuteVideo} />
              )}

              <VolumeRangeContainer
                isvolumecontrol={isVolumeControl.toString()}
              >
                <VolumeRange
                  type="range"
                  onChange={handleChangeVolume}
                  value={playerState.volume}
                  min="0"
                  max="1"
                  step={0.01}
                  volume_value={playerState.volume * 100}
                  style={{ display: isVolumeControl ? "block" : "none" }}
                />
              </VolumeRangeContainer>
            </Volume>

            <Duration>
              <Current>{playerState.currentTime}</Current>/
              <TotalDuration>{playerState.duration}</TotalDuration>
            </Duration>
          </Left>

          <Right>
            <BiCog />

            {playerState.theaterMode
              ? !playerState.fullScreenMode && (
                  <TheaterMode onClick={toggleVideoScreenSizeTheater} />
                )
              : !playerState.fullScreenMode && (
                  <NormalMode onClick={toggleVideoScreenSizeTheater} />
                )}

            {playerState.fullScreenMode ? (
              <BiExitFullscreen onClick={toggleFullScreenMode} />
            ) : (
              <BiFullscreen onClick={toggleFullScreenMode} />
            )}
          </Right>
        </Controls>
      </ControlsContainer>
    </Container>
  );
}
