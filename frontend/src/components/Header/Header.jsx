import React from "react";
import MenuMore from "../MenuMore/MenuMore";

import './Header.css';

export default function Header() {
    return (
        <header className="header-container">

            <section className="options-container">

                <MenuMore />

            </section>

        </header>
    );
};