import "modern-normalize";
import { fetchArticlesWithTopic } from "./articles-api";
import SearchForm from "./SearchForm";

import "./App.css";

import { useState } from "react";

const ArticleList = ({ items }) => (
  <ul>
    {items.map(({ objectID, url, title }) => (
      <li key={objectID}>
        <a href={url} target="_blank" rel="noreferrer noopener">
          {title}
        </a>
      </li>
    ))}
  </ul>
);

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const handleSearch = async (topic) => {
    try {
      setArticles([]);
      setError(false);
      setLoading(true);
      const data = await fetchArticlesWithTopic(topic);
      setArticles(data);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {loading && <p>Loading data, please wait ...</p>}
      {articles.length > 0 && <ArticleList items={articles} />}
      {error && (
        <p>Whoops, something went wrong! Please try reloading this page!</p>
      )}
    </div>
  );
};

export default App;
