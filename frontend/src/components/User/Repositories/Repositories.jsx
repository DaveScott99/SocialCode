import React, { useEffect, useState } from "react";
import { searchRepositoriesByUser } from "../../../services/Api-GitHub";
import RepositoryLanguages from "../RepositoryLanguages/RepositoryLanguages";
import { BiStar, BiGitRepoForked } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai"
import { Card, Container, Details, Item, Languages, Main, RepositoriesResult, RepositoryName, SearchInput, Status } from "./RepositoriesStyles";
import { useSelector } from "react-redux";

export default function Repositories({ gitHubUsername }) {

    const [projects, setProjects] = useState([]);

    //const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);
    
    useEffect(() => {

        async function fetchRepositories()  {
            const repos = await searchRepositoriesByUser(gitHubUsername, 1);

            if (repos) {
              setProjects(repos.data);
            }
            else {
              console.log("Nenhum Repositorio");
            }
            
        }
      
        fetchRepositories();

        const handleImageResize = () => {
            const images = document.querySelectorAll('img');
      
            images.forEach((image) => {
              image.style.maxWidth = '700px';
              image.style.height = 'auto';
            });
          };
      
          window.addEventListener('load', handleImageResize);
          return () => {
            window.removeEventListener('load', handleImageResize);
          };

    }, [gitHubUsername])

    return (
        <Container>
          <SearchInput
            name="search-repository" 
            type="text" 
            placeholder="Pesquisar repositórios" 
          />
          <RepositoriesResult>
            {projects.map((project) => (
                <Card key={project.id}>
                    <Details>
                      <Main>
                        <RepositoryName>{project.name}</RepositoryName>
                        <Languages>
                          <RepositoryLanguages owner={project.owner.login} repositoryName={project.name} />
                        </Languages>
                      </Main>
                      <Status>
                        <Item><BiGitRepoForked /> {project.forks_count}</Item>
                        <Item><AiFillEye /> {project.watchers_count}</Item>
                        <Item><BiStar /> {project.stargazers_count}</Item>
                      </Status>
                    </Details>
                </Card>
            ))} 
          </RepositoriesResult>
        </Container>
    );
};