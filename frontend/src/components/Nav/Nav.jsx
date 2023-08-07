import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { BiCompass, BiHomeAlt, BiTerminal, BiPlusCircle } from "react-icons/bi";
import { BsCollectionPlay } from "react-icons/bs";
import { MdOutlineArrowBackIos } from "react-icons/md";
import ModalDialog from "../Generics/ModalDialog";
import DialogConfirmation from "../Generics/DialogConfirmation";
import Search from "../Generics/Search/Search";

import {
  BackArrow,
  IconItem,
  ItemNavigation,
  Label,
  Left,
  LineSeparator,
  Logo,
  Menu,
  MenuItem,
  MenuNavigation,
  NavContainer,
  PlataformName,
  ProfileImage,
  Right,
  SubMenuContainer,
  SubMenuContent,
  SubMenuItem,
} from "./NavStyles";

export default function Nav({ backPath }) {
  const { user, logout } = useContext(AuthContext);
  const [showSubMenuUser, setShowSubMenuUser] = useState(false);
  const [isModalLoggout, setIsModalLoggout] = useState(false);
  const subMenuRef = useRef(null);
  const navigate = useNavigate();

  const path = window.location.pathname;
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleSelectItemMenu = (item) => {
    setSelectedMenuItem(item);
  };

  useEffect(() => {
    setSelectedMenuItem(path);
  }, [path]);

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
        
        <Left>
          <Link to="/">
            <Logo>
              <BiTerminal />
              <PlataformName>SocialCode</PlataformName>
            </Logo>
          </Link> 
        </Left>


        <MenuNavigation>
        <Link to="/">
          <ItemNavigation
            selected={selectedMenuItem === "/"}
            onClick={() => handleSelectItemMenu("/")}
          >
            <IconItem>
              <BiHomeAlt />
            </IconItem>
          </ItemNavigation>
        </Link>

        <Link to="/explore">
          <ItemNavigation
            selected={selectedMenuItem === "/explore"}
            onClick={() => handleSelectItemMenu("/explore")}
          >
            <IconItem>
              <BiCompass />
            </IconItem>
          </ItemNavigation>
        </Link>

        <Link to="/watch">
          <ItemNavigation
            selected={selectedMenuItem === "/watch"}
            onClick={() => handleSelectItemMenu("/watch")}
          >
            <IconItem><BsCollectionPlay /></IconItem>
          </ItemNavigation>
        </Link>
        </MenuNavigation>

        <MenuItem>
          {backPath && (
            <BackArrow onClick={() => navigate(backPath)}>
              <MdOutlineArrowBackIos />
              <Label>Voltar</Label>
            </BackArrow>
          )}
        </MenuItem>

        <Right>
            <Search />

          <Link to="/publicar">
            <MenuItem>
              <IconItem>
                <BiPlusCircle />
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
