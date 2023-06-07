import React, { useContext, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai"
import Button from '../Button/Button'
import { AuthContext } from '../../contexts/Auth/AuthContext';
import { uploadProfilePhoto } from "../../services/Api";

import './InputUserAvatar.css';

export default function InputUserAvatar() {

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

            <Button className="btn-upload-user-avatar" text="Salvar foto" onClick={handleUploadProfilePhoto} disabled={!selectedImage}/>
        </div>
    );
};
