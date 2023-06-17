import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import Badge from "../../Generics/Badge/Badge";
import Modal from "../../Generics/Modal/Modal";
import ConfigAccount from "../ConfigAccount/ConfigAccount";
import { Avatar } from "@mui/material";
import { Badges, Followers, Footer, Header, Name, Title, UserAvatar, UserData, UserInfoContainer, Username } from "./UserInfoStyles";
import InputAvatar from "../InputAvatar/InputAvatar";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { Button } from "../../Generics/Button/Button";

export default function UserInfo({ userData }) {

    const { user } = useContext(AuthContext);

    return(
        <UserInfoContainer>
            
            <UserAvatar>
                <Avatar src={user.profilePhoto} sx={{width: '200px', height: '200px'}} variant="rounded"/>

                <Modal 
                    textButton={<MdOutlineAddAPhoto />}
                    buttonBackground="#0000007b"
                    buttonPadding="10"
                    buttonBorderRadius="5"
                    buttonFontWeight="bold"
                    buttonFontSize="1.5"
                    buttonHoverBackground="#000000"
                    positionButton="absolute"
                    top="0"
                    right="0"
                    title="Editar foto"
                >
                    <InputAvatar />
                </Modal>
            
            </UserAvatar>

            <UserData>

                <Header>
                    <Name>{userData.firstName} {userData.lastName}</Name>

                    {
                        userData.id !== user.id
                                        ? <Button text="Seguir" />
                                        : 
                                            <Modal 
                                                textButton="Editar perfil"
                                                buttonPadding="10"
                                                buttonBorderRadius="5"
                                                buttonFontWeight="bold"
                                                title="Editar perfil"
                                            > 
                                                <ConfigAccount />
                                            </Modal>
                    }
                </Header>
               
                <Username> {userData.username} </Username>
                <Title> {userData.title} </Title>

                <Footer>
                    <Followers>0 Seguidores</Followers>

                    <Badges>

                        <Badge 
                            imgBagde="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                            link={`https://github.com/${user.gitHubLink}`} />
                        <Badge 
                            imgBagde="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-plain.svg"
                            link={`https://www.linkedin.com/in/${user.linkedinLink}/`} />
                            
                    </Badges>
                </Footer>
            </UserData>

        </UserInfoContainer>
    );
};