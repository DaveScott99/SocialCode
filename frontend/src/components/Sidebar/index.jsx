import React from "react";
import { Link } from "react-router-dom";
import { BiTerminal, BiSearchAlt, BiMoviePlay } from "react-icons/bi";
import { BsGrid } from "react-icons/bs";
import Footer from "../Footer";
import { useState } from "react";

import {
  Icon,
  Label,
  Line,
  LineSeparator,
  Logo,
  Menu,
  MenuItem,
  SectionName,
  SidebarContainer,
} from "./styles";
import { useEffect } from "react";

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
              <BiSearchAlt />
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

        <LineSeparator>
          <Line />
          <SectionName>Outros</SectionName>
        </LineSeparator>

        <Link to="/">
          <MenuItem
            selected={selectedMenuItem === "/configuration"}
            onClick={() => handleSelectItemMenu("/configuration")}
          >
            <Icon></Icon>
            <Label>Configurações</Label>
          </MenuItem>
        </Link>
      </Menu>

      <Footer />
    </SidebarContainer>
  );
}
