import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import { AiOutlinePlus } from "react-icons/ai";
import Search from "../Generics/Search/Search";
import SubMenu from "../SubMenu/SubMenu";
import { CiSquarePlus } from "react-icons/ci";

import {
  Center,
  IconItem,
  Left,
  Logo,
  Menu,
  MenuItem,
  NavContainer,
  ProfileImage,
  Right,
} from "./NavStyles";
import { BiTerminal } from "react-icons/bi";

export default function Nav() {
  const { user } = useContext(AuthContext);

  return (
    <NavContainer>
      <Menu>
        <Left>
          <Link to="/">
            <MenuItem>
              <Logo>
                <BiTerminal />
              </Logo>
            </MenuItem>
          </Link>
        </Left>

        <Center>
          <Search />
        </Center>

        <Right>
          <Link to="/publicar">
            <MenuItem>
              <IconItem>
                <AiOutlinePlus />
              </IconItem>
            </MenuItem>
          </Link>

          <Link to={`/profile/${user.username}`}>
            <MenuItem>
              <ProfileImage>
                <Avatar
                  alt="User image"
                  src={user.profilePhoto}
                  sx={{ width: "30px", height: "30px" }}
                  variant="rounded"
                />
              </ProfileImage>
            </MenuItem>
          </Link>
        </Right>

      </Menu>
    </NavContainer>
  );
}
