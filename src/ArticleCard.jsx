import React, { useEffect, useState } from 'react';
import { get } from './utils/api';
import './index.css';

function ArticleCard() {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        get('/articles')
        .then((data) => setArticles(data.articles))
        .catch((err) => console.error('Error fetching articles:', err));
    }, []);

    return (
        <ul className='articleList'>
            {articles.map((article) => (
                <li className='articleCard' key={article.article_id}>
                <h3 className='articleTitle'>{article.title}</h3>
                <img className='articleImg' src={article.article_img_url} alt='Article Image'/>
                </li>
            ))}
        </ul>
    );
};

export default ArticleCard;