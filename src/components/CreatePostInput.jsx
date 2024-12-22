import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const CreatePostInput = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const token = localStorage.getItem("authToken");

  let userId;
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.nameid;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5126/api/Post", {
        userId,
        title,
        content,
      });
      console.log("Post created:", response.data);
      setTitle("");
      setContent("");
      window.location.reload();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="max-w-3xl mb-8 mx-auto p-4 bg-white rounded">
      <h2 className="text-2xl font-bold mb-4">Publicar una pregunta</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="title"
          >
            Título
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            maxLength={50}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="content"
          >
            Contenido
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            rows="2"
            maxLength={500}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
        >
          Crear Publicación
        </button>
      </form>
    </div>
  );
};

export default CreatePostInput;
