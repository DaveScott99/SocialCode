import React from "react";
import { Link } from "react-router-dom";
import { BiTerminal, BiMoviePlay, BiCompass, BiCog } from "react-icons/bi";
import { BsGrid } from "react-icons/bs";
import Footer from "../Footer";
import { useState } from "react";
import { useEffect } from "react";

import {
  Icon,
  Label,
  Logo,
  Menu,
  MenuItem,
  SidebarContainer,
} from "./styles";

export default function Sidebar() {
  const path = window.location.pathname;
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleSelectItemMenu = (item) => {
    setSelectedMenuItem(item);
  };

  useEffect(() => {
    setSelectedMenuItem(path);
  }, [path]);

  return (
    <SidebarContainer>
      <Link to="/">
        <Logo>
          <BiTerminal />
        </Logo>
      </Link>

      <Menu>
        <Link to="/">
          <MenuItem
            selected={selectedMenuItem === "/"}
            onClick={() => handleSelectItemMenu("/")}
          >
            <Icon>
              <BsGrid />
            </Icon>
            <Label>Feed</Label>
          </MenuItem>
        </Link>

        <Link to="/explore">
          <MenuItem
            selected={selectedMenuItem === "/explore"}
            onClick={() => handleSelectItemMenu("/explore")}
          >
            <Icon>
              <BiCompass />
            </Icon>
            <Label>Explorar</Label>
          </MenuItem>
        </Link>

        <Link to="/watch">
          <MenuItem
            selected={selectedMenuItem === "/watch"}
            onClick={() => handleSelectItemMenu("/watch")}
          >
            <Icon><BiMoviePlay /></Icon>
            <Label>Vídeos</Label>
          </MenuItem>
        </Link>

        <Link to="/">
          <MenuItem
            selected={selectedMenuItem === "/courses"}
            onClick={() => handleSelectItemMenu("/courses")}
          >
            <Icon></Icon>
            <Label>Cursos</Label>
          </MenuItem>
        </Link>

        <Link to="/">
          <MenuItem
            selected={selectedMenuItem === "/configuration"}
            onClick={() => handleSelectItemMenu("/configuration")}
          >
            <Icon><BiCog /></Icon>
            <Label>Configurações</Label>
          </MenuItem>
        </Link>
      </Menu>

      <Footer />
    </SidebarContainer>
  );
}
