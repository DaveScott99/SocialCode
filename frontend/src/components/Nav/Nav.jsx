import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "@mui/material";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { BiPlusCircle, BiEditAlt } from "react-icons/bi";
import { MdOutlineArrowBackIos } from "react-icons/md";
import ModalDialog from "../Generics/ModalDialog";
import DialogConfirmation from "../Generics/DialogConfirmation";
import Search from "../Generics/Search/Search";

import {
  BackArrow,
  IconItem,
  ItemNavigation,
  Label,
  LineSeparator,
  Menu,
  MenuItem,
  MenuNavigation,
  NavContainer,
  Right,
  SubMenuItem,
} from "./NavStyles";
import DropDownMenu from "../Generics/DropDownMenu";

export default function Nav({ backPath }) {
  const { user, logout } = useContext(AuthContext);
  const [isModalLoggout, setIsModalLoggout] = useState(false);
  const navigate = useNavigate();

  const path = window.location.pathname;
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);

  const handleSelectItemMenu = (item) => {
    setSelectedMenuItem(item);
  };

  useEffect(() => {
    setSelectedMenuItem(path);
  }, [path]);

  const handleOpenModalLoggout = () => {
    setIsModalLoggout(true);
  };

  const showPhoto = process.env.REACT_APP_API;

  return (
    <NavContainer>
      <Menu>
      
        <MenuNavigation>
          <Link to="/">
            <ItemNavigation
              selected={selectedMenuItem === "/"}
              onClick={() => handleSelectItemMenu("/")}
            >
              Início
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

          <MenuItem>
            <DropDownMenu
              iconMenu={
                <IconItem>
                  <BiPlusCircle />
                </IconItem>
              }
            >
              <Link to={`/publicar`}>
                <SubMenuItem><BiEditAlt />Criar postagem</SubMenuItem>
              </Link>

            </DropDownMenu>
          </MenuItem>

          <MenuItem>
            <DropDownMenu
              iconMenu={
                <Avatar
                  alt="User image"
                  src={showPhoto + `/storage/userPhoto?fileName=${user.photo}&folderName=${user.username}`}
                  sx={{ width: "30px", height: "30px", cursor: "pointer", marginLeft: "20px" }}
                  variant="rounded"
                />
              }
            >
              <Link to={`/profile/${user.username}`}>
                <SubMenuItem>
                  {user.username}
                </SubMenuItem>
              </Link>
              <LineSeparator />
              <SubMenuItem onClick={handleOpenModalLoggout}>Sair</SubMenuItem>
            </DropDownMenu>
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
