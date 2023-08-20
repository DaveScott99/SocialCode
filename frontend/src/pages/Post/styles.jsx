import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  color: ${(props) => props.theme.colors.black};
  display: flex; 
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const ContainerVotes = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 10px;
`;

export const VotesCount = styled.span`
    user-select: none;
    font-size: .8em;
    color: ${(props) => props.theme.colors.primary};
    margin-bottom: 5px;
    margin-top: 5px;
`;

export const InteractionButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 5px;
  transition: all .1s;

  svg {
    font-size: 1.5em;
  }

  &:hover {
    background: #F0F2F5;
  }
`;

export const ImagePost = styled.img`
  width: 600px;
  height: 300px;
  border-radius: 10px;
  user-select: none;
`;

export const Info = styled.header`
  width: 100%;
  max-width: 980px;
  display: flex;
  flex-direction: row-reverse;

  margin-bottom: 10px;

  a {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const PostInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const PostHeader = styled.div`
  display: flex;
  justify-content: space-between;
`

export const Owner = styled.div`
  display: flex;
  align-items: center;
`;

export const Username = styled.span`
  font-weight: 600;
  font-size: .8em;
  margin-right: 5px;
  background: #0095ff16;
  padding: 5px;
  border-radius: 5px;
`;

export const PostDate = styled.div`
  font-weight: 300;
  font-size: 0.8em;
`;

export const Language = styled.div`
  background: ${(props) => props.theme.colors.primary};
  color: ${(props) => props.theme.colors.white};
  border-radius: 5px;
  padding: 10px;
  max-width: 400px;
  font-weight: 600;
  font-size: 0.8em;
`;

export const PostBody = styled.div`
  p {
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.black};

    img {
      background: ${(props) => props.theme.colors.white};
    }
  }
`;

export const Title = styled.div`
  font-size: 1.8em;
  font-weight: 600;
  display: flex;
  align-items: center;

  padding: 5px 0px 5px 0px;

`;

export const Body = styled.main`
  padding: 10px 0px 10px 0px;
`;

export const CardFooter = styled.footer`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 5px;
  font-size: 1.2em;
  justify-content: space-evenly;
  padding: 0px 5px 0px 5px;
`;

export const CommentContainer = styled.div`
  width: 100%;
  max-width: 980px;
`

export const Comment = styled.div`
  display: flex;
  margin-bottom: 10px;
`

export const TextEditorContainer = styled.div`
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
`

export const ContainerButton = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`

export const NewComment = styled.div`
  border: 1px solid ${(props) => props.theme.colors.grey};
  padding: 20px;
  border-radius: 5px;
  margin-bottom: 20px;
`

export const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const CommentOwner = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 0px;
  line-height: 5px;

  a {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`

export const CommentBody = styled.div`
  margin-top: 10px;
`;


export const MoreButton = styled.div`
    display: flex;
    align-items: center;
    margin-right: 40px;
    cursor: pointer;
    border-radius: 50%;
    transition: all .1s;
    padding: 5px;


    svg {
        font-size: 1.5em;
        position: relative;
    }

    &:hover {
        background: #9d9d9d32;
    }

`

export const SubMenuContainer = styled.div`
    padding: 5px;
`

export const SubMenuContent = styled.div`
    border-radius: 10px;
    background: ${props => props.theme.colors.white};
    box-shadow: 0px 5px 10px 3px rgba(0, 0, 0, 0.14);
    margin-bottom: 5px;
    width: 200px;
    padding: 5px;

    a {
        text-decoration: none;
    }
`

export const SubMenuItem = styled.span`
    color: ${props => props.theme.colors.black};
    font-weight: 500;
    padding: 10px 16px;
    text-decoration: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    border-radius: 5px;
    font-size: .9em;
    display: flex;
    align-items: center;
    transition: all .1s;

    svg {
        font-size: 1.2em;
        margin-right: 10px;
    }

    &:hover {
        background: ${props => props.theme.colors.grey};
    }
`