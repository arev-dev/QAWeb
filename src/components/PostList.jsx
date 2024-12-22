import React, { useState, useEffect } from "react";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const response = await axios.get("http://localhost:5126/api/Post");
      setPosts(response.data.data);
    }
    fetchPosts();
  }, []);

  return (
    <div className="flex flex-wrap -mx-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="p-4  rounded shadow-sm w-full m-4 bg-slate-200"
        >
          <h3 className="text-xl font-bold mb-2 text-slate-700">
            {post.title}
          </h3>
          <p className="mb-4 text-slate-600">{post.content}</p>
          <button className="text-blue-500" onClick={() => {}}>
            Ver más
          </button>
        </div>
      ))}
    </div>
  );
};

export default PostList;
