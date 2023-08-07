import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Import your CreatePost component
import Login from './component/login';
import Signup from './component/signup';
import CreatePost from './component/createposts';
import Posts from './component/posts';
import NavBar from './component/nav';
import HomePage from './component/homepage';
import Footer from './component/footer';
import MyPosts from './component/my-posts';
import FullPost from './component/fulpost';

const App = () => {
  return (
    <Router>
      <NavBar/>
      <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/posts" element={<Posts/>} />
      <Route path="/create-post" element={<CreatePost/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/my-posts" element={<MyPosts/>} />
      <Route path="/post/:id" element={<FullPost/>} />
      </Routes>
      <Footer/>
    </Router>
  );
};

export default App;

