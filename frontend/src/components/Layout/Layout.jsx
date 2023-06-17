import React from "react";
import { Header, Main, Sidebar, Wrapper } from "./LayoutStyles";
import Nav from "../Nav/Nav"
import Search from "../Generics/Search/Search";

export default function Layout({ children }) {
    return (
        <Wrapper>
            <Main>
                <Header>
                    <div className="search-bar">
                        <Search />
                    </div>

                </Header>
                { children }
            </Main>

            <Sidebar>
                <Nav />
            </Sidebar>

        </Wrapper>  
    );
};
