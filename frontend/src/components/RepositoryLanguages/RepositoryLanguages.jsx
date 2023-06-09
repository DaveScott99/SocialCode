import React, { useEffect, useState } from "react";
import { searchLanguagesOnRepos } from "../../services/Api-GitHub";

import './RepositoryLanguages.css';
import Container from "../Container/Container";

export default function RepositoryLanguages({ owner, repositoryName }) {
    
    const [repoLanguages, setRepoLanguages] = useState([]);

    useEffect(() => {

        const fetchLanguagesName = async () => {
            const languages = await searchLanguagesOnRepos(owner, repositoryName);
            const limitedLanguages = Object.keys(languages.data).slice(0, 3);
            setRepoLanguages(limitedLanguages);
        }

        fetchLanguagesName();

    }, [owner, repositoryName])

    return (
        <Container className="languages-container">
            {repoLanguages.map((languageName, index) => (
                <span key={index} className="language-name">{languageName}</span>
            ))}
        </Container>
    );
};