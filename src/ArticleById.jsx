import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { get } from './utils/api';
import Comments from './Comments';
import './index.css';

function ArticleById() {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        get(`/articles/${article_id}`)
            .then((data) => {
                setArticle(data.article);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
        }, [article_id]);

    if (isLoading) return <p>Loading article...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
    <>
        <div className='singleArticle'>
            <h2>{article.title}</h2>
            <div className='singleArtBox'>
                <span> By {article.author}</span>
                <span> {article.topic}</span>
                <span> Created: {new Date(article.created_at).toLocaleString()}</span>
            </div>
            <img src={article.article_img_url} alt={article.title} />
            <p> Votes: {article.votes} </p>
            <p>{article.body}</p>
            <hr />
            <p >View Comments </p>
        </div>
        <Comments />
    </>
  );
}

export default ArticleById;