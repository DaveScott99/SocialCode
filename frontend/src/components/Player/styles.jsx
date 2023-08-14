import { keyframes, styled } from "styled-components";
import theme from "../../styles/theme";

export const Container = styled.div`
  width: 100%;


  max-height: 620px;
  position: relative;
  box-shadow: ${(props) =>
    props.ishud === "true" && "inset 0px -500px 150px -200px #00000030"};

  background: ${(props) => props.theme.colors.black};
  display: flex;
  align-items: center;
  justify-content: center;


`;

export const VideoScreen = styled.video`
  width: 100%;

  object-fit: cover;

  max-height: ${(props) => !props.fullscreen ? "620px": "100vh"};

  user-select: none;

  &::-webkit-media-controls {
    display:none !important;
  }

`;

const fadeInHud = keyframes`
    0% {opacity: 0;}
    100% {opacity: 1;}
`;

const fadeOutHud = keyframes`
    100% {opacity: 1;}
    0% {opacity: 0;}
`;

export const ControlsContainer = styled.div.attrs((props) => ({
  style: {
    display: props.ishud === "true" ? "block" : "none"
  },
}))`
  background: transparent;
  color: ${(props) => props.theme.colors.white};
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0px 5px 0px 5px;
  box-shadow: inset -100px -160px 50px -150px #000000;

  animation-name: ${(props) =>
    props.ishud === "true" ? fadeInHud : fadeOutHud};
  animation-duration: 0.3s;

`;

export const ProgressBarContainer = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const getBackgroundDurationProgressBar = (value) => {
  return `linear-gradient(to right, #FFF 0%, #FFF ${value}%, #9b9b9b41 ${value}%, #9b9b9b41 100%)`;
};

const getBackgroundBufferedProgressBar = (value) => {
  return `linear-gradient(to right, #9b9b9ba5 0%, #9b9b9ba5 ${value}%, transparent ${value}%, transparent 100%)`;
};

const getBackgroundVolumeBar = (value) => {
  return `linear-gradient(to right, #FFF 0%, #FFF ${value}%, ${theme.colors.grey} ${value}%, ${theme.colors.grey} 100%)`;
};

export const DurationProgressBar = styled.input.attrs((props) => ({
  style: {
    background: getBackgroundDurationProgressBar(props.value),
  },
}))`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 0.3em;
  outline: none;
  transition: all 0.2s;
  position: absolute;
  left: 0;
  z-index: 2;

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.3em;
    cursor: pointer;
    border-radius: 1px;
  }

  &::-webkit-slider-thumb {
    width: 100%;
    max-width: 12px;
    height: 12px;
    border-radius: 50%;
    cursor: pointer;
    -webkit-appearance: none;
    background: ${(props) => props.theme.colors.white};
    margin-top: -4px;
    display: none;
  }

  &:hover {
    &::-webkit-slider-thumb {
      margin-top: -4px;
      display: block;
    }
  }
`;

export const BufferedProgressBar = styled.input.attrs((props) => ({
  style: {
    background: getBackgroundBufferedProgressBar(props.value),
  },
}))`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 0.3em;
  outline: none;
  transition: all 0.2s;
  position: absolute;
  left: 0;
  z-index: 1;

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.3em;
    border-radius: 1px;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    display: none;
  }

  &:hover {
    height: 0.6em;

    &::-webkit-slider-runnable-track {
      height: 0.6em;
    }

    &::-webkit-slider-thumb {
      margin-top: -2px;
      display: block;
    }
  }
`;

export const Controls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.3s ease;
  transform: translateX(${(props) => (props.isVolumeControl ? "500px" : "0")});
`;

export const Left = styled.div`
  display: flex;
  align-items: center;
`;

export const Duration = styled.div`
  margin-left: 5px;
  font-weight: 500;
  font-size: 0.9em;
`;

export const Current = styled.span`
  margin-right: 3px;
`;

export const TotalDuration = styled.span`
  margin-left: 3px;
`;

const fadeIn = keyframes`
    from {width: 0px;}
    to {width: 80px;}
`;

export const Volume = styled.div`
  display: flex;
  align-items: center;

  svg {
    font-size: 1.5em;
    cursor: pointer;
    margin-right: 5px;
  }
`;

export const VolumeRangeContainer = styled.div`
  animation-name: ${(props) =>
    props.isvolumecontrol === "true" ? fadeIn : ""};
  animation-duration: 0.1s;

  cursor: pointer;
  padding: 10px 0px 10px 0px;
  display: flex;
  align-items: center;
`;

export const VolumeRange = styled.input.attrs((props) => ({
  style: {
    background: getBackgroundVolumeBar(props.volume_value),
  },
}))`
  -webkit-appearance: none;
  appearance: none;
  display: none;
  width: 100%;
  max-width: 80px;
  height: 0.3em;

  cursor: pointer;

  outline: none;

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.2em;
    cursor: pointer;
    border-radius: 1px;
  }

  &::-webkit-slider-thumb {
    width: 100%;
    max-width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #fff;

    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -5px;
  }
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  width: 100%;
  max-width: 300px;

  svg {
    font-size: 1.5em;
    cursor: pointer;
    margin-right: 10px;
    margin-left: 10px;
  }
`;

export const TheaterMode = styled.button`
  border: 2px solid ${(props) => props.theme.colors.white};
  width: 23px;
  height: 15px;
  border-radius: 2px;
  cursor: pointer;
  background: none;
  margin-right: 10px;
  margin-left: 10px;
`

export const NormalMode = styled.button`
  border: 2px solid ${(props) => props.theme.colors.white};
  width: 25px;
  height: 20px;
  border-radius: 2px;
  cursor: pointer;
  background: none;
  margin-right: 10px;
  margin-left: 10px;
`

export const ContainerConfig = styled.div`
  width: 100%;
  max-width: 250px;
  background-color: #000000a6;
  border-radius: 5px;
  padding: 5px 0px 5px 0px;
  position: absolute;
  bottom: 50px;
`

export const ItensConfig = styled.div`
`

export const ConfigItem = styled.div`
  display: flex;
  justify-content: space-between;

  align-items: center;

  padding: 10px;
  cursor: pointer;
  transition: all .1s;

  user-select: none;

  p {
    font-size: .8em;
    font-weight: 500;
  }

  &:hover {
    background: #59595970;
  }
`

export const SelectedConfig = styled.span`
    font-size: .8em;
    font-weight: 500;

    display: flex;
    align-items: center;

    svg {
      margin-right: 0;
      margin-left: 5px;
    }

`

export const SelectionList = styled.div`
  
`

export const VideoQuality = styled.div`
  display: flex;
  align-items: center;

  padding: 10px 0px 10px 30px;
  cursor: pointer;
  transition: all .1s;

  user-select: none;

  p {
    font-size: .8em;
    font-weight: 500;
  }

  &:hover {
    background: #59595970;
  }
`

export const BackItem = styled.div`

  display: flex;
  align-items: center;

  margin-bottom: 10px;

  padding: 10px 0px 10px 0px;

  border-bottom: 1px solid #565656c1;

  span {
    font-size: .8em;
    font-weight: 500;
    cursor: pointer;
  }

  svg {
    font-size: 1.3em;
    margin-right: 5px;
    margin-left: 5px;
    cursor: pointer;
  }

`