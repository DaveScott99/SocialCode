import React from "react";
import { Link } from "react-router-dom";
import { BiTerminal } from "react-icons/bi";

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
import Footer from "../Footer";

export default function Sidebar() {
  return (
    <SidebarContainer>
      <Link to="/">
        <Logo>
          <BiTerminal />
        </Logo>
      </Link>

      <Menu>
        <Link to="/">
          <MenuItem>
            <Icon></Icon>
            <Label>Página inicial</Label>
          </MenuItem>
        </Link>
        <Link to="/">
          <MenuItem>
            <Icon></Icon>
            <Label>Explorar</Label>
          </MenuItem>
        </Link>
        <Link to="/">
          <MenuItem>
            <Icon></Icon>
            <Label>Itens salvos</Label>
          </MenuItem>
        </Link>

        <LineSeparator>
          <Line />
          <SectionName>Aprender</SectionName>
        </LineSeparator>

        <Link to="/">
          <MenuItem>
            <Icon></Icon>
            <Label>Cursos</Label>
          </MenuItem>
        </Link>
        <Link to="/">
          <MenuItem>
            <Icon></Icon>
            <Label>Tutoriais</Label>
          </MenuItem>
        </Link>
        <Link to="/">
          <MenuItem>
            <Icon></Icon>
            <Label>Desafios</Label>
          </MenuItem>
        </Link>

        <LineSeparator>
          <Line />
          <SectionName>Outros</SectionName>
        </LineSeparator>

        <Link to="/">
          <MenuItem>
            <Icon></Icon>
            <Label>Configurações</Label>
          </MenuItem>
        </Link>
      </Menu>

      <Footer />
    </SidebarContainer>
  );
}
