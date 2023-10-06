import styled, { keyframes } from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${(props) => props.theme.colors.white};
    z-index: 10;
`

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
`

export const Logo = styled.div`
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.colors.black};

    svg {
        font-size: 5em;
        user-select: none;
        animation: ${pulse} 2s infinite;
    }

`