import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthProvider';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Auth from './components/Auth/Auth';
import Main from './components/main/main';
import Search from './components/search/Search';



export default function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Header />     
        <Routes>
          <Route path='/auth' Component={Auth}/>
          <Route path='/' Component={Main}/>
          <Route path='/search' Component={Search}/>
        </Routes>
        <Footer />     
      </AuthProvider>
      
    </div>
  );
};
