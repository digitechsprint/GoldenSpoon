
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePageData } from '../context/PageDataContext';

const Services = () => {
    const { content: pageContent = {} } = usePageData();
    const header = pageContent.header || {};
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main>
            
	

    
	<div className="page-header" style={{ position: 'relative', overflow: 'hidden', backgroundImage: 'none', height: '100vh' }}>
        <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                zIndex: -1 
            }}
        >
            <source src="/Gallery/Video Project.mp4" type="video/mp4" />
        </video>
        
        {/* Scroll Down Indicator */}
        <div className="scroll-down-indicator" onClick={() => window.scrollTo({ top: 650, behavior: 'smooth' })}>
            <div className="mouse"></div>
            <p>Scroll Down</p>
        </div>
	</div>
	

    
    <div className="page-services">
        <div className="container">
            <div className="row">
                <div className="col-lg-4 col-md-6">
                    
                    <div className="service-item wow fadeInUp">
                        <div className="icon-box">
                            <img src="/images/icon-service-1.svg" alt="" />
                        </div>
                        <div className="service-item-content">
                            <h3>Dine-In Experience</h3>
                            <p>Enjoy a cozy and vibrant ambiance with impeccable service and delicious meals crafted to perfection.</p>
                        </div>
                        <div className="service-readmore-btn">
                            <Link to="/service-single" className="readmore-btn">read more</Link>
                        </div>
                    </div>
                    
                </div>
                
                <div className="col-lg-4 col-md-6">
                    
                    <div className="service-item wow fadeInUp" data-wow-delay="0.2s">
                        <div className="icon-box">
                            <img src="/images/icon-service-2.svg" alt="" />
                        </div>
                        <div className="service-item-content">
                            <h3>Online Table Reservations</h3>
                            <p>Reserve your table effortlessly through our online booking system for a seamless dining experience.</p>
                        </div>
                        <div className="service-readmore-btn">
                            <Link to="/service-single" className="readmore-btn">read more</Link>
                        </div>
                    </div>
                    
                </div>

                <div className="col-lg-4 col-md-6">
                    
                    <div className="service-item wow fadeInUp" data-wow-delay="0.4s">
                        <div className="icon-box">
                            <img src="/images/icon-service-3.svg" alt="" />
                        </div>
                        <div className="service-item-content">
                            <h3>Home Delivery Service</h3>
                            <p>Savor your favorite dishes in the comfort of your home with our reliable and quick delivery service.</p>
                        </div>
                        <div className="service-readmore-btn">
                            <Link to="/service-single" className="readmore-btn">read more</Link>
                        </div>
                    </div>
                    
                </div>
                
                <div className="col-lg-4 col-md-6">
                    
                    <div className="service-item wow fadeInUp" data-wow-delay="0.6s">
                        <div className="icon-box">
                            <img src="/images/icon-service-4.svg" alt="" />
                        </div>
                        <div className="service-item-content">
                            <h3>Catering for Events</h3>
                            <p>From small gatherings to grand celebrations, let us bring our culinary excellence to your special event.</p>
                        </div>
                        <div className="service-readmore-btn">
                            <Link to="/service-single" className="readmore-btn">read more</Link>
                        </div>
                    </div>
                    
                </div>
                
                <div className="col-lg-4 col-md-6">
                    
                    <div className="service-item wow fadeInUp" data-wow-delay="0.8s">
                        <div className="icon-box">
                            <img src="/images/icon-service-5.svg" alt="" />
                        </div>
                        <div className="service-item-content">
                            <h3>Takeout Orders</h3>
                            <p>Convenient and fast takeout options for when you're on the go but still craving our flavors.</p>
                        </div>
                        <div className="service-readmore-btn">
                            <Link to="/service-single" className="readmore-btn">read more</Link>
                        </div>
                    </div>
                    
                </div>
                
                <div className="col-lg-4 col-md-6">
                    
                    <div className="service-item wow fadeInUp" data-wow-delay="1s">
                        <div className="icon-box">
                            <img src="/images/icon-service-6.svg" alt="" />
                        </div>
                        <div className="service-item-content">
                            <h3>Private Dining</h3>
                            <p>Host intimate gatherings or private events in our dedicated dining space tailored to your needs.</p>
                        </div>
                        <div className="service-readmore-btn">
                            <Link to="/service-single" className="readmore-btn">read more</Link>
                        </div>
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

I recommended this place to everyone for your craving. </p>
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

export default Services;
