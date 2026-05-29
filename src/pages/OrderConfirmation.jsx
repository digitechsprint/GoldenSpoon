import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function OrderConfirmation() {
  const [params] = useSearchParams()
  const orderNumber = params.get('order')
  const method = params.get('method')
  const [order, setOrder] = useState(null)
  const [orderItems, setOrderItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)
    if (orderNumber) fetchOrder()
    else setLoading(false)
  }, [orderNumber])

  async function fetchOrder() {
    const { data: ord } = await supabase
      .from('orders')
      .select('*')
      .eq('order_number', orderNumber)
      .single()

    if (ord) {
      setOrder(ord)
      const { data: items } = await supabase
        .from('order_items')
        .select('*')
        .eq('order_id', ord.id)
      setOrderItems(items || [])
    }
    setLoading(false)
  }

  const card = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 14, padding: '24px 28px', marginBottom: 20,
  }

  if (loading) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', opacity: 0.5 }}>
          <i className="fas fa-spinner fa-spin" style={{ fontSize: 40, display: 'block', marginBottom: 16 }}></i>
          <p>Loading your order…</p>
        </div>
      </main>
    )
  }

  if (!orderNumber || !order) {
    return (
      <main style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <i className="fas fa-exclamation-circle" style={{ fontSize: 48, color: '#ef4444', display: 'block', marginBottom: 16 }}></i>
          <h2>Order not found</h2>
          <Link to="/order" className="btn-default" style={{ display: 'inline-block', marginTop: 16 }}>Back to Menu</Link>
        </div>
      </main>
    )
  }

  const isUpi = method === 'upi'

  return (
    <main>
      <div className="page-header parallaxie" style={{ minHeight: 260 }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">Order Confirmed</h1>
                <nav className="wow fadeInUp">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">home</Link></li>
                    <li className="breadcrumb-item"><Link to="/order">order</Link></li>
                    <li className="breadcrumb-item active">confirmation</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              {/* Success banner */}
              <div className="wow fadeInUp" style={{
                ...card,
                textAlign: 'center',
                borderColor: 'rgba(16,185,129,0.3)',
                background: 'rgba(16,185,129,0.06)',
                marginBottom: 28,
              }}>
                <div style={{
                  width: 72, height: 72, borderRadius: '50%',
                  background: 'rgba(16,185,129,0.15)', display: 'inline-flex',
                  alignItems: 'center', justifyContent: 'center', marginBottom: 18,
                }}>
                  <i className="fas fa-check" style={{ fontSize: 32, color: '#10b981' }}></i>
                </div>
                <h2 style={{ fontSize: 24, fontWeight: 800, margin: '0 0 10px' }}>
                  Thank you, {order.customer_name.split(' ')[0]}!
                </h2>
                <p style={{ opacity: 0.7, fontSize: 15, margin: '0 0 18px' }}>
                  Your order has been placed successfully.
                </p>
                <div style={{
                  display: 'inline-block',
                  background: 'rgba(0,0,0,0.2)', borderRadius: 10,
                  padding: '10px 24px',
                }}>
                  <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 2 }}>Order Number</div>
                  <div style={{ fontSize: 20, fontWeight: 900, color: '#d4a843', fontFamily: 'monospace', letterSpacing: '0.06em' }}>
                    {order.order_number}
                  </div>
                </div>
              </div>

              {/* UPI pending notice */}
              {isUpi && (
                <div className="wow fadeInUp" style={{
                  ...card,
                  borderColor: 'rgba(212,168,67,0.3)',
                  background: 'rgba(212,168,67,0.06)',
                }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 10px', color: '#d4a843' }}>
                    <i className="fas fa-mobile-alt" style={{ marginRight: 8 }}></i>Payment Verification Pending
                  </h3>
                  <p style={{ fontSize: 14, opacity: 0.8, margin: 0 }}>
                    Your UPI payment is being verified. We'll confirm your order once the payment is verified.
                    {order.utr_number && (
                      <> UTR: <span style={{ fontFamily: 'monospace', color: '#d4a843' }}>{order.utr_number}</span></>
                    )}
                  </p>
                </div>
              )}

              {/* Order details */}
              <div className="wow fadeInUp" style={card}>
                <h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 18px', color: '#d4a843' }}>
                  <i className="fas fa-receipt" style={{ marginRight: 8 }}></i>Order Details
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px 20px', marginBottom: 20, fontSize: 14 }}>
                  {[
                    ['Order Type', order.order_type?.replace('-', ' ')],
                    ['Payment', order.payment_method?.toUpperCase()],
                    ['Phone', order.customer_phone],
                    ['Status', order.order_status],
                    order.table_number ? ['Table', order.table_number] : null,
                    order.delivery_address ? ['Address', order.delivery_address] : null,
                  ].filter(Boolean).map(([label, val]) => (
                    <div key={label}>
                      <div style={{ opacity: 0.5, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{label}</div>
                      <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>{val}</div>
                    </div>
                  ))}
                </div>

                {/* Items */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16 }}>
                  {orderItems.map(item => (
                    <div key={item.id} style={{
                      display: 'flex', justifyContent: 'space-between',
                      padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
                      fontSize: 14,
                    }}>
                      <span>{item.item_name} <span style={{ opacity: 0.5 }}>× {item.quantity}</span></span>
                      <span style={{ fontWeight: 700 }}>₹{parseFloat(item.subtotal).toFixed(0)}</span>
                    </div>
                  ))}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    marginTop: 14, paddingTop: 12,
                    borderTop: '2px solid rgba(212,168,67,0.3)',
                    fontWeight: 800, fontSize: 17,
                  }}>
                    <span>Total</span>
                    <span style={{ color: '#d4a843' }}>₹{parseFloat(order.total).toFixed(0)}</span>
                  </div>
                </div>
              </div>

              {/* What's next */}
              <div className="wow fadeInUp" style={card}>
                <h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 16px' }}>
                  <i className="fas fa-clock" style={{ marginRight: 8, color: '#d4a843' }}></i>What Happens Next?
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { icon: 'fa-check-circle', color: '#10b981', text: 'Order received by our kitchen' },
                    { icon: 'fa-fire', color: '#f59e0b', text: 'We\'ll start preparing your food shortly' },
                    { icon: order.order_type === 'delivery' ? 'fa-motorcycle' : 'fa-bell', color: '#d4a843', text: order.order_type === 'delivery' ? 'Your order will be delivered' : order.order_type === 'dine-in' ? 'Food will be served at your table' : 'We\'ll notify you when it\'s ready for pickup' },
                  ].map((step, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14 }}>
                      <i className={`fas ${step.icon}`} style={{ color: step.color, fontSize: 18, width: 24, flexShrink: 0 }}></i>
                      <span style={{ opacity: 0.85 }}>{step.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="wow fadeInUp" style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link to="/order" style={{
                  flex: 1, minWidth: 160, display: 'block', textAlign: 'center',
                  padding: '14px', background: '#d4a843', color: '#111',
                  borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: 'none',
                }}>
                  <i className="fas fa-plus" style={{ marginRight: 8 }}></i>Order More
                </Link>
                <Link to="/" style={{
                  flex: 1, minWidth: 160, display: 'block', textAlign: 'center',
                  padding: '14px', background: 'transparent', color: 'inherit',
                  border: '1.5px solid rgba(255,255,255,0.15)',
                  borderRadius: 10, fontWeight: 600, fontSize: 15, textDecoration: 'none',
                }}>
                  <i className="fas fa-home" style={{ marginRight: 8 }}></i>Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
