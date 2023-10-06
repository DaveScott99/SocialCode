import { styled } from "styled-components";

export const SearchContainer = styled.div`

  
  width: 100%;
  max-width: 400px;

  margin-right: 20px;

`;

export const SearchInput = styled.input`
  width: 100%;

  padding: 10px 10px 9px 10px;
  border-radius: 10px;
  background: ${(props) => props.theme.colors.white_smoke};
  border: 1px solid ${(props) => props.theme.colors.grey};
  color: ${(props) => props.theme.colors.black};
  font-size: 0.8em;
  outline-color: ${(props) => props.theme.colors.primary};

  position: relative;
`;
