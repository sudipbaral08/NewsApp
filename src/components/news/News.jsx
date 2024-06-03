import { useSearchParams } from "react-router-dom";
import apiClient from "../../Utils/api-client";
import Card from "../Card/Card";
import { useState, useEffect } from "react";
import NewsCardSkeleton from "./NewsCardSkeleton";

const News = () => {
  const apiKey = import.meta.env.VITE_API_KEY;

  const [isLoading, setIsLoading] = useState(false);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8];

  const [error, setError] = useState("");
  const [news, setNews] = useState([]);
  const [search, setSearch] = useSearchParams();

  const category = search.get("category");
  const searchQuery = search.get("q");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setPage(1);
  }, [category, searchQuery]);

  useEffect(() => {
    setIsLoading(true);
    apiClient
      .get("top-headlines", {
        params: {
          apiKey,
          q: searchQuery,
          country: "in",
          category,
          page,
        },
      })
      .then((res) => {
        const totalResults = res.data.totalResults;
        const pageSize = 20;
        setTotalPages(Math.ceil(totalResults / pageSize));
        setNews((prevNews) =>
          page === 1 ? res.data.articles : [...prevNews, ...res.data.articles]
        );
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [searchQuery, category, page]);

  const handleChange = (page) => {
    const currentParams = Object.fromEntries([...search]);

    setSearch({ ...currentParams, page: parseInt(currentParams.page) + 1 });
  };
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } =
        document.documentElement;
      if (
        scrollTop + clientHeight >= scrollHeight - 1 &&
        !isLoading &&
        news &&
        page < totalPages
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [news, isLoading, totalPages]);

  if (error) return <div>Error: {error}</div>;
  return (
    <div>
      {news.length === 0 && !isLoading && (
        <div className="no-results">No results found for "{searchQuery}"</div>
      )}
      <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {news.map((article, index) => (
          <Card key={index} article={article} />
        ))}
        {isLoading && skeletons.map((num) => <NewsCardSkeleton key={num} />)}
      </div>
    </div>
  );
};

export default News;
