import React, { useEffect, useRef, useState } from 'react';
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
    const { items: cartItems, addItem, updateQuantity, itemCount, total, setIsOpen } = useCart();
    const getCartQty = (id) => cartItems.find(i => i.id === id)?.quantity || 0;

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
        if (!catsRes.error && catsRes.data?.length > 0) {
            setDbCategories(catsRes.data);
            // Auto-select first category so only one section shows at a time
            const firstSlug = catsRes.data[0]?.slug || catsRes.data[0]?.id;
            if (firstSlug) setActiveCategory(firstSlug);
        } else {
            // Fallback: auto-select first hardcoded section
            setActiveCategory(MENU_SECTIONS[0]?.id || 'all');
        }
        if (!itemsRes.error) setDbItems(itemsRes.data || []);
        setMenuLoaded(true);
    }

    function itemsByCategory(categoryId) {
        return dbItems.filter(item => {
            const inCat = item.category_id === categoryId;
            const matchSearch = !search || item.name.toLowerCase().includes(search.toLowerCase());
            return inCat && matchSearch;
        });
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
            <div className="page-header" style={{ position: 'relative', overflow: 'hidden', backgroundImage: 'none', height: '380px' }}>
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

            <div className="page-menu" style={{paddingTop:32,paddingBottom:8}}>
                <div className="container">
                    {/* ── Search Bar ── */}
                    <div className="row wow fadeInUp" style={{marginBottom:20}}>
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <div style={{position:'relative'}}>
                                <i className="fas fa-search" style={{position:'absolute',left:16,top:'50%',transform:'translateY(-50%)',color:'#d4a843',zIndex:1}}></i>
                                <input
                                    type="text"
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Search menu items…"
                                    style={{
                                        width:'100%', padding:'13px 16px 13px 46px',
                                        border:'1.5px solid #d4a843', borderRadius:50,
                                        background:'var(--secondary-color, #fff)',
                                        color:'var(--primary-color, #111)',
                                        fontSize:15, outline:'none', boxSizing:'border-box',
                                        boxShadow:'0 2px 12px rgba(212,168,67,0.12)',
                                    }}
                                />
                                {search && (
                                    <button onClick={() => setSearch('')}
                                        style={{position:'absolute',right:16,top:'50%',transform:'translateY(-50%)',background:'none',border:'none',cursor:'pointer',color:'inherit',fontSize:16,opacity:0.6}}>
                                        ✕
                                    </button>
                                )}
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
                        {(dbCategories.length > 0 ? dbCategories : MENU_SECTIONS.map(s => ({id:s.id,name:s.name,slug:s.id}))).map(cat => (
                            <button key={cat.id} onClick={() => { setActiveCategory(cat.slug||cat.id); window.scrollTo({top:280,behavior:'smooth'}); }}
                                style={{marginRight:10,padding:'9px 22px',borderRadius:50,fontSize:14,fontWeight:600,cursor:'pointer',transition:'all 0.2s',border:activeCategory===(cat.slug||cat.id)?'none':'1.5px solid rgba(255,255,255,0.15)',background:activeCategory===(cat.slug||cat.id)?'#d4a843':'transparent',color:activeCategory===(cat.slug||cat.id)?'#111':'inherit',whiteSpace:'nowrap'}}>
                                {cat.name}
                            </button>
                        ))}
                    </div>

                </div>
            </div>

            {/* ── Dynamic menu from Supabase (admin-managed) ─────────── */}
            {menuLoaded && dbCategories.length > 0 && (() => {
                const visibleCats = dbCategories.filter(cat => activeCategory === "all" || (cat.slug||cat.id) === activeCategory);
                const hasResults = visibleCats.some(cat => itemsByCategory(cat.id).length > 0);
                if (!hasResults && search) return (
                    <div style={{textAlign:'center',padding:'60px 20px',opacity:0.6}}>
                        <i className="fas fa-search" style={{fontSize:32,marginBottom:12,display:'block',color:'#d4a843'}}></i>
                        <p style={{fontSize:16}}>No items found for "<strong>{search}</strong>"</p>
                        <button onClick={() => setSearch('')} style={{marginTop:12,background:'#d4a843',border:'none',borderRadius:50,padding:'8px 24px',fontWeight:700,cursor:'pointer',color:'#111'}}>Clear Search</button>
                    </div>
                );
                return (
                <div style={{padding:'0 0 40px'}}>
                    {visibleCats.map(cat => {
                        const catItems = itemsByCategory(cat.id);
                        if (catItems.length === 0) return null;
                        return (
                            <div key={cat.id} id={cat.slug} style={{marginTop:8}}>
                                <div className="container">
                                    {/* Compact 2-column grid — no heavy sidebar */}
                                    <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:'12px 20px',padding:'8px 0'}}>
                                        {catItems.map(item => (
                                            <div key={item.id} style={{display:'flex',alignItems:'center',gap:14,padding:'14px 16px',background:'var(--secondary-color,rgba(255,255,255,0.03))',borderRadius:14,border:'1px solid rgba(128,128,128,0.1)'}}>
                                                <img src={item.image_url || '/images/logo.png'}
                                                    style={{width:72,height:72,objectFit:'cover',borderRadius:'50%',flexShrink:0}}
                                                    alt={item.name} />
                                                <div style={{flex:1,minWidth:0}}>
                                                    <div style={{display:'flex',alignItems:'center',gap:6,flexWrap:'wrap'}}>
                                                        <span style={{fontWeight:700,fontSize:15}}>
                                                            {item.name}
                                                            {item.is_vegetarian && <span style={{marginLeft:4,fontSize:11}}>🌱</span>}
                                                        </span>
                                                    </div>
                                                    {item.description && <p style={{margin:'3px 0 0',fontSize:12,opacity:0.6,lineHeight:1.4,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'}}>{item.description}</p>}
                                                </div>
                                                <div style={{display:'flex',flexDirection:'column',alignItems:'flex-end',gap:8,flexShrink:0}}>
                                                    {item.price && <span style={{fontWeight:700,color:'#d4a843',fontSize:15}}>₹{Number(item.price).toFixed(0)}</span>}
                                                    {item.price && (
                                                        getCartQty(item.id) > 0 ? (
                                                            <div style={{display:'flex',alignItems:'center',background:'#d4a843',borderRadius:8,overflow:'hidden'}}>
                                                                <button onClick={() => updateQuantity(item.id, getCartQty(item.id) - 1)}
                                                                    style={{background:'transparent',border:'none',color:'#111',padding:'5px 10px',fontSize:16,fontWeight:700,cursor:'pointer'}}>−</button>
                                                                <span style={{color:'#111',fontWeight:700,fontSize:14,minWidth:18,textAlign:'center'}}>{getCartQty(item.id)}</span>
                                                                <button onClick={() => updateQuantity(item.id, getCartQty(item.id) + 1)}
                                                                    style={{background:'transparent',border:'none',color:'#111',padding:'5px 10px',fontSize:16,fontWeight:700,cursor:'pointer'}}>+</button>
                                                            </div>
                                                        ) : (
                                                            <button onClick={() => handleAdd(item)}
                                                                style={{background:'#d4a843',color:'#111',border:'none',borderRadius:8,padding:'6px 14px',fontSize:13,fontWeight:700,cursor:'pointer'}}>
                                                                + Add
                                                            </button>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                );
            })()}

            {/* ── Legacy hardcoded menu (shown when Supabase has no data) ── */}

            {/* ── Hardcoded menu with Add-to-Cart ── */}
            {(!menuLoaded || dbCategories.length === 0) && (
            <div style={{padding:'0 0 40px'}}>
                {filteredSections.map(section => (
                    <div id={section.id} key={section.id} style={{marginTop:8}}>
                        <div className="container">
                            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:'12px 20px',padding:'8px 0'}}>
                                        {section.items.map((item) => (
                                            <div key={item.name} style={{display:'flex',alignItems:'center',gap:14,padding:'14px 16px',background:'var(--secondary-color,rgba(255,255,255,0.03))',borderRadius:14,border:'1px solid rgba(128,128,128,0.1)'}}>
                                                <img src={item.img} style={{width:72,height:72,objectFit:'cover',borderRadius:'50%',flexShrink:0}} alt={item.name} onError={e => { e.target.src = '/images/logo.png' }} />
                                                <div style={{flex:1,minWidth:0}}>
                                                    <span style={{fontWeight:700,fontSize:15}}>{item.name}</span>
                                                    <div style={{display:'flex',alignItems:'center',gap:8,marginTop:8,flexWrap:'wrap'}}>
                                                        {item.prices.Half && (() => {
                                                            const hid = item.name + '-half';
                                                            const qty = getCartQty(hid);
                                                            return qty > 0 ? (
                                                                <div style={{display:'flex',alignItems:'center',gap:0,background:'transparent',border:'1.5px solid #d4a843',borderRadius:6,overflow:'hidden'}}>
                                                                    <button onClick={() => updateQuantity(hid, qty - 1)} style={{background:'transparent',border:'none',color:'#d4a843',padding:'4px 10px',fontSize:15,fontWeight:700,cursor:'pointer'}}>−</button>
                                                                    <span style={{color:'#d4a843',fontWeight:700,fontSize:13,minWidth:18,textAlign:'center'}}>{qty}</span>
                                                                    <button onClick={() => updateQuantity(hid, qty + 1)} style={{background:'transparent',border:'none',color:'#d4a843',padding:'4px 10px',fontSize:15,fontWeight:700,cursor:'pointer'}}>+</button>
                                                                </div>
                                                            ) : (
                                                                <button onClick={() => handleAdd({...item, name: item.name + ' (Half)', price: item.prices.Half, id: hid})}
                                                                    style={{background:'transparent',color:'#d4a843',border:'1.5px solid #d4a843',borderRadius:6,padding:'5px 12px',fontSize:12,fontWeight:700,cursor:'pointer',whiteSpace:'nowrap'}}>
                                                                    + Half ₹{item.prices.Half}
                                                                </button>
                                                            );
                                                        })()}
                                                        {item.prices.Full && (() => {
                                                            const fid = item.name + '-full';
                                                            const qty = getCartQty(fid);
                                                            return qty > 0 ? (
                                                                <div style={{display:'flex',alignItems:'center',gap:0,background:'#d4a843',borderRadius:6,overflow:'hidden'}}>
                                                                    <button onClick={() => updateQuantity(fid, qty - 1)} style={{background:'transparent',border:'none',color:'#111',padding:'4px 10px',fontSize:15,fontWeight:700,cursor:'pointer'}}>−</button>
                                                                    <span style={{color:'#111',fontWeight:700,fontSize:13,minWidth:18,textAlign:'center'}}>{qty}</span>
                                                                    <button onClick={() => updateQuantity(fid, qty + 1)} style={{background:'transparent',border:'none',color:'#111',padding:'4px 10px',fontSize:15,fontWeight:700,cursor:'pointer'}}>+</button>
                                                                </div>
                                                            ) : (
                                                                <button onClick={() => handleAdd({...item, name: item.name + (item.prices.Half ? ' (Full)' : ''), price: item.prices.Full, id: fid})}
                                                                    style={{background:'#d4a843',color:'#111',border:'none',borderRadius:6,padding:'5px 12px',fontSize:12,fontWeight:700,cursor:'pointer',whiteSpace:'nowrap'}}>
                                                                    {item.prices.Half ? 'Full ₹' + item.prices.Full : '+ Add ₹' + item.prices.Full}
                                                                </button>
                                                            );
                                                        })()}
                                                        {!item.prices.Half && !item.prices.Full && (
                                                            <span style={{fontSize:12,opacity:0.5}}>Price on request</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            )}
            {itemCount > 0 && (
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
            )}
        </main>
    );
};

export default Menu;
