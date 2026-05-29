import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useCart } from '../context/CartContext'

function generateOrderNumber() {
  const d = new Date()
  const date = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  const rand = Math.floor(Math.random() * 9000 + 1000)
  return `GS-${date}-${rand}`
}

const EMPTY_FORM = {
  name: '', phone: '', email: '',
  orderType: 'takeaway', // takeaway | dine-in | delivery
  tableNumber: '',
  address: '',
  paymentMethod: 'cod', // upi | cod
  utr: '',
  instructions: '',
}

export default function Checkout() {
  const navigate = useNavigate()
  const { items, total, clearCart } = useCart()
  const [form, setForm] = useState(EMPTY_FORM)
  const [upiSettings, setUpiSettings] = useState({ upi_id: '', upi_name: '', upi_qr_image: '' })
  const [placing, setPlacing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    if (items.length === 0) navigate('/order')
    fetchUpiSettings()
  }, [])

  async function fetchUpiSettings() {
    const { data } = await supabase.from('site_settings')
      .select('key, value')
      .in('key', ['upi_id', 'upi_name', 'upi_qr_image'])
    if (data) {
      const map = {}
      data.forEach(r => { map[r.key] = r.value })
      setUpiSettings(map)
    }
  }

  function setField(k, v) { setForm(f => ({ ...f, [k]: v })) }

  async function handlePlaceOrder(e) {
    e.preventDefault()
    if (!form.name || !form.phone) return setError('Name and phone are required.')
    if (form.paymentMethod === 'upi' && !form.utr) return setError('Please enter the UTR / transaction ID after making UPI payment.')

    setPlacing(true)
    setError('')

    const orderNumber = generateOrderNumber()

    const { data: order, error: orderErr } = await supabase.from('orders').insert([{
      order_number: orderNumber,
      customer_name: form.name,
      customer_phone: form.phone,
      customer_email: form.email || null,
      order_type: form.orderType,
      table_number: form.orderType === 'dine-in' ? form.tableNumber : null,
      delivery_address: form.orderType === 'delivery' ? form.address : null,
      payment_method: form.paymentMethod,
      payment_status: form.paymentMethod === 'cod' ? 'pending' : 'pending',
      utr_number: form.paymentMethod === 'upi' ? form.utr : null,
      order_status: 'pending',
      subtotal: total,
      total: total,
      special_instructions: form.instructions || null,
    }]).select().single()

    if (orderErr || !order) {
      setPlacing(false)
      return setError('Could not place order. Please try again.')
    }

    // Insert order items
    const orderItems = items.map(item => ({
      order_id: order.id,
      item_name: item.name,
      item_id: item.id,
      quantity: item.quantity,
      unit_price: parseFloat(item.price) || 0,
      subtotal: (parseFloat(item.price) || 0) * item.quantity,
    }))

    await supabase.from('order_items').insert(orderItems)

    clearCart()
    setPlacing(false)
    navigate(`/order-confirmation?order=${orderNumber}&method=${form.paymentMethod}`)
  }

  // UPI deep link
  const upiLink = upiSettings.upi_id
    ? `upi://pay?pa=${encodeURIComponent(upiSettings.upi_id)}&pn=${encodeURIComponent(upiSettings.upi_name || 'Golden Spoon')}&am=${total.toFixed(2)}&cu=INR`
    : null

  if (items.length === 0) return null

  return (
    <main>
      <div className="page-header parallaxie" style={{ minHeight: 280 }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="page-header-box">
                <h1 className="text-anime-style-2" data-cursor="-opaque">Checkout</h1>
                <nav className="wow fadeInUp">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/">home</Link></li>
                    <li className="breadcrumb-item"><Link to="/order">order</Link></li>
                    <li className="breadcrumb-item active">checkout</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ padding: '60px 0' }}>
        <div className="container">
          <form onSubmit={handlePlaceOrder}>
            <div className="row g-4">
              {/* Left column: form */}
              <div className="col-lg-7">
                {error && (
                  <div style={{
                    background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: 10, padding: '12px 16px', marginBottom: 20,
                    color: '#ef4444', fontSize: 14,
                  }}>
                    <i className="fas fa-exclamation-circle" style={{ marginRight: 8 }}></i>{error}
                  </div>
                )}

                {/* Customer details */}
                <div className="wow fadeInUp" style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 14, padding: '24px 28px', marginBottom: 20,
                }}>
                  <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700, color: '#d4a843' }}>
                    <i className="fas fa-user" style={{ marginRight: 10 }}></i>Customer Details
                  </h3>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Full Name *</label>
                      <input className="form-control" value={form.name} onChange={e => setField('name', e.target.value)} placeholder="Your name" required />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Phone Number *</label>
                      <input className="form-control" value={form.phone} onChange={e => setField('phone', e.target.value)} placeholder="+91 98765 43210" required />
                    </div>
                    <div className="col-12">
                      <label className="form-label">Email (optional)</label>
                      <input className="form-control" type="email" value={form.email} onChange={e => setField('email', e.target.value)} placeholder="For order updates" />
                    </div>
                  </div>
                </div>

                {/* Order type */}
                <div className="wow fadeInUp" style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 14, padding: '24px 28px', marginBottom: 20,
                }}>
                  <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700, color: '#d4a843' }}>
                    <i className="fas fa-concierge-bell" style={{ marginRight: 10 }}></i>Order Type
                  </h3>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {[
                      { value: 'takeaway', label: 'Takeaway', icon: 'fa-shopping-bag', desc: 'Pick up from restaurant' },
                      { value: 'dine-in', label: 'Dine-In', icon: 'fa-utensils', desc: 'Eat at the restaurant' },
                      { value: 'delivery', label: 'Delivery', icon: 'fa-motorcycle', desc: 'Deliver to my address' },
                    ].map(type => (
                      <div
                        key={type.value}
                        onClick={() => setField('orderType', type.value)}
                        style={{
                          flex: 1, minWidth: 120, padding: '16px 14px',
                          border: `2px solid ${form.orderType === type.value ? '#d4a843' : 'rgba(255,255,255,0.1)'}`,
                          borderRadius: 12, cursor: 'pointer', textAlign: 'center',
                          background: form.orderType === type.value ? 'rgba(212,168,67,0.1)' : 'transparent',
                          transition: 'all 0.2s',
                        }}
                      >
                        <i className={`fas ${type.icon}`} style={{
                          fontSize: 24, display: 'block', marginBottom: 8,
                          color: form.orderType === type.value ? '#d4a843' : 'inherit',
                        }}></i>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{type.label}</div>
                        <div style={{ fontSize: 12, opacity: 0.6, marginTop: 4 }}>{type.desc}</div>
                      </div>
                    ))}
                  </div>
                  {form.orderType === 'dine-in' && (
                    <div style={{ marginTop: 16 }}>
                      <label className="form-label">Table Number</label>
                      <input className="form-control" value={form.tableNumber} onChange={e => setField('tableNumber', e.target.value)} placeholder="e.g. Table 5" />
                    </div>
                  )}
                  {form.orderType === 'delivery' && (
                    <div style={{ marginTop: 16 }}>
                      <label className="form-label">Delivery Address *</label>
                      <textarea className="form-control" rows={3} value={form.address} onChange={e => setField('address', e.target.value)} placeholder="Enter full delivery address" required></textarea>
                    </div>
                  )}
                </div>

                {/* Payment method */}
                <div className="wow fadeInUp" style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 14, padding: '24px 28px', marginBottom: 20,
                }}>
                  <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700, color: '#d4a843' }}>
                    <i className="fas fa-credit-card" style={{ marginRight: 10 }}></i>Payment Method
                  </h3>
                  <div style={{ display: 'flex', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
                    {[
                      { value: 'upi', label: 'UPI Payment', icon: '/images/upi-icon.png', fallbackIcon: 'fa-mobile-alt', desc: 'Pay via any UPI app' },
                      { value: 'cod', label: 'Cash on Delivery', icon: null, fallbackIcon: 'fa-money-bill-wave', desc: form.orderType === 'dine-in' ? 'Pay at the table' : 'Pay on pickup/delivery' },
                    ].map(method => (
                      <div
                        key={method.value}
                        onClick={() => setField('paymentMethod', method.value)}
                        style={{
                          flex: 1, minWidth: 160, padding: '16px 18px',
                          border: `2px solid ${form.paymentMethod === method.value ? '#d4a843' : 'rgba(255,255,255,0.1)'}`,
                          borderRadius: 12, cursor: 'pointer',
                          background: form.paymentMethod === method.value ? 'rgba(212,168,67,0.1)' : 'transparent',
                          transition: 'all 0.2s',
                          display: 'flex', alignItems: 'center', gap: 14,
                        }}
                      >
                        <i className={`fas ${method.fallbackIcon}`} style={{
                          fontSize: 26, color: form.paymentMethod === method.value ? '#d4a843' : 'inherit',
                        }}></i>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: 15 }}>{method.label}</div>
                          <div style={{ fontSize: 12, opacity: 0.6 }}>{method.desc}</div>
                        </div>
                        {form.paymentMethod === method.value && (
                          <i className="fas fa-check-circle" style={{ marginLeft: 'auto', color: '#d4a843', fontSize: 18 }}></i>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* UPI details */}
                  {form.paymentMethod === 'upi' && (
                    <div style={{
                      background: 'rgba(212,168,67,0.06)',
                      border: '1.5px solid rgba(212,168,67,0.2)',
                      borderRadius: 12, padding: '20px',
                    }}>
                      <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap', alignItems: 'flex-start' }}>
                        {/* QR Code */}
                        {upiSettings.upi_qr_image ? (
                          <div style={{ textAlign: 'center' }}>
                            <img
                              src={upiSettings.upi_qr_image}
                              alt="UPI QR Code"
                              style={{ width: 160, height: 160, objectFit: 'contain', borderRadius: 10, background: '#fff', padding: 8 }}
                            />
                            <div style={{ fontSize: 12, opacity: 0.6, marginTop: 6 }}>Scan QR to pay</div>
                          </div>
                        ) : (
                          <div style={{
                            width: 160, height: 160, borderRadius: 10,
                            border: '2px dashed rgba(212,168,67,0.3)',
                            display: 'flex', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center',
                            color: '#d4a843', opacity: 0.7, flexShrink: 0,
                          }}>
                            <i className="fas fa-qrcode" style={{ fontSize: 48, marginBottom: 8 }}></i>
                            <span style={{ fontSize: 12 }}>QR not set</span>
                          </div>
                        )}
                        <div style={{ flex: 1, minWidth: 180 }}>
                          {upiSettings.upi_id && (
                            <div style={{ marginBottom: 16 }}>
                              <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 4 }}>UPI ID</div>
                              <div style={{
                                background: 'rgba(0,0,0,0.2)', borderRadius: 8,
                                padding: '10px 14px', fontSize: 15, fontWeight: 700,
                                fontFamily: 'monospace', letterSpacing: '0.04em',
                                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                              }}>
                                <span>{upiSettings.upi_id}</span>
                                <button type="button"
                                  onClick={() => navigator.clipboard?.writeText(upiSettings.upi_id)}
                                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#d4a843', fontSize: 14 }}
                                  title="Copy UPI ID"
                                >
                                  <i className="fas fa-copy"></i>
                                </button>
                              </div>
                            </div>
                          )}
                          <div style={{
                            background: 'rgba(212,168,67,0.15)', borderRadius: 8,
                            padding: '12px 14px', marginBottom: 16, fontSize: 13,
                          }}>
                            <strong>Amount to pay: ₹{total.toFixed(0)}</strong>
                            <br />
                            <span style={{ opacity: 0.7 }}>Pay to: {upiSettings.upi_name || 'Golden Spoon Restaurant'}</span>
                          </div>
                          {upiLink && (
                            <a
                              href={upiLink}
                              style={{
                                display: 'block', textAlign: 'center',
                                background: '#d4a843', color: '#111',
                                padding: '10px', borderRadius: 8,
                                fontWeight: 700, fontSize: 14,
                                textDecoration: 'none', marginBottom: 14,
                              }}
                            >
                              <i className="fas fa-mobile-alt" style={{ marginRight: 8 }}></i>
                              Open UPI App
                            </a>
                          )}
                          <div>
                            <label className="form-label" style={{ fontSize: 13 }}>
                              UTR / Transaction ID *
                              <span style={{ opacity: 0.6, fontWeight: 400 }}> (after payment)</span>
                            </label>
                            <input
                              className="form-control"
                              value={form.utr}
                              onChange={e => setField('utr', e.target.value)}
                              placeholder="e.g. 318452983751"
                              style={{ fontFamily: 'monospace' }}
                            />
                            <div style={{ fontSize: 12, opacity: 0.5, marginTop: 4 }}>
                              Find the UTR in your UPI app under transaction details
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* COD info */}
                  {form.paymentMethod === 'cod' && (
                    <div style={{
                      background: 'rgba(16,185,129,0.06)',
                      border: '1.5px solid rgba(16,185,129,0.2)',
                      borderRadius: 12, padding: '16px 20px', fontSize: 14,
                    }}>
                      <i className="fas fa-check-circle" style={{ color: '#10b981', marginRight: 8 }}></i>
                      No payment needed now. Pay in cash when you{' '}
                      {form.orderType === 'dine-in' ? 'settle your bill' : form.orderType === 'delivery' ? 'receive your order' : 'pick up your order'}.
                    </div>
                  )}
                </div>

                {/* Special instructions */}
                <div className="wow fadeInUp" style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 14, padding: '24px 28px',
                }}>
                  <h3 style={{ margin: '0 0 14px', fontSize: 16, fontWeight: 700 }}>
                    <i className="fas fa-comment-alt" style={{ marginRight: 8, color: '#d4a843' }}></i>
                    Special Instructions
                  </h3>
                  <textarea
                    className="form-control"
                    rows={3}
                    value={form.instructions}
                    onChange={e => setField('instructions', e.target.value)}
                    placeholder="Allergies, extra spice, less oil… anything we should know"
                  ></textarea>
                </div>
              </div>

              {/* Right column: order summary */}
              <div className="col-lg-5">
                <div className="wow fadeInUp" style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 14, padding: '24px 28px',
                  position: 'sticky', top: 100,
                }}>
                  <h3 style={{ margin: '0 0 20px', fontSize: 18, fontWeight: 700, color: '#d4a843' }}>
                    <i className="fas fa-receipt" style={{ marginRight: 10 }}></i>Order Summary
                  </h3>

                  <div style={{ marginBottom: 20 }}>
                    {items.map(item => (
                      <div key={item.id} style={{
                        display: 'flex', justifyContent: 'space-between',
                        alignItems: 'flex-start', padding: '10px 0',
                        borderBottom: '1px solid rgba(255,255,255,0.06)',
                      }}>
                        <div style={{ flex: 1, paddingRight: 12 }}>
                          <div style={{ fontWeight: 600, fontSize: 14 }}>{item.name}</div>
                          <div style={{ fontSize: 13, opacity: 0.5 }}>₹{parseFloat(item.price).toFixed(0)} × {item.quantity}</div>
                        </div>
                        <div style={{ fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap' }}>
                          ₹{(parseFloat(item.price) * item.quantity).toFixed(0)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div style={{ borderTop: '2px solid rgba(212,168,67,0.3)', paddingTop: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8, fontSize: 14, opacity: 0.7 }}>
                      <span>Subtotal</span>
                      <span>₹{total.toFixed(0)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 14, opacity: 0.7 }}>
                      <span>Delivery charges</span>
                      <span style={{ color: '#10b981' }}>Free</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                      <span style={{ fontSize: 18, fontWeight: 800 }}>Total</span>
                      <span style={{ fontSize: 22, fontWeight: 900, color: '#d4a843' }}>₹{total.toFixed(0)}</span>
                    </div>
                    <div style={{ fontSize: 12, opacity: 0.5, marginTop: 6 }}>Inclusive of all taxes</div>
                  </div>

                  <button
                    type="submit"
                    disabled={placing}
                    style={{
                      display: 'block', width: '100%', marginTop: 24,
                      padding: '15px', background: placing ? '#888' : '#d4a843',
                      color: '#111', border: 'none', borderRadius: 10,
                      fontSize: 16, fontWeight: 800, cursor: placing ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s', letterSpacing: '0.02em',
                    }}
                  >
                    {placing ? (
                      <><i className="fas fa-spinner fa-spin" style={{ marginRight: 8 }}></i>Placing Order…</>
                    ) : (
                      <><i className={`fas ${form.paymentMethod === 'upi' ? 'fa-check-circle' : 'fa-paper-plane'}`} style={{ marginRight: 8 }}></i>
                        {form.paymentMethod === 'upi' ? 'Confirm Order' : 'Place Order'}
                      </>
                    )}
                  </button>

                  <div style={{ fontSize: 12, opacity: 0.5, textAlign: 'center', marginTop: 12 }}>
                    <i className="fas fa-lock" style={{ marginRight: 4 }}></i>
                    Secure order placement
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
