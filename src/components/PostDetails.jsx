import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchPost() {
      const postResponse = await axios.get(`/api/Post/${id}`);
      setPost(postResponse.data);
      const commentsResponse = await axios.get(`/api/Post/comments/${id}`);
      setComments(commentsResponse.data);
    }
    fetchPost();
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      {post && (
        <>
          <h2 className="text-2xl font-bold">{post.title}</h2>
          <p>{post.content}</p>
          <div className="mt-4">
            <h3 className="text-xl">Comentarios</h3>
            {comments.map((comment) => (
              <div key={comment.id} className="p-4 border-b">
                <p>{comment.content}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default PostDetails;
