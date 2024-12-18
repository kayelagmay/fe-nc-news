import React, { useEffect, useState } from 'react';
import { get } from './utils/api';
import { Link } from "react-router-dom";
import './index.css';

function ArticleCard() {
    const [articles, setArticles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        get('/articles')
        .then((data) => {
            setArticles(data.articles);
            setIsLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <p>Loading articles...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ul className='articleList'>
            {articles.map((article) => (
                <li className='articleCard' key={article.article_id}>
                    <Link to={`/articles/${article.article_id}`}>
                        <h3 className='articleTitle'>{article.title}</h3>
                        <img className='articleImg' src={article.article_img_url} alt={article.title}/>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default ArticleCard;