import React, { useContext } from "react"
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { AiFillHome } from "react-icons/ai";
import { IconItem, Menu, MenuItem, NameItem, NavContainer, ProfileImage } from "./NavStyles";
import Search from "../Generics/Search/Search";
import SubMenu from "../SubMenu/SubMenu";
import { CiSquarePlus } from "react-icons/ci"

export default function Nav() {

  const { user } = useContext(AuthContext);
  
  return(
      <NavContainer>
        <Menu>
          
            <Link to="/">
              <MenuItem>
                <IconItem>
                  <AiFillHome />
                </IconItem>
                <NameItem>
                  Home
                </NameItem>
              </MenuItem>
            </Link>

            <Search />

            <Link to={`/profile/${user.username}`}>
              <MenuItem>
                <ProfileImage>
                    <Avatar alt="User image" src={user.profilePhoto} sx={{ width: '30px', height: '30px' }}/>
                </ProfileImage>
                <NameItem>
                  Perfil
                </NameItem>
              </MenuItem>
            </Link>

            <Link to="/publicar">
              <MenuItem>
                <IconItem>
                  <CiSquarePlus />
                </IconItem>
                <NameItem>
                  Home
                </NameItem>
              </MenuItem>
            </Link>


          <SubMenu />

        </Menu>
      </NavContainer>
    );
}