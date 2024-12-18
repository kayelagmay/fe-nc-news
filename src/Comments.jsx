import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { get } from './utils/api';
import './index.css';

function Comments() {
    const { article_id } = useParams();
    const [comments, setComments] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        get(`/articles/${article_id}/comments`)
            .then((data) => {
                setComments(data.comments);
                setIsLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
        }, [article_id]);

    if (isLoading) return <p>Loading article...</p>;
    if (error) return <p>Error: {error}</p>;

    if (comments.length === 0) return <p>No comments yet. Be the first to comment!</p>;

    return (
        <div className='commentsBox'>
            <h3>Comments ({comments.length})</h3>
            <ul className='commentsList'>
                {comments.map((comment) => (
                    <li className='commentCard' key={comment.comment_id}>
                        <p><strong>{comment.author}</strong> said:</p>
                        <p>{comment.body}</p>
                        <p>Votes: {comment.votes}</p>
                        <p>Posted on: {new Date(comment.created_at).toLocaleString()}</p>
                    </li>
                    ))}
            </ul>
        </div>
    );
};

export default Comments;