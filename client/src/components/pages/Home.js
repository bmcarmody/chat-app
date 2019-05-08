import React from 'react';

import LoginForm from '../atoms/LoginForm';

const Home = () => {
  return (
    <div className="home">
      <LoginForm />
      <div className="footer">
        Created by &copy; {new Date().getFullYear()} Brandon Carmody{' '}
      </div>
    </div>
  );
};

export default Home;
