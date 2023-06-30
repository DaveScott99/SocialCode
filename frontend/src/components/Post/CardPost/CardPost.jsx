import { Avatar } from "@mui/material"
import { dateFormat } from "../../../utils/FormatDateInfo"
import { Link } from "react-router-dom"
import { BiCommentDetail } from "react-icons/bi"
import { IoIosShareAlt } from "react-icons/io"
import { CardBody, CardContainer, CardFooter, CardHeader, InteractionButton, PostDate, UserInfo, Username } from "./CardPostStyles"
import { LikePost } from "../LikePost/LikePost"

export function CardPost({ post, hasLiked, index }) {

    return (
        <CardContainer>

            <CardHeader>
                <UserInfo>

                    <Link to={`/profile/${post.owner.username}`}>
                        <Avatar alt="User image" src={post.owner.profilePhoto} />
                    </Link>

                    <Link to={`/profile/${post.owner.username}`}>
                        <Username>{post.owner.username}</Username>
                    </Link>

                </UserInfo>
                <PostDate>· {dateFormat(post.creationDate)}</PostDate>
            </CardHeader>  

            <CardBody>
                { post.body }
            </CardBody>

            <CardFooter>
                <InteractionButton>
                    
                    <LikePost post={post} index={index} hasLiked={hasLiked}/>

                </InteractionButton>

                <InteractionButton>
                    <BiCommentDetail /> 0
                </InteractionButton>

                <InteractionButton>
                    <IoIosShareAlt />
                </InteractionButton>
            </CardFooter>

        </CardContainer>

    )
}