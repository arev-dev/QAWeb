import PostList from "../components/PostList.jsx";

function Home() {
  return (
    <div className="p-4  min-h-screen mt-14">
      <h1 className="text-3xl font-extrabold text-center text-blue-600 mb-6 mt-4">
        QA Blog - Tus preguntas siempre tienen respuestas!
      </h1>
      <div className="max-w-4xl mx-auto">
        <PostList />
      </div>
    </div>
  );
}

export default Home;
