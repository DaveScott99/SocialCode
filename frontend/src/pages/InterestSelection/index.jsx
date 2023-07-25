import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { findLanguages, updateUser } from "../../services/Api";
import { Button } from "../../components/Generics/Button/Button";
import { CgClose } from "react-icons/cg";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Auth/AuthContext";
import LoadingFullScreen from "../../components/Generics/LoadingFullScreen";
import { useNavigate } from "react-router";

import {
  Container,
  ContainerLanguages,
  ContainerSelectedLanguages,
  Language,
  LanguageIcon,
  LanguageName,
  Overlay,
  RemoveLanguage,
  SelectedLanguage,
} from "./styles";

export default function InterestSelection() {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(user);

  const navigate = useNavigate();

  console.log(currentUser);

  const { data: languages, isLoading } = useQuery(["languagesInterest"], () =>
    findLanguages()
  );

  const handleSelectLanguage = (language) => {
    if (!currentUser.interest.includes(language)) {
      setCurrentUser({
        ...currentUser,
        interest: [...currentUser.interest, language],
      });
    }
  };

  const handleRemoveSelectedLanguage = (language) => {
    const newArray = [...currentUser.interest];
    const index = newArray.indexOf(language);
    if (index !== -1) {
      newArray.splice(index, 1);
      setCurrentUser({ ...currentUser, interest: newArray });
    }
  };

  const submitInterest = async () => {
    const updateUserResponse = await updateUser(currentUser.id, currentUser);
    if (updateUserResponse) {
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(currentUser));
      navigate("/");
    }
  };

  if (isLoading) {
    return <LoadingFullScreen />;
  }

  return (
    <Overlay>
      <Container>
        <h1>No que você tem interesse?</h1>

        <p>
          Selecione pelo menos 1 tecnologia em que você tem interesse para
          ajudar a personalizar sua experiência no SocialCode.
        </p>

        {currentUser.interest.length > 0 && (
          <ContainerSelectedLanguages>
            {currentUser.interest.map((language) => (
              <SelectedLanguage key={language.id}>
                <RemoveLanguage
                  onClick={() => handleRemoveSelectedLanguage(language)}
                >
                  <CgClose />
                </RemoveLanguage>
                <LanguageIcon src={language.icon} alt="icone da linguagem" />
              </SelectedLanguage>
            ))}
          </ContainerSelectedLanguages>
        )}

        <ContainerLanguages>
          {languages.map((language) => (
            <Language
              key={language.id}
              onClick={() => handleSelectLanguage(language)}
            >
              <LanguageIcon src={language.icon} alt="icone da linguagem" />
              <LanguageName>{language.name}</LanguageName>
            </Language>
          ))}
        </ContainerLanguages>

        <Button
          padding={10}
          borderradius={5}
          fontSize={1}
          fontWeight={500}
          disabled={currentUser.interest.length < 1}
          onClick={submitInterest}
        >
          Finalizar
        </Button>
      </Container>
    </Overlay>
  );
}
