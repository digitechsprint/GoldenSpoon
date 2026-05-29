
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { googleReviews } from '../data/googleReviews';
import { usePageData } from '../context/PageDataContext';

const Home = () => {
    const { content = {} } = usePageData();
    const hero = content.hero || {};
    const about = content.about || {};
    const stats = content.stats || [];
    const whyChoose = content.why_choose || {};

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const formatPrice = (amount) => `\u20B9${amount}`;

    const homeMenuCategories = [
        {
            id: 'tandoor',
            label: 'Tandoor',
            items: [
                { title: 'Achari Chaap', image: '/menu/achari-chaap.jpeg', price: formatPrice(120), description: 'Tandoor-grilled chaap with bold achari spices and a smoky, tangy finish.' },
                { title: 'Achari Mushroom Tikka', image: '/menu/achari-mushroom-tikka.jpeg', price: formatPrice(220), description: 'Tender mushrooms roasted with achari masala for a spicy North Indian bite.' },
                { title: 'Achari Paneer Tikka', image: '/menu/achari-paneer-tikka.jpeg', price: formatPrice(130), description: 'Soft paneer cubes marinated in achari spices and charred until aromatic.' },
                { title: 'Afghani Chaap', image: '/menu/afghani-chaap.jpeg', price: formatPrice(130), description: 'Creamy Afghani-style chaap with mild spices and rich tandoori flavor.' },
                { title: 'Dahi Ke Sholey', image: '/menu/dahi-ke-sholey.jpeg', price: formatPrice(150), description: 'Crispy yogurt-filled rolls finished golden and lightly spiced for a warm starter.' },
                { title: 'Haryali Chaap', image: '/menu/haryali-chaap.jpeg', price: formatPrice(120), description: 'Chaap marinated with mint, coriander, and green masala for a fresh herbaceous taste.' },
            ],
        },
        {
            id: 'wrap-roll',
            label: 'Wrap & Roll',
            items: [
                { title: 'Afghani Chaap Roll', image: '/menu/afghani-chaap-roll.jpeg', price: formatPrice(90), description: 'Soft roll stuffed with creamy Afghani chaap and gentle Indian spices.' },
                { title: 'Chilli Mushroom Wrap', image: '/menu/chilli-mushroom-wrap.jpeg', price: formatPrice(90), description: 'Mushrooms tossed in chilli masala and wrapped for a bold, spicy snack.' },
                { title: 'Chilli Paneer Wrap', image: '/menu/chilli-paneer-wrap.jpeg', price: formatPrice(90), description: 'Paneer in tangy chilli gravy wrapped street-style for a satisfying bite.' },
                { title: 'Malai Chaap Roll', image: '/menu/malai-chaap-roll.png', price: formatPrice(90), description: 'Creamy malai chaap rolled into a soft wrap with rich, smooth flavor.' },
                { title: 'Paneer Roll', image: '/menu/paneer-roll.png', price: formatPrice(70), description: 'Paneer and masala rolled together for an easy, filling Indian handheld.' },
                { title: 'Tandoori Chaap Roll', image: '/menu/tandoori-chaap-roll.jpeg', price: formatPrice(80), description: 'Smoky tandoori chaap wrapped with spices for a hearty and flavorful roll.' },
            ],
        },
        {
            id: 'roti-rasoi',
            label: 'Roti Rasoi',
            items: [
                { title: 'Aloo Naan', image: '/menu/aloo-naan.jpeg', price: formatPrice(45), description: 'Stuffed naan filled with spiced potato and baked soft in the tandoor.' },
                { title: 'Aloo Paratha', image: '/menu/aloo-paratha.jpeg', price: formatPrice(40), description: 'Classic stuffed paratha with seasoned potato filling and homestyle warmth.' },
                { title: 'Aloo Pyaaz Paratha', image: '/menu/aloo-pyaaz-paratha.jpeg', price: formatPrice(60), description: 'Potato and onion stuffed paratha with a hearty North Indian taste.' },
                { title: 'Amritsari Kulcha', image: '/menu/amritsari-kulcha.png', price: formatPrice(80), description: 'Fluffy Amritsari kulcha baked golden and served with rich traditional flavor.' },
                { title: 'Butter Naan', image: '/menu/butter-naan.jpeg', price: formatPrice(40), description: 'Soft tandoor-baked naan brushed with butter for a comforting side.' },
                { title: 'Classic Boondi Raita', image: '/menu/classic-boondi-raita.jpeg', price: formatPrice(56), description: 'Cooling yogurt raita with boondi, ideal to balance rich Indian dishes.' },
            ],
        },
        {
            id: 'sandwiches-burgers',
            label: 'Sandwiches & Burgers',
            items: [
                { title: 'Aloo Sandwich', image: '/menu/aloo-sandwich.jpeg', price: formatPrice(50), description: 'Toasted sandwich with spiced aloo filling and crisp, familiar Indian flavors.' },
                { title: 'Cheese Burger', image: '/menu/cheese-burger.jpeg', price: formatPrice(60), description: 'Juicy burger layered with cheese for a rich and satisfying bite.' },
                { title: 'Cheese Corn Sandwich', image: '/menu/cheese-corn-sandwich.jpeg', price: formatPrice(60), description: 'Creamy cheese and sweet corn tucked into a toasted sandwich with mild spice.' },
                { title: 'Chilli Paneer Sandwich', image: '/menu/chilli-paneer-sandwich.jpeg', price: formatPrice(70), description: 'Paneer tossed in chilli masala and packed into a bold, spicy sandwich.' },
                { title: 'Double Patty Burger', image: '/menu/double-patty-burger.jpeg', price: formatPrice(80), description: 'Hearty burger with two patties made for a bigger and more filling meal.' },
                { title: 'Grilled Sandwich', image: '/menu/grilled-sandwich.jpeg', price: formatPrice(70), description: 'Golden grilled sandwich with a crisp crust and warm savory stuffing.' },
            ],
        },
    ];

    return (
        <main>
            
	

    
    <div className="hero parallaxie">
        <div className="container">
            <div className="row align-items-center">
                <div className="col-lg-6">
                    
                    <div className="hero-content">
                        <div className="section-title">
                            <h3 className="wow fadeInUp">{hero.badge || 'Golden Spoon Restaurant, Noida'}</h3>
                            <h1 className="text-anime-style-2" data-cursor="-opaque">
                                {(hero.title || 'Dining in Noida,\nMade Memorable').split('\n').map((line, i) => (
                                    <span key={i}>{i === 1 ? <span>{line}</span> : line}{i === 0 && <br />}</span>
                                ))}
                            </h1>
                            <p className="wow fadeInUp" data-wow-delay="0.2s">
                                {hero.description || 'At Golden Spoon Restaurant, Noida, every meal is prepared with care, served with warmth, and designed to leave a lasting impression.'}
                            </p>
                        </div>
                        <div className="hero-btn wow fadeInUp" data-wow-delay="0.4s">
                            <Link to={hero.cta_link || '/contact'} className="btn-default">
                                {hero.cta_text || 'Book A Table'}
                            </Link>
                        </div>
                    </div>
                                       
                </div>

                <div className="col-lg-6">
                    
                    <div className="hero-images">
                        
                        <div className="hero-image">
                            <figure className="image-anime">
                                <img src="/images/anual.png" alt="Golden Spoon Restaurant interior" />
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
                                <img src="/images/Home side.png" alt="Golden Spoon Restaurant annual party area" />
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
                                {homeMenuCategories.map((category, index) => (
                                    <li className="nav-item" role="presentation" key={category.id}>
                                        <button
                                            className={"nav-link" + (index === 0 ? " active" : "")}
                                            id={category.id + "-tab"}
                                            data-bs-toggle="tab"
                                            data-bs-target={"#" + category.id}
                                            type="button"
                                            role="tab"
                                            aria-selected={index === 0}
                                        >
                                            {category.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        

                        
                        <div className="tab-content" id="myTabContent">
                            {homeMenuCategories.map((category, categoryIndex) => (
                                <div
                                    className={"tab-pane fade" + (categoryIndex === 0 ? " show active" : "")}
                                    id={category.id}
                                    role="tabpanel"
                                    key={category.id}
                                >
                                    <div className="row align-items-center">
                                        <div className="col-lg-12">
                                            <div className="our-menu-list">
                                                {category.items.map((item, itemIndex) => (
                                                    <div className="our-menu-item wow fadeInUp" data-wow-delay={(itemIndex * 0.2) + "s"} key={item.title}>
                                                        <div className="our-menu-image">
                                                            <figure>
                                                                <img src={item.image} style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '50%'}} alt={item.title} />
                                                            </figure>
                                                        </div>
                                                        <div className="menu-item-body">
                                                            <div className="menu-item-title">
                                                                <h3>{item.title}</h3>
                                                                <hr />
                                                                <span>{item.price}</span>
                                                            </div>
                                                            <div className="menu-item-content">
                                                                <p>{item.description}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                                {googleReviews.map((review) => (
                                    <div className="swiper-slide" key={review.name}>
                                        <div className="testimonial-item">
                                            <div className="testimonial-quote">
                                                <img src="/images/testimonial-quote.svg" alt="" />
                                            </div>
                                            <div className="testimonial-content">
                                                <p>{review.summary}</p>
                                            </div>
                                            <div className="author-info">
                                                <div className="author-image">
                                                    <figure className="image-anime">
                                                        <img src={review.avatar} alt={`${review.name} review avatar`} />
                                                    </figure>
                                                 </div>            
                                                <div className="author-content">
                                                    <h3>{review.name}</h3>
                                                    <p>{review.meta}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
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

export default Home;

