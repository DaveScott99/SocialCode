import React, { useState } from "react";
import DefaultModal from "../DefaultModal/DefaultModal";
import ConfigAccount from "../ConfigAccount/ConfigAccount";
import Button from "../Button/Button";

import "./EditProfileButton.css";

export default function EditProfileButton() {

    const [isModalVisible, setIsModalVisible] = useState(false);

    return (
        <div className="button-edit-container">
            <Button 
                onClick={() => setIsModalVisible(true)} 
                className="button-edit" 
                text="Editar perfil" 
            />
            { isModalVisible 
                        ? 
                        <DefaultModal onClose={() => setIsModalVisible(false)}>
                            <ConfigAccount />
                        </DefaultModal>
                        :
                        null
            }
        </div>
    )

}