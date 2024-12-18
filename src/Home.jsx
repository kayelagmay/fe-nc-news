import React, { useEffect, useState } from 'react';
import ArticleCard from './ArticleCard';
import './index.css';

function Home() {
  return (
    <div className='articleBox'>
        <h2>Browse All Articles</h2>
        <ArticleCard />
    </div>
  );
};

export default Home;