import React, { useEffect, useState } from "react";
import { searchLanguagesOnRepos } from "../../../services/Api-GitHub";
import Container from "../../Generics/Container/Container";
import { LanguageName } from "./LanguagesStyles";

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
        <Container>
            {repoLanguages.map((languageName, index) => (
                <LanguageName key={index} className="language-name">{languageName}</LanguageName>
            ))}
        </Container>
    );
};