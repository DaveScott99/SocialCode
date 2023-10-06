import React from "react";
import {
  Container,
  Info,
  Person,
  Title,
  Username,
} from "./styles";
import { useQuery } from "@tanstack/react-query";
import { searchUsersByUsername } from "../../../services/Api";
import Loading from "../../Generics/Loading/Loading";
import { useNavigate } from "react-router";
import { Avatar } from "@mui/material";

export default function People({ query }) {
  const navigate = useNavigate();

  const { data: searchResponse, isLoading } = useQuery(
    [query],
    () => searchUsersByUsername(query),
    { staleTime: 2000 * 100 }
  );

  if (isLoading) {
    return <Loading color="#FFF" />;
  }

  return (
    <Container>
      {searchResponse.data.content.map((response) => (
        <Person key={response.id}>
          <Avatar
            src={response.profilePhoto}
            sx={{ width: "120px", height: "120px" }}
            variant="circle"
          />
          <Info>
            <Username onClick={() => navigate(`/profile/${response.username}`)}>
              {response.username}
            </Username>
            <Title>21 Anos 🌌 | Backend 💻 | Java, Spring, React 🪐</Title>
          </Info>
        </Person>
      ))}
    </Container>
  );
}
