import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const styles = {
  overlay: {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)',
    zIndex: 9998, transition: 'opacity 0.3s',
  },
  drawer: {
    position: 'fixed', top: 0, right: 0, bottom: 0,
    width: '100%', maxWidth: 420,
    background: 'var(--bs-body-bg, #111)',
    boxShadow: '-8px 0 40px rgba(0,0,0,0.4)',
    zIndex: 9999, display: 'flex', flexDirection: 'column',
    transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
  },
  header: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
  title: {
    margin: 0, fontSize: 18, fontWeight: 700, color: '#d4a843',
    display: 'flex', alignItems: 'center', gap: 10,
  },
  closeBtn: {
    background: 'none', border: 'none', color: 'inherit',
    fontSize: 22, cursor: 'pointer', padding: '4px 8px',
    borderRadius: 6, transition: 'background 0.15s',
    lineHeight: 1,
  },
  body: { flex: 1, overflowY: 'auto', padding: '12px 24px' },
  item: {
    display: 'flex', gap: 14, alignItems: 'flex-start',
    padding: '14px 0', borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  itemImg: { width: 64, height: 64, objectFit: 'cover', borderRadius: 10, flexShrink: 0 },
  itemName: { fontWeight: 600, fontSize: 15, margin: '0 0 4px', lineHeight: 1.3 },
  itemPrice: { color: '#d4a843', fontWeight: 700, fontSize: 15 },
  qtyRow: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 8 },
  qtyBtn: {
    width: 28, height: 28, borderRadius: '50%', border: '1.5px solid rgba(255,255,255,0.2)',
    background: 'transparent', color: 'inherit', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 16, fontWeight: 700, transition: 'all 0.15s',
    flexShrink: 0,
  },
  qtyNum: { fontSize: 15, fontWeight: 700, minWidth: 24, textAlign: 'center' },
  removeBtn: {
    marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer',
    color: '#ef4444', fontSize: 14, padding: '2px 6px',
    borderRadius: 4, opacity: 0.7, transition: 'opacity 0.15s',
  },
  empty: { textAlign: 'center', padding: '60px 20px', opacity: 0.5 },
  footer: {
    padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(0,0,0,0.2)',
  },
  totalRow: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    marginBottom: 16,
  },
  totalLabel: { fontSize: 15, opacity: 0.7 },
  totalAmt: { fontSize: 22, fontWeight: 800, color: '#d4a843' },
  checkoutBtn: {
    display: 'block', width: '100%', padding: '14px 20px',
    background: '#d4a843', color: '#111', border: 'none',
    borderRadius: 8, fontSize: 16, fontWeight: 700, cursor: 'pointer',
    textAlign: 'center', textDecoration: 'none',
    transition: 'background 0.2s, transform 0.1s',
    letterSpacing: '0.02em',
  },
  clearBtn: {
    display: 'block', width: '100%', padding: '10px',
    background: 'transparent', color: 'inherit', border: '1.5px solid rgba(255,255,255,0.15)',
    borderRadius: 8, fontSize: 14, cursor: 'pointer', marginTop: 10,
    textAlign: 'center', opacity: 0.6, transition: 'opacity 0.15s',
  },
}

export default function CartDrawer() {
  const { items, itemCount, total, updateQuantity, removeItem, clearCart, isOpen, setIsOpen } = useCart()

  if (!isOpen) return null

  return (
    <>
      <div style={styles.overlay} onClick={() => setIsOpen(false)} />
      <div style={styles.drawer}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.title}>
            <i className="fas fa-shopping-basket"></i>
            Your Order
            {itemCount > 0 && (
              <span style={{
                background: '#d4a843', color: '#111',
                borderRadius: '50%', fontSize: 11, fontWeight: 800,
                width: 20, height: 20, display: 'inline-flex',
                alignItems: 'center', justifyContent: 'center',
              }}>{itemCount}</span>
            )}
          </h2>
          <button style={styles.closeBtn} onClick={() => setIsOpen(false)} aria-label="Close cart">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Items */}
        <div style={styles.body}>
          {items.length === 0 ? (
            <div style={styles.empty}>
              <i className="fas fa-shopping-basket" style={{ fontSize: 48, display: 'block', marginBottom: 16 }}></i>
              <p style={{ fontSize: 16, margin: 0 }}>Your cart is empty</p>
              <p style={{ fontSize: 13, marginTop: 6 }}>
                Browse the <Link to="/order" style={{ color: '#d4a843' }} onClick={() => setIsOpen(false)}>menu</Link> to add items
              </p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} style={styles.item}>
                {item.image && (
                  <img src={item.image} alt={item.name} style={styles.itemImg}
                    onError={e => { e.target.style.display = 'none' }}
                  />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={styles.itemName}>{item.name}</p>
                  <p style={styles.itemPrice}>₹{(parseFloat(item.price) * item.quantity).toFixed(0)}</p>
                  <div style={styles.qtyRow}>
                    <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                    <span style={styles.qtyNum}>{item.quantity}</span>
                    <button style={styles.qtyBtn} onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    <button style={styles.removeBtn} onClick={() => removeItem(item.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={styles.footer}>
            <div style={styles.totalRow}>
              <span style={styles.totalLabel}>Total</span>
              <span style={styles.totalAmt}>₹{total.toFixed(0)}</span>
            </div>
            <Link
              to="/checkout"
              style={styles.checkoutBtn}
              onClick={() => setIsOpen(false)}
            >
              <i className="fas fa-lock" style={{ marginRight: 8 }}></i>
              Proceed to Checkout
            </Link>
            <button style={styles.clearBtn} onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        )}
      </div>
    </>
  )
}
