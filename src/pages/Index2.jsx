
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Index2 = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main>
            
	

    
    <div className="hero parallaxie">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    
                    <div className="hero-content">
                        
                        <div className="section-title">
                            <h3 className="wow fadeInUp">Golden Spoon Restaurrant, noida</h3>
                            <h1 className="text-anime-style-2" data-cursor="-opaque">Dining in Noida, <span>made memorable</span></h1>
                            <p className="wow fadeInUp" data-wow-delay="0.2s">At Golden Spoon Restaurrant, Noida, every meal is prepared with care, served with warmth, and designed to leave a lasting impression. From everyday cravings to special occasions, we make dining feel easy, flavorful, and inviting.</p>
                        </div>
                        

                        
                        <div className="hero-btn wow fadeInUp" data-wow-delay="0.4s">
                            <Link to="/contact" className="btn-default">book a table</Link>
                            
                        </div>
                        
                    </div>
                                       
                </div>

                <div className="col-lg-6">
                    
                    <div className="hero-images">
                        
                        <div className="hero-image">
                            <figure className="image-anime">
                                <img src="/images/anual.png" alt="" />
                            </figure>                            
                        </div>  
                            

                        
                        <div className="hero-circle-img-1">
                            <figure className="image-anime">
                                <img src="/images/hero-circle-img-1.jpg" alt="" />
                            </figure>
                        </div>
                        

                        
                        <div className="hero-circle-img-2">
                            <figure className="image-anime">
                                <img src="/images/hero-circle-img-2.jpg" alt="" />
                            </figure>
                        </div>
                        
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
                            <Link to="/about" className="btn-default btn-highlighted">read more</Link>
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
    

    
    <div className="our-dishes">
        <div className="container">
            <div className="row section-row">
                <div className="col-lg-12">
                    
                    <div className="section-title">
                        <h3 className="wow fadeInUp">our main dishes</h3>
                        <h2 className="text-anime-style-2" data-cursor="-opaque">Satisfy your cravings with our <span>signature mains</span></h2>
                    </div>
                    
                </div>
            </div>

            <div className="row">
                <div className="col-lg-3 col-md-6">
                    
                    <div className="our-dish-item wow fadeInUp">
                        <div className="our-dish-img">
                            <figure className="image-anime">
                                <img src="/images/our-dish-image-1.jpg" alt="" />
                            </figure>
                        </div>
                        <div className="our-dish-content">
                            <h3>soups</h3>
                            <p>Warm, comforting, and full of flavor, our soups avre the perfect start to any meal.</p>
                        </div>
                    </div>
                    
                </div>

                <div className="col-lg-3 col-md-6">
                    
                    <div className="our-dish-item wow fadeInUp" data-wow-delay="0.2s">
                        <div className="our-dish-img">
                            <figure className="image-anime">
                                <img src="/images/our-dish-image-2.jpg" alt="" />
                            </figure>
                        </div>
                        <div className="our-dish-content">
                            <h3>salads</h3>
                            <p>Refreshing, vibrant, and full of fresh flavors, our salads are crafted to senses.</p>
                        </div>
                    </div>
                    
                </div>

                <div className="col-lg-3 col-md-6">
                    
                    <div className="our-dish-item wow fadeInUp" data-wow-delay="0.4s">
                        <div className="our-dish-img">
                            <figure className="image-anime">
                                <img src="/images/our-dish-image-3.jpg" alt="" />
                            </figure>
                        </div>
                        <div className="our-dish-content">
                            <h3>main dishes</h3>
                            <p>Offering bold flavors and expertly crafted recipes that cater to every taste.</p>
                        </div>
                    </div>
                    
                </div>

                <div className="col-lg-3 col-md-6">
                    
                    <div className="our-dish-item wow fadeInUp" data-wow-delay="0.6s">
                        <div className="our-dish-img">
                            <figure className="image-anime">
                                <img src="/images/our-dish-image-4.jpg" alt="" />
                            </figure>
                        </div>
                        <div className="our-dish-content">
                            <h3>appetizers</h3>
                            <p>Our appetizers are the perfect way to begin your dining experience flavors.</p>
                        </div>
                    </div>
                    
                </div>

                <div className="col-lg-12">
                    
                    <div className="section-footer-text wow fadeInUp" data-wow-delay="0.8s">
                        <p>Hungry for Something Delicious? <Link to="/menu">View All Dishes!</Link></p>
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
    

    
    <div className="our-menu">
        <div className="container">
            <div className="row section-row">
                <div className="col-lg-12">
                    
                    <div className="section-title">
                        <h3 className="wow fadeInUp">from our menu</h3>
                        <h2 className="text-anime-style-2" data-cursor="-opaque">An Inspired Menu That <span>Blends Tradition</span></h2>
                    </div>
                    
                </div>
            </div>

            <div className="row">
                <div className="col-lg-12">
                    
                    <div className="our-menu-tab">
                        
                        <div className="our-menu-tab-nav wow fadeInUp" data-wow-delay="0.2s">
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="appetizers-tab" data-bs-toggle="tab" data-bs-target="#appetizers" type="button" role="tab" aria-selected="true">appetizers</button>
                                </li>                                
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="maincourses-tab" data-bs-toggle="tab" data-bs-target="#maincourses" type="button" role="tab" aria-selected="false">main courses</button>
                                </li>                                
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="sides-tab" data-bs-toggle="tab" data-bs-target="#sides" type="button" role="tab" aria-selected="false">sides</button>
                                </li>                                
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="desserts-tab" data-bs-toggle="tab" data-bs-target="#desserts" type="button" role="tab" aria-selected="false">desserts</button>
                                </li>
                            </ul>
                        </div>
                        

                        
                        <div className="tab-content" id="myTabContent">
                            
                            <div className="tab-pane fade show active" id="appetizers" role="tabpanel">
                                <div className="row align-items-center">
                                    <div className="col-lg-12">
                                        
                                        <div className="our-menu-list">
                                        
                                        <div className="our-menu-item">
                                            
                                            <div className="our-menu-image">
                                                <figure>
                                                    <img src="/images/our-menu-image-1.png" alt="" />
                                                </figure>
                                            </div>
                                            

                                            
                                            <div className="menu-item-body">
                                                
                                                <div className="menu-item-title">
                                                    <h3>chips & dip</h3>
                                                    <hr />
                                                    <span>₹16.00</span>
                                                </div>
                                                

                                                
                                                <div className="menu-item-content">
                                                    <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
                                                </div>
                                                
                                            </div>
                                            
                                        </div>
                                        

                                        
                                        <div className="our-menu-item">
                                            
                                            <div className="our-menu-image">
                                                <figure>
                                                    <img src="/images/our-menu-image-2.png" alt="" />
                                                </figure>
                                            </div>
                                            

                                            
                                            <div className="menu-item-body">
                                                
                                                <div className="menu-item-title">
                                                    <h3>caprese salad</h3>
                                                    <hr />
                                                    <span>₹12.00</span>
                                                </div>
                                                

                                                
                                                <div className="menu-item-content">
                                                    <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
                                                </div>
                                                
                                            </div>
                                            
                                        </div>
                                        

                                        
                                        <div className="our-menu-item">
                                            
                                            <div className="our-menu-image">
                                                <figure>
                                                    <img src="/images/our-menu-image-3.png" alt="" />
                                                </figure>
                                            </div>
                                            

                                            
                                            <div className="menu-item-body">
                                                
                                                <div className="menu-item-title">
                                                    <h3>garlic fries</h3>
                                                    <hr />
                                                    <span>₹26.00</span>
                                                </div>
                                                

                                                
                                                <div className="menu-item-content">
                                                    <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
                                                </div>
                                                
                                            </div>
                                            
                                        </div>
                                        

                                        
                                        <div className="our-menu-item">
                                            
                                            <div className="our-menu-image">
                                                <figure>
                                                    <img src="/images/our-menu-image-4.png" alt="" />
                                                </figure>
                                            </div>
                                            

                                            
                                            <div className="menu-item-body">
                                                
                                                <div className="menu-item-title">
                                                    <h3>tortilla soup</h3>
                                                    <hr />
                                                    <span>₹20.00</span>
                                                </div>
                                                

                                                
                                                <div className="menu-item-content">
                                                    <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
                                                </div>
                                                
                                            </div>
                                            
                                        </div>
                                        

                                        
                                        <div className="our-menu-item">
                                            
                                            <div className="our-menu-image">
                                                <figure>
                                                    <img src="/images/our-menu-image-5.png" alt="" />
                                                </figure>
                                            </div>
                                            

                                            
                                            <div className="menu-item-body">
                                                
                                                <div className="menu-item-title">
                                                    <h3>kale salad</h3>
                                                    <hr />
                                                    <span>₹10.00</span>
                                                </div>
                                                

                                                
                                                <div className="menu-item-content">
                                                    <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
                                                </div>
                                                
                                            </div>
                                            
                                        </div>
                                        

                                        
                                        <div className="our-menu-item">
                                            
                                            <div className="our-menu-image">
                                                <figure>
                                                    <img src="/images/our-menu-image-6.png" alt="" />
                                                </figure>
                                            </div>
                                            

                                            
                                            <div className="menu-item-body">
                                                
                                                <div className="menu-item-title">
                                                    <h3>thai curry</h3>
                                                    <hr />
                                                    <span>₹22.00</span>
                                                </div>
                                                

                                                
                                                <div className="menu-item-content">
                                                    <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
                                                </div>
                                                
                                            </div>
                                            
                                        </div>
                                        
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            

                            
                            <div className="tab-pane fade" id="maincourses" role="tabpanel">
                                <div className="row align-items-center">
                                    <div className="col-lg-12">
                                        
                                         <div className="our-menu-list">
                                            
                                            <div className="our-menu-item">
                                                
                                                <div className="our-menu-image">
                                                    <figure>
                                                        <img src="/images/our-menu-image-1.png" alt="" />
                                                    </figure>
                                                </div>
                                                

                                                
                                                <div className="menu-item-body">
                                                    
                                                    <div className="menu-item-title">
                                                        <h3>Fish fry</h3>
                                                        <hr />
                                                        <span>₹26.00</span>
                                                    </div>
                                                    

                                                    
                                                    <div className="menu-item-content">
                                                        <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
                                                    </div>
                                                    
                                                </div>
                                                
                                            </div>
                                            

                                            
                                            <div className="our-menu-item">
                                                
                                                <div className="our-menu-image">
                                                    <figure>
                                                        <img src="/images/our-menu-image-2.png" alt="" />
                                                    </figure>
                                                </div>
                                                

                                                
                                                <div className="menu-item-body">
                                                    
                                                    <div className="menu-item-title">
                                                        <h3>Prawn masala</h3>
                                                        <hr />
                                                        <span>₹28.00</span>
                                                    </div>
                                                    

                                                    
                                                    <div className="menu-item-content">
                                                        <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
                                                    </div>
                                                    
                                                </div>
                                                
                                            </div>
                                            

                                            
                                            <div className="our-menu-item">
                                                
                                                <div className="our-menu-image">
                                                    <figure>
                                                        <img src="/images/our-menu-image-3.png" alt="" />
                                                    </figure>
                                                </div>
                                                

                                                
                                                <div className="menu-item-body">
                                                    
                                                    <div className="menu-item-title">
                                                        <h3>Pasta alfredo</h3>
                                                        <hr />
                                                        <span>₹30.00</span>
                                                    </div>
                                                    

                                                    
                                                    <div className="menu-item-content">
                                                        <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
                                                    </div>
                                                    
                                                </div>
                                                
                                            </div>
                                            

                                            
                                            <div className="our-menu-item">
                                                
                                                <div className="our-menu-image">
                                                    <figure>
                                                        <img src="/images/our-menu-image-4.png" alt="" />
                                                    </figure>
                                                </div>
                                                

                                                
                                                <div className="menu-item-body">
                                                    
                                                    <div className="menu-item-title">
                                                        <h3>Sushi platter</h3>
                                                        <hr />
                                                        <span>₹20.00</span>
                                                    </div>
                                                    

                                                    
                                                    <div className="menu-item-content">
                                                        <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
                                                    </div>
                                                    
                                                </div>
                                                
                                            </div>
                                            

                                            
                                            <div className="our-menu-item">
                                                
                                                <div className="our-menu-image">
                                                    <figure>
                                                        <img src="/images/our-menu-image-5.png" alt="" />
                                                    </figure>
                                                </div>
                                                

                                                
                                                <div className="menu-item-body">
                                                    
                                                    <div className="menu-item-title">
                                                        <h3>Veg biryani</h3>
                                                        <hr />
                                                        <span>₹29.00</span>
                                                    </div>
                                                    

                                                    
                                                    <div className="menu-item-content">
                                                        <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
                                                    </div>
                                                    
                                                </div>
                                                
                                            </div>
                                            

                                            
                                            <div className="our-menu-item">
                                                
                                                <div className="our-menu-image">
                                                    <figure>
                                                        <img src="/images/our-menu-image-6.png" alt="" />
                                                    </figure>
                                                </div>
                                                

                                                
                                                <div className="menu-item-body">
                                                    
                                                    <div className="menu-item-title">
                                                        <h3>Mutton curry</h3>
                                                        <hr />
                                                        <span>₹24.00</span>
                                                    </div>
                                                    

                                                    
                                                    <div className="menu-item-content">
                                                        <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
                                                    </div>
                                                    
                                                </div>
                                                
                                            </div>
                                            
                                         </div>
                                        
                                    </div>
                                </div>
                            </div>
                            

                            
                            <div className="tab-pane fade" id="sides" role="tabpanel">
                                <div className="row align-items-center">
                                    <div className="col-lg-12">
                                        
                                         <div className="our-menu-list">
                                            
                                            <div className="our-menu-item">
                                                
                                                <div className="our-menu-image">
                                                    <figure>
                                                        <img src="/images/our-menu-image-1.png" alt="" />
                                                    </figure>
                                                </div>
                                                

                                                
                                                <div className="menu-item-body">
                                                    
                                                    <div className="menu-item-title">
                                                        <h3>Fries</h3>
                                                        <hr />
                                                        <span>₹6.00</span>
                                                    </div>
                                                    

                                                    
                                                    <div className="menu-item-content">
                                                        <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
                                                    </div>
                                                    
                                                </div>
                                                
                                            </div>
                                            

                                            
                                            <div className="our-menu-item">
                                                
                                                <div className="our-menu-image">
                                                    <figure>
                                                        <img src="/images/our-menu-image-2.png" alt="" />
                                                    </figure>
                                                </div>
                                                

                                                
                                                <div className="menu-item-body">
                                                    
                                                    <div className="menu-item-title">
                                                        <h3>Veggies</h3>
                                                        <hr />
                                                        <span>₹8.00</span>
                                                    </div>
                                                    

                                                    
                                                    <div className="menu-item-content">
                                                        <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
                                                    </div>
                                                    
                                                </div>
                                                
                                            </div>
                                            

                                            
                                            <div className="our-menu-item">
                                                
                                                <div className="our-menu-image">
                                                    <figure>
                                                        <img src="/images/our-menu-image-3.png" alt="" />
                                                    </figure>
                                                </div>
                                                

                                                
                                                <div className="menu-item-body">
                                                    
                                                    <div className="menu-item-title">
                                                        <h3>Chips</h3>
                                                        <hr />
                                                        <span>₹7.00</span>
                                                    </div>
                                                    

                                                    
                                                    <div className="menu-item-content">
                                                        <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
                                                    </div>
                                                    
                                                </div>
                                                
                                            </div>
                                            

                                            
                                            <div className="our-menu-item">
                                                
                                                <div className="our-menu-image">
                                                    <figure>
                                                        <img src="/images/our-menu-image-4.png" alt="" />
                                                    </figure>
                                                </div>
                                                

                                                
                                                <div className="menu-item-body">
                                                    
                                                    <div className="menu-item-title">
                                                        <h3>Mash</h3>
                                                        <hr />
                                                        <span>₹9.00</span>
                                                    </div>
                                                    

                                                    
                                                    <div className="menu-item-content">
                                                        <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
                                                    </div>
                                                    
                                                </div>
                                                
                                            </div>
                                            

                                            
                                            <div className="our-menu-item">
                                                
                                                <div className="our-menu-image">
                                                    <figure>
                                                        <img src="/images/our-menu-image-5.png" alt="" />
                                                    </figure>
                                                </div>
                                                

                                                
                                                <div className="menu-item-body">
                                                    
                                                    <div className="menu-item-title">
                                                        <h3>Salad</h3>
                                                        <hr />
                                                        <span>₹4.00</span>
                                                    </div>
                                                    

                                                    
                                                    <div className="menu-item-content">
                                                        <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
                                                    </div>
                                                    
                                                </div>
                                                
                                            </div>
                                            

                                            
                                            <div className="our-menu-item">
                                                
                                                <div className="our-menu-image">
                                                    <figure>
                                                        <img src="/images/our-menu-image-6.png" alt="" />
                                                    </figure>
                                                </div>
                                                

                                                
                                                <div className="menu-item-body">
                                                    
                                                    <div className="menu-item-title">
                                                        <h3>Slaw</h3>
                                                        <hr />
                                                        <span>₹10.00</span>
                                                    </div>
                                                    

                                                    
                                                    <div className="menu-item-content">
                                                        <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
                                                    </div>
                                                    
                                                </div>
                                                
                                            </div>
                                            
                                         </div>
                                        
                                    </div>
                                </div>
                            </div>
                            

                            
                            <div className="tab-pane fade" id="desserts" role="tabpanel">
                                <div className="row align-items-center">
                                    <div className="col-lg-12">
                                        
                                         <div className="our-menu-list">
                                            
                                            <div className="our-menu-item">
                                                
                                                <div className="our-menu-image">
                                                    <figure>
                                                        <img src="/images/our-menu-image-1.png" alt="" />
                                                    </figure>
                                                </div>
                                                

                                                
                                                <div className="menu-item-body">
                                                    
                                                    <div className="menu-item-title">
                                                        <h3>Tang yuan</h3>
                                                        <hr />
                                                        <span>₹16.00</span>
                                                    </div>
                                                    

                                                    
                                                    <div className="menu-item-content">
                                                        <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
                                                    </div>
                                                    
                                                </div>
                                                
                                            </div>
                                            

                                            
                                            <div className="our-menu-item">
                                                
                                                <div className="our-menu-image">
                                                    <figure>
                                                        <img src="/images/our-menu-image-2.png" alt="" />
                                                    </figure>
                                                </div>
                                                

                                                
                                                <div className="menu-item-body">
                                                    
                                                    <div className="menu-item-title">
                                                        <h3>Egg custard</h3>
                                                        <hr />
                                                        <span>₹26.00</span>
                                                    </div>
                                                    

                                                    
                                                    <div className="menu-item-content">
                                                        <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
                                                    </div>
                                                    
                                                </div>
                                                
                                            </div>
                                            

                                            
                                            <div className="our-menu-item">
                                                
                                                <div className="our-menu-image">
                                                    <figure>
                                                        <img src="/images/our-menu-image-3.png" alt="" />
                                                    </figure>
                                                </div>
                                                

                                                
                                                <div className="menu-item-body">
                                                    
                                                    <div className="menu-item-title">
                                                        <h3>Zabaione</h3>
                                                        <hr />
                                                        <span>₹21.00</span>
                                                    </div>
                                                    

                                                    
                                                    <div className="menu-item-content">
                                                        <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
                                                    </div>
                                                    
                                                </div>
                                                
                                            </div>
                                            

                                            
                                            <div className="our-menu-item">
                                                
                                                <div className="our-menu-image">
                                                    <figure>
                                                        <img src="/images/our-menu-image-4.png" alt="" />
                                                    </figure>
                                                </div>
                                                

                                                
                                                <div className="menu-item-body">
                                                    
                                                    <div className="menu-item-title">
                                                        <h3>Almond soup</h3>
                                                        <hr />
                                                        <span>₹30.00</span>
                                                    </div>
                                                    

                                                    
                                                    <div className="menu-item-content">
                                                        <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
                                                    </div>
                                                    
                                                </div>
                                                
                                            </div>
                                            

                                            
                                            <div className="our-menu-item">
                                                
                                                <div className="our-menu-image">
                                                    <figure>
                                                        <img src="/images/our-menu-image-5.png" alt="" />
                                                    </figure>
                                                </div>
                                                

                                                
                                                <div className="menu-item-body">
                                                    
                                                    <div className="menu-item-title">
                                                        <h3>Bomboloni</h3>
                                                        <hr />
                                                        <span>₹28.00</span>
                                                    </div>
                                                    

                                                    
                                                    <div className="menu-item-content">
                                                        <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
                                                    </div>
                                                    
                                                </div>
                                                
                                            </div>
                                            

                                            
                                            <div className="our-menu-item">
                                                
                                                <div className="our-menu-image">
                                                    <figure>
                                                        <img src="/images/our-menu-image-6.png" alt="" />
                                                    </figure>
                                                </div>
                                                

                                                
                                                <div className="menu-item-body">
                                                    
                                                    <div className="menu-item-title">
                                                        <h3>Tiramisu</h3>
                                                        <hr />
                                                        <span>₹22.00</span>
                                                    </div>
                                                    

                                                    
                                                    <div className="menu-item-content">
                                                        <p>A perfect pairing of crispy, freshly made chips and rich, flavorful dips that bring a burst of taste in every bite.</p>
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

                <div className="col-lg-12">
                    
                    <div className="section-footer-text wow fadeInUp" data-wow-delay="0.4s">
                        <p>Ready to Savor the Best? <Link to="/menu">Check Our Dishes!</Link></p>
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
    

    
    <div className="our-ingredients">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6 order-lg-1 order-2">
                    
                    <div className="our-ingredients-image">
                        
                        <div className="our-ingredients-img">
                            <figure>
                                <img src="/images/our-ingredients-image.png" alt="" />
                            </figure>
                        </div>
                        

                        
                        <div className="happy-customer-box">
                            
                            <div className="happy-customer-content">
                                <h3><span className="counter">620</span>+ exclusive</h3>
                                <p>happy customer</p>
                            </div>
                            

                            
                            <div className="happy-customer-images">
                                
                                <div className="customer-image">
                                    <figure className="image-anime">
                                        <img src="/images/happy-customer-img-1.jpg" alt="" />
                                    </figure>
                                </div>
                                

                                
                                <div className="customer-image">
                                    <figure className="image-anime">
                                        <img src="/images/happy-customer-img-2.jpg" alt="" />
                                    </figure>
                                </div>
                                

                                
                                <div className="customer-image">
                                    <figure className="image-anime">
                                        <img src="/images/happy-customer-img-3.jpg" alt="" />
                                    </figure>
                                </div>
                                
                                
                                
                                <div className="customer-image add-more">
                                    <i className="fa-solid fa-plus"></i>
                                </div>
                                
                            </div>
                            
                        </div>
                        
                    </div>
                    
                </div>

                <div className="col-lg-6 order-lg-2 order-1">
                    
                    <div className="our-ingredients-content">
                        
                        <div className="section-title">
                            <h3 className="wow fadeInUp">our ingredients</h3>
                            <h2 className="text-anime-style-2" data-cursor="-opaque">Crafting Dishes with <span>freshest Flavors</span></h2>
                            <p className="wow fadeInUp" data-wow-delay="0.2s">We take pride in using only the freshest, hand-picked ingredients that are free from preservatives and artificial additives. Taste the difference with every bite as we serve dishes made from nature's finest.</p>
                        </div>
                        

                        
                        <div className="our-ingredients-list wow fadeInUp" data-wow-delay="0.4s">
                            
                            <div className="ingredients-list-item">
                                <div className="icon-box">
                                    <img src="/images/icon-ingredients-list-1.svg" alt="" />
                                </div>
                                <div className="ingredients-list-content">
                                    <h3>best qualities</h3>
                                </div>
                            </div>
                            

                            
                            <div className="ingredients-list-item">
                                <div className="icon-box">
                                    <img src="/images/icon-ingredients-list-2.svg" alt="" />
                                </div>
                                <div className="ingredients-list-content">
                                    <h3>discount system</h3>
                                </div>
                            </div>
                            

                            
                            <div className="ingredients-list-item">
                                <div className="icon-box">
                                    <img src="/images/icon-ingredients-list-3.svg" alt="" />
                                </div>
                                <div className="ingredients-list-content">
                                    <h3>first delivery</h3>
                                </div>
                            </div>
                            
                        </div>
                        

                        
                        <div className="our-ingredients-btn wow fadeInUp" data-wow-delay="0.6s">
                            <Link to="/contact" className="btn-default">book table</Link>
                        </div>
                        
                    </div>
                    
                </div>

                <div className="col-lg-12 order-3">
                    
                    <div className="ingredient-counter-list">
                        
                        <div className="ingredient-counter-item">
                            <div className="icon-box">
                                <img src="/images/icon-ingredient-counter-1.svg" alt="" />
                            </div>
                            <div className="ingredient-counter-content">
                                <h2><span className="counter">309</span></h2>
                                <p>Professional chefs</p>
                            </div>
                        </div>
                        
                        
                        
                        <div className="ingredient-counter-item">
                            <div className="icon-box">
                                <img src="/images/icon-ingredient-counter-2.svg" alt="" />
                            </div>
                            <div className="ingredient-counter-content">
                                <h2><span className="counter">453</span></h2>
                                <p>Items of food</p>
                            </div>
                        </div>
                        
                        
                        
                        <div className="ingredient-counter-item">
                            <div className="icon-box">
                                <img src="/images/icon-ingredient-counter-3.svg" alt="" />
                            </div>
                            <div className="ingredient-counter-content">
                                <h2><span className="counter">25</span>+</h2>
                                <p>Years of experience</p>
                            </div>
                        </div>
                        
                        
                        
                        <div className="ingredient-counter-item">
                            <div className="icon-box">
                                <img src="/images/icon-ingredient-counter-4.svg" alt="" />
                            </div>
                            <div className="ingredient-counter-content">
                                <h2><span className="counter">300</span>+</h2>
                                <p>Satisfied clients</p>
                            </div>
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
                                                <h3></h3>
                                            </div>Deshdeepak Patel
                                        </div>
                                    </div>
                                </div>
                                

                                
                                <div className="swiper-slide">
                                    <div className="testimonial-item">
                                        <div className="testimonial-quote">
                                            <img src="/images/testimonial-quote.svg" alt="" />
                                        </div>
                                        <div className="testimonial-content">
                                            <p>From the moment we walked in, the ambiance was welcoming, and the service was top-notch. The dish was absolutely delicious, full of fresh flavors, and perfectly cooked. I especially loved how the staff took the time to explain the menu and suggest pairings for our meal.</p>
                                        </div>
                                        <div className="author-info">
                                            <div className="author-image">
                                                <figure className="image-anime">
                                                    <img src="/images/author-2.jpg" alt="" />
                                                </figure>
                                            </div>            
                                            <div className="author-content">
                                                <h3>liya allen, manager</h3>
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
    

    
    <div className="our-blog">
        <div className="container">
            <div className="row section-row">
                <div className="col-lg-12">
                    
                    <div className="section-title">
                        <h3 className="wow fadeInUp">Latest blog</h3>
                        <h2 className="text-anime-style-2" data-cursor="-opaque">Explore our latest news <span>and updates</span></h2>
                    </div>
                    
                </div>
            </div>

            <div className="row">
                <div className="col-lg-4 col-md-6">
                    
                    <div className="post-item wow fadeInUp">
                        <div className="post-featured-image">
                            <Link to="/blog-single" data-cursor-text="View">
                                <figure className="image-anime">
                                    <img src="/images/post-1.jpg" alt="" />
                                </figure>
                            </Link>
                        </div>
                        <div className="blog-item-body">
                            <div className="post-item-content">
                                <h3><Link to="/blog-single">5 Tips for Perfecting Your Home Dining Experience</Link></h3>
                            </div>
                            <div className="blog-item-btn">
                                <Link to="/blog-single" className="readmore-btn">read more</Link>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className="col-lg-4 col-md-6">
                    
                    <div className="post-item wow fadeInUp" data-wow-delay="0.2s">
                        <div className="post-featured-image">
                            <Link to="/blog-single" data-cursor-text="View">
                                <figure className="image-anime">
                                    <img src="/images/post-2.jpg" alt="" />
                                </figure>
                            </Link>
                        </div>
                        <div className="blog-item-body">
                            <div className="post-item-content">
                                <h3><Link to="/blog-single">Why Locally Sourced Ingredients Make a Difference</Link></h3>
                            </div>
                            <div className="blog-item-btn">
                                <Link to="/blog-single" className="readmore-btn">read more</Link>
                            </div>
                        </div>
                    </div>
                    
                </div>

                <div className="col-lg-4 col-md-6">
                    
                    <div className="post-item wow fadeInUp" data-wow-delay="0.4s">
                        <div className="post-featured-image">
                            <Link to="/blog-single" data-cursor-text="View">
                                <figure className="image-anime">
                                    <img src="/images/post-3.jpg" alt="" />
                                </figure>
                            </Link>
                        </div>
                        <div className="blog-item-body">
                            <div className="post-item-content">
                                <h3><Link to="/blog-single">Creating Memorable Dining Moments with Friends</Link></h3>
                            </div>
                            <div className="blog-item-btn">
                                <Link to="/blog-single" className="readmore-btn">read more</Link>
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

export default Index2;
