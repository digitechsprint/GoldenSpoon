import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    const logoSrc = '/images/golden-spoon-logo.png';

    return (
        <footer className="main-footer" style={{ paddingTop: '20px' }}>
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        {/* Footer Content Start */}
                        <div className="footer-content">

                            {/* Footer Contact Box Start */}
                            <div className="footer-contact-box">
                                {/* Footer Contact Item Start */}
                                <div className="footer-contact-item">
                                    <div className="icon-box">
                                        <img src="/images/icon-location.svg" alt="Location" />
                                    </div>
                                    <div className="footer-contact-content">
                                        <p>Golden Spoon Restaurrant, 111, F Block, Sector 8, Noida, Uttar Pradesh 201301</p>
                                    </div>
                                </div>
                                {/* Footer Contact Item End */}

                                {/* Footer Contact Item Start */}
                                <div className="footer-contact-item">
                                    <div className="icon-box">
                                        <img src="/images/icon-phone.svg" alt="Phone" />
                                    </div>
                                    <div className="footer-contact-content">
                                        <p><a href="tel:9217014763">9217014763</a></p>
                                    </div>
                                </div>
                                {/* Footer Contact Item End */}

                                {/* Timing Item Start */}
                                <div className="footer-contact-item">
                                    <div className="icon-box">
                                        <i className="fa-regular fa-clock" style={{color: 'var(--accent-color)', fontSize: '20px'}}></i>
                                    </div>
                                    <div className="footer-contact-content">
                                        <p>09:00am to 10:00pm</p>
                                    </div>
                                </div>
                                {/* Timing Item End */}
                            </div>
                            {/* Footer Contact Box End */}
                        </div>
                        {/* Footer Content End */}
                    </div>
                </div>

                {/* Footer Copyright Section Start */}
                <div className="footer-copyright" style={{ padding: '15px 0' }}>
                    <div className="row align-items-center">
                        <div className="col-md-6">
                            {/* Footer Social Icon Start */}
                            <div className="footer-social-icon">
                                <ul>
                                    <li><a href="https://www.instagram.com/golden_spoon_restaurrant?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a></li>
                                    <li><a href="https://www.facebook.com/people/Golden-Spoon-Restaurrant/61588904188460/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                                </ul>
                            </div>
                            {/* Footer Social Icon End */}
                        </div>

                        <div className="col-lg-6 col-md-6">
                            {/* Footer Copyright Start */}
                            <div className="footer-copyright-text">
                                <p>Copyright © 2026 Golden Spoon Restaurrant. All Rights Reserved.</p>
                            </div>
                            {/* Footer Copyright End */}
                        </div>
                    </div>
                </div>
                {/* Footer Copyright Section End */}
            </div>
        </footer>
    );
};

export default Footer;
