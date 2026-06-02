
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const ServiceSingle = () => {
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
						<h1 className="text-anime-style-2" data-cursor="-opaque">Dine-in experience</h1>
						<nav className="wow fadeInUp">
							<ol className="breadcrumb">
								<li className="breadcrumb-item"><Link to="/">home</Link></li>
								<li className="breadcrumb-item"><Link to="/services">services</Link></li>
								<li className="breadcrumb-item active" aria-current="page">Dine-in experience</li>
							</ol>
						</nav>
					</div>
					
				</div>
			</div>
		</div>
	</div>
	

    
    <div className="page-service-single">
        <div className="container">
            <div className="row">
                <div className="col-lg-4">
                    
                    <div className="service-sidebar">
                        
                        <div className="service-catagery-list wow fadeInUp">
                            <h3>services category</h3>
                            <ul>
                                <li><a href="#">Dine-in experience</a></li>
                                <li><a href="#">Online table reservations</a></li>
                                <li><a href="#">Home delivery service</a></li>
                                <li><a href="#">Catering for events</a></li>
                                <li><a href="#">Takeout orders</a></li>
                                <li><a href="#">Private dining</a></li>
                            </ul>
                        </div>
                        

                        
                        <div className="sidebar-cta-box wow fadeInUp" data-wow-delay="0.2s">
                            
                            <div className="icon-box">
                                <img src="/images/icon-sidebar-cta.svg" alt="" />
                            </div>
                            

                            
                            <div className="cta-contact-content">
                                <h3>You have different questions?</h3>
                                <p>Our team will answer all your questions. we ensure a quick response.</p>
                            </div>
                            

                            
                            <div className="cta-contact-btn">
                                <a href="tel:9217014763" className="btn-default btn-highlighted"><img src="/images/icon-sidebar-cta-phone.svg" alt="" /> +9217014763</a>
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>

                <div className="col-lg-8">
                    
                    <div className="service-single-content">
                        
                        <div className="service-featured-image">
                            <figure className="image-anime">
                                <img src="/images/service-single-image.jpg" alt="" />
                            </figure>
                        </div>
                        

                        
                        <div className="service-entry">
                            <p className="wow fadeInUp">At Golden Spoon Restaurrant, our dine-in experience is designed to offer you the perfect blend of comfort, ambiance, and culinary delight. Enjoy our thoughtfully crafted interiors, warm hospitality, and a menu filled with flavorful dishes made from the freshest ingredients. Whether it’s a family gathering, a date night, or a casual meal, we strive to make every visit memorable.</p>
                            <p className="wow fadeInUp" data-wow-delay="0.2s">Step into Golden Spoon Restaurrant and immerse yourself in a welcoming ambiance that combines elegance and comfort. Our dine-in experience is curated to delight all your senses, from the inviting decor to the aroma of freshly prepared dishes. Whether you’re celebrating a special occasion, catching up with friends, or simply enjoying a meal out, our attentive staff and thoughtfully crafted menu ensure every moment is special. Savor a wide range of dishes made with the finest ingredients, all served with a touch of warmth and care. At Golden Spoon Restaurrant, dining is more than just a meal—it’s an experience to remember.</p>
                            
                            
                            <div className="service-key-features">
                                <h2 className="text-anime-style-2">KEY features of <span>Golden Spoon Restaurrant</span></h2>
                                <p className="wow fadeInUp">Discover what makes Golden Spoon Restaurrant stand out! From our carefully crafted dishes bursting with flavor to our warm and inviting atmosphere, every detail is designed to offer you an exceptional dining experience. With a focus on quality ingredients, prompt service, and customer satisfaction, we take pride in delivering the perfect blend of tradition and innovation. Explore the key features that set us apart and make Golden Spoon Restaurrant your go-to destination for great food and unforgettable moments.</p>
                                <p className="wow fadeInUp" data-wow-delay="0.2s">Golden Spoon Restaurrant is all about exceptional flavors, warm hospitality, and a dining experience like no other. From our diverse menu crafted with the freshest ingredients to our cozy and vibrant atmosphere, we focus on creating memorable moments for every guest. With attention to detail, prompt service, and a passion for quality, we’re proud to be your ultimate destination for delicious food and great company</p>

                                
                                <div className="service-entry-list-image">
                                    <div className="service-entry-list wow fadeInUp" data-wow-delay="0.4s">
                                        <ul>
                                            <li>Authentic flavor meet innovative recipe craft with care.</li>
                                            <li>Exceptional service in a warm & welcoming ambiance.</li>
                                            <li>Fresh ingredient delivering quality & taste in every bite.</li>
                                            <li>Where tradition blends with modern culinary excellence.</li>
                                        </ul>
                                    </div>
                                    <div className="service-entry-image">
                                        <figure className="image-anime">
                                            <img src="/images/service-entry-image.jpg" alt="" />
                                        </figure>
                                    </div>
                                </div>
                                
                            </div>
                            
                        </div>
                        

                        
                        <div className="our-faq-section">
                            
                            <div className="section-title">
                                <h3 className="wow fadeInUp">faq</h3>
                                <h2 className="text-anime-style-3" data-cursor="-opaque">Got questions? we've <span>got answers!</span></h2>
                            </div>
                            
                            
                            
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
                                <li>Mon - S <span>11:00 AM - 07:00 PM</span></li>
                                
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
                                    <input type="text" name="phone" className="form-control" id="phone" placeholder="e.g. +9217014763" required />
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

export default ServiceSingle;
