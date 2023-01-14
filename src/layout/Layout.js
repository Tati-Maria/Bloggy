import React from 'react';
import Nav from '../Components/Nav';
import Footer from '../Components/Footer';

const Layout = ({children}) => {
  return (
    <div>
        <Nav />
        <main className='min-h-screen'>
            {children}
        </main>
        <Footer />
    </div>
  )
}

export default Layout;