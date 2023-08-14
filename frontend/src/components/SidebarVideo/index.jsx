import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import {
  MdVideoLibrary,
  MdOutlinePlaylistPlay,
  MdHistory,
  MdHistoryToggleOff,
  MdArrowDropDown,
  MdArrowDropUp,
} from "react-icons/md";
import {
  ExpansiveDiv,
  Icon,
  Label,
  Line,
  Menu,
  MenuItem,
  SidebarContainer,
  TecnologyIcon,
} from "./styles";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { findLanguages, findPlaylistsByUser } from "../../services/Api";
import Loading from "../Generics/Loading/Loading";

export default function Sidebar() {
  const { user } = useContext(AuthContext);
  const path = window.location.pathname;
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [showMorePlaylist, setShowMorePlaylist] = useState(false);

  const handleSelectItemMenu = (item) => {
    setSelectedMenuItem(item);
  };

  const { data: playlists, isLoading: isLoadingPlaylists } = useQuery(
    [user.id],
    () => findPlaylistsByUser(user.username),
    { staleTime: 2000 * 100 }
  );

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

  if (isLoadingPlaylists) {
    return <Loading color="#FFF" />;
  }

  return (
    <SidebarContainer>
      <Menu>
        <Link>
          <MenuItem
            selected={selectedMenuItem === "/"}
            onClick={() => handleSelectItemMenu("/")}
          >
            <Icon>
              <MdVideoLibrary />
            </Icon>
            <Label>Biblioteca</Label>
          </MenuItem>
        </Link>

        <Link>
          <MenuItem
            selected={selectedMenuItem === "/explore"}
            onClick={() => handleSelectItemMenu("/explore")}
          >
            <Icon>
              <MdHistory />
            </Icon>
            <Label>Histórico</Label>
          </MenuItem>
        </Link>

        <Link>
          <MenuItem
            selected={selectedMenuItem === "/explore"}
            onClick={() => handleSelectItemMenu("/explore")}
          >
            <Icon>
              <MdHistoryToggleOff />
            </Icon>
            <Label>Assistir mais tarde</Label>
          </MenuItem>
        </Link>

        <ExpansiveDiv isExpansive={showMorePlaylist}>
          {playlists.map((playlist) => (
            <Link to={`/playlist/${playlist.name}`}>
              <MenuItem key={playlist.id}>
                <Icon>
                  <MdOutlinePlaylistPlay />
                </Icon>
                <Label>{playlist.name}</Label>
              </MenuItem>
            </Link>
          ))}
        </ExpansiveDiv>

        <Link>
          <MenuItem onClick={() => setShowMorePlaylist(!showMorePlaylist)}>
            {!showMorePlaylist ? (
              <>
                <Icon>
                  <MdArrowDropDown />
                </Icon>
                <Label>Mostrar mais</Label>
              </>
            ) : (
              <>
                <Icon>
                  <MdArrowDropUp />
                </Icon>
                <Label>Mostrar menos</Label>
              </>
            )}
          </MenuItem>
        </Link>

        <Line />

        {tecnologies.map((language) => (
            <MenuItem key={language.id}>
              <TecnologyIcon src={language.icon} />
              <Label>{language.name}</Label>
            </MenuItem>
        ))}

        <Line />

      </Menu>
    </SidebarContainer>
  );
}
