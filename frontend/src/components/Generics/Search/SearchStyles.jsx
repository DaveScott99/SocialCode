import { styled } from "styled-components";

export const SearchContainer = styled.div`
  width: 100%;
  margin-right: 15px;

  svg {
    position: absolute;
    bottom: 8px;
    left: 8px;
    z-index: 10;
    font-size: 1.3em;
    color: ${(props) => props.theme.colors.black};
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 10px 10px 35px;
  border-radius: 20px;
  background: ${(props) => props.theme.colors.white_smoke};
  border: 1px solid ${(props) => props.theme.colors.grey};
  color: ${(props) => props.theme.colors.black};
  font-size: 0.8em;
  outline-color: ${(props) => props.theme.colors.primary};

  position: relative;
`;
