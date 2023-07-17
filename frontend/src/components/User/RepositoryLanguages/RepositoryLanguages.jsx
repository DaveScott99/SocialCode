import React from "react";
import { searchLanguagesOnRepos } from "../../../services/Api-GitHub";
import Container from "../../Generics/Container/Container";
import { LanguageName } from "./LanguagesStyles";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Generics/Loading/Loading";

export default function RepositoryLanguages({ owner, repositoryName }) {
  const { data, isLoading } = useQuery(
    ["repositoryLanguages", owner, repositoryName],
    async () => {
      const languages = await searchLanguagesOnRepos(owner, repositoryName);
      const limitedLanguages = Object.keys(languages.data).slice(0, 3);
      return limitedLanguages;
    },
    {
      staleTime: 1000 * 100,
    }
  );

  if (isLoading) {
    return <Loading height="20" width="20" color="#fff" />;
  }

  return (
    <Container>
      {data.map((languageName, index) => (
        <LanguageName key={index} className="language-name">
          {languageName}
        </LanguageName>
      ))}
    </Container>
  );
}
