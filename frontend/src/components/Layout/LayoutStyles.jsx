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

  a {
    text-decoration: none;
  }
`;

export const AsideButton = styled.button`
  margin-right: 20px;
  margin-left: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  background: none;
  padding: 10px;
  border-radius: 50%;
  border: none;
  transition: all .1s;

  &:hover {
    background: ${(props) => props.theme.colors.grey};
  }

  svg {
    font-size: 1.8em;
    font-weight: 200;
  }
`

export const Logo = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  width: 400px;
  max-width: 400px;

  a {
    color: ${(props) => props.theme.colors.black};
    display: flex;
    align-items: center;
  }

  svg {
    font-size: 2.2em;
    user-select: none;
  }
`;

export const PlataformName = styled.h1`
    font-size: 1.2em;
    margin-left: 5px;
`

export const Main = styled.main`
  width: 100vw;
  display: flex;
  flex-direction: row-reverse;
  height: 100vh;
  overflow: hidden;
  background: ${(props) => props.theme.colors.background_color};  
`

export const Content = styled.div`
  width: 100%;
  overflow: auto;
  height: 100vh;
  padding: 10px;
  display: flex;
  flex-direction: column;
`

export const Aside = styled.aside`
  width: 100%;
  max-width: ${(props) => props.expand ? "220px" : "80px"};
  margin-right: 10px;
  background: ${(props) => props.theme.colors.background_color};
  padding: 10px;
  overflow: hidden;

  &:hover {
    overflow: auto;
  }

`

export const NavAside = styled.ul`

  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.black};
    font-weight: 500;
    width: 100%;
    max-width: ${(props) => props.expand ? "" : "50px"};
    margin-bottom: 5px;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: ${(props) => props.expand ? "" : "center"};
    border-radius: 5px;
    padding: 10px;
    width: 100%;
    max-width: ${(props) => props.expand ? "" : "50px"};

    svg {
      margin-right: ${(props) => props.expand ? "10px" : ""};
      display: flex;
      align-items: center;
    }

    img {
      margin-right: ${(props) => props.expand ? "10px" : ""};
    }

    span {
      display: ${(props) => props.expand ? "block" : "none"};
    }
  }
`

export const Sentinel = styled.div`
  width: 100%;
  height: 40px;
`
