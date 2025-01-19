import React, { useState } from 'react';
import { useActionForm, useGlobalAction } from "@gadgetinc/react";
import { api } from "../api";
import { Navigate } from "react-router";
import './ChatInput.css'; // Import the CSS file

export const ChatInput = () => {
  // Destructure t_act directly
  const [{t_data, t_fetching, t_error}, t_act] = useGlobalAction(api.groq_txt); 
  const [{ a_data, a_fetching, a_error }, a_act] = useGlobalAction(api.groq_audio);
  const [{ v_data, v_fetching, v_error }, v_act] = useGlobalAction(api.groq_vision); 
  const [message, setMessage] = useState('');
  const [files, setFiles] = useState([]);
  const [txt, setTxt] = useState(null);
  const [img, setImg] = useState(null);
  const [audio, setAudio] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (txt) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        const fileContent = event.target.result;
        console.log('fileContent', fileContent);
        void t_act({ text: fileContent }); 
        setTxt(null);
      };
      reader.readAsText(txt);
    }
    if (audio) {
      console.log('audio:', audio);
      void a_act({ audio: audio });
      setAudio(null);
    }
    if (img) {
      console.log('img:', img);
      void v_act({ image: img });
      setImg(null);
    }
    return <Navigate to="/meetings" />;
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    for (const file of selectedFiles) {
      if (file.type.startsWith('audio/')) {
        setAudio(file);
      } else if (file.type === 'image/jpeg') {
        setImg(file);
      } else {
        setTxt(file);
      }
    };
    setFiles(selectedFiles);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl animate-fade-in">
      <div className="input-container">
        <input
          type="file"
          id="file-input"
          accept="image/jpg, audio/mp3, text/plain"
          multiple
          onChange={handleFileChange}
        />
        <label htmlFor="file-input" className="custom-file-input">
          Choose File
        </label>
        <button type="submit">Send</button>
      </div>
      <div className="file-list">
        {files.map((file, index) => (
          <div key={index}>{file.name}</div>
        ))}
      </div>
    </form>
  );
};

export default ChatInput;