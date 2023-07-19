import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  color: ${(props) => props.theme.colors.black};
  flex: 1 0 auto;  
  margin-bottom: 20px;
  display: flex; 
  flex-direction: column;
`;

export const ContainerVotes = styled.div`
  width: 50px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.theme.colors.white};
  margin-right: 10px;
`;

export const VotesCount = styled.span`
    user-select: none;
`;

export const InteractionButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  svg {
    font-size: 2em;
  }
`;

export const ContainerContent = styled.div`
  background: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  width: 100%;
  border: 1px solid red;
`;

export const ImagePost = styled.img`
  width: 600px;
  height: 300px;
  border-radius: 10px;
  user-select: none;
`;

export const Info = styled.header`
  display: flex;
  flex-direction: row-reverse;
  width: 100%;
  padding: 10px;

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
`;

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
  margin-top: 10px;
`;

export const Title = styled.div`
  font-size: 1.5em;
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
  padding: 10px;

`

export const Comment = styled.div`
  padding: 10px;
  display: flex;
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
  justify-content: center;
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