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
import { findUserFollowers, findUserFollowing, followUser } from "../../../services/Api";
import ConfigFollow from "../ConfigFollow/ConfigFollow";

export default function UserInfo({ userData }) {

    const { user } = useContext(AuthContext);

    const [userFollowing, setUsersFollowing] = useState([]);
    const [userFollowers, setUserFollowers] = useState([]);
    const [isFollowChange, setIsFollowChange] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadData = async () => {

            const following = await findUserFollowers(userData.id);
            const followers = await findUserFollowing(userData.id);

            setUsersFollowing(following.data);
            setUserFollowers(followers.data);

            setIsFollowChange(followers.data.some(follower => follower.id === user.id));

        }
        loadData();
    }, [user.id, userData.id])

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
                <Avatar src={userData.profilePhoto} sx={{width: '200px', height: '200px'}} variant="rounded"/>

                {
                    user.id === userData.id
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
                    <Name>{userData.firstName} {userData.lastName}</Name>

                    {
                        userData.id !== user.id
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
                                                        <ConfigFollow userData={userData}/>
                                                    </Modal>
                            
                                                : 
                                                    <Button 
                                                        onClick={() => handleClickFollow(userData.id, user.id)}
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
                    }
                </Header>
               
                <Username> {userData.username} </Username>
                <Title> {userData.title} </Title>

                <Footer>

                    <Followers>{userFollowers.length} Seguidores</Followers>

                    <Followers>{userFollowing.length} Seguindo</Followers>    

                    <Badges>

                        <Badge 
                            imgBagde="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                            link={`https://github.com/${userData.gitHubLink}`} />
                        <Badge 
                            imgBagde="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-plain.svg"
                            link={`https://www.linkedin.com/in/${userData.linkedinLink}/`} />
                            
                    </Badges>
                </Footer>
            </UserData>

        </UserInfoContainer>
    );
};