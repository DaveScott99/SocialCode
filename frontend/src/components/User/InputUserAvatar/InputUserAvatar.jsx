import React, { useContext, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai"
import Button from '../../Generics/Button/Button'
import { AuthContext } from '../../../contexts/Auth/AuthContext';
import { uploadProfilePhoto } from "../../../services/Api";
import Loading from "../../Generics/Loading/Loading";

import './InputUserAvatar.css';

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
        <div className="input-user-avatar-container">
            <h2>Editar foto</h2>
            <label className="picture-user-avatar" tabIndex="0" >
                <input 
                        type="file"
                        name="Image" 
                        accept="image/jpeg, image/png" 
                        className="picture-input"
                        onChange={handleImageChange}
                />
                <span className="picture-user-avatar-preview">
                    {previewImage 
                                ? <img src={previewImage} alt="Preview" className="image" />
                                : 
                                <div className="upload-image-container">
                                    <AiOutlineCloudUpload className="upload-icon"/>
                                    <span>Carregar foto</span>
                                </div>
                    }
                </span>
            </label>
            {loading 
                    ? <Button className="btn-upload-user-avatar" text="Salvar foto" onClick={handleUploadProfilePhoto} disabled={!selectedImage}/>
                    : <Loading />
            }
            
        </div>
    );
};
