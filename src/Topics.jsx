import React, { useState, useEffect } from 'react';
import { get } from './utils/api';
import { Link } from "react-router-dom";
import './index.css';

function Topics() {
    const [topics, setTopics] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        get('/topics')
        .then((data) => {
            setTopics(data.topics);
            setIsLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setIsLoading(false);
        });
    }, []);

    if (isLoading) return <p>Loading topics...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <ul className='topicsList'>
            {topics.map((topic) => (
                <li className='topicCard' key={topic.slug}>
                    <h3 className='topicSlug'>{topic.slug}</h3>
                    <p className='topicDescription'>{topic.description}</p>
                </li>
            ))}
        </ul>
    );
};

export default Topics;