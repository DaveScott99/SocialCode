import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import Badge from "../../Generics/Badge/Badge";
import Modal from "../../Generics/Modal/Modal";
import ConfigAccount from "../ConfigAccount/ConfigAccount";
import { Avatar } from "@mui/material";
import { Badges, Followers, Footer, Header, Name, Title, UserAvatar, UserData, UserInfoContainer, Username } from "./UserInfoStyles";
import InputAvatar from "../InputAvatar/InputAvatar";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { Button } from "../../Generics/Button/Button";
import { followUser } from "../../../services/Api";
import ConfigFollow from "../ConfigFollow/ConfigFollow";
import { useSelector } from "react-redux";

export default function UserInfo({ currentUser }) {

    const { user } = useContext(AuthContext);

    //const { currentUser, followers, following } = useSelector((rootReducer) => rootReducer.userReducer);
    
    const [isFollowChange, setIsFollowChange] = useState(false);
    const [loading, setLoading] = useState(false);

    //setIsFollowChange(followers.some(follower => follower.id === user.id));

    const handleClickFollow = async (followerId, userId) => {
        setLoading(true);
        try {
            await followUser(followerId, userId);
            setIsFollowChange(!isFollowChange);
        }
        finally {
            setLoading(false);
        }
    }
 
    return(
        <UserInfoContainer>
            
            <UserAvatar>
                <Avatar src={currentUser.profilePhoto} sx={{width: '200px', height: '200px'}} variant="rounded"/>

                {
                    
                    user.id === currentUser.id
                                ?
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
                            : 
                            null
                        
                } 
            
            </UserAvatar>

            <UserData>

                <Header>
                    <Name>{currentUser.firstName} {currentUser.lastName}</Name>

                    {
                        /*
                        currentUser.id !== user.id
                                        ? 
                                        
                                            isFollowChange
                                                ? 
                                                    <Modal 
                                                        textButton="Seguindo"
                                                        buttonBorderRadius="5"
                                                        buttonFontWeight="bold"
                                                        buttonWidth={20}
                                                        buttonTextCenter="center"
                                                        buttonBackground="#dedede"
                                                        buttonHoverBackground="#c2c2c29e"
                                                        buttonFontColor="#000000"
                                                    > 
                                                        <ConfigFollow userData={currentUser}/>
                                                    </Modal>
                            
                                                : 
                                                    <Button 
                                                        onClick={() => handleClickFollow(currentUser.id, user.id)}
                                                        borderradius="5"
                                                        fontWeight="bold"
                                                        loading={loading}
                                                        loadingColor="#fff"
                                                        loadingHeight="25"
                                                        loadingWidth="25"
                                                        justify="center"
                                                        width={20}
                                                    > 
                                                      Seguir
                                                    </Button>     
                                        
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
                                            */
                        
                    }
                </Header>
               
                <Username> {currentUser.username} </Username>
                <Title> {currentUser.title} </Title>

                <Footer>

                    <Followers> {/*followers.length */} Seguidores</Followers>

                    <Followers> {/*following.length*/} Seguindo</Followers>    

                    <Badges>

                        <Badge 
                            imgBagde="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                            link={`https://github.com/${currentUser.gitHubLink}`} />
                        <Badge 
                            imgBagde="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-plain.svg"
                            link={`https://www.linkedin.com/in/${currentUser.linkedinLink}/`} />
                            
                    </Badges>
                </Footer>
            </UserData>

        </UserInfoContainer>
    );
};