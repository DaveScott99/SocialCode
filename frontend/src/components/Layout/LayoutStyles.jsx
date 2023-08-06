import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  background: ${(props) => props.theme.colors.white_smoke};

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const Main = styled.main`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid red;
  width: 100%;
`;

export const ContentContainer = styled.main`
  background: ${(props) => props.theme.colors.white};
  width: 90vw;
  margin-right: 10px;
  border-radius: 20px;
  padding: 10px;
`

export const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 88vh;
  overflow: auto;

`

export const Sentinel = styled.div`
  width: 100%;
  height: 10px;
`