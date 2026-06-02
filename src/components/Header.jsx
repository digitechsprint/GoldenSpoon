import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const THEME_STORAGE_KEY = 'golden-spoon-theme';

const getInitialTheme = () => {
    if (typeof window === 'undefined') return 'dark';
    try {
        const stored = window.localStorage.getItem(THEME_STORAGE_KEY);
        return stored === 'light' ? 'light' : 'dark';
    } catch { return 'dark'; }
};

const NAV_LINKS = [
    { label: 'Home', to: '/' },
    { label: 'About Us', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Menu', to: '/menu' },
    { label: 'Explore', to: '#', children: [
        { label: 'Blog', to: '/blog' },
        { label: 'FAQs', to: '/faqs' },
        { label: 'Image Gallery', to: '/image-gallery' },
        { label: 'Video Gallery', to: '/video-gallery' },
        { label: 'Testimonials', to: '/testimonial' },
    ]},
    { label: 'Contact Us', to: '/contact' },
];

const Header = () => {
    const location = useLocation();
    const [theme, setTheme] = useState(getInitialTheme);
    const [menuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const { itemCount, setIsOpen } = useCart();
    const isDark = theme === 'dark';

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;
        try { window.localStorage.setItem(THEME_STORAGE_KEY, theme); } catch {}
    }, [theme]);

    useEffect(() => {
        setMenuOpen(false);
        setOpenDropdown(null);

        const handleScroll = () => {
            const sticky = document.querySelector('.header-sticky');
            if (!sticky) return;
            const h = sticky.offsetHeight;
            const main = document.querySelector('header.main-header');
            if (main) main.style.height = `${h}px`;
            const y = window.scrollY;
            sticky.classList.toggle('hide', y > h + 100);
            sticky.classList.toggle('active', y > 600);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location]);

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    return (
        <>
            <style>{`
                .gs-header { position: relative; z-index: 999; }
                .gs-nav {
                    display: flex; align-items: center;
                    justify-content: space-between;
                    padding: 0 20px; gap: 16px;
                    height: 80px;
                }
                .gs-logo img { height: 56px; width: auto; display: block; }
                .gs-nav-links {
                    display: flex; align-items: center; gap: 4px;
                    list-style: none; margin: 0; padding: 0;
                }
                .gs-nav-links > li { position: relative; }
                .gs-nav-links > li > a {
                    display: flex; align-items: center; gap: 4px;
                    padding: 8px 10px; font-size: 15px; font-weight: 600;
                    white-space: nowrap; text-decoration: none;
                    color: inherit; border-radius: 6px;
                    transition: color 0.2s;
                }
                .gs-nav-links > li > a:hover { color: #d4a843; }
                .gs-nav-links > li > a .chevron {
                    font-size: 10px; opacity: 0.6; transition: transform 0.2s;
                }
                .gs-nav-links > li:hover > a .chevron { transform: rotate(180deg); }
                .gs-dropdown {
                    position: absolute; top: 100%; left: 0;
                    min-width: 180px; background: var(--bg-color, #1a1a1a);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 10px; padding: 8px 0;
                    box-shadow: 0 16px 40px rgba(0,0,0,0.4);
                    opacity: 0; pointer-events: none;
                    transform: translateY(8px); transition: all 0.2s;
                    list-style: none; margin: 0; z-index: 100;
                }
                .gs-nav-links > li:hover .gs-dropdown {
                    opacity: 1; pointer-events: all; transform: translateY(0);
                }
                .gs-dropdown li a {
                    display: block; padding: 9px 18px;
                    font-size: 14px; white-space: nowrap;
                    text-decoration: none; color: inherit;
                    transition: color 0.15s, background 0.15s;
                }
                .gs-dropdown li a:hover { color: #d4a843; background: rgba(212,168,67,0.08); }
                .gs-controls {
                    display: flex; align-items: center; gap: 8px;
                    flex-shrink: 0;
                }
                .gs-social { display: flex; gap: 6px; }
                .gs-social a {
                    width: 36px; height: 36px; border-radius: 50%;
                    border: 1.5px solid rgba(255,255,255,0.2);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 14px; text-decoration: none; color: inherit;
                    transition: border-color 0.2s, color 0.2s;
                }
                .gs-social a:hover { border-color: #d4a843; color: #d4a843; }
                .gs-book-btn {
                    background: #d4a843; color: #111; border: none;
                    border-radius: 50px; padding: 10px 20px;
                    font-size: 14px; font-weight: 700; cursor: pointer;
                    text-decoration: none; white-space: nowrap;
                    display: flex; align-items: center; gap: 6px;
                    transition: opacity 0.2s;
                }
                .gs-book-btn:hover { opacity: 0.88; color: #111; }
                .gs-icon-btn {
                    background: none; border: 1.5px solid rgba(255,255,255,0.2);
                    border-radius: 50%; width: 38px; height: 38px;
                    display: flex; align-items: center; justify-content: center;
                    font-size: 15px; cursor: pointer; color: inherit;
                    position: relative; transition: border-color 0.2s, color 0.2s;
                }
                .gs-icon-btn:hover { border-color: #d4a843; color: #d4a843; }
                .gs-cart-badge {
                    position: absolute; top: -4px; right: -4px;
                    background: #d4a843; color: #111;
                    border-radius: 50%; font-size: 9px; font-weight: 800;
                    width: 16px; height: 16px;
                    display: flex; align-items: center; justify-content: center;
                }
                .gs-hamburger {
                    display: none; background: none;
                    border: 1.5px solid rgba(255,255,255,0.25);
                    border-radius: 8px; padding: 8px 10px;
                    cursor: pointer; color: inherit; font-size: 18px;
                }

                /* Mobile overlay */
                .gs-mobile-overlay {
                    display: none; position: fixed; inset: 0;
                    background: rgba(0,0,0,0.5); z-index: 998;
                }
                .gs-mobile-overlay.open { display: block; }
                .gs-mobile-menu {
                    position: fixed; top: 0; right: -100%; width: 280px; height: 100vh;
                    background: var(--secondary-color, #1F2120);
                    color: var(--primary-color, #ffffff);
                    border-left: 1px solid rgba(255,255,255,0.1);
                    z-index: 999; transition: right 0.3s ease;
                    overflow-y: auto; padding: 20px 0 40px;
                    display: flex; flex-direction: column;
                }
                .gs-mobile-menu.open { right: 0; }
                .gs-mobile-menu-header {
                    display: flex; align-items: center;
                    justify-content: space-between; padding: 0 20px 20px;
                    border-bottom: 1px solid rgba(128,128,128,0.2);
                    margin-bottom: 8px;
                }
                .gs-mobile-close {
                    background: none; border: none; font-size: 22px;
                    cursor: pointer; color: var(--primary-color, #ffffff); padding: 4px;
                }
                .gs-mobile-nav { list-style: none; margin: 0; padding: 0; }
                .gs-mobile-nav li a {
                    display: flex; align-items: center; justify-content: space-between;
                    padding: 13px 20px; font-size: 15px; font-weight: 600;
                    text-decoration: none; color: var(--primary-color, #ffffff);
                    border-bottom: 1px solid rgba(128,128,128,0.15);
                    transition: color 0.15s;
                }
                .gs-mobile-nav li a:hover { color: #d4a843; }
                .gs-mobile-sub { list-style: none; margin: 0; padding: 0; background: rgba(128,128,128,0.06); }
                .gs-mobile-sub li a {
                    padding: 10px 20px 10px 36px; font-size: 14px;
                    font-weight: 500; color: var(--primary-color, #ffffff); opacity: 0.8;
                }
                .gs-mobile-footer {
                    padding: 20px 20px 0;
                    margin-top: auto;
                    display: flex; flex-direction: column; gap: 12px;
                }
                .gs-mobile-book {
                    background: #d4a843; color: #111; border: none;
                    border-radius: 50px; padding: 13px 20px;
                    font-size: 15px; font-weight: 700; cursor: pointer;
                    text-decoration: none; text-align: center;
                    transition: opacity 0.2s;
                }
                .gs-mobile-book:hover { opacity: 0.88; color: #111; }
                .gs-mobile-social { display: flex; gap: 10px; justify-content: center; }
                .gs-mobile-social a {
                    width: 40px; height: 40px; border-radius: 50%;
                    border: 1.5px solid rgba(255,255,255,0.2);
                    display: flex; align-items: center; justify-content: center;
                    font-size: 16px; text-decoration: none; color: inherit;
                    transition: border-color 0.2s, color 0.2s;
                }
                .gs-mobile-social a:hover { border-color: #d4a843; color: #d4a843; }

                @media (max-width: 1100px) {
                    .gs-social { display: none; }
                    .gs-nav-links > li > a { padding: 8px 8px; font-size: 14px; }
                }
                @media (max-width: 900px) {
                    .gs-desktop-nav { display: none !important; }
                    .gs-hamburger { display: flex; align-items: center; }
                }
                @media (max-width: 480px) {
                    .gs-book-btn { display: none; }
                    .gs-nav { padding: 0 14px; height: 70px; }
                    .gs-logo img { height: 46px; }
                }
            `}</style>

            <header className="main-header gs-header">
                <div className="header-sticky">
                    <div className="gs-nav">
                        {/* Logo */}
                        <Link className="gs-logo" to="/" aria-label="Golden Spoon Restaurant home">
                            <img src="/images/golden-spoon-logo.png" alt="Golden Spoon Restaurant" loading="eager" />
                        </Link>

                        {/* Desktop Nav */}
                        <ul className="gs-nav-links gs-desktop-nav">
                            {NAV_LINKS.map(item => (
                                <li key={item.label} className={item.children ? 'nav-item submenu' : 'nav-item'}>
                                    <Link className="nav-link" to={item.to}>
                                        {item.label}
                                        {item.children && <i className="fas fa-chevron-down chevron" style={{fontSize:10,marginLeft:4}}></i>}
                                    </Link>
                                    {item.children && (
                                        <ul className="gs-dropdown">
                                            {item.children.map(child => (
                                                <li key={child.label}>
                                                    <Link to={child.to}>{child.label}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>

                        {/* Controls */}
                        <div className="gs-controls">
                            {/* Social – hidden on small */}
                            <div className="gs-social">
                                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                    <i className="fa-brands fa-facebook-f"></i>
                                </a>
                                <a href="https://www.instagram.com/golden_spoon_restaurrant?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                            </div>

                            {/* Book a Table – hidden on mobile */}
                            <Link to="/contact" className="gs-book-btn">
                                Book A Table <i className="fas fa-arrow-right"></i>
                            </Link>

                            {/* Cart */}
                            <button type="button" className="gs-icon-btn" onClick={() => setIsOpen(true)} aria-label="Open cart">
                                <i className="fas fa-shopping-basket"></i>
                                {itemCount > 0 && (
                                    <span className="gs-cart-badge">{itemCount > 9 ? '9+' : itemCount}</span>
                                )}
                            </button>

                            {/* Theme toggle */}
                            <button type="button" className="gs-icon-btn theme-toggle-btn"
                                onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
                                aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
                            >
                                <i className={`fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}`}></i>
                            </button>

                            {/* Hamburger */}
                            <button type="button" className="gs-hamburger" onClick={() => setMenuOpen(true)} aria-label="Open menu">
                                <i className="fas fa-bars"></i>
                            </button>
                        </div>
                    </div>
                </div>

            </header>

            {/* Portal: render overlay + drawer directly on body so position:fixed
                isn't clipped by the header's transform/backdrop-filter */}
            {createPortal(
                <>
                    <div className={`gs-mobile-overlay${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(false)} />
                    <nav className={`gs-mobile-menu${menuOpen ? ' open' : ''}`} aria-label="Mobile navigation">
                        <div className="gs-mobile-menu-header">
                            <Link to="/" onClick={() => setMenuOpen(false)}>
                                <img src="/images/golden-spoon-logo.png" alt="Golden Spoon" style={{height:44}} />
                            </Link>
                            <button type="button" className="gs-mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <ul className="gs-mobile-nav">
                            {NAV_LINKS.map(item => (
                                <li key={item.label}>
                                    {item.children ? (
                                        <>
                                            <a href="#" onClick={e => { e.preventDefault(); setOpenDropdown(openDropdown === item.label ? null : item.label); }}>
                                                {item.label}
                                                <i className={`fas fa-chevron-${openDropdown === item.label ? 'up' : 'down'}`} style={{fontSize:12,opacity:0.6}}></i>
                                            </a>
                                            {openDropdown === item.label && (
                                                <ul className="gs-mobile-sub">
                                                    {item.children.map(child => (
                                                        <li key={child.label}>
                                                            <Link to={child.to} onClick={() => setMenuOpen(false)}>{child.label}</Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </>
                                    ) : (
                                        <Link to={item.to} onClick={() => setMenuOpen(false)}>{item.label}</Link>
                                    )}
                                </li>
                            ))}
                        </ul>

                        <div className="gs-mobile-footer">
                            <Link to="/contact" className="gs-mobile-book" onClick={() => setMenuOpen(false)}>
                                Book A Table
                            </Link>
                            <div className="gs-mobile-social">
                                <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                                    <i className="fa-brands fa-facebook-f"></i>
                                </a>
                                <a href="https://www.instagram.com/golden_spoon_restaurrant?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <i className="fa-brands fa-instagram"></i>
                                </a>
                            </div>
                        </div>
                    </nav>
                </>,
                document.body
            )}
        </>
    );
};

export default Header;
