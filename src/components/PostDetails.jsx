import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import UpdatePostInput from "./UpdatePostInput.jsx";

function PostDetails() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("authToken");
  const username = jwtDecode(token).unique_name;
  const userId = jwtDecode(token).nameid;
  const [userPostData, setUserPostData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchPost() {
      try {
        const postResponse = await axios.get(
          `http://localhost:5126/api/Post/${id}`
        );
        setPost(postResponse.data.data);

        const userPostResponse = await axios.get(
          `http://localhost:5126/api/Users/${postResponse.data.data.userId}`
        );
        setUserPostData(userPostResponse.data.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setError("Post no encontrado");
        } else {
          setError("Ocurrió un error al obtener la publicación");
        }
      }

      try {
        const commentsResponse = await axios.get(
          `http://localhost:5126/api/Post/comments/${id}`
        );
        setComments(commentsResponse.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setComments([]);
        } else {
          setError("Ocurrió un error al obtener los comentarios");
        }
      }
    }

    fetchPost();
  }, [id]);

  const formatTimeAgo = (createdAt) => {
    const now = new Date();
    const postDate = new Date(createdAt);
    const diffInSeconds = Math.floor((now - postDate) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInSeconds < 60) {
      return `Publicado hace ${diffInSeconds} segundo${
        diffInSeconds !== 1 ? "s" : ""
      }`;
    } else if (diffInMinutes < 60) {
      return `Publicado hace ${diffInMinutes} minuto${
        diffInMinutes !== 1 ? "s" : ""
      }`;
    } else if (diffInHours < 24) {
      return `Publicado hace ${diffInHours} hora${
        diffInHours !== 1 ? "s" : ""
      }`;
    } else {
      return `Publicado hace ${diffInDays} día${diffInDays !== 1 ? "s" : ""}`;
    }
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5126/api/Post/${id}`);
      window.location.href = "/";
    } catch (error) {
      setError("Ocurrió un error al eliminar la publicación");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (error) {
    return (
      <div
        className="text-red-500 text-center mt-10"
        style={{ marginTop: "2rem" }}
      >
        <h1 className="text-xl">{error}</h1>
      </div>
    );
  }

  return (
    <div
      className="max-w-4xl mx-auto p-6 mt-12 bg-white rounded-lg shadow-lg"
      style={{ marginTop: "7rem" }}
    >
      {post ? (
        <>
          <div className="flex items-center mb-4">
            <p className="text-sm text-gray-500 mb-4 me-2">
              {formatTimeAgo(post.createdAt)} por
            </p>
            {userPostData ? (
              <p className="text-sm text-gray-500 mb-4 font-bold">
                @{userPostData.username}
              </p>
            ) : (
              <p className="text-sm text-gray-500 mb-4 font-bold">
                Cargando...
              </p>
            )}
          </div>

          <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
            {post.title}
          </h1>
          <p className="text-lg text-gray-700 mb-6 break-words">
            {post.content}
          </p>

          {post.userId == userId && (
            <div className="flex gap-4">
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Editar
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          )}

          <div className="border-t-2 pt-6 mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Comentarios
            </h2>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="mb-4 p-4 bg-gray-100 rounded-lg shadow-sm"
                >
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No hay comentarios aún</p>
            )}
          </div>

          {/* Modal de edición */}
          {isModalOpen && post && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl"
                  onClick={closeModal}
                >
                  &times;
                </button>
                <UpdatePostInput post={post} />
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center">
          <p className="text-lg text-gray-600">Cargando...</p>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
