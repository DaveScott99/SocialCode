import { styled } from "styled-components";

export const Container = styled.div`
  color: ${(props) => props.theme.colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 10px;
`;

export const MessageTitle = styled.div`
  font-size: 1.3em;
  font-weight: 400;
`;

export const MessageBody = styled.div`
  font-size: 1em;
  font-weight: 300;
  margin-top: 15px;
`;

export const MessageContainer = styled.div`
  margin-bottom: 10px;
`;

export const ContainerButtons = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  justify-content: flex-end;

  button {
    width: 100px;
  }
`;
