import React from 'react';
import Header from '../components/Header';
import ChatInput from '../components/ChatInput';
import "../styles/index.css";

const Home = () => {
  return (
    <div className="home-container">
      <main className="content">
        {/* Other content can go here */}
      </main>
      <ChatInput />
    </div>
  );
};

export default Home;