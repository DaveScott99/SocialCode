import React from "react";
import MDEditor, { commands } from "@uiw/react-md-editor";
import { useState } from "react";
import { useEffect } from "react";

import "./styles.css";

export default function TextEditor() {
  const [value, setValue] = React.useState("");

  const [newPost, setNewPost] = useState({
    body: value,
  });

  useEffect(() => {
    const storedPost = JSON.parse(localStorage.getItem("current-newPost"));
    if (storedPost) {
      setNewPost(storedPost);
      setValue(storedPost.body);
    }
  }, []);

  const handleValueChange = (newValue) => {
    setValue(newValue);

    const updatedPost = {
      ...newPost,
      body: newValue,
    };
    setNewPost(updatedPost);
    localStorage.setItem("current-newPost", JSON.stringify(updatedPost));
  };

  return (
    <div className="container-editor" data-color-mode="light">
      <MDEditor
        value={value}
        name="body"
        onChange={handleValueChange}
        preview="edit"
        height={400}
        extraCommands={[
          commands.codeEdit,
          commands.codePreview,
          commands.fullscreen,
        ]}
      />
    </div>
  );
}
