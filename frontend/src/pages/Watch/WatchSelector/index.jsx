import React from "react";
import {
  Container,
  TechnologyItem,
  TechonologyIcon,
  TechonologyName,
} from "./styles";
import { useQuery } from "@tanstack/react-query";
import { findLanguages } from "../../../services/Api";
import Loading from "../../../components/Generics/Loading/Loading";
import { useNavigate } from "react-router";

export default function WatchSelector() {

  const navigate = useNavigate();

  const { data: technologies, isLoading } = useQuery(["technologies"], () =>
    findLanguages()
  );

  if (isLoading) {
    return <Loading color="#FFF" />;
  };

  return (
    <Container>
      {technologies.map((tech) => (
        <TechnologyItem key={tech.id} onClick={() => navigate(`/watch/${tech.name}`)}>
          <TechonologyIcon src={tech.icon} />
          <TechonologyName>{tech.name}</TechonologyName>
        </TechnologyItem>
      ))}
    </Container>
  );
}
