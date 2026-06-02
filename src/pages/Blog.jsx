import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageData } from '../context/PageDataContext';
import { supabase } from '../lib/supabase';

const FALLBACK_POSTS = [
  { id: '1', title: '5 Tips for Perfecting Your Home Dining Experience', slug: '5-tips-perfecting-home-dining', featured_image: '/images/post-1.jpg', excerpt: '' },
  { id: '2', title: 'Why Locally Sourced Ingredients Make a Difference', slug: 'locally-sourced-ingredients', featured_image: '/images/post-2.jpg', excerpt: '' },
  { id: '3', title: 'Creating Memorable Dining Moments with Friends', slug: 'memorable-dining-moments', featured_image: '/images/post-3.jpg', excerpt: '' },
  { id: '4', title: 'Elevate Your Table Setting with Simple Touches', slug: 'elevate-table-setting', featured_image: '/images/post-4.jpg', excerpt: '' },
  { id: '5', title: 'Secrets to Cooking Restaurant-Style Meals at Home', slug: 'restaurant-style-meals-at-home', featured_image: '/images/post-5.jpg', excerpt: '' },
  { id: '6', title: 'Bringing Family Together Over Delicious Meals', slug: 'family-together-delicious-meals', featured_image: '/images/post-6.jpg', excerpt: '' },
];

const Blog = () => {
    const { content: pageContent = {} } = usePageData();
    const header = pageContent.header || {};
    const [posts, setPosts] = useState(FALLBACK_POSTS);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [bookingForm, setBookingForm] = useState({ name: '', email: '', phone: '', date: '', time: '', person: '' });
    const [bookingStatus, setBookingStatus] = useState(''); // '' | 'submitting' | 'success' | 'error'

    useEffect(() => {
        window.scrollTo(0, 0);
        fetchPosts();
    }, []);

    async function fetchPosts() {
        const { data, error } = await supabase
            .from('blog_posts')
            .select('id, title, slug, featured_image, excerpt, published_at')
            .eq('is_published', true)
            .order('published_at', { ascending: false });

        if (!error && data && data.length > 0) {
            setPosts(data);
        }
        setLoadingPosts(false);
    }

    function getPostLink(post) {
        return post.slug ? `/blog/${post.slug}` : '/blog-single';
    }

    function setBookingField(k, v) {
        setBookingForm(f => ({ ...f, [k]: v }));
    }

    async function handleBooking(e) {
        e.preventDefault();
        setBookingStatus('submitting');

        const { error } = await supabase.from('bookings').insert([{
            name: bookingForm.name,
            email: bookingForm.email,
            phone: bookingForm.phone,
            booking_date: bookingForm.date,
            booking_time: bookingForm.time || null,
            guests: parseInt(bookingForm.person) || 2,
            status: 'pending',
        }]);

        if (error) {
            setBookingStatus('error');
        } else {
            setBookingStatus('success');
            setBookingForm({ name: '', email: '', phone: '', date: '', time: '', person: '' });
        }
    }

    const wowDelays = ['0s', '0.2s', '0.4s', '0.6s', '0.8s', '1s'];

    return (
        <main>
            <div className="page-header parallaxie">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="page-header-box">
                                <h1 className="text-anime-style-2" data-cursor="-opaque">{header.title || 'Our Blog'}</h1>
                                <nav className="wow fadeInUp">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">home</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">latest blog</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="page-blog">
                <div className="container">
                    <div className="row">
                        {posts.map((post, i) => (
                            <div key={post.id} className="col-lg-4 col-md-6">
                                <div className="post-item wow fadeInUp" data-wow-delay={wowDelays[i] || '0s'}>
                                    <div className="post-featured-image">
                                        <Link to={getPostLink(post)} data-cursor-text="View">
                                            <figure className="image-anime">
                                                <img
                                                    src={post.featured_image || `/images/post-${(i % 6) + 1}.jpg`}
                                                    alt={post.title}
                                                />
                                            </figure>
                                        </Link>
                                    </div>
                                    <div className="blog-item-body">
                                        <div className="post-item-content">
                                            <h3><Link to={getPostLink(post)}>{post.title}</Link></h3>
                                            {post.excerpt && (
                                                <p style={{fontSize: 14, opacity: 0.8, marginTop: 8, lineHeight: 1.5}}>
                                                    {post.excerpt.slice(0, 100)}{post.excerpt.length > 100 ? '…' : ''}
                                                </p>
                                            )}
                                        </div>
                                        <div className="blog-item-btn">
                                            <Link to={getPostLink(post)} className="readmore-btn">read more</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div className="col-lg-12">
                            <div className="page-pagination wow fadeInUp" data-wow-delay="1.2s">
                                <ul className="pagination">
                                    <li><a href="#"><i className="fa-solid fa-arrow-left-long"></i></a></li>
                                    <li className="active"><a href="#">1</a></li>
                                    <li><a href="#"><i className="fa-solid fa-arrow-right-long"></i></a></li>
                                </ul>
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
                                {bookingStatus === 'success' ? (
                                    <div className="wow fadeInUp" style={{textAlign:'center',padding:'40px 20px'}}>
                                        <i className="fas fa-check-circle" style={{fontSize:48,color:'#d4a843',marginBottom:16}}></i>
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
                                                <input type="date" className="form-control" required
                                                    value={bookingForm.date} onChange={e => setBookingField('date', e.target.value)} />
                                            </div>
                                            <div className="form-group col-md-4 mb-4">
                                                <label className="form-label">time</label>
                                                <select className="form-control form-select"
                                                    value={bookingForm.time} onChange={e => setBookingField('time', e.target.value)}>
                                                    <option value="">Select time</option>
                                                    <option value="11:00">11:00 AM</option>
                                                    <option value="12:00">12:00 PM</option>
                                                    <option value="13:00">01:00 PM</option>
                                                    <option value="14:00">02:00 PM</option>
                                                    <option value="15:00">03:00 PM</option>
                                                    <option value="16:00">04:00 PM</option>
                                                    <option value="17:00">05:00 PM</option>
                                                    <option value="18:00">06:00 PM</option>
                                                    <option value="19:00">07:00 PM</option>
                                                </select>
                                            </div>
                                            <div className="form-group col-md-4 mb-4">
                                                <label className="form-label">Number Of Persons</label>
                                                <input type="number" className="form-control" placeholder="No. of guests" min="1" required
                                                    value={bookingForm.person} onChange={e => setBookingField('person', e.target.value)} />
                                            </div>
                                            {bookingStatus === 'error' && (
                                                <div className="col-12 mb-3" style={{color:'#e74c3c',fontSize:14}}>
                                                    Something went wrong. Please try again.
                                                </div>
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

export default Blog;
