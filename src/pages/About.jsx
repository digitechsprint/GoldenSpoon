
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePageData } from '../context/PageDataContext';

const About = () => {
    const { content: pageContent = {} } = usePageData();
    const header = pageContent.header || {};
    const story = pageContent.story || {};
    const values = pageContent.values || {};
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main>
            
	

    
	<div className="page-header parallaxie">
		<div className="container">
			<div className="row">
				<div className="col-lg-12">
					
					<div className="page-header-box">
						<h1 className="text-anime-style-2" data-cursor="-opaque">{header.title || 'About Us'}</h1>
						<nav className="wow fadeInUp">
							<ol className="breadcrumb">
								<li className="breadcrumb-item"><Link to="/">home</Link></li>
								<li className="breadcrumb-item active" aria-current="page">{header.breadcrumb || 'About Us'}</li>
							</ol>
						</nav>
					</div>
					
				</div>
			</div>
		</div>
	</div>
	

    
    <div className="about-us">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6 order-lg-1 order-2">
                    
                    <div className="about-us-image">
                        
                        <div className="about-us-img">
                            <figure className="image-anime">
                                <img src="/images/Home side.png" alt="" />
                            </figure>
                        </div>
                        

                        
                        <div className="company-experience">
                            <div className="icon-box">
                                <img src="/images/icon-company-experience.svg" alt="" />
                            </div>

                            <div className="company-experience-content">
                                <h3><span className="counter">30</span>+ years of experience</h3>
                            </div>
                        </div>
                        

                        
                        <div className="about-author-img">
                            <figure className="image-anime">
                                <img src="/images/about-us-img-2.jpg" alt="" />
                            </figure>
                        </div>
                        
                    </div>
                    
                </div>

                <div className="col-lg-6  order-lg-2 order-1">
                    
                    <div className="about-us-content">
                        
                        <div className="section-title">
                            <h3 className="wow fadeInUp">about us</h3>
                            <h2 className="text-anime-style-2" data-cursor="-opaque">Our Commitment to Authenticity & <span>excellence</span></h2>
                            <p className="wow fadeInUp" data-wow-delay="0.2s">Every dish we create is a celebration of connection, crafted with passion and inspired by diverse flavors. Join us in an inviting space where every bite sparks joy and every moment becomes a cherished memory.</p>
                        </div>
                        

                        
                        <div className="about-content-list wow fadeInUp" data-wow-delay="0.4s">
                            <ul>
                                <li>seasonal & locally sourced ingredients</li>
                                <li>vegetarian & dietary-friendly options</li>
                                <li>exquisite pairings & unique flavors</li>
                            </ul>
                        </div>
                        

                        
                        <div className="about-content-btn wow fadeInUp" data-wow-delay="0.6s">
                            <Link to="/contact" className="btn-default">order now</Link>
                            <Link to="/about" className="btn-default btn-highlighted">book a table</Link>
                        </div>
                        
                    </div>
                    
                </div>

                <div className="col-lg-12 order-3">
                    
                    <div className="about-detail-box">
                        
                        <div className="about-detail-item wow fadeInUp">
                            <div className="icon-box">
                                <img src="/images/icon-about-detail-1.svg" alt="" />
                            </div>
                            <div className="about-detail-content">
                                <h3>premium dining</h3>
                                <p>It's very personal, and can only be a positive experience.</p>
                            </div>
                        </div>
                        
    
                        
                        <div className="about-detail-item wow fadeInUp" data-wow-delay="0.2s">
                            <div className="icon-box">
                                <img src="/images/icon-about-detail-2.svg" alt="" />
                            </div>
                            <div className="about-detail-content">
                                <h3>abundant flavors</h3>
                                <p>At secret recipe, we take immense pride in crafting.</p>
                            </div>
                        </div>
                        
    
                        
                        <div className="about-detail-item wow fadeInUp" data-wow-delay="0.4s">
                            <div className="icon-box">
                                <img src="/images/icon-about-detail-3.svg" alt="" />
                            </div>
                            <div className="about-detail-content">
                                <h3>indigenous meal</h3>
                                <p>With local ingredients, unique spins on traditional flavors.</p>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    

    
    <div className="our-approach">
        <div className="container">
            <div className="row section-row">
                <div className="col-lg-12">
                    
                    <div className="section-title">
                        <h3 className="wow fadeInUp">our approach</h3>
                        <h2 className="text-anime-style-2" data-cursor="-opaque">Delivering memorable dining <span>experiences</span></h2>
                    </div>
                    
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    
                    <div className="our-approch-tab">
                        
                        <div className="our-approch-tab-nav wow fadeInUp" data-wow-delay="0.2s">
                            <ul className="nav nav-tabs" id="approchTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="mission-tab" data-bs-toggle="tab" data-bs-target="#mission" type="button" role="tab" aria-selected="true">our mission</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="vision-tab" data-bs-toggle="tab" data-bs-target="#vision" type="button" role="tab" aria-selected="false">our vision</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="value-tab" data-bs-toggle="tab" data-bs-target="#value" type="button" role="tab" aria-selected="false">our value</button>
                                </li>
                            </ul>
                        </div>
                        

                        
                        <div className="approch-box tab-content" id="approchTabContent">
                            
                            <div className="approch-item tab-pane fade show active" id="mission" role="tabpanel">
                                <div className="row align-items-center">
                                    <div className="col-lg-6">
                                        
                                        <div className="approch-tab-content">
                                            
                                            <div className="section-title">
                                                <h3 className="wow fadeInUp">our mission</h3>
                                                <h2 className="text-anime-style-2" data-cursor="-opaque">creating moments around flavor</h2>
                                                <p className="wow fadeInUp" data-wow-delay="0.2s">At Golden Spoon Restaurant, our vision is to redefine the dining experience by bringing people together over authentic, flavorful meals crafted with love and passion. We aim to be a beacon of culinary excellence, where every dish tells a story of tradition, innovation, and uncompromising quality.</p>
                                            </div>
                                            

                                            
                                            <div className="approch-tab-content-list wow fadeInUp" data-wow-delay="0.4s">
                                                <ul>
                                                    <li>Delivering unforgettable flavors with every dish we serve.</li>
                                                    <li>Creating a welcoming space where food connects hearts.</li>
                                                    <li>Committed to quality, innovation, and exceptional service.</li>
                                                </ul>
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                    <div className="col-lg-6">
                                        
                                        <div className="approch-tab-image">
                                            <figure className="image-anime">
                                                <img src="/images/our-mission-img.jpg" alt="" />
                                            </figure>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            

                            
                            <div className="approch-item tab-pane fade" id="vision" role="tabpanel">
                                <div className="row align-items-center">
                                    <div className="col-lg-6">
                                        
                                        <div className="approch-tab-content">
                                            
                                            <div className="section-title">
                                                <h3>our vision</h3>
                                                <h2 data-cursor="-opaque">creating moments around flavor</h2>
                                                <p>At Golden Spoon Restaurant, our vision is to redefine the dining experience by bringing people together over authentic, flavorful meals crafted with love and passion. We aim to be a beacon of culinary excellence, where every dish tells a story of tradition, innovation, and uncompromising quality.</p>
                                            </div>
                                            

                                            
                                            <div className="approch-tab-content-list">
                                                <ul>
                                                    <li>Delivering unforgettable flavors with every dish we serve.</li>
                                                    <li>Creating a welcoming space where food connects hearts.</li>
                                                    <li>Committed to quality, innovation, and exceptional service.</li>
                                                </ul>
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                    <div className="col-lg-6">
                                        
                                        <div className="approch-tab-image">
                                            <figure className="image-anime">
                                                <img src="/images/our-vision-img.jpg" alt="" />
                                            </figure>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            

                            
                            <div className="approch-item tab-pane fade" id="value" role="tabpanel">
                                <div className="row align-items-center">
                                    <div className="col-lg-6">
                                        
                                        <div className="approch-tab-content">
                                            
                                            <div className="section-title">
                                                <h3>our value</h3>
                                                <h2 data-cursor="-opaque">creating moments around flavor</h2>
                                                <p>At Golden Spoon Restaurant, our vision is to redefine the dining experience by bringing people together over authentic, flavorful meals crafted with love and passion. We aim to be a beacon of culinary excellence, where every dish tells a story of tradition, innovation, and uncompromising quality.</p>
                                            </div>
                                            

                                            
                                            <div className="approch-tab-content-list">
                                                <ul>
                                                    <li>Delivering unforgettable flavors with every dish we serve.</li>
                                                    <li>Creating a welcoming space where food connects hearts.</li>
                                                    <li>Committed to quality, innovation, and exceptional service.</li>
                                                </ul>
                                            </div>
                                            
                                        </div>
                                        
                                    </div>
                                    <div className="col-lg-6">
                                        
                                        <div className="approch-tab-image">
                                            <figure className="image-anime">
                                                <img src="/images/our-value-img.jpg" alt="" />
                                            </figure>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    

    
    <div className="daily-offer">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    
                    <div className="daily-offer-image">
                        <div className="daily-offer-img">
                            <figure>
                                <img src="/images/daily-offer-image.png" alt="" />
                            </figure>
                        </div>

                        
                        <div className="delicious-burger-box">
                            <div className="delicious-burger-title">
                                <h3>Delicious Burger</h3>
                            </div>
                            <div className="delicious-burger-rating">
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                                <i className="fa-solid fa-star"></i>
                            </div>
                            <div className="delicious-burger-list">
                                <ul>
                                    <li>tomato sauces</li>
                                    <li>vegitables</li>
                                    <li>lettuce</li>
                                    <li>cheese slice</li>
                                </ul>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>

                <div className="col-lg-6">
                    
                    <div className="daily-offer-content">
                        
                        <div className="section-title">
                            <h3 className="wow fadeInUp">our daily offers</h3>
                            <h2 className="text-anime-style-2" data-cursor="-opaque">taste the savings with our <span>daily specials</span></h2>
                            <p className="wow fadeInUp" data-wow-delay="0.2s">Every day is an opportunity to enjoy your favorites at a discounted price. Explore our daily rotating specials and indulge in flavorful meals at a fraction of the cost.</p>
                        </div>
                        

                        
                        <div className="daily-offer-list wow fadeInUp" data-wow-delay="0.4s">
                            <ul>
                                <li>seasonal & locally sourced ingredients</li>
                                <li>vegetarian & dietary-friendly options</li>
                                <li>exquisite pairings & unique flavors</li>
                            </ul>
                        </div>
                        

                        
                        <div className="daily-offer-btn wow fadeInUp" data-wow-delay="0.6s">
                            <Link to="/contact" className="btn-default">book table</Link>
                            <Link to="/menu" className="btn-default btn-highlighted">explore menu</Link>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    

    
    <div className="intro-video">
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12">
                    
                    <div className="intro-video-box">
                        <div className="intro-bg-video">
                            
                            
                            <video autoPlay muted={true} loop={true} id="myVideo"><source src="/Gallery/video2.mp4" type="video/mp4" /></video>
                            

                            
                            
                            
                        </div>
                        
                        <div className="video-play-button">
                            <a href="/Gallery/video2.mp4" className="popup-video" data-cursor-text="Play">play</a>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    

    
    <div className="our-team">
        <div className="container">
            <div className="row section-row">
                <div className="col-lg-12">
                    
                    <div className="section-title">
                        <h3 className="wow fadeInUp">always quality</h3>
                        <h2 className="text-anime-style-2" data-cursor="-opaque">the talented minds behind every <span>flavourful dish</span></h2>
                    </div>
                    
                </div>
            </div>

            <div className="row">
                <div className="col-lg-3 col-md-6">
                    
                    <div className="team-item wow fadeInUp">
                        
                        <div className="team-image">
                            <Link to="/chef-single/rakesh" data-cursor-text="View">
                                <figure className="image-anime">
                                    <img src="/images/team-1.jpg" alt="" />
                                </figure>
                            </Link>
                        </div>
                        
                
                        
                        <div className="team-body">
                            
                            <div className="team-content">
                                <h3><Link to="/chef-single/rakesh">Rakesh</Link></h3>
                                <p>executive chef</p>
                            </div>
                            

                            
                            <div className="team-social-list">
                                <ul>
                                    <li><a href="#"><i className="fa-brands fa-dribbble"></i></a></li>
                                    <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                </ul>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>

                <div className="col-lg-3 col-md-6">
                    
                    <div className="team-item wow fadeInUp" data-wow-delay="0.2s">
                        
                        <div className="team-image">
                            <Link to="/chef-single/shiva" data-cursor-text="View">
                                <figure className="image-anime">
                                    <img src="/images/team-2.jpg" alt="" />
                                </figure>
                            </Link>
                        </div>
                        
                
                        
                        <div className="team-body">
                            
                            <div className="team-content">
                                <h3><Link to="/chef-single/shiva">Shiva</Link></h3>
                                <p>sous chef</p>
                            </div>
                            

                            
                            <div className="team-social-list">
                                <ul>
                                    <li><a href="#"><i className="fa-brands fa-dribbble"></i></a></li>
                                    <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                </ul>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>

                <div className="col-lg-3 col-md-6">
                    
                    <div className="team-item wow fadeInUp" data-wow-delay="0.4s">
                        
                        <div className="team-image">
                            <Link to="/chef-single/vishnu" data-cursor-text="View">
                                <figure className="image-anime">
                                    <img src="/images/team-3.jpg" alt="" />
                                </figure>
                            </Link>
                        </div>
                        
                
                        
                        <div className="team-body">
                            
                            <div className="team-content">
                                <h3><Link to="/chef-single/vishnu">Vishnu</Link></h3>
                                <p>pastry chef</p>
                            </div>
                            

                            
                            <div className="team-social-list">
                                <ul>
                                    <li><a href="#"><i className="fa-brands fa-dribbble"></i></a></li>
                                    <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                </ul>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>

                <div className="col-lg-3 col-md-6">
                    
                    <div className="team-item wow fadeInUp" data-wow-delay="0.6s">
                        
                        <div className="team-image">
                            <Link to="/chef-single/josheph" data-cursor-text="View">
                                <figure className="image-anime">
                                    <img src="/images/team-4.jpg" alt="" />
                                </figure>
                            </Link>
                        </div>
                        
                
                        
                        <div className="team-body">
                            
                            <div className="team-content">
                                <h3><Link to="/chef-single/josheph">Josheph</Link></h3>
                                <p>restaurant manager</p>
                            </div>
                            

                            
                            <div className="team-social-list">
                                <ul>
                                    <li><a href="#"><i className="fa-brands fa-dribbble"></i></a></li>
                                    <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                    <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                </ul>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>

                <div className="col-lg-12">
                    
                    <div className="section-footer-text wow fadeInUp" data-wow-delay="0.8s">
                        <p>Meet the passionate team behind every flavour and experience <Link to="/chefs">meet our team</Link></p>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    

    
    <div className="our-testimonial parallaxie">
        <div className="container">
            <div className="row section-row">
                <div className="col-lg-12">
                    
                    <div className="section-title">
                        <h3 className="wow fadeInUp">our testimonials</h3>
                        <h2 className="text-anime-style-2" data-cursor="-opaque">real stories of memorable <span>meals and experiences</span></h2>
                    </div>
                    
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    
                    <div className="testimonial-slider">
                        <div className="swiper">
                            <div className="swiper-wrapper" data-cursor-text="Drag">
                                
                                <div className="swiper-slide">
                                    <div className="testimonial-item">
                                        <div className="testimonial-quote">
                                            <img src="/images/testimonial-quote.svg" alt="" />
                                        </div>
                                        <div className="testimonial-content">
                                            <p>The taste of the food is very good and the staff of the restaurant is also very good natured and the best thing is that the restaurant is pure vegetarian.</p>
                                        </div>
                                        <div className="author-info">
                                            <div className="author-image">
                                                <figure className="image-anime">
                                                    <img src="/images/author-1.jpg" alt="" />
                                                </figure>
                                            </div>            
                                            <div className="author-content">
                                                <h3>Deshdeepak Patel</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                

                                
                                <div className="swiper-slide">
                                    <div className="testimonial-item">
                                        <div className="testimonial-quote">
                                            <img src="/images/testimonial-quote.svg" alt="" />
                                        </div>
                                        <div className="testimonial-content">
                                            <p>Amazing place for the end of your craving.... great taste and specially rates are so phenominal from others resturant..

I recommended this place to everyone for your craving</p>
                                        </div>
                                        <div className="author-info">
                                            <div className="author-image">
                                                <figure className="image-anime">
                                                    <img src="/images/author-2.jpg" alt="" />
                                                </figure>
                                            </div>            
                                            <div className="author-content">
                                                <h3>Kapil Jain</h3>
                                            </div>
                                        </div>                                    
                                    </div>
                                </div>
                                
                            </div>
                            <div className="testimonial-btn">
                                <div className="testimonial-btn-prev"></div>
                                <div className="testimonial-btn-next"></div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    

    
    <div className="our-faqs">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    
                    <div className="our-faqs-content">
                        
                        <div className="section-title">
                            <h3 className="wow fadeInUp">frequently asked questions</h3>
                            <h2 className="text-anime-style-2" data-cursor="-opaque">got questions? we've <span>got answers!</span></h2>
                            <p className="wow fadeInUp" data-wow-delay="0.2s">Whether you're curious about features, pricing, or getting started, we've got you covered. If you don't find what you're looking for, our team is always ready to assist you.</p>
                        </div>
                        

                        
                        <div className="faqs-content-btn wow fadeInUp" data-wow-delay="0.4s">
                            <Link to="/faqs" className="btn-default">view all questions</Link>
                        </div>
                        
                    </div>
                    
                </div>

                <div className="col-lg-6">
                    
                    <div className="faq-accordion" id="accordion">
                        
                        <div className="accordion-item wow fadeInUp">
                            <h2 className="accordion-header" id="heading1">
                                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                                    1. What are your restaurant's opening hours?
                                </button>
                            </h2>
                            <div id="collapse1" className="accordion-collapse collapse show" aria-labelledby="heading1" data-bs-parent="#accordion">
                                <div className="accordion-body">
                                    <p>We're open daily from 11:00 AM to 07:00 PM.</p>
                                </div>
                            </div>
                        </div>
                        

                        
                        <div className="accordion-item wow fadeInUp" data-wow-delay="0.2s">
                            <h2 className="accordion-header" id="heading2">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                                    2. Do you offer vegetarian or vegan options?
                                </button>
                            </h2>
                            <div id="collapse2" className="accordion-collapse collapse" aria-labelledby="heading2" data-bs-parent="#accordion">
                                <div className="accordion-body">
                                    <p>Yes, we offer vegetarian-only options.</p>
                                </div>
                            </div>
                        </div>
                        

                        
                        <div className="accordion-item wow fadeInUp" data-wow-delay="0.4s">
                            <h2 className="accordion-header" id="heading3">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                                    3. Can I make a reservation online?
                                </button>
                            </h2>
                            <div id="collapse3" className="accordion-collapse collapse" aria-labelledby="heading3" data-bs-parent="#accordion">
                                <div className="accordion-body">
                                    <p>Yes, you can reserve online or contact us directly.</p>
                                </div>
                            </div>
                        </div>
                        

                        
                        <div className="accordion-item wow fadeInUp" data-wow-delay="0.6s">
                            <h2 className="accordion-header" id="heading4">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                                    4. Do you provide delivery or takeout services?
                                </button>
                            </h2>
                            <div id="collapse4" className="accordion-collapse collapse" aria-labelledby="heading4" data-bs-parent="#accordion">
                                <div className="accordion-body">
                                    <p>Yes, we offer both delivery and takeout services.</p>
                                </div>
                            </div>
                        </div>
                        

                        
                        <div className="accordion-item wow fadeInUp" data-wow-delay="0.8s">
                            <h2 className="accordion-header" id="heading5">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                                    5. Do you accommodate large groups or private events?
                                </button>
                            </h2>
                            <div id="collapse5" className="accordion-collapse collapse" aria-labelledby="heading5" data-bs-parent="#accordion">
                                <div className="accordion-body">
                                    <p>Yes, we accommodate large groups.</p>
                                </div>
                            </div>
                        </div>
                        
                        
                        
                        <div className="accordion-item wow fadeInUp" data-wow-delay="1s">
                            <h2 className="accordion-header" id="heading6">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse6" aria-expanded="false" aria-controls="collapse6">
                                    6. Is there parking available at the restaurant?
                                </button>
                            </h2>
                            <div id="collapse6" className="accordion-collapse collapse" aria-labelledby="heading6" data-bs-parent="#accordion">
                                <div className="accordion-body">
                                    <p>Yes, parking is available at the restaurant.</p>
                                </div>
                            </div>
                        </div>
                        
                        
                        
                        <div className="accordion-item wow fadeInUp" data-wow-delay="1.2s">
                            <h2 className="accordion-header" id="heading7">
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse7" aria-expanded="false" aria-controls="collapse7">
                                    7. Do you have a kids' menu?
                                </button>
                            </h2>
                            <div id="collapse7" className="accordion-collapse collapse" aria-labelledby="heading7" data-bs-parent="#accordion">
                                <div className="accordion-body">
                                    <p>Yes, a kids' menu is available.</p>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    

    
    <div className="reserve-table">
        <div className="container">
            <div className="row">
                <div className="col-lg-6">
                    
                    <div className="reserve-table-content">
                        
                        <div className="section-title">
                            <h3 className="wow fadeInUp">reserve a table</h3>
                            <h2 className="text-anime-style-2" data-cursor="-opaque">reserve now your table and <span>enjoy dining experience.</span></h2>
                        </div>
                        

                        
                        <div className="reserve-table-body wow fadeInUp" data-wow-delay="0.2s">
                            <h3>open hours</h3>
                            <ul>
                                <li>Mon - Sat <span>11:00 AM - 07:00 PM</span></li>
                            </ul>
                        </div>
                        
                    </div>
                    
                </div>

                <div className="col-lg-6">
                    
                    <div className="reserve-table-form">
                        <form id="appointmentForm" action="#" method="POST" data-toggle="validator" className="wow fadeInUp">
                            <div className="row">
                                <div className="form-group col-md-12 mb-4">
                                    <label className="form-label">your name</label>
                                    <input type="text" name="name" className="form-control" id="name" placeholder="e.g. John" required />
                                    <div className="help-block with-errors"></div>
                                </div>

                                <div className="form-group col-md-6 mb-4">
                                    <label className="form-label">email address</label>
                                    <input type="email" name ="email" className="form-control" id="email" placeholder="e.g. John@example.com" required />
                                    <div className="help-block with-errors"></div>
                                </div>
                                
                                <div className="form-group col-md-6 mb-4">
                                    <label className="form-label">phone number</label>
                                    <input type="text" name="phone" className="form-control" id="phone" placeholder="e.g. + 123 456 8792" required />
                                    <div className="help-block with-errors"></div>
                                </div>

                                <div className="form-group col-md-4 mb-4">
                                    <label className="form-label">date</label>
                                    <input type="date" name="date" className="form-control" id="date" required />
                                    <div className="help-block with-errors"></div>
                                </div>

                                <div className="form-group col-md-4 mb-4">
                                    <label className="form-label">time</label>
                                    <select name="time" className="form-control form-select" id="time" required>
                                        <option value="" disabled defaultValue>Select time</option>
                                        <option value="6_30pm">06:30 PM</option>
                                        <option value="7_00pm">07:00 PM</option>
                                        <option value="7_30pm">07:30 PM</option>
                                        <option value="8_00pm">08:00 PM</option>
                                        <option value="8_30pm">08:30 PM</option>
                                        <option value="9_00pm">09:00 PM</option>
                                    </select>
                                    <div className="help-block with-errors"></div>
                                </div>

                                <div className="form-group col-md-4 mb-4">
                                    <label className="form-label">Number Of Person</label>
                                    <input type="number" name="person" className="form-control" id="person" placeholder="Type number of person" min="1" required />
                                    <div className="help-block with-errors"></div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="reserve-table-btn">
                                        <button type="submit" className="btn-default">reserve now</button>
                                        <div id="msgSubmit" className="h3 hidden"></div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    
    
    
    
        </main>
    );
};

export default About;
