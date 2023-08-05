import React from "react";
import Player from "../../components/Player";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { nextVideo } from "../../redux/video/actions";


export default function Watch() {

  const { filename } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(nextVideo(0));
  }, [filename])
  
  return (
    <div>
      <Player filename={filename} />
    </div>
  );
}
