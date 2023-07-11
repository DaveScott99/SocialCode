import React from "react";
import { searchRepositoriesByUser } from "../../../services/Api-GitHub";
import RepositoryLanguages from "../RepositoryLanguages/RepositoryLanguages";
import { BiStar, BiGitRepoForked } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import {
  Card,
  Container,
  Details,
  Item,
  Languages,
  Main,
  RepositoriesResult,
  RepositoryName,
  SearchInput,
  Status,
} from "./RepositoriesStyles";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Generics/Loading/Loading";

export default function Repositories({ gitHubUsername }) {
  const { data, isLoading } = useQuery(
    ["userRepositories", gitHubUsername],
    async () => {
      const repos = await searchRepositoriesByUser(gitHubUsername, 1);
      return repos.data;
    },
    {
      staleTime: 1000 * 100,
    }
  );

  if (isLoading) {
    return <Loading color="#FFF" />;
  }

  return (
    <Container>
      <SearchInput
        name="search-repository"
        type="text"
        placeholder="Pesquisar repositórios"
      />
      <RepositoriesResult>
        {data.map((repository) => (
          <Card key={repository.id}>
            <Details>
              <Main>
                <RepositoryName>{repository.name}</RepositoryName>
                <Languages>
                  <RepositoryLanguages
                    owner={repository.owner.login}
                    repositoryName={repository.name}
                  />
                </Languages>
              </Main>
              <Status>
                <Item>
                  <BiGitRepoForked /> {repository.forks_count}
                </Item>
                <Item>
                  <AiFillEye /> {repository.watchers_count}
                </Item>
                <Item>
                  <BiStar /> {repository.stargazers_count}
                </Item>
              </Status>
            </Details>
          </Card>
        ))}
      </RepositoriesResult>
    </Container>
  );
}
