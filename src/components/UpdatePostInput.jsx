import React, { useEffect, useState } from "react";
import axios from "axios";

const UpdatePostInput = ({ post }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postId, setPostId] = useState(post.id);

  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
    setPostId(post.id);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("http://localhost:5126/api/Post", {
        id: postId,
        title,
        content,
      });
      console.log("Post updated:", response.data);
      setTitle("");
      setContent("");
      window.location.reload();
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  return (
    <div className="max-w-3xl mb-8 mx-auto p-4 bg-white rounded">
      <h2 className="text-2xl font-bold mb-4">Editar una publicación</h2>
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
          Actualizar Publicación
        </button>
      </form>
    </div>
  );
};

export default UpdatePostInput;
