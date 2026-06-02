import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

const CHEF_PROFILES = {
    rakesh: {
        about: 'Rakesh leads the Golden Spoon kitchen with a steady hand and a modern approach to flavor. He loves building dishes that feel familiar at first bite and memorable at the finish, with careful seasoning, clean plating, and consistent timing across every plate.',
        contact: 'For private dinners or signature menu ideas, Rakesh is the chef to speak with when you want polished, balanced food that still feels warm and approachable.',
        email: 'info@goldenspoonrestaurant.com',
        experience: '12 years of experience',
        image: '/images/team-1.jpg',
        name: 'Rakesh',
        phone: '+9217014763',
        specialty: 'Executive cuisine',
    },
    shiva: {
        about: "Shiva is the kitchen's quiet engine, keeping prep, firing, and service perfectly in sync. He is known for disciplined timing, sharp organization, and the kind of consistency that lets the whole team perform at its best.",
        contact: 'If you need a smooth service flow and a kitchen that stays calm under pressure, Shiva is the chef who keeps everything moving.',
        email: 'info@goldenspoonrestaurant.com',
        experience: '10 years of experience',
        image: '/images/team-2.jpg',
        name: 'Shiva',
        phone: '+9217014763',
        specialty: 'Sous chef and kitchen operations',
    },
    vishnu: {
        about: 'Vishnu brings finesse to the sweet side of the menu, creating desserts and finishing touches that lift the entire dining experience. His style blends classic technique with playful presentation, so each plate ends on a high note.',
        contact: 'For dessert ideas, celebration menus, or a refined final course, Vishnu adds the perfect finishing touch.',
        email: 'info@goldenspoonrestaurant.com',
        experience: '9 years of experience',
        image: '/images/team-3.jpg',
        name: 'Vishnu',
        phone: '+9217014763',
        specialty: 'Pastry and desserts',
    },
    josheph: {
        about: 'Josheph connects the kitchen and the dining room with a strong eye for hospitality and detail. He understands how service should feel from the guest side, and he helps keep the whole restaurant experience smooth, warm, and well-paced.',
        contact: 'Josheph is ideal for private dining support and service planning where great food and great hospitality need to work together.',
        email: 'info@goldenspoonrestaurant.com',
        experience: '11 years of experience',
        image: '/images/team-4.jpg',
        name: 'Josheph',
        phone: '+9217014763',
        specialty: 'Restaurant operations',
    },
    karan: {
        about: 'Karan is all about bold fire, deep marinades, and the rich aroma that comes from a well-managed grill and tandoor section. He brings energy to the menu with smoky, satisfying flavors that stand out without overpowering the dish.',
        contact: 'When the menu calls for strong spices and confident heat, Karan is the chef who brings it to life.',
        email: 'info@goldenspoonrestaurant.com',
        experience: '8 years of experience',
        image: '/images/team-6.jpg',
        name: 'Karan',
        phone: '+9217014763',
        specialty: 'Grill and tandoor',
    },
    pushpendra: {
        about: 'Pushpendra focuses on large-service consistency, clean plating, and the kind of balance needed for busy restaurant operations. He keeps an eye on both presentation and timing, making sure every guest gets a plate that feels thoughtful and complete.',
        contact: 'For banquets, group dining, or polished presentation on a busy night, Pushpendra keeps everything running smoothly.',
        email: 'info@goldenspoonrestaurant.com',
        experience: '7 years of experience',
        image: '/images/team-8.jpg',
        name: 'Pushpendra',
        phone: '+9217014763',
        specialty: 'Banquet plating and service',
    },
};

const DEFAULT_CHEF = CHEF_PROFILES.rakesh;

const getChefProfile = (chefSlug) => {
    if (!chefSlug) {
        return DEFAULT_CHEF;
    }

    return CHEF_PROFILES[chefSlug.toLowerCase()] || DEFAULT_CHEF;
};

const ChefSingle = () => {
    const { chefSlug } = useParams();
    const chef = getChefProfile(chefSlug);

    useEffect(() => {
        if (typeof window !== 'undefined' && typeof window.scrollTo === 'function') {
            window.scrollTo(0, 0);
        }
    }, [chefSlug]);

    return (
        <main>
            <div className="page-header parallaxie">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="page-header-box">
                                <h1 className="text-anime-style-2" data-cursor="-opaque">{chef.name}</h1>
                                <nav className="wow fadeInUp">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/">home</Link></li>
                                        <li className="breadcrumb-item"><Link to="/chefs">chefs</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">{chef.name}</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="page-team-single">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="team-single-sidebar">
                                <div className="team-single-image">
                                    <figure className="image-anime">
                                        <img src={chef.image} alt={`${chef.name} - Golden Spoon Restaurrant chef`} />
                                    </figure>
                                </div>

                                <div className="sidebar-cta-box wow fadeInUp">
                                    <div className="icon-box">
                                        <img src="/images/icon-sidebar-cta.svg" alt="" />
                                    </div>

                                    <div className="cta-contact-content">
                                        <h3>You have different questions?</h3>
                                        <p>Our team will answer all your questions. we ensure a quick response.</p>
                                    </div>

                                    <div className="cta-contact-btn">
                                        <a href="tel:9217014763" className="btn-default btn-highlighted"><img src="/images/icon-sidebar-cta-phone.svg" alt="" />+9217014763</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-8">
                            <div className="team-single-content">
                                <div className="team-member-info">
                                    <div className="section-title">
                                        <h3 className="wow fadeInUp">Chef</h3>
                                        <h2 className="text-anime-style-2" data-cursor="-opaque">About <span>{chef.name}</span></h2>
                                        <p className="wow fadeInUp" data-wow-delay="0.2s">{chef.about}</p>
                                    </div>

                                    <div className="team-info-list wow fadeInUp" data-wow-delay="0.4s">
                                        <ul>
                                            <li>Specialty : <span>{chef.specialty}</span></li>
                                            <li>Experience : <span>{chef.experience}</span></li>
                                            <li>Email: <span>{chef.email}</span></li>
                                            <li>Phone: <span>{chef.phone}</span></li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="team-member-contact-form">
                                    <div className="section-title">
                                        <h2 className="text-anime-style-2" data-cursor="-opaque">Contact <span>{chef.name}</span></h2>
                                        <p className="wow fadeInUp">{chef.contact}</p>
                                    </div>

                                    <div className="contact-form">
                                        <form id="contactForm" action="#" method="POST" data-toggle="validator" className="wow fadeInUp">
                                            <div className="row">
                                                <div className="form-group col-md-12 mb-4">
                                                    <label className="form-label">your name</label>
                                                    <input type="text" name="Name" className="form-control" id="Name" placeholder="e.g. John" required />
                                                    <div className="help-block with-errors"></div>
                                                </div>

                                                <div className="form-group col-md-6 mb-4">
                                                    <label className="form-label">email address</label>
                                                    <input type="email" name="Email" className="form-control" id="Email" placeholder="e.g. John@example.com" required />
                                                    <div className="help-block with-errors"></div>
                                                </div>

                                                <div className="form-group col-md-6 mb-4">
                                                    <label className="form-label">phone number</label>
                                                    <input type="text" name="Phone" className="form-control" id="Phone" placeholder="e.g. + 123 456 879 2" required />
                                                    <div className="help-block with-errors"></div>
                                                </div>

                                                <div className="form-group col-md-12 mb-5">
                                                    <label className="form-label">message</label>
                                                    <textarea name="Message" className="form-control" id="Message" rows="4" placeholder="Write Message.."></textarea>
                                                    <div className="help-block with-errors"></div>
                                                </div>

                                                <div className="col-md-12">
                                                    <button type="submit" className="btn-default">submit inquiry</button>
                                                    <div id="MsgSubmit" className="h3 hidden"></div>
                                                </div>
                                            </div>
                                        </form>
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
                                        <li>Mon - Sat<span>11:00 AM - 07:00 PM</span></li>
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
                                            <input type="email" name="email" className="form-control" id="email" placeholder="e.g. John@example.com" required />
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

export default ChefSingle;
