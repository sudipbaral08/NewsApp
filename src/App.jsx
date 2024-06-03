import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import News from "./components/news/News";

const App = () => {
  return (
    <div className="min-h-screen px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 bg-white text-gray-600 text-lg">
      <Navbar />
      <div className="mt-6 mb-10">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
