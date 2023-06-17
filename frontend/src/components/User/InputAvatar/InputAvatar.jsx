import React, { useContext, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai"
import { AuthContext } from '../../../contexts/Auth/AuthContext';
import { uploadProfilePhoto } from "../../../services/Api";
import Loading from "../../Generics/Loading/Loading";
import { Button } from "../../Generics/Button/Button"
import { ButtonUpload, ContainerInput, Image, Input, Picture, Preview } from "./InputAvatarStyles";

export default function InputUserAvatar() {

    const { user } = useContext(AuthContext);

    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } 
        else {
            setPreviewImage(null);
        }
    }

    const handleUploadProfilePhoto = async () => {
        setLoading(true);
        try {
            const imageUrl = await uploadProfilePhoto(user.username, selectedImage);

            const userLocalStorage = JSON.parse(localStorage.getItem("user"));
            userLocalStorage.profilePhoto = imageUrl.data.uri;
    
            localStorage.setItem("user", JSON.stringify(userLocalStorage));

            window.location.reload();
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <ContainerInput className="input-user-avatar-container">

            <Picture className="picture-user-avatar" tabIndex="0">
                
                <Input 
                    type="file"
                    accept="image/jpeg, image/png" 
                    onChange={handleImageChange}
                />

                <Preview>
                    {previewImage 
                                ? <Image src={previewImage} alt="Preview" />
                                : 
                                <ButtonUpload>
                                    <AiOutlineCloudUpload/>
                                    <span>Carregar foto</span>
                                </ButtonUpload>
                    }
                </Preview>

            </Picture>

            {loading 
                    ? <Button 
                        text="Salvar foto" 
                        onClick={handleUploadProfilePhoto} 
                        disabled={!selectedImage}
                        width="50"
                        padding="10"
                        borderradius="10"
                        fontSize="1"
                        fontWeight="bold"
                        justify="center"
                        >
                         Salvar    
                        </Button >
                    : <Loading />
            }
            
        </ContainerInput>
    );
};
