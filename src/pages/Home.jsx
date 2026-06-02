
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { googleReviews } from '../data/googleReviews';
import { usePageData } from '../context/PageDataContext';
import { supabase } from '../lib/supabase';

const TODAY = new Date().toISOString().split('T')[0];

const Home = () => {
    const { content = {} } = usePageData();
    const hero = content.hero || {};
    const about = content.about || {};
    const stats = content.stats || [];
    const whyChoose = content.why_choose || {};

    const [bookingForm, setBookingForm] = useState({ name: '', email: '', phone: '', date: TODAY, time: '', person: '1' });
    const [bookingStatus, setBookingStatus] = useState('');

    function setBookingField(k, v) { setBookingForm(f => ({ ...f, [k]: v })); }

    async function handleBooking(e) {
        e.preventDefault();
        const persons = parseInt(bookingForm.person) || 1;
        if (persons > 6) {
            alert('For groups larger than 6, please call us at +91 92170 14763 for special arrangements.');
            return;
        }
        setBookingStatus('submitting');
        const { error } = await supabase.from('bookings').insert([{
            name: bookingForm.name,
            email: bookingForm.email,
            phone: bookingForm.phone,
            booking_date: bookingForm.date,
            booking_time: bookingForm.time || null,
            guests: persons,
            status: 'pending',
        }]);
        if (error) {
            setBookingStatus('error');
        } else {
            setBookingStatus('success');
            setBookingForm({ name: '', email: '', phone: '', date: TODAY, time: '', person: '1' });
        }
    }

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
                            <h3 className="wow fadeInUp">{(hero.badge || 'Golden Spoon Restaurrant, Noida').replace('Restaurant', 'Restaurrant')}</h3>
                            <h1 className="text-anime-style-2" data-cursor="-opaque">
                                {(hero.title || 'Dining in Noida,\nMade Memorable').split('\n').map((line, i) => (
                                    <span key={i}>{i === 1 ? <span>{line}</span> : line}{i === 0 && <br />}</span>
                                ))}
                            </h1>
                            <p className="wow fadeInUp" data-wow-delay="0.2s">
                                {hero.description || 'At Golden Spoon Restaurrant, Noida, every meal is prepared with care, served with warmth, and designed to leave a lasting impression.'}
                            </p>
                        </div>
                        <div className="hero-btn wow fadeInUp" data-wow-delay="0.4s">
                            <a href="#reserve-table" className="btn-default" onClick={e => { e.preventDefault(); document.getElementById('reserve-table')?.scrollIntoView({ behavior: 'smooth' }); }}>
                                {hero.cta_text || 'Book A Table'}
                            </a>
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
                                <li>100% pure vegetarian cuisine</li>
                                <li>freshly prepared every day</li>
                                <li>authentic indian flavors</li>
                            </ul>
                        </div>
                        

                        
                        <div className="about-content-btn wow fadeInUp" data-wow-delay="0.6s">
                            <Link to="/menu" className="btn-default">order now</Link>
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
                                <p>Experience elegant dining with exceptional service and a warm atmosphere.</p>
                            </div>
                        </div>



                        <div className="about-detail-item wow fadeInUp" data-wow-delay="0.2s">
                            <div className="icon-box">
                                <img src="/images/icon-about-detail-2.svg" alt="" />
                            </div>
                            <div className="about-detail-content">
                                <h3>authentic flavors</h3>
                                <p>Our chefs craft every dish using fresh ingredients and signature recipes.</p>
                            </div>
                        </div>



                        <div className="about-detail-item wow fadeInUp" data-wow-delay="0.4s">
                            <div className="icon-box">
                                <img src="/images/icon-about-detail-3.svg" alt="" />
                            </div>
                            <div className="about-detail-content">
                                <h3>traditional cuisine</h3>
                                <p>Enjoy locally inspired dishes prepared with rich flavors and timeless techniques.</p>
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
                        <h3 className="wow fadeInUp">explore our menu favourites</h3>
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
                            <p>Warm, comforting, and full of flavor, our soups are the perfect start to any meal.</p>
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
                                <img src="/images/our-dish-image-4.jpg" alt="" />
                            </figure>
                        </div>
                        <div className="our-dish-content">
                            <h3>appetizers</h3>
                            <p>Our appetizers are the perfect way to begin your dining experience.</p>
                        </div>
                    </div>

                </div>

                <div className="col-lg-3 col-md-6">

                    <div className="our-dish-item wow fadeInUp" data-wow-delay="0.6s">
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
                                <h3>Chef's Special</h3>
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
                                    <li>freshly prepared daily</li>
                                    <li>premium ingredients</li>
                                    <li>signature recipe</li>
                                    <li>limited availability</li>
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
                                <li>special discounts every day</li>
                                <li>freshly prepared signature dishes</li>
                                <li>great value for every appetite</li>
                            </ul>
                        </div>



                        <div className="daily-offer-btn wow fadeInUp" data-wow-delay="0.6s">
                            <Link to="/menu" className="btn-default">explore menu</Link>
                            <a href="#reserve-table" className="btn-default btn-highlighted" onClick={e => { e.preventDefault(); document.getElementById('reserve-table')?.scrollIntoView({ behavior: 'smooth' }); }}>book table</a>
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
                        

                        
                        
                    </div>
                    
                </div>

                <div className="col-lg-6 order-lg-2 order-1">
                    
                    <div className="our-ingredients-content">
                        
                        <div className="section-title">
                            <h3 className="wow fadeInUp">our ingredients</h3>
                            <h2 className="text-anime-style-2" data-cursor="-opaque">Crafting Dishes with the <span>Freshest Flavors</span></h2>
                            <p className="wow fadeInUp" data-wow-delay="0.2s">We take pride in using only the freshest, hand-picked ingredients that are free from preservatives and artificial additives. Taste the difference with every bite as we serve dishes made from nature's finest.</p>
                        </div>
                        

                        
                        <div className="our-ingredients-list wow fadeInUp" data-wow-delay="0.4s">
                            
                            <div className="ingredients-list-item">
                                <div className="icon-box">
                                    <img src="/images/icon-ingredients-list-1.svg" alt="" />
                                </div>
                                <div className="ingredients-list-content">
                                    <h3>premium ingredients</h3>
                                </div>
                            </div>



                            <div className="ingredients-list-item">
                                <div className="icon-box">
                                    <img src="/images/icon-ingredients-list-2.svg" alt="" />
                                </div>
                                <div className="ingredients-list-content">
                                    <h3>quality assurance</h3>
                                </div>
                            </div>



                            <div className="ingredients-list-item">
                                <div className="icon-box">
                                    <img src="/images/icon-ingredients-list-3.svg" alt="" />
                                </div>
                                <div className="ingredients-list-content">
                                    <h3>freshly prepared daily</h3>
                                </div>
                            </div>
                            
                        </div>
                        

                        
                        <div className="our-ingredients-btn wow fadeInUp" data-wow-delay="0.6s">
                            <Link to="/contact" className="btn-default">book table</Link>
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
                            <Link to="/blog/5-tips-perfecting-home-dining" data-cursor-text="View">
                                <figure className="image-anime">
                                    <img src="/images/post-1.jpg" alt="" />
                                </figure>
                            </Link>
                        </div>
                        <div className="blog-item-body">
                            <div className="post-item-content">
                                <h3><Link to="/blog/5-tips-perfecting-home-dining">5 Tips for Perfecting Your Home Dining Experience</Link></h3>
                            </div>
                            <div className="blog-item-btn">
                                <Link to="/blog/5-tips-perfecting-home-dining" className="readmore-btn">read more</Link>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="col-lg-4 col-md-6">

                    <div className="post-item wow fadeInUp" data-wow-delay="0.2s">
                        <div className="post-featured-image">
                            <Link to="/blog/locally-sourced-ingredients" data-cursor-text="View">
                                <figure className="image-anime">
                                    <img src="/images/post-2.jpg" alt="" />
                                </figure>
                            </Link>
                        </div>
                        <div className="blog-item-body">
                            <div className="post-item-content">
                                <h3><Link to="/blog/locally-sourced-ingredients">Why Locally Sourced Ingredients Make a Difference</Link></h3>
                            </div>
                            <div className="blog-item-btn">
                                <Link to="/blog/locally-sourced-ingredients" className="readmore-btn">read more</Link>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="col-lg-4 col-md-6">

                    <div className="post-item wow fadeInUp" data-wow-delay="0.4s">
                        <div className="post-featured-image">
                            <Link to="/blog/memorable-dining-moments" data-cursor-text="View">
                                <figure className="image-anime">
                                    <img src="/images/post-3.jpg" alt="" />
                                </figure>
                            </Link>
                        </div>
                        <div className="blog-item-body">
                            <div className="post-item-content">
                                <h3><Link to="/blog/memorable-dining-moments">Creating Memorable Dining Moments with Friends</Link></h3>
                            </div>
                            <div className="blog-item-btn">
                                <Link to="/blog/memorable-dining-moments" className="readmore-btn">read more</Link>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    

    
    <div className="reserve-table" id="reserve-table">
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
                                <li>Mon - Sun <span>09:00 AM - 10:00 PM</span></li>
                            </ul>
                        </div>
                        
                    </div>
                    
                </div>

                <div className="col-lg-6">
                    
                    <div className="reserve-table-form">
                        {bookingStatus === 'success' ? (
                            <div className="wow fadeInUp" style={{textAlign:'center',padding:'40px 20px'}}>
                                <i className="fas fa-check-circle" style={{fontSize:48,color:'#d4a843',marginBottom:16,display:'block'}}></i>
                                <h3 style={{marginBottom:8}}>Table Reserved!</h3>
                                <p style={{opacity:0.8}}>We'll confirm your booking shortly. See you soon!</p>
                                <button className="btn-default" style={{marginTop:20}} onClick={() => setBookingStatus('')}>Book Another</button>
                            </div>
                        ) : (
                            <form onSubmit={handleBooking} className="wow fadeInUp">
                                <div className="row">
                                    <div className="form-group col-md-12 mb-4">
                                        <label className="form-label">your name</label>
                                        <input type="text" className="form-control" placeholder="e.g. John" required
                                            value={bookingForm.name} onChange={e => setBookingField('name', e.target.value)} />
                                    </div>
                                    <div className="form-group col-md-6 mb-4">
                                        <label className="form-label">email address</label>
                                        <input type="email" className="form-control" placeholder="e.g. John@example.com" required
                                            value={bookingForm.email} onChange={e => setBookingField('email', e.target.value)} />
                                    </div>
                                    <div className="form-group col-md-6 mb-4">
                                        <label className="form-label">phone number</label>
                                        <input type="text" className="form-control" placeholder="e.g. +91 98765 43210" required
                                            value={bookingForm.phone} onChange={e => setBookingField('phone', e.target.value)} />
                                    </div>
                                    <div className="form-group col-md-4 mb-4">
                                        <label className="form-label">date</label>
                                        <input type="date" className="form-control" required min={TODAY}
                                            value={bookingForm.date}
                                            onChange={e => setBookingField('date', e.target.value)}
                                            onKeyDown={e => e.preventDefault()} />
                                    </div>
                                    <div className="form-group col-md-4 mb-4">
                                        <label className="form-label">time</label>
                                        <select className="form-control form-select" value={bookingForm.time} onChange={e => setBookingField('time', e.target.value)}>
                                            <option value="">Select time</option>
                                            <option value="09:00">09:00 AM</option>
                                            <option value="10:00">10:00 AM</option>
                                            <option value="11:00">11:00 AM</option>
                                            <option value="12:00">12:00 PM</option>
                                            <option value="13:00">01:00 PM</option>
                                            <option value="14:00">02:00 PM</option>
                                            <option value="15:00">03:00 PM</option>
                                            <option value="16:00">04:00 PM</option>
                                            <option value="17:00">05:00 PM</option>
                                            <option value="18:00">06:00 PM</option>
                                            <option value="19:00">07:00 PM</option>
                                            <option value="20:00">08:00 PM</option>
                                            <option value="21:00">09:00 PM</option>
                                        </select>
                                    </div>
                                    <div className="form-group col-md-4 mb-4">
                                        <label className="form-label">Number Of Persons</label>
                                        <input type="number" className="form-control" min="1" max="6" required
                                            value={bookingForm.person}
                                            onChange={e => setBookingField('person', String(Math.min(6, Math.max(1, parseInt(e.target.value) || 1))))} />
                                    </div>
                                    {bookingStatus === 'error' && (
                                        <div className="col-12 mb-3" style={{color:'#e74c3c',fontSize:14}}>Something went wrong. Please try again.</div>
                                    )}
                                    <div className="col-lg-12">
                                        <div className="reserve-table-btn">
                                            <button type="submit" className="btn-default" disabled={bookingStatus === 'submitting'}>
                                                {bookingStatus === 'submitting' ? 'Reserving…' : 'reserve now'}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
    
    
    
    
        </main>
    );
};

export default Home;

