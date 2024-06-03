import Card from "../Card/Card";
import { NavLink } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { useState, useEffect } from "react";
import apiClient from "../../Utils/api-client";
import NewsCardSkeleton from "../news/NewsCardSkeleton";

const categories = [
  "sports",
  "technology",
  "entertainment",
  "business",
  "health",
];

const Home = () => {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [newsData, setNewsData] = useState({
    sports: [],
    technology: [],
    entertainment: [],
    business: [],
    health: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNews = async (category) => {
    try {
      const response = await apiClient.get("/news", {
        params: {
          country: "in",
          category,
        },
      });
      return response.data.articles.slice(0, 4);
    } catch (err) {
      throw new Error(err.message);
    }
  };

  useEffect(() => {
    const loadAllNews = async () => {
      setIsLoading(true);
      try {
        const dataPromises = categories.map((category) => fetchNews(category));
        const results = await Promise.all(dataPromises);

        const newData = results.reduce((acc, articles, index) => {
          acc[categories[index]] = articles;
          return acc;
        }, {});

        setNewsData(newData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadAllNews();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      {categories.map((category) => (
        <div key={category} className="mb-8">
          <div className="font-semibold flex items-center gap-2 mb-6">
            <NavLink
              to={`/news?category=${category}`}
              className="text-3xl hover:underline "
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </NavLink>
            <FaArrowRightLong className="text-2xl" />
          </div>
          <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
            {isLoading &&
              [1, 2, 3, 4].map((num) => <NewsCardSkeleton key={num} />)}
            {!isLoading &&
              newsData[category].map((article) => (
                <Card key={article.url} article={article} />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
