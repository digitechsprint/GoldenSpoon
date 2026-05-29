import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageData } from '../context/PageDataContext';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext';
import { MENU_SECTIONS } from '../data/menuData';

const Menu = () => {
    const { content: pageContent = {} } = usePageData();
    const header = pageContent.header || {};
    const videoRef = useRef(null);
    const [dbCategories, setDbCategories] = useState([]);
    const [dbItems, setDbItems] = useState([]);
    const [menuLoaded, setMenuLoaded] = useState(false);
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [added, setAdded] = useState({});
    const { addItem, itemCount, total, setIsOpen } = useCart();

    function handleAdd(item) {
        addItem({
            id: item.id,
            name: item.name,
            price: parseFloat(item.price) || 0,
            image: item.image_url,
            category: item.menu_categories?.name || '',
        });
        setAdded(a => ({ ...a, [item.id]: true }));
        setTimeout(() => setAdded(a => ({ ...a, [item.id]: false })), 1200);
    }

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
        fetchMenu();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    async function fetchMenu() {
        const [catsRes, itemsRes] = await Promise.all([
            supabase.from('menu_categories').select('*').eq('is_active', true).order('sort_order'),
            supabase.from('menu_items').select('*, menu_categories(name, slug)').eq('is_active', true).order('sort_order'),
        ]);
        if (!catsRes.error && catsRes.data?.length > 0) setDbCategories(catsRes.data);
        if (!itemsRes.error) setDbItems(itemsRes.data || []);
        setMenuLoaded(true);
    }

    function itemsByCategory(categoryId) {
        return dbItems.filter(item => item.category_id === categoryId);
    }

    const filteredSections = MENU_SECTIONS
        .filter(s => activeCategory === 'all' || s.id === activeCategory)
        .map(s => ({
            ...s,
            items: search
                ? s.items.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
                : s.items,
        }))
        .filter(s => s.items.length > 0);

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
                    <source src="/Gallery/video1.mp4" type="video/mp4" />
                </video>
                
                {/* Scroll Down Indicator */}
                <div className="scroll-down-indicator" onClick={() => window.scrollTo({ top: 650, behavior: 'smooth' })}>
                    <div className="mouse"></div>
                    <p>Scroll Down</p>
                </div>
            </div>

            <div className="page-menu">
                <div className="container">
                    <div className="row section-row">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h3 className="wow fadeInUp">taste the best that surprise you</h3>
                                <h2 className="text-anime-style-2" data-cursor="-opaque">our special <span>menu</span></h2>
                                <p className="wow fadeInUp" data-wow-delay="0.2s">Enjoy the unique dishes from the Golden Spoon restaurant that only our restaurant has.</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* ── Search Bar ── */}
                    <div className="row wow fadeInUp" style={{marginBottom:16}}>
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <div style={{position:'relative'}}>
                                <i className="fas fa-search" style={{position:'absolute',left:16,top:'50%',transform:'translateY(-50%)',opacity:0.4,zIndex:1}}></i>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Search menu items…"
                                    style={{width:'100%',padding:'12px 16px 12px 44px',border:'1.5px solid rgba(255,255,255,0.12)',borderRadius:50,background:'rgba(255,255,255,0.05)',color:'inherit',fontSize:15,outline:'none',boxSizing:'border-box'}}
                                />
                            </div>
                        </div>
                    </div>
                    {/* ── Category Filter Pills ── */}
                    <style>{`
                        .gs-filter-scroll{overflow-x:auto;-ms-overflow-style:none;scrollbar-width:none;cursor:grab;}
                        .gs-filter-scroll::-webkit-scrollbar{display:none;}
                        .gs-filter-scroll:active{cursor:grabbing;}
                    `}</style>
                    <div className="wow fadeInUp gs-filter-scroll" style={{whiteSpace:'nowrap',padding:'4px 0 8px',marginBottom:8}}
                        ref={el => {
                            if (!el) return;
                            let isDown = false, startX, scrollLeft;
                            el.onmousedown = e => { isDown=true; startX=e.pageX-el.offsetLeft; scrollLeft=el.scrollLeft; };
                            el.onmouseleave = () => { isDown=false; };
                            el.onmouseup = () => { isDown=false; };
                            el.onmousemove = e => { if(!isDown) return; e.preventDefault(); el.scrollLeft = scrollLeft-(e.pageX-el.offsetLeft-startX); };
                        }}
                    >
                        <button onClick={() => setActiveCategory('all')} style={{marginRight:10,padding:'9px 22px',borderRadius:50,fontSize:14,fontWeight:600,cursor:'pointer',transition:'all 0.2s',border:activeCategory==='all'?'none':'1.5px solid rgba(255,255,255,0.15)',background:activeCategory==='all'?'#d4a843':'transparent',color:activeCategory==='all'?'#111':'inherit',whiteSpace:'nowrap'}}>All Items</button>
                        {(dbCategories.length > 0 ? dbCategories : MENU_SECTIONS.map(s => ({id:s.id,name:s.name,slug:s.id}))).map(cat => (
                            <button key={cat.id} onClick={() => { setActiveCategory(cat.slug||cat.id); setTimeout(()=>document.getElementById(cat.slug||cat.id)?.scrollIntoView({behavior:'smooth'}),100); }}
                                style={{marginRight:10,padding:'9px 22px',borderRadius:50,fontSize:14,fontWeight:600,cursor:'pointer',transition:'all 0.2s',border:activeCategory===(cat.slug||cat.id)?'none':'1.5px solid rgba(255,255,255,0.15)',background:activeCategory===(cat.slug||cat.id)?'#d4a843':'transparent',color:activeCategory===(cat.slug||cat.id)?'#111':'inherit',whiteSpace:'nowrap'}}>
                                {cat.name}
                            </button>
                        ))}
                    </div>

                </div>
            </div>

            {/* ── Dynamic menu from Supabase (admin-managed) ─────────── */}
            {menuLoaded && dbCategories.length > 0 && (
                <div className="our-food-menu">
                    {dbCategories.filter(cat => activeCategory === "all" || (cat.slug||cat.id) === activeCategory).map(cat => {
                        const catItems = itemsByCategory(cat.id);
                        if (catItems.length === 0) return null;
                        return (
                            <div className="food-menu-item" id={cat.slug} key={cat.id}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-3">
                                            <div className="food-menu-sidebar">
                                                <div className="section-title">
                                                    <h3 className="wow fadeInUp">menu &amp; pricing</h3>
                                                    <h2 className="text-anime-style-2" data-cursor="-opaque">{cat.name}</h2>
                                                    {cat.description && <p className="wow fadeInUp" data-wow-delay="0.2s">{cat.description}</p>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-9">
                                            <div className="our-menu-list">
                                                {catItems.map((item, idx) => (
                                                    <div key={item.id} className="our-menu-item wow fadeInUp" data-wow-delay={`${(idx % 5) * 0.2}s`}>
                                                        <div className="our-menu-image">
                                                            <figure>
                                                                <img
                                                                    src={item.image_url || '/images/logo.png'}
                                                                    style={{width:'100px',height:'100px',objectFit:'cover',borderRadius:'50%'}}
                                                                    alt={item.name}
                                                                />
                                                            </figure>
                                                        </div>
                                                        <div className="menu-item-body">
                                                            <div className="menu-item-title" style={{alignItems:'center'}}>
                                                                <h3>
                                                                    {item.name}
                                                                    {item.is_vegetarian && <span style={{marginLeft:6,fontSize:12,opacity:0.7}}>🌱</span>}
                                                                </h3>
                                                                <hr style={{alignSelf:'center',flex:1,margin:'0 15px'}} />
                                                                <div style={{display:'flex',alignItems:'center',gap:12,whiteSpace:'nowrap'}}>
                                                                    <span style={{fontWeight:700}}>
                                                                        {item.price ? `₹${Number(item.price).toFixed(0)}` : ''}
                                                                    </span>
                                                                    {item.price && (
                                                                        <button
                                                                            onClick={() => handleAdd(item)}
                                                                            style={{
                                                                                background: added[item.id] ? '#16a34a' : '#d4a843',
                                                                                color: '#111', border: 'none', borderRadius: 8,
                                                                                padding: '7px 16px', fontSize: 13, fontWeight: 700,
                                                                                cursor: 'pointer', transition: 'all 0.2s',
                                                                            }}
                                                                        >
                                                                            {added[item.id] ? '✓ Added' : '+ Add'}
                                                                        </button>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            {item.description && (
                                                                <div className="menu-item-content">
                                                                    <p>{item.description}</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ── Legacy hardcoded menu (shown when Supabase has no data) ── */}

            {/* ── Hardcoded menu with Add-to-Cart ── */}
            {(!menuLoaded || dbCategories.length === 0) && (
            <div className="our-food-menu">
                {filteredSections.map(section => (
                    <div className="food-menu-item" id={section.id} key={section.id}>
                        <div className="container">
                            <div className="row">
                                <div className="col-lg-3">
                                    <div className="food-menu-sidebar">
                                        <div className="section-title">
                                            <h3 className="wow fadeInUp">menu &amp; pricing</h3>
                                            <h2 className="text-anime-style-2" data-cursor="-opaque">{section.name}</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9">
                                    <div className="our-menu-list">
                                        {section.items.map((item, idx) => (
                                            <div key={item.name} className="our-menu-item wow fadeInUp" data-wow-delay={`${(idx % 5) * 0.2}s`}>
                                                <div className="our-menu-image">
                                                    <figure>
                                                        <img src={item.img} style={{width:'100px',height:'100px',objectFit:'cover',borderRadius:'50%'}} alt={item.name} onError={e => { e.target.src = '/images/logo.png' }} />
                                                    </figure>
                                                </div>
                                                <div className="menu-item-body">
                                                    <div className="menu-item-title" style={{display:'flex',alignItems:'center',flexWrap:'nowrap'}}>
                                                        <h3 style={{margin:0}}>{item.name}</h3>
                                                        <hr style={{flex:1,margin:'0 12px',minWidth:16,alignSelf:'center'}} />
                                                    </div>
                                                    <div style={{display:'flex',alignItems:'center',gap:8,marginTop:10}}>
                                                        {item.prices.Half && (
                                                            <button onClick={() => handleAdd({...item, name: item.name + ' (Half)', price: item.prices.Half, id: item.name + '-half'})}
                                                                style={{background: added[item.name+'-half'] ? '#16a34a' : 'transparent', color: added[item.name+'-half'] ? '#fff' : '#d4a843', border:'1.5px solid #d4a843', borderRadius:6, padding:'5px 12px', fontSize:12, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap', transition:'all 0.2s'}}>
                                                                {added[item.name+'-half'] ? '✓' : '+'} Half ₹{item.prices.Half}
                                                            </button>
                                                        )}
                                                        {item.prices.Full && (
                                                            <button onClick={() => handleAdd({...item, name: item.name + (item.prices.Half ? ' (Full)' : ''), price: item.prices.Full, id: item.name + '-full'})}
                                                                style={{background: added[item.name+'-full'] ? '#16a34a' : '#d4a843', color: added[item.name+'-full'] ? '#fff' : '#111', border:'none', borderRadius:6, padding:'5px 12px', fontSize:12, fontWeight:700, cursor:'pointer', whiteSpace:'nowrap', transition:'all 0.2s'}}>
                                                                {added[item.name+'-full'] ? '✓ Added' : (item.prices.Half ? 'Full ₹' + item.prices.Full : '+ Add ₹' + item.prices.Full)}
                                                            </button>
                                                        )}
                                                        {!item.prices.Half && !item.prices.Full && (
                                                            <span style={{fontSize:12,opacity:0.5}}>Price on request</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            )}
            {itemCount > 0 ? (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        position: 'fixed', bottom: 32, right: 32, zIndex: 1000,
                        background: '#d4a843', color: '#111', border: 'none',
                        borderRadius: 50, padding: '14px 24px',
                        fontSize: 15, fontWeight: 700, cursor: 'pointer',
                        boxShadow: '0 8px 32px rgba(212,168,67,0.5)',
                        display: 'flex', alignItems: 'center', gap: 10,
                        transition: 'transform 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <i className="fas fa-shopping-basket"></i>
                    View Cart ({itemCount} item{itemCount !== 1 ? 's' : ''} · ₹{total.toFixed(0)})
                </button>
            ) : (
                <Link
                    to="/order"
                    style={{
                        position: 'fixed', bottom: 32, right: 32, zIndex: 1000,
                        background: '#d4a843', color: '#111', borderRadius: 50,
                        padding: '14px 24px', fontSize: 15, fontWeight: 700,
                        boxShadow: '0 8px 32px rgba(212,168,67,0.5)',
                        display: 'flex', alignItems: 'center', gap: 10,
                        textDecoration: 'none', transition: 'transform 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                >
                    <i className="fas fa-utensils"></i>
                    Order Online
                </Link>
            )}
        </main>
    );
};

export default Menu;
