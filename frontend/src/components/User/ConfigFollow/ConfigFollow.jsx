import React, { useContext, useState } from "react";
import { unfollowUser } from "../../../services/Api";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import { Button } from "../../Generics/Button/Button";

export default function ConfigFollow({ userData }) {

    const { user } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const handleClickUnfollow = async (followerId, userId) => {
        setLoading(true);
        try {
            await unfollowUser(followerId, userId);
            window.location.reload();
        }
        finally {
            setLoading(false);
        }
    }

    return (
       <>
            <Button
             onClick={() => handleClickUnfollow(userData.id, user.id)}
             width="100"
             fontSize="1"
             padding="10"
             borderradius="10"
             background="#fff"
             fontcolor="#000"
             fontWeight="500"
             hoverbackground="#c2c2c274"
             loading={loading}
             >
                Deixar de Seguir
            </Button>
       </>
    );
}