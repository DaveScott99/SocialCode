import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    margin-top: 20px;
    width: 100%;
    max-width: 1550px;
`

export const PlayerContainer = styled.div`
`

export const InfoVideo = styled.div`
    width: 100%;
`

export const Header = styled.div`
    margin-top: 10px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    background: ${props => props.theme.colors.white};
    padding: 10px;
`

export const Interation = styled.div`
    display: flex;
    align-items: center;
`

export const ContainerButton = styled.div`
    display: flex;
`

export const TitleContainer = styled.div`
    display: flex;
    flex-direction: column;
`

export const TitleButton = styled.span`
    margin-left: 5px;
`

export const Title = styled.h1`
    font-size: 1.2em;
    font-weight: 500;
    width: max-content;
`

export const LanguageContainer = styled.div`
  padding: 5px;
`;

export const Language = styled.img`
  color: ${(props) => props.theme.colors.white};
  width: 30px;
  height: 30px;
  object-fit: cover;
  margin-right: 3px;
  margin-left: 3px;

  user-select: none;
`;



export const VideoDate = styled.span`

`

export const Separator = styled.hr`
    margin-bottom: 10px;
    opacity: .2;
`

export const DescriptionContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    background: ${props => props.theme.colors.white};
    padding: 5px 5px 10px 5px;

    transition: all .1s;

    cursor: pointer;

`
export const Views = styled.div`
    font-size: .8em;
    font-weight: 400;
    margin-top: 15px;
`

export const Username = styled.span`
    font-weight: 500;
    cursor: pointer;
    margin-right: 3px;
    background: #0095ff23;
    color: ${(props) => props.theme.colors.primary};
    padding: 5px;
    border-radius: 5px;

    &:hover {
      text-decoration: underline;
    }

`

export const ContainerVotes = styled.div`
    display: flex;
    align-items: center;
    border-radius: 20px;
    background: #F7F9F9;
    padding: 10px;
    margin-right: 5px;
    transition: all .1s;
    cursor: pointer;


    &:hover {
        background: #F0F2F5;
    }

`

export const InteractionButton = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        font-size: 1.2em;
    }

`

export const RecommendationsContainer = styled.div`
    margin-left: 10px;
    width: 100%;
    max-width: 400px;
`

export const ItemRecommendation = styled.div`
    display: flex;
    cursor: pointer;
    margin-bottom: 10px;
`

export const Thumbnail = styled.img`
    width: 180px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
    margin-right: 10px;
`

export const TitleRecommendation = styled.h2`
    font-size: 1.1em;
`

export const OwnerRecommendation = styled.div`
    margin-top: 3px;
`

export const UsernameRecommendation = styled.span`
    font-size: 1em;
`

export const SubMenuItem = styled.li`
    color: ${props => props.theme.colors.black};
    font-weight: 400;
    text-decoration: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    font-size: .9em;
    display: flex;
    align-items: center;
    transition: all .1s;
    margin-bottom: 5px;

    svg {
        font-size: 1.5em;
        margin-right: 10px;
    }

    &:hover {
        background: ${props => props.theme.colors.grey};
    }
`
