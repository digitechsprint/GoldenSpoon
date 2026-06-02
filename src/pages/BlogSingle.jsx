
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const BlogSingle = () => {
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
						<h1 className="text-anime-style-2" data-cursor="-opaque">5 tips for perfecting your...</h1>
						<div className="post-single-meta wow fadeInUp">
							<ol className="breadcrumb" style={{color:'#fff'}}>
                                <li style={{color:'#fff'}}><i className="fa-regular fa-user"></i> admin</li>
								<li style={{color:'#fff'}}><i className="fa-regular fa-clock"></i> 22 jan 2026</li>
                            </ol>
						</div>
					</div>
					
				</div>
			</div>
		</div>
	</div>
	

    
    <div className="page-single-post">
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    
                    <div className="post-image">
                        <figure className="image-anime">
                            <img src="/images/post-1.jpg" alt="" />
                        </figure>
                    </div>
                    

                    
                    <div className="post-content">
                        
                        <div className="post-entry">
                            <p className="wow fadeInUp">Dining is more than just a meal; it's an experience that brings people together, celebrates flavors, and creates lasting memories. At Golden Spoon Restaurrant, we believe in elevating this experience through carefully crafted dishes, thoughtful presentation, and a warm, welcoming ambiance. Every bite tells a story, every flavor is a journey, and every visit is an opportunity to connect with the essence of good food</p>

                            <p className="wow fadeInUp" data-wow-delay="0.2s">From selecting the finest ingredients to perfecting each recipe, the art of dining is at the heart of everything we do. Whether you're enjoying a quiet dinner or hosting a grand celebration, our goal is to make every moment exceptional. Let us take you on a culinary adventure where passion meets creativity, and dining becomes a true art form.</p>
                            
                            <blockquote className="wow fadeInUp" data-wow-delay="0.4s">
                                <p>Dining is more than just eating; it's an experience that combines the artistry of flavors, the warmth of ambiance, and the beauty of human connection. At Golden Spoon Restaurrant, we go beyond serving food—we create moments that linger in the heart and on the palate.</p>
                            </blockquote>

                            <p className="wow fadeInUp" data-wow-delay="0.6s">Dining is more than just enjoying a meal; it's an experience that blends flavor, ambiance, and connection. At Golden Spoon Restaurrant, we transform every visit into a memorable journey by combining the finest ingredients, skillful preparation, and a welcoming atmosphere. Whether it's an intimate dinner or a lively celebration, we believe in crafting moments that celebrate the true essence of good food and great company.</p>

                            <h2 className="wow fadeInUp" data-wow-delay="0.8s">Maximize Flavors with Mobile-Friendly Dining</h2>

                            <p className="wow fadeInUp" data-wow-delay="1s">Enjoy the ultimate convenience with our mobile-optimized restaurant experience. Whether you're browsing our menu, placing an order, or reserving a table, our responsive design ensures everything is smooth and hassle-free, no matter what device you're using. We've prioritized speed, clarity, and ease of navigation to make sure your experience with us is as delightful online as it is when you dine in. Discover a world of flavors and make every moment memorable, right from the palm of your hand.</p>

                            <ul className="wow fadeInUp" data-wow-delay="1.2s">
                                <li>Quick Access to Our Menu: Browse through our dishes effortlessly with a mobile-friendly interface.</li>
                                <li>Seamless Reservations: Book your table anytime, anywhere with just a few taps.</li>
                                <li>Smooth Online Orders: Enjoy a hassle-free ordering experience optimized for your device.</li>
                                <li>Stay Updated: Receive the latest offers and updates tailored for mobile users.</li>
                            </ul>

                            <p className="wow fadeInUp" data-wow-delay="1.4s">For restaurateurs, embracing mobile-friendly solutions is a game-changer. Features like online ordering, push notifications for promotions, and integrated payment options help cater to customers' needs while driving engagement. Plus, mobile-friendly designs ensure that your brand is accessible anywhere, anytime.Incorporating mobile technology into dining isn't just about speed—it's about elevating the overall experience.</p>
                        </div>
                        

                        
                        <div className="post-tag-links">
                            <div className="row align-items-center">
                                <div className="col-lg-8">
                                    
                                    <div className="post-tags wow fadeInUp" data-wow-delay="0.5s">
                                        <span className="tag-links">
                                            Tags:
                                            <a href="#">foodieparadise</a>
                                            <a href="#">finedining</a>
                                            <a href="#">chefspecial</a>
                                        </span>
                                    </div>
                                    
                                </div>

                                <div className="col-lg-4">
                                    
                                    <div className="post-social-sharing wow fadeInUp" data-wow-delay="0.5s">
                                        <ul>
                                            <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                            <li><a href="#"><i className="fa-brands fa-linkedin-in"></i></a></li>
                                            <li><a href="#"><i className="fa-brands fa-instagram"></i></a></li>
                                            <li><a href="#"><i className="fa-brands fa-x-twitter"></i></a></li>
                                        </ul>
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

export default BlogSingle;
