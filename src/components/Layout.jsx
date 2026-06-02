import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Preloader from './Preloader';
import { useInitAnimations } from '../hooks/useInitAnimations';

const PAGE_TITLES = {
    '/': 'Home | Golden Spoon Restaurrant',
    '/about': 'About Us | Golden Spoon Restaurrant',
    '/menu': 'Menu | Golden Spoon Restaurrant',
    '/services': 'Services | Golden Spoon Restaurrant',
    '/contact': 'Contact Us | Golden Spoon Restaurrant',
    '/blog': 'Blog | Golden Spoon Restaurrant',
    '/faqs': 'FAQs | Golden Spoon Restaurrant',
    '/image-gallery': 'Image Gallery | Golden Spoon Restaurrant',
    '/video-gallery': 'Video Gallery | Golden Spoon Restaurrant',
    '/testimonial': 'Testimonials | Golden Spoon Restaurrant',
    '/order': 'Order Online | Golden Spoon Restaurrant',
    '/checkout': 'Checkout | Golden Spoon Restaurrant',
    '/order-confirmation': 'Order Confirmed | Golden Spoon Restaurrant',
};

const Layout = () => {
    const location = useLocation();
    useInitAnimations();

    useEffect(() => {
        const path = location.pathname;
        const title = PAGE_TITLES[path]
            || (path.startsWith('/blog/') ? 'Blog Post | Golden Spoon Restaurrant' : 'Golden Spoon Restaurrant');
        document.title = title;
    }, [location.pathname]);

    return (
        <>
            <Preloader />
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default Layout;
