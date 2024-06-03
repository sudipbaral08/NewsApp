import { formatDistanceToNow } from "date-fns";
import FakeImg from "../../assets/fake-img.png";

const Card = ({ article }) => {
  const truncateHeading = (heading) => {
    if (heading.length > 50) {
      return heading.slice(0, 50) + "...";
    }
    return heading;
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <a
      href={article.url}
      target="_blank"
      className=" p-4 flex flex-col gap-2 shadow-md bg-gray-100 rounded-lg hover:cursor-pointer hover:scale-105 transition-all duration-200 ease-in-out"
    >
      {article.urlToImage ? (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <img src={FakeImg} alt={FakeImg} />
      )}{" "}
      <h3 className=" font-semibold">{truncateHeading(article.title)}</h3>
      <div className="flex gap-2 justify-between items-center">
        <p className="font-medium text-base text-gray-500">
          {article.source.name}
        </p>
        <p className="font-medium text-base text-gray-500">
          {formatDate(article.publishedAt)}
        </p>
      </div>
    </a>
  );
};

export default Card;
