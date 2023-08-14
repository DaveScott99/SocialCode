import React from "react";

import { SearchContainer, SearchInput } from "./SearchStyles";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function Search() {

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const handleChangeSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  }

  return (
    <SearchContainer>
      <span>
        <SearchInput
          id="searchInput"
          type="text"
          name="search"
          placeholder="Pesquisar no SocialCode"
          autoComplete="off"
          onChange={(event) => handleChangeSearchQuery(event)}
          onKeyUp={(event) => {
            if (event.which === 13 || event.keyCode === 13) {
              if (searchQuery.length > 0) {
                navigate(`/search/${searchQuery}`)
              }
            } 
          }}  
        />
      </span>
    </SearchContainer>
  );
}
