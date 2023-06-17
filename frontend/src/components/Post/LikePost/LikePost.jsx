import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { likePost } from "../../../services/Api";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/Auth/AuthContext";

export function LikePost({ post, hasLiked, index }) {

    const { user } = useContext(AuthContext);

    const [liked, setLiked] = useState(true);

    const clickLike = async (postLiked, index) => {
        setLiked(prevLike => {
            const liked = [...prevLike];
            liked[index] = !liked[index];
            return liked;
        });

        await likePost(postLiked.id, user.id);

    };

    return (
        <span onClick={() => { clickLike(post, index) }}>
                {!liked[index] && hasLiked
                    ? <AiFillHeart className="icon-interaction" />
                    : liked[index] && !hasLiked 
                        ? <AiFillHeart className="icon-interaction" /> 
                        : <AiOutlineHeart className="icon-interaction" />}
        </span>
    )
}