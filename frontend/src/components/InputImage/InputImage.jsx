import React, { useState } from "react";
import { MdOutlineAddAPhoto } from "react-icons/md"

import './InputImage.css';

export default function InputImage({ currentImage }) {

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

    return (
        <div>
            <div className="picture" tabIndex="0" >
                <span className="picture_image">
                    {previewImage 
                                ? <img src={previewImage} alt="Preview" className="image" />
                                : <img src={currentImage} alt="Profile current pic" className="image" />
                    }
                </span>
                <div className="icon-input-container" >
                    <label>
                        <input 
                            type="file"
                            name="Image" 
                            accept="image/jpeg, image/png" 
                            id="picture-input"
                            onChange={handleImageChange}
                        />
                        <span 
                            type="button" 
                            className="icon-input" 
                            htmlFor="picture-input"
                        > 
                            <MdOutlineAddAPhoto />
                        </span>
                    </label>
                </div>
            </div>
        </div>
    );
};
