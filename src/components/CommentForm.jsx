import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function CommentForm({ post }) {
  const [content, setContent] = useState("");
  const [postId, setPostId] = useState(post.id);
  const token = localStorage.getItem("authToken");
  const userId = jwtDecode(token).nameid;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5126/api/Comment", {
      userId,
      postId,
      content,
    });
    setContent("");
    window.location.reload();
  };

  return (
    <form onSubmit={handleCommentSubmit} className="mt-4 space-y-2 mb-6">
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
