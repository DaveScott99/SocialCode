import { useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { useEffect } from "react";

export function useSessionStreaming() {
  const { user } = useContext(AuthContext);

  const [sessionStreaming, setSessionStreaming] = useState({
    sessionId: uuidV4(),
    currentVideoTime: 0,
    viewerUsername: user.username,
  });

  useEffect(() => {
    localStorage.setItem("session-stream", JSON.stringify(sessionStreaming));
  }, []);

  const handleSelectVideoQuality = (time) => {
    const saveVideoTime = {
      ...sessionStreaming,
      currentVideoTime: time,
    };
    setSessionStreaming(saveVideoTime);
    localStorage.setItem("session-stream", JSON.stringify(sessionStreaming));
  };

  return {
    sessionStreaming,
    handleSelectVideoQuality,
  };
}
