import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import ArticleById from './ArticleById';
import './App.css';

function App() {
  return (
    <div className='app'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path="/articles/:article_id" element={<ArticleById />} />
      </Routes>
    </div>
  );
};

export default App;