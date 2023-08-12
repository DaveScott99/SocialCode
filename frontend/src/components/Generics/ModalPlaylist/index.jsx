import React, { useContext } from "react";
import ModalDialog from "../ModalDialog";
import {
  CreateNewPlaylistContainer,
  FormNewPlaylist,
  HeaderModalSave,
  InputNamePlaylist,
  PlaylistItem,
  PlaylistsByOwner,
  TitleModalSave,
  TitlePlaylist,
} from "./styles";
import { BiPlus, BiX } from "react-icons/bi";
import { Button } from "../Button/Button";
import { useQuery } from "@tanstack/react-query";
import { AuthContext } from "../../../contexts/Auth/AuthContext";
import Loading from "../Loading/Loading";
import {
  addVideoOnPlaylist,
  createPlaylist,
  findPlaylistsByUser,
} from "../../../services/Api";
import { useState } from "react";

export default function ModalPlaylist({ onClose, videoFileName }) {
  const { user } = useContext(AuthContext);
  const [showNewPlaylistForm, setShowNewPlaylistForm] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({
    name: "",
    owner: {
      id: user.id,
    },
  });

  const { data: playlists, isLoading } = useQuery(
    [user.id],
    () => findPlaylistsByUser(user.username),
    { staleTime: 2000 * 100 }
  );

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setNewPlaylist({ ...newPlaylist, [name]: value });
  };

  console.log(newPlaylist);

  const handleCreatePlaylist = async () => {
    const response = await createPlaylist(newPlaylist);
    if (response) {
      addVideoOnPlaylist(newPlaylist.name, videoFileName);
    }
  };

  const handleClickAddVideoOnPlaylist = (playlistName) => {
    addVideoOnPlaylist(playlistName, videoFileName);
    onClose();
  };

  if (isLoading) {
    return <Loading color="#FFF" />;
  }

  const validatorInput = () => {
    return newPlaylist.name.toString().length > 1;
  };

  return (
    <ModalDialog onClose={onClose}>
      <HeaderModalSave>
        <TitleModalSave>Salvar vídeo em...</TitleModalSave>
        <BiX onClick={onClose} />
      </HeaderModalSave>

      <PlaylistsByOwner>
        {playlists.map((playlist) => (
          <PlaylistItem
            key={playlist.id}
            onClick={() => handleClickAddVideoOnPlaylist(playlist.name)}
          >
            <TitlePlaylist>{playlist.name}</TitlePlaylist>
          </PlaylistItem>
        ))}
      </PlaylistsByOwner>

      <CreateNewPlaylistContainer>
        {!showNewPlaylistForm ? (
          <Button
            background="#FFF"
            hoverbackground="#ebebeb"
            fontcolor="#000"
            borderradius={5}
            width={100}
            onClick={() => setShowNewPlaylistForm(!showNewPlaylistForm)}
          >
            <BiPlus /> Criar nova playlist
          </Button>
        ) : (
          <FormNewPlaylist>
            <InputNamePlaylist
              type="text"
              placeholder="Nome da playlist"
              name="name"
              onChange={onChangeInput}
            />

            <Button
              type="button"
              background="#FFF"
              hoverbackground="#ebebeb"
              fontcolor="#0073ff"
              borderradius={20}
              width={30}
              justify="center"
              onClick={handleCreatePlaylist}
              disabled={!validatorInput()}
            >
              Criar
            </Button>

            <Button
              type="button"
              background="#FFF"
              hoverbackground="#ebebeb"
              fontcolor="#0073ff"
              borderradius={20}
              width={30}
              justify="center"
              onClick={() => setShowNewPlaylistForm(!showNewPlaylistForm)}
            >
              Cancelar
            </Button>
          </FormNewPlaylist>
        )}
      </CreateNewPlaylistContainer>
    </ModalDialog>
  );
}
