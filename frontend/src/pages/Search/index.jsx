import React from "react";
import { useParams } from "react-router";
import {
  Container,
  Filter,
  Filters,
  SearchQuery,
  SearchResponseContainer,
} from "./styles";
import { useState } from "react";
import { useEffect } from "react";
import People from "../../components/Search/People";

export default function Search() {
  const { query } = useParams();
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleSelectFilter = (item) => {
    setSelectedFilter(item);
  };

  useEffect(() => {
    setSelectedFilter("all");
  }, []);

  return (
    <Container>
      <SearchResponseContainer>
        <SearchQuery>{query}</SearchQuery>
        <Filters>
          <Filter
            selected={selectedFilter === "all"}
            onClick={() => handleSelectFilter("all")}
          >
            Tudo
          </Filter>
          <Filter
            selected={selectedFilter === "publications"}
            onClick={() => handleSelectFilter("publications")}
          >
            Publicações
          </Filter>
          <Filter
            selected={selectedFilter === "people"}
            onClick={() => handleSelectFilter("people")}
          >
            Pessoas
          </Filter>
        </Filters>

        { selectedFilter === "people" && (
            <People query={query} />
        )}

      </SearchResponseContainer>
    </Container>
  );
}
