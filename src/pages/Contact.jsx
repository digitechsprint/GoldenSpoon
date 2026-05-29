
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageData } from '../context/PageDataContext';
import { supabase } from '../lib/supabase';

const Contact = () => {
    const { content: pageContent = {} } = usePageData();
    const header = pageContent.header || {};
    const videoRef = useRef(null);

    // Contact form state
    const [contactForm, setContactForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [contactStatus, setContactStatus] = useState(''); // '' | 'submitting' | 'success' | 'error'

    // Booking form state
    const [bookingForm, setBookingForm] = useState({ name: '', email: '', phone: '', date: '', time: '', person: '' });
    const [bookingStatus, setBookingStatus] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);

        const handleScroll = () => {
            if (videoRef.current) {
                if (window.scrollY > 100) {
                    videoRef.current.muted = true;
                } else {
                    videoRef.current.muted = false;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function setContactField(k, v) { setContactForm(f => ({ ...f, [k]: v })); }
    function setBookingField(k, v) { setBookingForm(f => ({ ...f, [k]: v })); }

    async function handleContact(e) {
        e.preventDefault();
        setContactStatus('submitting');
        // Store inquiry as a booking with a message note
        const { error } = await supabase.from('bookings').insert([{
            name: contactForm.name,
            email: contactForm.email,
            phone: contactForm.phone,
            booking_date: new Date().toISOString().split('T')[0],
            message: contactForm.message,
            guests: 1,
            status: 'pending',
        }]);
        if (error) {
            setContactStatus('error');
        } else {
            setContactStatus('success');
            setContactForm({ name: '', email: '', phone: '', message: '' });
        }
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

    return (
        <main>




            <div className="page-header" style={{ position: 'relative', overflow: 'hidden', backgroundImage: 'none', height: '100vh' }}>
                <video
                    ref={videoRef}
                    autoPlay
                    muted={false}
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
                    <source src="/Gallery/Video Project 3.mp4" type="video/mp4" />
                </video>

                {/* Scroll Down Indicator */}
                <div className="scroll-down-indicator" onClick={() => window.scrollTo({ top: 650, behavior: 'smooth' })}>
                    <div className="mouse"></div>
                    <p>Scroll Down</p>
                </div>
            </div>



            <div className="page-contact-us">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">

                            <div className="contact-us-content">

                                <div className="section-title">
                                    <h3 className="wow fadeInUp">contact us</h3>
                                    <h2 className="text-anime-style-2" data-cursor="-opaque">Get in touch <span>with us</span></h2>
                                    <p className="wow fadeInUp" data-wow-delay="0.2s">Have questions or feedback? Reach out to us through the form below, call us, or visit our restaurant. We're here to help and look forward to connecting with you!</p>
                                </div>



                                <div className="contact-info-list wow fadeInUp" data-wow-delay="0.4s">
                                    <ul>
                                        <li>Golden Spoon Restaurant, 111, F Block, Sector 8, Noida, Uttar Pradesh 201301</li>
                                        <li><a href="tel:9217014763">9217014763</a></li>
                                    </ul>
                                </div>



                                <div className="contact-social-list wow fadeInUp" data-wow-delay="0.6s">
                                    <ul>
                                        <li><a href="#"><i className="fa-brands fa-facebook-f"></i></a></li>
                                        <li><a href="https://www.instagram.com/golden_spoon_restaurrant?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-instagram"></i></a></li>
                                    </ul>
                                </div>

                            </div>

                        </div>

                        <div className="col-lg-6">
                            <div className="contact-form">
                                {contactStatus === 'success' ? (
                                    <div className="wow fadeInUp" style={{textAlign:'center',padding:'40px 20px'}}>
                                        <i className="fas fa-check-circle" style={{fontSize:48,color:'#d4a843',marginBottom:16,display:'block'}}></i>
                                        <h3 style={{marginBottom:8}}>Message Sent!</h3>
                                        <p style={{opacity:0.8}}>Thank you for reaching out. We'll get back to you soon.</p>
                                        <button className="btn-default" style={{marginTop:20}} onClick={() => setContactStatus('')}>Send Another</button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleContact} className="wow fadeInUp">
                                        <div className="row">
                                            <div className="form-group col-md-12 mb-4">
                                                <label className="form-label">your name</label>
                                                <input type="text" className="form-control" placeholder="e.g. John" required
                                                    value={contactForm.name} onChange={e => setContactField('name', e.target.value)} />
                                            </div>
                                            <div className="form-group col-md-6 mb-4">
                                                <label className="form-label">email address</label>
                                                <input type="email" className="form-control" placeholder="e.g. John@example.com" required
                                                    value={contactForm.email} onChange={e => setContactField('email', e.target.value)} />
                                            </div>
                                            <div className="form-group col-md-6 mb-4">
                                                <label className="form-label">phone number</label>
                                                <input type="text" className="form-control" placeholder="e.g. +91 98765 43210" required
                                                    value={contactForm.phone} onChange={e => setContactField('phone', e.target.value)} />
                                            </div>
                                            <div className="form-group col-md-12 mb-5">
                                                <label className="form-label">message</label>
                                                <textarea className="form-control" rows="4" placeholder="Write Message.."
                                                    value={contactForm.message} onChange={e => setContactField('message', e.target.value)}></textarea>
                                            </div>
                                            {contactStatus === 'error' && (
                                                <div className="col-12 mb-3" style={{color:'#e74c3c',fontSize:14}}>Something went wrong. Please try again.</div>
                                            )}
                                            <div className="col-md-12">
                                                <button type="submit" className="btn-default" disabled={contactStatus === 'submitting'}>
                                                    {contactStatus === 'submitting' ? 'Sending…' : 'submit inquiry'}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="google-map">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">

                            <div className="google-map-iframe">
                                <iframe src="https://www.google.com/maps?q=Golden%20Spoon%20Restaurant%2C%20111%2C%20F%20Block%2C%20Sector%208%2C%20Noida%2C%20Uttar%20Pradesh%20201301&output=embed" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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

export default Contact;
