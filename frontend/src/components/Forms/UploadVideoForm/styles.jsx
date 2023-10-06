import { styled } from "styled-components";

export const ContainerForm = styled.div`
    display: flex;
    width: 100%;
`

export const Header = styled.div`
  display: flex;
  align-items: center;
`

export const Main = styled.div`
  display: flex;
  margin-top: 20px;
`

export const VideoInformations = styled.div`
    width: 100%;
`

export const Form = styled.form`
    width: 100%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    margin-right: 10px;
`

export const Attachs = styled.div`
  max-width: 300px;
  width: 100%;

  button {
    border: 1px solid #00000028;
  }
`

export const TitleInput = styled.input`
    width: 100%;
    padding: 10px;
    border-radius: 5px;
    background: ${props => props.theme.colors.white};
    border: 1px solid ${props => props.theme.colors.grey};
    color: ${props => props.theme.colors.black};
    font-size: .9em;
    outline-color: ${props => props.theme.colors.primary};
`;

export const DescriptionInput = styled.textarea`
  border: 1px solid ${props => props.theme.colors.grey};
  color: ${props => props.theme.colors.black};
  height: 150px;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  font-size: .9em;
  outline-color: ${props => props.theme.colors.primary};
`

export const TextEditorContainer = styled.div`
    width: 100%;
    max-height: 200px;
    margin-top: 10px;
    margin-bottom: 10px;
`

export const ThumbnailContainer = styled.div`
    width: 100%;
    max-width: 300px;
    margin-right: 10px;

    display: flex;
    flex-direction: column;
    align-items: center;
`

export const WarningThumbnail = styled.span`
    font-size: .8em;
    font-weight: 400;
`

export const WarningVideo = styled.span`
    font-size: .9em;
    font-weight: 500;

    display: flex;
    align-items: center;

    svg {
      margin-right: 5px;
      color: ${(props) => props.theme.colors.white} ;
      font-size: 1.4em;
      background: ${(props) => props.theme.colors.primary};
      padding: 3px;
      border-radius: 3px;
    }
`

export const Thumbnail = styled.label`
    width: 100%;
    max-width: 300px;
    height: 160px;
    max-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
    background: ${props => props.theme.colors.white_smoke};
    margin-bottom: 10px;

    &:hover {
        background: ${props => props.theme.colors.grey};
    }
`

export const Input = styled.input`
    display: none;
`

export const Preview = styled.span`

`

export const Image = styled.img`
    width: 300px;
    max-height: 163px;
    background-size: cover;
    object-fit: cover;
    border-radius: 5px;
`

export const ButtonUpload = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    svg {
        font-size: 3em;
        color: ${props => props.theme.colors.black};
        margin-bottom: 10px;
    }

`

export const ProportionThumbnail = styled.span`
    font-size: .8em;
    font-weight: 400;
    max-width: 230px;
    text-align: center;
`

export const TitleUploadThumbnail = styled.span`
    font-size: 1em;
    font-weight: 500;
    margin-bottom: 10px;
`

export const ProgressBarContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  max-height: 50px;
`;

export const MessageProgress = styled.span`
  font-weight: 500;
  font-size: .9em;
  color: #000;
  position: absolute;
`

export const SelectVisibility = styled.select`
  width: 100%;
  padding: 10px;
  font-size: .9em;
  font-weight: 500;
  border-radius: 5px;
  margin-bottom: 10px;
  border: 1px solid ${props => props.theme.colors.grey};
`

export const OptionSelect = styled.option`
  font-size: 1.1em;
  font-weight: 400;
`

const getBackgroundProgressBar = (value) => {
  return `linear-gradient(to right, #3498db45 0%, #3498db45 ${value}%, #FFF ${value}%, #FFF 100%)`;
};

export const Progress = styled.input.attrs((props) => ({
  style: {
    background: getBackgroundProgressBar(props.value),
  },
}))`
  width: 100%;
  height: 30px;
  -webkit-appearance: none;
  transition: all 0.2s;
  appearance: none;
  border: 1px solid #00000028;

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 0.3em;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    display: none;
  }
`;
