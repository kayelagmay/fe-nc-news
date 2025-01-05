import React, { useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";
import { get, deleteComment } from './utils/api';
import CommentForm from './CommentForm';
import { UserContext } from "./App";
import './index.css';

function Comments() {
    const { article_id } = useParams();
    const [comments, setComments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(null); 
    const [error, setError] = useState(null);
    const user = useContext(UserContext);

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

    const handleNewComment = (newComment) => {
        setComments((currentComments) => {
            if (!currentComments) return [newComment];
            const updatedComments = [newComment, ...currentComments];
            return updatedComments
        });
    };

    const handleDelete = (comment_id) => {
        setIsDeleting(comment_id)

        deleteComment(comment_id)
        .then(() => {
          setComments((currentComments) =>
            currentComments.map((comment) => comment.comment_id === comment_id
                ? { ...comment, body: "[This comment has been deleted]" }
                : comment));
          setIsDeleting(null); 
        })
        .catch((err) => {
          console.error("Failed to delete comment:", err.message);
          setIsDeleting(null);
        });
    };

    if (isLoading) return <p>Loading article...</p>;
    if (error) return <p>Error: {error}</p>;

    if (comments.length === 0) return <p>No comments yet. Be the first to comment!</p>;

    return (
        <>
        <CommentForm article_id={article_id} onCommentPosted={handleNewComment} />
        <div className='commentsBox'>
            <h3>Comments ({comments.length})</h3>
            <ul className='commentsList'>
                {comments.map((comment) => (
                    <li className='commentCard' key={comment.comment_id}>
                        <p><strong>{comment.author}</strong> said:</p>
                        <p>{comment.body}</p>
                        <p>Votes: {comment.votes}</p>
                        <p>Posted on: {new Date(comment.created_at).toLocaleString()}</p>
                        {comment.author === user.username && <button onClick={() => handleDelete(comment.comment_id)} 
                        disabled={isDeleting === comment.comment_id}>
                            {isDeleting === comment.comment_id ? "Deleting..." : "Delete"}
                        </button>}
                    </li>
                ))}
            </ul>
        </div>
        </>
    );
};

export default Comments;