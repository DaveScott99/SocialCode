import React, { useEffect, useRef, useState } from "react";
import { searchUsersByUsername } from "../../../services/Api";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";

import {
  CardSearchResponse,
  SearchContainer,
  SearchInput,
  SearchResponse,
  SearchResponseContainer,
  Username,
} from "./SearchStyles";

export default function Search() {
  const [searchResponse, setSearchResponse] = useState([]);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const subMenuRef = useRef(null);

  const handleClickShowSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  const style = showSubMenu ? { display: "block" } : { display: "none" };

  useEffect(() => {
    const closeSubMenyOnClickOutside = (event) => {
      if (showSubMenu && !subMenuRef.current.contains(event.target)) {
        setShowSubMenu(false);
      }
    };

    document.addEventListener("mousedown", closeSubMenyOnClickOutside);

    return () => {
      document.removeEventListener("mousedown", closeSubMenyOnClickOutside);
    };
  }, [showSubMenu]);

  const onChangeUsernameSearch = async (event) => {
    const usernameSearch = event.target.value;

    if (usernameSearch.length >= 1) {
      var response = await searchUsersByUsername(usernameSearch);
    }

    if (response) {
      setSearchResponse(response.data.content);
    }

    if (usernameSearch.length <= 0) {
      setSearchResponse(null);
    }
  };

  return (
    <SearchContainer ref={subMenuRef}>
      <SearchInput
        type="text"
        name="search"
        placeholder="Pesquisar no SocialCode"
        onChange={onChangeUsernameSearch}
        onClick={handleClickShowSubMenu}
      />

      <SearchResponseContainer style={style}>
        <SearchResponse>
          <CardSearchResponse>
            {searchResponse &&
              searchResponse.map((user) => (
                <Link to={`/profile/${user.username}`} key={user.id}>
                  <Avatar src={user.profilePhoto} variant="rounded" />
                  <Username>{user.username}</Username>
                </Link>
              ))}
          </CardSearchResponse>
        </SearchResponse>
      </SearchResponseContainer>
    </SearchContainer>
  );
}
