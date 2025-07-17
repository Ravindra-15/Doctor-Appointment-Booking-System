// src/layout/Layout.jsx
import React from 'react';
import Header from '../components/Header/Header';  // Correct case-sensitive path
import Footer from '../components/Footer/Footer';  // Correct case-sensitive path
import Routers from '../routes/Routers';          // Make sure this exists

const Layout1 = () => {
  return (
    <>
      <Header />
      <main>
        <Routers />
      </main>
      <Footer />
    </>
  );
};

export default Layout1;