import React, { useState } from "react";
import CreatePostInput from "../components/CreatePostInput.jsx";
import PostList from "../components/PostList.jsx";

function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-4 min-h-screen mt-14">
      <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6 mt-4">
        QA Blog - Tus preguntas siempre tienen respuestas!
      </h1>
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300 mb-6"
            onClick={openModal}
          >
            Hacer una pregunta
          </button>
        </div>
        <PostList />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          {/* Modal Container */}
          <div className="relative bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            {/* Botón de Cerrar */}
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-3xl"
              onClick={closeModal}
            >
              &times;
            </button>

            {/* Componente CreatePostInput */}
            <CreatePostInput />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
