import { styled } from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  background: ${(props) => props.theme.colors.white};
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.08), 0 2px 4px 0 rgba(0, 0, 0, 0.12);
  z-index: 10;
`;

export const Content = styled.main`
  width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
  background: ${(props) => props.theme.colors.white};
  padding: 20px;
`

export const Sentinel = styled.div`
  width: 100%;
  height: 10px;
`