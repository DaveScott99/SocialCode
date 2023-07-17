import { styled } from "styled-components";

export const Container = styled.div`
  width: 100%;
  color: ${(props) => props.theme.colors.black};
  flex: 1 0 auto;  
  margin-bottom: 20px;
  display: flex; 
  flex-direction: row-reverse;
`;

export const ContainerVotes = styled.div`
  width: 50px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${(props) => props.theme.colors.white};
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
`;

export const ImagePost = styled.img`
  width: 600px;
  height: 300px;
  border-radius: 10px;
  user-select: none;
`;

export const Info = styled.header`
  display: flex;
  flex-direction: column;
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
  align-items: center;
  line-height: 10px;
  justify-content: space-between;
`;

export const Owner = styled.div`
  display: flex;
  align-items: center;
`;

export const Username = styled.span`
  font-weight: 600;
  font-size: .8em;
  margin-right: 5px;
  background: #0095ff23;
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
