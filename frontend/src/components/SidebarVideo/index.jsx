import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import {
  MdOutlinePlaylistPlay,
  MdHistory,
  MdHistoryToggleOff,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import {
  Icon,
  Label,
  Line,
  MenuItem,
  SidebarContainer,
  TecnologyIcon,
} from "./styles";
import { useQuery } from "@tanstack/react-query";
import { findLanguages } from "../../services/Api";
import Loading from "../Generics/Loading/Loading";

export default function Sidebar() {
  const path = window.location.pathname;
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleSelectItemMenu = (item) => {
    setSelectedMenuItem(item);
  };


  const { data: tecnologies, isLoading: isLoadingTecnologies } = useQuery(
    ["languages"],
    () => findLanguages(),
    {
      staleTime: 5000 * 1000,
    }
  );

  useEffect(() => {
    setSelectedMenuItem(path);
  }, [path]);

  if (isLoadingTecnologies) {
    return <Loading color="#FFF" />;
  }

  return (
    <SidebarContainer>
        <Link>
          <MenuItem
            selected={selectedMenuItem === "/library"}
            onClick={() => handleSelectItemMenu("/library")}
          >
            <Icon>
              <MdOutlineVideoLibrary />
            </Icon>
            <Label>Biblioteca</Label>
          </MenuItem>
        </Link>

        <Link>
          <MenuItem
            selected={selectedMenuItem === "/history"}
            onClick={() => handleSelectItemMenu("/history")}
          >
            <Icon>
              <MdHistory />
            </Icon>
            <Label>Histórico</Label>
          </MenuItem>
        </Link>

        <Link>
          <MenuItem
            selected={selectedMenuItem === "/WL"}
            onClick={() => handleSelectItemMenu("/WL")}
          >
            <Icon>
              <MdHistoryToggleOff />
            </Icon>
            <Label>Assistir mais tarde</Label>
          </MenuItem>
        </Link>

        <Link>
          <MenuItem
            selected={selectedMenuItem === "/playlists"}
            onClick={() => handleSelectItemMenu("/playlists")}
          >
            <Icon>
              <MdOutlinePlaylistPlay />
            </Icon>
            <Label>Playlists</Label>
          </MenuItem>
        </Link>

        <Line />

        {tecnologies.map((language) => (
          <Link>
            <MenuItem key={language.id}>
              <TecnologyIcon src={language.icon} />
              <Label>{language.name}</Label>
            </MenuItem>
          </Link>
        ))}

        <Line />
    </SidebarContainer>
  );
}
