import React, { useState, useContext } from 'react';
import { post } from './utils/api';
import { UserContext } from "./App";
import './index.css';

function CommentForm({ article_id, onCommentPosted }) {
    const user = useContext(UserContext);
    const [commentBody, setCommentBody] = useState('');
    const [isPosting, setIsPosting] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (commentBody.trim() === '') {
          setErrorMessage('Comment cannot be empty.');
          return;
        };
        setIsPosting(true);
        setErrorMessage(null);
        
        post(`/articles/${article_id}/comments`, { username: user.username, body: commentBody })
            .then((res) => {
                const newComment = res.comment
                setSuccessMessage('Your comment has been successfully posted!');
                setCommentBody('');
                setIsPosting(false);
                onCommentPosted(newComment);
            })
            .catch(() => {
                setErrorMessage('Failed to post your comment. Please try again.');
                setIsPosting(false);
            });
    };

    return (
        <form onSubmit={handleSubmit} className ='commentForm'>
            <div className="userDetails">
                <img src={user.avatar_url} alt={user.username} />
                <p>Commenting as {user.username}</p>
            </div>
            <textarea
                value={commentBody}
                onChange={(e) => setCommentBody(e.target.value)}
                placeholder='Add comment here...'
                rows='4'
                disabled={isPosting}>
            </textarea>
            <button type='submit' disabled={isPosting}>
                { isPosting ? 'Posting comment...' : 'Submit Comment' }
            </button>
            {successMessage && <p className='success'>{successMessage}</p>}
            {errorMessage && <p className='error'>{errorMessage}</p>}
        </form>
    );
};

export default CommentForm;