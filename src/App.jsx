import React, {createContext, useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import ArticleById from './ArticleById';
import Comments from './Comments';
import './App.css';

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState({
    username: 'jessjelly',
    name: 'Jess Jelly',
    avatar_url: 'https://vignette.wikia.nocookie.net/mrmen/images/4/4f/MR_JELLY_4A.jpg/revision/latest?cb=20180104121141'
  });

  return (
    <UserContext.Provider value={user}>
      <div className='app'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path="/articles/:article_id" element={<ArticleById />} />
          <Route path="/articles/:article_id/comments" element={<Comments />} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
};

export default App;