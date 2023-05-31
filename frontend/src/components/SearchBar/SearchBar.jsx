import React from "react";
import Input from "../Input/Input"
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

import "./SearchBar.css";
import { Avatar } from "@mui/material";
import { searchUsersByUsername } from "../../services/Api";

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
                            searchResponse.map((users) => (
                                <div className="container-response" key={users.id}>
                                    <Avatar className="img-response" src={users.userImg} /> 
                                    <span className="username-response">{users.username}</span> 
                                </div>  
                            ))


                    }
                </div>

            </div>

        </div>
    );

};