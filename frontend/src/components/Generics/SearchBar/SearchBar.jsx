import React from "react";
import Input from "../Input/Input";
import { useState } from "react";
import { Avatar } from "@mui/material";
import { searchUsersByUsername } from "../../../services/Api";
import { Link } from "react-router-dom";

import "./SearchBar.css";

export default function SearchBar() {

    const [searchResponse, setSearchResponse] = useState([]);

    const onChangeUsernameSearch = async (event) => {

        const usernameSearch = event.target.value;

        if (usernameSearch.length >= 1) {
            var response = await searchUsersByUsername(usernameSearch);
            console.log(response)
        }
        
        if (response) {
            setSearchResponse(response.data.content);
        }

        if (usernameSearch.length <= 0) {
            setSearchResponse(null);
        }
    }


    return (
        <div className="container-search-input">
            <Input type="text" name="search" placeholder="Pesquisar no SocialCode" className="search-input" onChange={onChangeUsernameSearch} />

            <div className="search-response">
                <div className="card-response">
                    {
                        searchResponse &&
                            searchResponse.map((user) => (
                                <Link to={`/profile/${user.username}`} className="user-response" key={user.id}>
                                    <Avatar className="img-response" src={user.profilePhoto} /> 
                                    <span className="username-response">{user.username}</span> 
                                </Link>  
                            ))
                    }
                </div>
            </div>

        </div>
    );

};