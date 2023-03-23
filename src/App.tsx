import React from 'react';
import { Routes, Route } from 'react-router-dom';

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import BookPage from './pages/book-page';
import ErrorPage from './pages/error-page';
import HomePage from './pages/home-page';


function App() {
  return (
    <div className="App">   
     <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:bookId" element={<BookPage />} />        
        <Route path="*" element={<ErrorPage />} />
      </Routes>  
</div>

  )
}

export default App


