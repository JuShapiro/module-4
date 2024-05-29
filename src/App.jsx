import "modern-normalize";
import axios from "axios";
import "./App.css";

import { useEffect, useState } from "react";

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
  useEffect(() => {
    async function fetchArticles() {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://hn.algolia.com/api/v1/search?query=react"
        );
        setArticles(response.data.hits);
      } catch (error) {
        //
      } finally {
        setLoading(false);
      }
    }

    fetchArticles();
  }, []);
  return (
    <div>
      <h1>Latest articles</h1>
      {loading && <p>Loading data, please wait ...</p>}
      {articles.length > 0 && <ArticleList items={articles} />}
    </div>
  );
};

export default App;
