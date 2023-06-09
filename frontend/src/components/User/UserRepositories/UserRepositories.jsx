import React, { useEffect, useState } from "react";
import { searchRepositoriesByUser } from "../../../services/Api-GitHub";
import RepositoryLanguages from "../RepositoryLanguages/RepositoryLanguages";
import Container from "../../Generics/Container/Container";
import { BiStar, BiGitRepoForked } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai"
import Input from "../../Generics/Input/Input";

import "./UserRepositories.css";

export default function UserRepositories({ gitHubUsername }) {

    const [projects, setProjects] = useState([]);
    
    useEffect(() => {

        async function fetchRepositories()  {
            const repos = await searchRepositoriesByUser(gitHubUsername, 1);
            setProjects(repos.data);
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

    }, [])

    
    
    return (
        <Container className="projects-container">


          <Input 
            name="search-repository" 
            type="text" 
            placeholder="Pesquisar repositórios" 
            className="search-repository-input"
          />
       

          {projects.map((project) => (
              <div className="project-card" key={project.id}>
                  <h3 className="repository-name">{project.name}</h3>

                  <div className="repository-details">

                    <div className="status">
                      <span className="forks item"><BiGitRepoForked />  {project.forks_count}</span>
                      <span className="watchers item"><AiFillEye /> {project.watchers_count}</span>
                      <span className="stars item"><BiStar /> {project.stargazers_count}</span>
                    </div>
                
                    <div className="languages">
                      <RepositoryLanguages owner={project.owner.login} repositoryName={project.name} />
                    </div>

                  </div>
                
                  

              </div>
          ))} 

        </Container>
    );
};