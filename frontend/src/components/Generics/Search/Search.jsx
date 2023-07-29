import React from "react";
import { BiSearch } from "react-icons/bi";

import { SearchContainer, SearchInput } from "./SearchStyles";

export default function Search() {
  return (
    <SearchContainer>
      <span>
        <BiSearch name="search"/>
        <SearchInput
          type="text"
          name="search"
          placeholder="Pesquisar no SocialCode"
          autocomplete="off"
        />
      </span>
    </SearchContainer>
  );
}
