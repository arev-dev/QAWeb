import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const token = localStorage.getItem("authToken");
  let userId;
  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.nameid;
    console.log("userId", userId);
  }
  useEffect(() => {
    async function fetchPosts() {
      const response = await axios.get("http://localhost:5126/api/Post");
      const allPosts = response.data.data;
      setPosts(allPosts.filter((post) => post.userId != userId));
      const filteredPosts = allPosts.filter((post) => post.userId == userId);
      setUserPosts(filteredPosts);
    }
    fetchPosts();
  }, [userId]);

  return (
    <div className="flex flex-col space-y-6 p-4">
      <div className="space-y-4">
        <h1 className="font-bold text-2xl text-slate-600">
          Tus preguntas actuales
        </h1>
        {userPosts.length > 0 ? (
          userPosts.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded shadow-sm cursor-pointer bg-slate-200 hover:bg-slate-300 transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-2 text-slate-700">
                {post.title}
              </h3>
              <p className="mb-4 text-slate-600">{post.content}</p>
              <div className="flex justify-end">
                <button className="text-blue-700">Ver publicación</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No has hecho preguntas aún.</p>
        )}
      </div>

      <div className="space-y-4">
        <h1 className="font-bold text-2xl text-slate-600">
          Preguntas de otras personas
        </h1>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded shadow-sm cursor-pointer bg-slate-200 hover:bg-slate-300 transition-all duration-300"
            >
              <h3 className="text-xl font-bold mb-2 text-slate-700">
                {post.title}
              </h3>
              <p className="mb-4 text-slate-600">{post.content}</p>
              <div className="flex justify-end">
                <button className="text-blue-700">Ver publicación</button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">
            No hay preguntas disponibles en este momento.
          </p>
        )}
      </div>
    </div>
  );
};

export default PostList;
