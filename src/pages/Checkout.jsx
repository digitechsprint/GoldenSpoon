import React, { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../lib/api'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

const EMPTY_FORM = {
  name: '', phone: '',
  orderType: 'takeaway', // takeaway | delivery
  address: '',
  paymentMethod: 'razorpay', // razorpay | cod
  instructions: '',
}

function loadRazorpayScript() {
  return new Promise(resolve => {
    if (window.Razorpay) return resolve(true)
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

export default function Checkout() {
  const navigate = useNavigate()
  const { items, total, clearCart, hydrated: cartHydrated } = useCart()
  const { user, loading: authLoading, openAuthModal, requireAuth } = useAuth()
  const [form, setForm] = useState(EMPTY_FORM)
  const [razorpayKeyId, setRazorpayKeyId] = useState('')
  const [placing, setPlacing] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    window.scrollTo(0, 0)
    api.get('/settings').then(({ data }) => { if (data?.razorpay_key_id) setRazorpayKeyId(data.razorpay_key_id) })
  }, [])

  // Wait for the cart to actually finish reading localStorage before
  // deciding it's empty — on a hard refresh/direct load of this page,
  // items is [] for one render before hydration runs, which would
  // otherwise bounce a real cart straight back to /order. Checked only
  // once, right after hydration — NOT on every later items change, since
  // a successful order intentionally empties the cart via clearCart()
  // right before navigating to the confirmation page, and re-checking
  // then would race that navigation and bounce the user to /order instead.
  const checkedEmptyCart = useRef(false)
  useEffect(() => {
    if (!cartHydrated || checkedEmptyCart.current) return
    checkedEmptyCart.current = true
    if (items.length === 0) navigate('/order')
  }, [cartHydrated, items.length])

  useEffect(() => {
    if (user) setField('name', form.name || user.name || '')
    if (user) setField('phone', form.phone || user.phone || '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  function setField(k, v) { setForm(f => ({ ...f, [k]: v })) }

  async function handlePlaceOrder(e) {
    e.preventDefault()
    if (!form.name || !form.phone) return setError('Name and phone are required.')
    if (form.orderType === 'delivery' && !form.address) return setError('Please enter a delivery address.')

    if (!user) {
      try {
        await requireAuth()
      } catch {
        return // user dismissed the sign-in prompt
      }
    }

    setPlacing(true)
    setError('')

    const orderPayload = {
      items: items.map(i => ({ id: i.id, quantity: i.quantity })),
      order_type: form.orderType,
      delivery_address: form.orderType === 'delivery' ? form.address : null,
      payment_method: form.paymentMethod,
      instructions: form.instructions || null,
    }

    const { data: result, error: orderErr } = await api.post('/orders', orderPayload)
    if (orderErr || !result) {
      setPlacing(false)
      return setError(orderErr?.message || 'Could not place order. Please try again.')
    }

    if (form.paymentMethod === 'cod') {
      clearCart()
      setPlacing(false)
      navigate(`/order-confirmation?order=${result.order.id}`)
      return
    }

    // Razorpay flow
    try {
      const loaded = await loadRazorpayScript()
      if (!loaded) throw new Error('Could not load payment gateway. Check your connection.')

      const payment = await new Promise((resolve, reject) => {
        const rzp = new window.Razorpay({
          key: razorpayKeyId,
          amount: result.order.total * 100,
          currency: 'INR',
          name: 'Golden Spoon Restaurant',
          description: `Order #${result.order.id.slice(0, 8)}`,
          image: '/images/logo.png',
          order_id: result.order.razorpay_order_id,
          handler: resolve,
          prefill: { name: form.name, contact: form.phone },
          theme: { color: '#d4a843' },
          modal: { ondismiss: () => reject(new Error('cancelled')) },
        })
        rzp.on('payment.failed', r => reject(new Error(r.error?.description || 'Payment failed')))
        rzp.open()
      })

      const { data: verified, error: verifyErr } = await api.post(`/orders/${result.order.id}/verify-payment`, {
        razorpay_payment_id: payment.razorpay_payment_id,
        razorpay_order_id: payment.razorpay_order_id,
        razorpay_signature: payment.razorpay_signature,
      })
      if (verifyErr || !verified) throw new Error(verifyErr?.message || 'Payment verification failed')

      clearCart()
      setPlacing(false)
      navigate(`/order-confirmation?order=${result.order.id}`)
    } catch (err) {
      setPlacing(false)
      if (err.message !== 'cancelled') setError(err.message || 'Payment failed. Please try again.')
    }
  }

  if (items.length === 0) return null

  if (!authLoading && !user) {
    return (
      <main>
        <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
          <div style={{ textAlign: 'center', maxWidth: 360 }}>
            <i className="fas fa-user-lock" style={{ fontSize: 44, color: '#d4a843', marginBottom: 18, display: 'block' }}></i>
            <h2 style={{ marginBottom: 10 }}>Sign in to checkout</h2>
            <p style={{ opacity: 0.7, marginBottom: 24 }}>Create a free account or sign in to place your order.</p>
            <button onClick={openAuthModal} className="btn-default">Sign In / Create Account</button>
          </div>
        </div>
      </main>
    )
  }

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
                      { value: 'razorpay', label: 'Pay Online', fallbackIcon: 'fa-credit-card', desc: 'Cards, UPI, Netbanking & Wallets' },
                      { value: 'cod', label: form.orderType === 'takeaway' ? 'Pay on Pickup' : 'Cash on Delivery', fallbackIcon: 'fa-money-bill-wave', desc: form.orderType === 'takeaway' ? 'Pay cash when you pick up' : 'Pay on delivery' },
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

                  {/* Razorpay info */}
                  {form.paymentMethod === 'razorpay' && (
                    <div style={{
                      background: 'rgba(212,168,67,0.06)',
                      border: '1.5px solid rgba(212,168,67,0.2)',
                      borderRadius: 12, padding: '18px 20px',
                      display: 'flex', alignItems: 'center', gap: 14,
                    }}>
                      <i className="fas fa-shield-alt" style={{ fontSize: 28, color: '#d4a843', flexShrink: 0 }}></i>
                      <div>
                        <div style={{ fontWeight: 700, marginBottom: 4 }}>Secure Razorpay Checkout</div>
                        <div style={{ fontSize: 13, opacity: 0.7 }}>
                          Pay with UPI, credit/debit cards, netbanking, or wallets. Your payment is processed securely by Razorpay.
                        </div>
                        <div style={{ marginTop: 10, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                          {['UPI', 'Visa', 'Mastercard', 'RuPay', 'Netbanking', 'Wallets'].map(label => (
                            <span key={label} style={{
                              fontSize: 11, fontWeight: 700, padding: '3px 8px',
                              background: 'rgba(255,255,255,0.08)', borderRadius: 4,
                              border: '1px solid rgba(255,255,255,0.12)',
                            }}>{label}</span>
                          ))}
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
                      {form.orderType === 'delivery' ? 'receive your order' : 'pick up your order'}.
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
                    <div style={{ fontSize: 12, opacity: 0.5, marginTop: 6 }}>
                      Final total (incl. taxes{form.orderType === 'delivery' ? ' & delivery' : ''}) is calculated at checkout.
                    </div>
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
                      <><i className="fas fa-spinner fa-spin" style={{ marginRight: 8 }}></i>
                        {form.paymentMethod === 'razorpay' ? 'Processing Payment…' : 'Placing Order…'}
                      </>
                    ) : (
                      <><i className={`fas ${form.paymentMethod === 'razorpay' ? 'fa-lock' : 'fa-paper-plane'}`} style={{ marginRight: 8 }}></i>
                        {form.paymentMethod === 'razorpay' ? 'Proceed to Payment' : 'Place Order'}
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
