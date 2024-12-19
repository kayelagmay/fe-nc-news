import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { get, patch } from './utils/api';
import Comments from './Comments';
import './index.css';

function ArticleById() {
    const { article_id } = useParams();
    const [article, setArticle] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [voteError, setVoteError] = useState(null);

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

    const handleVote = (increment) => {
        setArticle((currentArticle) => ({
            ...currentArticle,
            votes: currentArticle.votes + increment
        }));
        setVoteError(null);

        patch(`/articles/${article_id}`, { inc_votes: increment})
        .catch(() => {
            setArticle((currentArticle) => ({
                ...currentArticle,
                votes: currentArticle.votes - increment,
            }));
            setVoteError('Failed to register your vote. Please try again');
        });
    };

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
            <button onClick={() => handleVote(1)}>Upvote</button>
            <button onClick={() => handleVote(-1)}>Downvote</button>
            {voteError && <p className="error">{voteError}</p>}
            <p>{article.body}</p>
            <hr />
            <p >View Comments </p>
        </div>
        <Comments />
    </>
  );
}

export default ArticleById;