import { useState } from "react";
import axios from "axios";

function CommentForm({ postId }) {
  const [content, setContent] = useState("");

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/api/Comment", { postId, content });
    setContent("");
  };

  return (
    <form onSubmit={handleCommentSubmit} className="mt-4 space-y-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Escribe tu comentario..."
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Comentar
      </button>
    </form>
  );
}

export default CommentForm;
