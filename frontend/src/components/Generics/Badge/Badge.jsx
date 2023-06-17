import React from "react";
import { BadgeContainer, BadgeImage } from "./BadgeStyles";

export default function Badge({ imgBagde, link }) {
    return (
        <BadgeContainer>
            <BadgeImage href={link} target="_blank" rel="noreferrer">
                <img src={imgBagde} alt="Bagde" />
            </BadgeImage>
        </BadgeContainer>
    );
};