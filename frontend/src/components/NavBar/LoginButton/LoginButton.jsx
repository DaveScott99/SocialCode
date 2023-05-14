import React from "react";
import { BiUserCircle } from 'react-icons/bi'

import './LoginButton.css'

export default function LoginButton(){
    return(
        <button type="button" className="login_button">
            <BiUserCircle />
        </button>
    );
};