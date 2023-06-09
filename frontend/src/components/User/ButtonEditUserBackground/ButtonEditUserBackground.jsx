import React, { useState } from "react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import DefaultModal from "../../Generics/DefaultModal/DefaultModal";
import InputUserBackground from "../InputUserBackground/InputUserBackground"

import './ButtonEditUserBackground.css'

export default function ButtonEditUserBackground() {

    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <>

        <div>
             <div className="icon-input-container" >
                <label>
                    <span 
                        type="button" 
                        className="icon-input" 
                        htmlFor="picture-input"
                        onClick={() => setIsModalVisible(true)}
                    > 
                        <MdOutlineAddAPhoto />
                    </span>
                </label>
            </div>
        </div>
        
        {isModalVisible 
            ? 
            <DefaultModal onClose={() => setIsModalVisible(false)}>
                <InputUserBackground />
            </DefaultModal>
            :
            null
        }

    </>
    );
};