import React, { useContext, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai"
import Button from '../Button/Button'
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { uploadProfilePhoto } from "../../services/Api";

import './InputUserBackground.css';

export default function InputUserBackground() {

    const { user } = useContext(AuthContext);

    const [selectedImage, setSelectedImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);

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
        await uploadProfilePhoto(user.username, selectedImage);
    }

    return (
        <div className="input-image-background-container">

            <h2>Editar capa</h2>

            <label className="picture-backround" tabIndex="0" >
                <input 
                        type="file"
                        name="Image" 
                        accept="image/jpeg, image/png" 
                        className="picture-input-background"
                        onChange={handleImageChange}
                />
                <span className="picture-image-background">
                    {previewImage 
                                ? <img src={previewImage} alt="Preview" className="image" />
                                : 
                                <div className="upload-background-container">
                                    <AiOutlineCloudUpload className="upload-icon"/>
                                    <span>Carregar foto</span>
                                </div>
                    }
                </span>
            </label>

            <Button className="btn-upload-image-background" text="Salvar foto" onClick={handleUploadProfilePhoto} disabled={!selectedImage}/>
        </div>
    );
};
