import React, { useEffect, useState, useCallback } from 'react'
import AdminLayout from '../AdminLayout'
import { adminApi } from '../lib/api'

const STATUS_OPTIONS = ['placed', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled']

const STATUS_COLORS = {
  placed:    { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' },
  confirmed: { bg: 'rgba(59,130,246,0.15)', color: '#3b82f6' },
  preparing: { bg: 'rgba(168,85,247,0.15)', color: '#a855f7' },
  ready:     { bg: 'rgba(16,185,129,0.15)', color: '#10b981' },
  delivered: { bg: 'rgba(107,114,128,0.15)', color: '#6b7280' },
  cancelled: { bg: 'rgba(239,68,68,0.15)',  color: '#ef4444' },
}

const PAYMENT_COLORS = {
  pending:     { bg: 'rgba(245,158,11,0.15)', color: '#f59e0b' },
  cod_pending: { bg: 'rgba(107,114,128,0.15)', color: '#9ca3af' },
  paid:        { bg: 'rgba(16,185,129,0.15)',  color: '#10b981' },
  failed:      { bg: 'rgba(239,68,68,0.15)',   color: '#ef4444' },
}

function Badge({ text, map }) {
  const s = map[text] || { bg: 'rgba(255,255,255,0.1)', color: 'inherit' }
  return (
    <span style={{
      background: s.bg, color: s.color,
      borderRadius: 20, padding: '3px 10px',
      fontSize: 12, fontWeight: 700, textTransform: 'capitalize',
    }}>{text}</span>
  )
}

export default function OrdersManager() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [orderItems, setOrderItems] = useState([])
  const [filter, setFilter] = useState('all')
  const [saving, setSaving] = useState(false)

  const fetchOrders = useCallback(async () => {
    const { data } = await adminApi.get('/admin/orders')
    setOrders(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetchOrders() }, [fetchOrders])

  function openOrder(order) {
    setSelected(order)
    setOrderItems(order.items || [])
  }

  async function updateOrderStatus(status) {
    if (!selected) return
    setSaving(true)
    const { error } = await adminApi.put(`/admin/orders/${selected.id}/status`, { status })
    if (!error) {
      const updated = { ...selected, status }
      setSelected(updated)
      setOrders(prev => prev.map(o => o.id === updated.id ? updated : o))
    }
    setSaving(false)
  }

  const displayed = filter === 'all' ? orders : orders.filter(o => o.status === filter)

  const stats = STATUS_OPTIONS.reduce((acc, s) => {
    acc[s] = orders.filter(o => o.status === s).length
    return acc
  }, {})

  const card = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12, padding: '20px 24px',
  }

  return (
    <AdminLayout title="Orders Manager">
      {/* Stats */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
        {[
          { label: 'Total', count: orders.length, color: '#d4a843' },
          { label: 'Placed', count: stats.placed, color: '#f59e0b' },
          { label: 'Confirmed', count: stats.confirmed, color: '#3b82f6' },
          { label: 'Preparing', count: stats.preparing, color: '#a855f7' },
          { label: 'Ready', count: stats.ready, color: '#10b981' },
          { label: 'Delivered', count: stats.delivered, color: '#6b7280' },
        ].map(s => (
          <div key={s.label} style={{
            flex: '1 1 100px', minWidth: 100,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 10, padding: '14px 16px', textAlign: 'center',
          }}>
            <div style={{ fontSize: 26, fontWeight: 900, color: s.color }}>{s.count}</div>
            <div style={{ fontSize: 12, opacity: 0.6 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 20 }}>
        {/* Orders list */}
        <div style={{ flex: selected ? '0 0 340px' : '1', minWidth: 0 }}>
          {/* Filter tabs */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {['all', ...STATUS_OPTIONS].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                style={{
                  padding: '6px 14px', borderRadius: 20, fontSize: 13, fontWeight: 600,
                  border: filter === s ? 'none' : '1px solid rgba(255,255,255,0.15)',
                  background: filter === s ? '#d4a843' : 'transparent',
                  color: filter === s ? '#111' : 'inherit',
                  cursor: 'pointer', textTransform: 'capitalize',
                }}
              >{s === 'all' ? `All (${orders.length})` : s}</button>
            ))}
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: 40, opacity: 0.5 }}>
              <i className="fas fa-spinner fa-spin" style={{ fontSize: 28 }}></i>
            </div>
          ) : displayed.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 40, opacity: 0.4, fontSize: 14 }}>No orders found</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {displayed.map(order => (
                <div
                  key={order.id}
                  onClick={() => openOrder(order)}
                  style={{
                    ...card,
                    cursor: 'pointer',
                    borderColor: selected?.id === order.id ? '#d4a843' : 'rgba(255,255,255,0.08)',
                    transition: 'border-color 0.2s',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, fontFamily: 'monospace', color: '#d4a843' }}>
                        {order.id.slice(0, 10).toUpperCase()}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{order.customer_name || '—'}</div>
                      <div style={{ fontSize: 12, opacity: 0.5 }}>{order.customer_phone}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, fontSize: 15, color: '#d4a843' }}>₹{order.total}</div>
                      <div style={{ fontSize: 11, opacity: 0.5, marginTop: 2 }}>
                        {new Date(order.created_at).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    <Badge text={order.status} map={STATUS_COLORS} />
                    <Badge text={order.payment_method} map={{ razorpay: { bg: 'rgba(59,130,246,0.15)', color: '#3b82f6' }, cod: { bg: 'rgba(107,114,128,0.15)', color: '#9ca3af' } }} />
                    <Badge text={order.payment_status} map={PAYMENT_COLORS} />
                    <span style={{ fontSize: 12, opacity: 0.5, textTransform: 'capitalize', padding: '3px 0' }}>
                      {order.order_type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Detail panel */}
        {selected && (
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ ...card, position: 'sticky', top: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: '#d4a843', fontFamily: 'monospace' }}>
                  {selected.id.slice(0, 10).toUpperCase()}
                </h3>
                <button
                  onClick={() => setSelected(null)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5, fontSize: 18 }}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              {/* Customer info */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 16px', marginBottom: 20, fontSize: 13 }}>
                {[
                  ['Name', selected.customer_name],
                  ['Phone', selected.customer_phone],
                  ['Email', selected.customer_email || '—'],
                  ['Type', selected.order_type],
                  selected.address?.line1 ? ['Address', selected.address.line1] : null,
                  ['Placed', new Date(selected.created_at).toLocaleString('en-IN')],
                ].filter(Boolean).map(([lbl, val]) => (
                  <div key={lbl}>
                    <div style={{ opacity: 0.5, fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>{lbl}</div>
                    <div style={{ fontWeight: 600, wordBreak: 'break-word' }}>{val}</div>
                  </div>
                ))}
              </div>

              {/* Status controls */}
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 20 }}>
                <div style={{ flex: 1, minWidth: 140 }}>
                  <label style={{ fontSize: 12, opacity: 0.6, display: 'block', marginBottom: 6 }}>Order Status</label>
                  <select
                    value={selected.status}
                    onChange={e => updateOrderStatus(e.target.value)}
                    disabled={saving}
                    style={{
                      width: '100%', padding: '8px 12px', borderRadius: 8, fontSize: 14,
                      background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)',
                      color: 'inherit', cursor: 'pointer',
                    }}
                  >
                    {STATUS_OPTIONS.map(s => <option key={s} value={s} style={{ background: '#222' }}>{s}</option>)}
                  </select>
                </div>
                <div style={{ flex: 1, minWidth: 140 }}>
                  <label style={{ fontSize: 12, opacity: 0.6, display: 'block', marginBottom: 6 }}>Payment Status</label>
                  <div style={{ padding: '8px 12px' }}>
                    <Badge text={selected.payment_status} map={PAYMENT_COLORS} />
                  </div>
                </div>
              </div>

              {/* Items */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 16, marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 700, opacity: 0.7, marginBottom: 10 }}>Items Ordered</div>
                {orderItems.map(item => (
                  <div key={item.id} style={{
                    display: 'flex', justifyContent: 'space-between',
                    padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
                    fontSize: 13,
                  }}>
                    <span>{item.name} <span style={{ opacity: 0.5 }}>× {item.quantity}</span></span>
                    <span style={{ fontWeight: 700 }}>₹{item.price * item.quantity}</span>
                  </div>
                ))}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  marginTop: 12, paddingTop: 10,
                  borderTop: '2px solid rgba(212,168,67,0.3)',
                  fontWeight: 800, fontSize: 16,
                }}>
                  <span>Total</span>
                  <span style={{ color: '#d4a843' }}>₹{selected.total}</span>
                </div>
              </div>

              {selected.instructions && (
                <div style={{
                  background: 'rgba(255,255,255,0.04)', borderRadius: 8,
                  padding: '10px 14px', fontSize: 13,
                }}>
                  <div style={{ opacity: 0.5, fontSize: 11, marginBottom: 4 }}>SPECIAL INSTRUCTIONS</div>
                  <div>{selected.instructions}</div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
