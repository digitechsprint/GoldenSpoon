
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePageData } from '../context/PageDataContext';

const Chefs = () => {
    const { content: pageContent = {} } = usePageData();
    const header = pageContent.header || {};
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
						<h1 className="text-anime-style-2" data-cursor="-opaque">{header.title || 'Our Chefs'}</h1>
						<nav className="wow fadeInUp">
							<ol className="breadcrumb">
								<li className="breadcrumb-item"><Link to="/">home</Link></li>
								<li className="breadcrumb-item active" aria-current="page">Our Chefs</li>
							</ol>
						</nav>
					</div>
					
				</div>
			</div>
		</div>
	</div>
	

    
    <div className="page-team">
        <div className="container">
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

                <div className="col-lg-3 col-md-6">
                    
                    <div className="team-item wow fadeInUp" data-wow-delay="1s">
                        
                        <div className="team-image">
                            <Link to="/chef-single/karan" data-cursor-text="View">
                                <figure className="image-anime">
                                    <img src="/images/team-6.jpg" alt="" />
                                </figure>
                            </Link>
                        </div>
                        
                
                        
                        <div className="team-body">
                            
                            <div className="team-content">
                                <h3><Link to="/chef-single/karan">Karan</Link></h3>
                                <p>grill chef</p>
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
                    
                    <div className="team-item wow fadeInUp" data-wow-delay="1.4s">
                        
                        <div className="team-image">
                            <Link to="/chef-single/pushpendra" data-cursor-text="View">
                                <figure className="image-anime">
                                    <img src="/images/team-8.jpg" alt="" />
                                </figure>
                            </Link>
                        </div>
                        
                
                        
                        <div className="team-body">
                            
                            <div className="team-content">
                                <h3><Link to="/chef-single/pushpendra">Pushpendra</Link></h3>
                                <p>banquet chef</p>
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

export default Chefs;
