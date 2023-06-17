import React, { useContext, useState } from "react";
import { validateTextPost } from "../../../utils/Validators";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { publishPost } from "../../../services/Api";
import { Avatar } from "@mui/material";
import { Button } from "../../Generics/Button/Button"
import { Container, ContentModal, Footer, HeaderModal, MainContent, Others, Separator, TextButton, UserImage, Username } from "./NewPostStyles";
import Modal from "../../Generics/Modal/Modal";
import TextArea from "../../Generics/TextArea/TextArea";
import { FcPicture } from "react-icons/fc"

export default function NewPost() {
    const { user } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState({
        body: '',
        user: {
            id: user.id
        }
    });

    /*Função para resgatar o oque foi digitado pelo usuário nos INPUTS, referenciando
    sempre pelo NAME do input e o seu valor */
    const onChange = (event) => {
        setLoading(false);
        const { name, value } = event.target;
        setPost({ ...post, [name]: value});
    }

    const insertPost = async () => {
        await publishPost(post);
        window.location.reload();
    }

    const validatorInput = () => {
        return validateTextPost(post.body);
    }

    return(
        <Container>
            <MainContent>
                <UserImage>
                    <Avatar alt="User image" src={user.profilePhoto} sx={{ width: 40, height: 40 }} />
                </UserImage>

                <Modal 
                    title="Criar publicação"
                    textButton="No que está pensando?"
                    buttonBackground="#F0F2F5"
                    buttonBorderRadius="10"
                    buttonFontColor="#969696"
                    buttonFontSize=".9"
                    buttonFontWeight="300"
                    buttonWidth="100"
                    buttonHoverBackground="#e4e9eec6"
                    buttonPadding="5"
                >

                    <ContentModal className="body">

                        <HeaderModal>
                            <Avatar alt="User image" src={user.profilePhoto} sx={{ width: 40, height: 40 }} />
                            <Username>{user.username}</Username>
                        </HeaderModal>

                        <TextArea 
                            name="body"
                            placeholder="No que está pensando?"
                            onChange={onChange}
                            background="#FFF"
                            padding="10"
                            height="150"
                        />
                        
                        <Others>
                            
                        </Others>

                        <Button 
                            type="submit" 
                            onClick={insertPost} 
                            width="100"
                            fontSize="1"
                            padding="10"
                            borderradius="5"
                            fontWeight="bold"
                            justify="center"
                            disabled={loading === true || !validatorInput()}
                        >
                            Publicar
                        </Button>
                            
                    </ContentModal>
                </Modal>
            </MainContent>    

            <Separator />

            <Footer>

                    <Button 
                        onClick={insertPost} 
                        width="30"
                        fontSize="1"
                        padding="10"
                        borderradius="5"
                        fontWeight="bold"
                        justify="center"
                        background="transparent"
                        fontcolor="#969696"
                        hoverbackground="#e4e9ee6d"
                        
                    > 
                        <FcPicture /> 
                        
                        <TextButton>Foto</TextButton> 
                    
                    </Button>     
            </Footer>

        </Container>
    );
}