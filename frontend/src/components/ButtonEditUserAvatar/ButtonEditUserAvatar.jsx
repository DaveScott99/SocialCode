import React, { useState } from "react";
import { MdOutlineAddAPhoto } from "react-icons/md";
import DefaultModal from "../DefaultModal/DefaultModal";
import InputUserAvatar from "../InputUserAvatar/InputUserAvatar";

import './ButtonEditUserAvatar.css'

export default function ButtonEditUserAvatar() {

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
                <InputUserAvatar />
            </DefaultModal>
            :
            null
        }

    </>
    );
};