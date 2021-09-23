import React from 'react';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';

const PageNotFound = () => {
    return (
        <>
            <Header />
            <h1 className="hs-page-not-found">Sorry, the page could not be found.</h1>
            <Footer />
        </>
    )
}

export default PageNotFound;