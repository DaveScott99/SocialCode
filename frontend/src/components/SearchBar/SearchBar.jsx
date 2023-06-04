import React from "react";
import Input from "../Input/Input"
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Avatar } from "@mui/material";
import { searchUsersByUsername } from "../../services/Api";
import { Link } from "react-router-dom";

import "./SearchBar.css";

export default function SearchBar() {

    const [searchResponse, setSearchResponse] = useState([]);
    const [modalSearchResponse, setModalSearchResponse] = useState(false);
    const modalSearchResponseRef = useRef(null);

    const handleClickShowSubMenu = () => {
        setModalSearchResponse(!modalSearchResponse);
    }

    const style = modalSearchResponse ? { display: 'block' } : { display: 'none' };

    useEffect(() => {
        const closeModalSearchResponse = (event) => {
            if (modalSearchResponse && !modalSearchResponseRef.current.contains(event.target)) {
                setModalSearchResponse(false);
            }
        }
        
        document.addEventListener('mousedown', closeModalSearchResponse);

        return () => {
            document.removeEventListener('mousedown', closeModalSearchResponse);
        }

    }, [modalSearchResponse])

    const onChangeUsernameSearch = async (event) => {

        handleClickShowSubMenu();

        const usernameSearch = event.target.value;

        if (usernameSearch.length >= 1) {
            var response = await searchUsersByUsername(usernameSearch);
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

            <div className="search-response" ref={modalSearchResponseRef} style={style}>
                <div className="card-response">
                    {
                        searchResponse &&
                            searchResponse.map((user) => (
                                <div className="container-response" key={user.id}>
                                    <div className="item">
                                        <Link to={`/profile/${user.username}`}>
                                            <Avatar className="img-response" src={user.userImg} /> 
                                            <span className="username-response">{user.username}</span> 
                                        </Link>  
                                    </div>
                                </div>
                            ))
                    }
                </div>
            </div>

        </div>
    );

};