
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../lib/api';

function formatDate(d) {
    if (!d) return '';
    return new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

const BlogSingle = () => {
    const { slug } = useParams();
    const [post, setPost] = useState(null);
    const [notFound, setNotFound] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (!slug) { setLoading(false); setNotFound(true); return; }
        api.get(`/blog/${slug}`).then(({ data, error }) => {
            if (error || !data) setNotFound(true);
            else setPost(data);
            setLoading(false);
        });
    }, [slug]);

    if (loading) {
        return (
            <main style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="fas fa-spinner fa-spin" style={{ fontSize: 32, opacity: 0.5 }}></i>
            </main>
        );
    }

    if (notFound || !post) {
        return (
            <main style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <h2>Post not found</h2>
                    <Link to="/blog" className="btn-default" style={{ display: 'inline-block', marginTop: 16 }}>Back to Blog</Link>
                </div>
            </main>
        );
    }

    return (
        <main>




	<div className="page-header parallaxie">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">

						<div className="page-header-box">
							<h1 className="text-anime-style-2" data-cursor="-opaque">{post.title}</h1>
							<div className="post-single-meta wow fadeInUp">
								<ol className="breadcrumb" style={{color:'#fff'}}>
                                <li style={{color:'#fff'}}><i className="fa-regular fa-user"></i> {post.author || 'Golden Spoon'}</li>
									<li style={{color:'#fff'}}><i className="fa-regular fa-clock"></i> {formatDate(post.published_at || post.created_at)}</li>
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

                    {post.featured_image && (
                    <div className="post-image">
                        <figure className="image-anime">
                            <img src={post.featured_image} alt={post.title} />
                        </figure>
                    </div>
                    )}



                    <div className="post-content">

                        <div className="post-entry" dangerouslySetInnerHTML={{ __html: post.content || '' }} />



                        {post.category && (
                        <div className="post-tag-links">
                            <div className="row align-items-center">
                                <div className="col-lg-8">

                                    <div className="post-tags wow fadeInUp" data-wow-delay="0.5s">
                                        <span className="tag-links">
                                            Category:
                                            <a href="#">{post.category}</a>
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                        )}

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
