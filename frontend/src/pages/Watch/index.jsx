import React from "react";
import Player from "../../components/Player";
import { useParams } from "react-router";

export default function Watch() {

    const { filename } = useParams()

    return (
        <div>
            <Player filename={filename} />
        </div>
    );
}