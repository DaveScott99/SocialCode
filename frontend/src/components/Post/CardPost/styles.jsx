import { styled } from "styled-components";

export const Container = styled.article`
  color: ${(props) => props.theme.colors.black};
  margin: 10px;
`;

export const ContainerContent = styled.div`
  background: ${(props) => props.theme.colors.white};
  border-radius: 10px;
  width: 100%;
  cursor: pointer;

`;

export const Info = styled.header`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
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

  a {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
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
  font-size: 0.9em;
`;

export const PostBody = styled.div`
  margin-top: 10px;
`;

export const Title = styled.div`
  font-size: 1.3em;
  font-weight: 600;
  padding: 5px 0px 0px 0px;
`;

export const LanguageContainer = styled.div`
  padding: 5px;
`

export const Language = styled.img`
  color: ${(props) => props.theme.colors.white};
  width: 40px;
  height: 40px;
  object-fit: cover;
  margin-right: 3px;
  margin-left: 3px;
`;
