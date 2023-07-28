import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { AiOutlinePlus } from "react-icons/ai";
import Search from "../Generics/Search/Search";
import { BiTerminal } from "react-icons/bi";
import { BiHomeAlt } from "react-icons/bi";
import ModalDialog from "../Generics/ModalDialog";
import DialogConfirmation from "../Generics/DialogConfirmation";

import {
  Center,
  IconItem,
  Left,
  LineSeparator,
  Logo,
  Menu,
  MenuItem,
  NavContainer,
  ProfileImage,
  Right,
  SubMenuContainer,
  SubMenuContent,
  SubMenuItem,
} from "./NavStyles";

export default function Nav() {
  const { user, logout } = useContext(AuthContext);
  const [showSubMenuUser, setShowSubMenuUser] = useState(false);
  const [isModalLoggout, setIsModalLoggout] = useState(false);
  const subMenuRef = useRef(null);

  const handleOpenSubMenuUser = () => {
    setShowSubMenuUser(true);
  };

  useEffect(() => {
    const closeSubMenyOnClickOutside = (event) => {
      if (showSubMenuUser && !subMenuRef.current.contains(event.target)) {
        setShowSubMenuUser(false);
      }
    };

    document.addEventListener("mousedown", closeSubMenyOnClickOutside);

    return () => {
      document.removeEventListener("mousedown", closeSubMenyOnClickOutside);
    };
  }, [showSubMenuUser]);

  const handleOpenModalLoggout = () => {
    setIsModalLoggout(true);
  };

  return (
    <NavContainer>
      <Menu>

          {/*
          <Link to="/">
            <MenuItem>
              <Logo>
                <BiTerminal />
              </Logo>
            </MenuItem>
          </Link>
          */}

          <MenuItem>
            <Search />
          </MenuItem>

        <Right>
          <Link to="/publicar">
            <MenuItem>
              <IconItem>
                <AiOutlinePlus />
              </IconItem>
            </MenuItem>
          </Link>

          <MenuItem>
            <ProfileImage onClick={handleOpenSubMenuUser}>
              <Avatar
                alt="User image"
                src={user.profilePhoto}
                sx={{ width: "30px", height: "30px" }}
                variant="rounded"
              />
              {showSubMenuUser && (
                <SubMenuContainer ref={subMenuRef}>
                  <SubMenuContent>
                    <Link to={`/profile/${user.username}`}>
                      <SubMenuItem>
                        <BiHomeAlt /> {user.username}
                      </SubMenuItem>
                    </Link>
                    <Link to={`/publicar`}>
                      <SubMenuItem>Publicar novo conteúdo</SubMenuItem>
                    </Link>
                    <LineSeparator />
                    <SubMenuItem onClick={handleOpenModalLoggout}>
                      Sair
                    </SubMenuItem>
                  </SubMenuContent>
                </SubMenuContainer>
              )}
            </ProfileImage>
          </MenuItem>
        </Right>
      </Menu>

      {isModalLoggout ? (
        <ModalDialog>
          <DialogConfirmation
            title="Tem certeza que deseja sair?"
            onClose={() => setIsModalLoggout(false)}
            functionIfYes={logout}
          />
        </ModalDialog>
      ) : null}
    </NavContainer>
  );
}
