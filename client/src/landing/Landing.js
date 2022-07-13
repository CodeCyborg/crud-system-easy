import React from 'react';
import './styles/Landing.scss';
import Navbar from './Navbar';
import Header from './Header';

const Landing = () => {
  return (
    <>
    <div className='d-flex'>
      <Navbar/>
      <Header/>
    </div>

    </>
  )
}

export default Landing