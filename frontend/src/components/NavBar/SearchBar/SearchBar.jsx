import React, { useState } from "react"
import { BsSearch } from 'react-icons/bs';

import './SearchBar.css'

export default function SearchBar(){

    const [searchValue, setSearchValue] = useState('');

    return(
        <form className="search-bar">
            <input 
                type="search" 
                value={searchValue}
                placeholder="Buscar" 
                className="seach_input" 
                onChange={ ({ target }) => setSearchValue(target.value)}
                required 
            />
            
            <button type="submit" className="search_button">
                <BsSearch />
            </button>
        </form>
    )
}