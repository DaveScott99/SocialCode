import axios from "axios";

export const STREAMING_API = axios.create({
    baseURL: process.env.REACT_APP_STREAMING_API_URL,
});

export const getProgress = async (quality) =>  {
    try {
      return await STREAMING_API.get(`/streaming/${quality}/progress`);
    } catch (error) {
      console.error('Erro ao carregar o progresso do vídeo:', error);
    }
}

export const updateProgressOnServer = async (quality, currentTime) => {
    try {
      await STREAMING_API.patch(`/streaming/${quality}/progress?time=${currentTime}`);
    } catch (error) {
      console.error('Erro ao atualizar o progresso do vídeo:', error);
    }
}