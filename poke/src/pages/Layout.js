import React from 'react';
import Header from '../Components/Header';
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";


const Layout = ({ children, title, description, keywords, author }) => {
    return (
        <div>
            <Helmet>
                <meta charSet='UTF-8' />

                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
                <meta name="author" content={author} />

                <title>{title}</title>

            </Helmet>
            <Header />
            <main style={{ height: '100%', width: '100%', minHeight: '100vh' }}>
                <Toaster />

                {children}
            </main>

        </div>
    )
}

Layout.defaultProps = {
    title: "Pokemon",
    description: "mern stack project",
    keywords: "mern,react,node,mongodb",
    author: "Adityja Jhaant"
}

export default Layout;