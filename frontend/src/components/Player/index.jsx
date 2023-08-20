import React, { useRef, useState } from "react";
import { Button } from "../Generics/Button/Button";
import { usePlayerState } from "../../hooks/usePlayerState";
import { useEffect } from "react";
import Hls from "hls.js";

import {
  BackItem,
  BufferedProgressBar,
  ConfigItem,
  Container,
  ContainerConfig,
  Controls,
  ControlsContainer,
  Current,
  Duration,
  DurationProgressBar,
  ItensConfig,
  Left,
  NormalMode,
  ProgressBarContainer,
  Right,
  SelectedConfig,
  SelectionList,
  TheaterMode,
  TotalDuration,
  VideoQuality,
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
  BiChevronRight,
  BiChevronLeft
} from "react-icons/bi";
import { useSelector } from "react-redux";

export default function Player({ filename }) {
  const videoPlayer = useRef(null);
  const videoContainer = useRef(null);
  const [isVolumeControl, setIsVolumeControl] = useState(false);
  const [isHud, setIsHud] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [showListQuality, setShowListQuality] = useState(false);

  const { currentVideoTime } = useSelector(
    (rootReducer) => rootReducer.videoReducer
  );

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
    handleSeclectVideoQuality
  } = usePlayerState(videoPlayer);

  const STREAMING_API = process.env.REACT_APP_STREAMING_API_URL;
  let hls = new Hls();

  useEffect(() => {
    loadVideo(playerState.selectedQuality);
    return () => {
      if (hls) {
        hls.destroy();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerState.selectedQuality, currentVideoTime]);

  const loadVideo = async (quality) => {
    const streamUrl = `${STREAMING_API}/streaming/${filename}/${quality}/segmentsUnion.m3u8`;

    if (Hls.isSupported()) {
      hls.loadSource(streamUrl);
      hls.attachMedia(videoPlayer.current);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        videoPlayer.current.currentTime = currentVideoTime;
        toggleVideoPlay();
      });
    } else if (
      videoPlayer.current.canPlayType("application/vnd.apple.mpegurl")
    ) {
      videoPlayer.current.src = streamUrl;
      videoPlayer.current.addEventListener("canplay", () => {
        videoPlayer.current.currentTime = currentVideoTime;
        toggleVideoPlay();
      });
    }

    hls.on(Hls.Events.ERROR, (event, data) => {
      console.error("Error occurred:", data);
    });
  };

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
        if (playerState.playing && isHud && !showConfig) {
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
            <BiCog onClick={() => setShowConfig(!showConfig)} />

            {showConfig ? (
              <ContainerConfig>
                <ItensConfig
                  style={{ display: showListQuality ? "none" : "block" }}
                >

                  <ConfigItem>
                    <p>Velocidade</p>
                    <SelectedConfig>
                      Normal
                      <BiChevronRight />
                    </SelectedConfig>
                  </ConfigItem>

                  <ConfigItem onClick={() => setShowListQuality(!showListQuality)}>
                    <p>Qualidade</p>
                    <SelectedConfig>
                      {playerState.selectedQuality}
                      <BiChevronRight />
                    </SelectedConfig>
                  </ConfigItem>

                </ItensConfig>

                {showListQuality ? 
                    <SelectionList>

                      <BackItem>
                        <BiChevronLeft onClick={() => setShowListQuality(!showListQuality)} />
                        <span onClick={() => setShowListQuality(!showListQuality)}>Qualidade</span>
                      </BackItem>

                      <VideoQuality onClick={() => {
                        handleSeclectVideoQuality("720p")
                        setShowListQuality(!showListQuality)
                        setShowConfig(!showConfig)}}>
                        <p>720p</p>
                      </VideoQuality>
                      <VideoQuality onClick={() => {
                        handleSeclectVideoQuality("480p")
                        setShowListQuality(!showListQuality)
                        setShowConfig(!showConfig)}}>
                        <p>480p</p>
                      </VideoQuality>
                      <VideoQuality onClick={() => {
                        handleSeclectVideoQuality("360p")
                        setShowListQuality(!showListQuality)
                        setShowConfig(!showConfig)}}>
                        <p>360p</p>
                      </VideoQuality>
                      <VideoQuality onClick={() => {
                        handleSeclectVideoQuality("240p")
                        setShowListQuality(!showListQuality)
                        setShowConfig(!showConfig)}}>
                        <p>240p</p>
                      </VideoQuality>
                    </SelectionList> 
                  : null}
              </ContainerConfig>
            ) : null}

            { /*playerState.theaterMode
              ? !playerState.fullScreenMode && (
                  <TheaterMode onClick={toggleVideoScreenSizeTheater} />
                )
              : !playerState.fullScreenMode && (
                  <NormalMode onClick={toggleVideoScreenSizeTheater} />
              ) */}

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
