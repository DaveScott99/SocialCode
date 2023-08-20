import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import {
  MdOutlineGroups,
  MdCode,
  MdBookmarkBorder,
} from "react-icons/md";
import {
  Icon,
  Label,
  MenuItem,
  SidebarContainer,
} from "./styles";
import { BiGitRepoForked } from "react-icons/bi";

export default function SidebarPost() {
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

        <Link>
          <MenuItem
            selected={selectedMenuItem === "/groups"}
            onClick={() => handleSelectItemMenu("/groups")}
          >
            <Icon>
              <MdOutlineGroups />
            </Icon>
            <Label>Grupos</Label>
          </MenuItem>
        </Link>

        <Link>
          <MenuItem
            selected={selectedMenuItem === "/projects"}
            onClick={() => handleSelectItemMenu("/projects")}
          >
            <Icon>
              <BiGitRepoForked />
            </Icon>
            <Label>Projetos</Label>
          </MenuItem>
        </Link>

        <Link>
          <MenuItem
            selected={selectedMenuItem === "/saves"}
            onClick={() => handleSelectItemMenu("/saves")}
          >
            <Icon>
              <MdBookmarkBorder />
            </Icon>
            <Label>Posts salvos</Label>
          </MenuItem>
        </Link>

        <Link>
          <MenuItem
            selected={selectedMenuItem === "/technologies"}
            onClick={() => handleSelectItemMenu("/technologies")}
          >
            <Icon>
              <MdCode />
            </Icon>
            <Label>Tecnologias</Label>
          </MenuItem>
        </Link>

    </SidebarContainer>
  );
}
