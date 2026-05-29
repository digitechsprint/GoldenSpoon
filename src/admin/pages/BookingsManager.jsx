import React, { useEffect, useState } from 'react'
import AdminLayout from '../AdminLayout'
import { supabase } from '../../lib/supabase'

const STATUS_OPTIONS = ['pending', 'confirmed', 'cancelled']

export default function BookingsManager() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [updating, setUpdating] = useState(false)
  const [toast, setToast] = useState('')

  useEffect(() => { fetchBookings() }, [])

  async function fetchBookings() {
    setLoading(true)
    let query = supabase.from('bookings').select('*').order('created_at', { ascending: false })
    if (filter !== 'all') query = query.eq('status', filter)
    const { data } = await query
    setBookings(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchBookings() }, [filter])

  function showToast(msg) { setToast(msg); setTimeout(() => setToast(''), 3000) }

  async function updateStatus(id, status) {
    setUpdating(true)
    await supabase.from('bookings').update({ status }).eq('id', id)
    setUpdating(false)
    showToast(`Booking marked as ${status}`)
    if (selected?.id === id) setSelected(s => ({ ...s, status }))
    fetchBookings()
  }

  async function deleteBooking(id) {
    if (!confirm('Delete this booking permanently?')) return
    await supabase.from('bookings').delete().eq('id', id)
    if (selected?.id === id) setSelected(null)
    fetchBookings()
  }

  const formatDate = d => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—'
  const formatDateTime = d => d ? new Date(d).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'

  const statusBadge = (status) => {
    const map = { pending: 'badge-pending', confirmed: 'badge-confirmed', cancelled: 'badge-cancelled' }
    return <span className={`badge-status ${map[status] || 'badge-draft'}`}>{status}</span>
  }

  const counts = {
    all: bookings.length,
    pending: bookings.filter(b => b.status === 'pending').length,
    confirmed: bookings.filter(b => b.status === 'confirmed').length,
    cancelled: bookings.filter(b => b.status === 'cancelled').length,
  }

  return (
    <AdminLayout title="Bookings Manager">
      {toast && <div className="alert-admin success"><i className="fas fa-check-circle" style={{marginRight:8}}></i>{toast}</div>}

      {/* Filter tabs */}
      <div className="tabs-admin">
        {['all', 'pending', 'confirmed', 'cancelled'].map(s => (
          <button
            key={s}
            className={`tab-admin ${filter === s ? 'active' : ''}`}
            onClick={() => setFilter(s)}
            style={{textTransform:'capitalize'}}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
            {s === 'pending' && counts.pending > 0 && (
              <span style={{
                background:'var(--admin-warning)', color:'#fff',
                borderRadius:'50%', fontSize:10, width:18, height:18,
                display:'inline-flex', alignItems:'center', justifyContent:'center',
                marginLeft:6
              }}>{counts.pending}</span>
            )}
          </button>
        ))}
      </div>

      <div className="row g-3">
        {/* Bookings table */}
        <div className={selected ? 'col-lg-7' : 'col-12'}>
          <div className="admin-card">
            <div className="admin-card-header">
              <h6><i className="fas fa-calendar-check" style={{marginRight:8,color:'var(--admin-accent)'}}></i>
                {filter === 'all' ? 'All Bookings' : `${filter.charAt(0).toUpperCase() + filter.slice(1)} Bookings`}
                <span style={{fontWeight:400,color:'var(--admin-text-muted)',marginLeft:8}}>({bookings.length})</span>
              </h6>
              <button className="btn-admin-outline" style={{fontSize:12}} onClick={fetchBookings}>
                <i className="fas fa-sync-alt"></i> Refresh
              </button>
            </div>
            <div style={{overflowX:'auto'}}>
              {loading ? <div className="admin-loading"><i className="fas fa-spinner fa-spin"></i> Loading…</div> :
              bookings.length === 0 ? (
                <div className="admin-empty">
                  <i className="fas fa-calendar-times"></i>
                  <p>No {filter !== 'all' ? filter : ''} bookings found</p>
                </div>
              ) : (
                <table className="admin-table">
                  <thead>
                    <tr><th>Guest</th><th>Date & Time</th><th>Guests</th><th>Status</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {bookings.map(b => (
                      <tr
                        key={b.id}
                        style={{cursor:'pointer', background: selected?.id === b.id ? '#f0f7ff' : ''}}
                        onClick={() => setSelected(b)}
                      >
                        <td>
                          <div style={{fontWeight:500}}>{b.name}</div>
                          <div style={{fontSize:12,color:'var(--admin-text-muted)'}}>{b.phone || b.email}</div>
                        </td>
                        <td>
                          <div>{formatDate(b.booking_date)}</div>
                          <div style={{fontSize:12,color:'var(--admin-text-muted)'}}>{b.booking_time || 'Any time'}</div>
                        </td>
                        <td>{b.guests} pax</td>
                        <td>{statusBadge(b.status)}</td>
                        <td onClick={e => e.stopPropagation()}>
                          <div style={{display:'flex',gap:6}}>
                            {b.status !== 'confirmed' && (
                              <button
                                className="btn-edit-sm"
                                onClick={() => updateStatus(b.id, 'confirmed')}
                                disabled={updating}
                                title="Confirm booking"
                              ><i className="fas fa-check"></i></button>
                            )}
                            {b.status !== 'cancelled' && (
                              <button
                                className="btn-danger-sm"
                                onClick={() => updateStatus(b.id, 'cancelled')}
                                disabled={updating}
                                title="Cancel booking"
                              ><i className="fas fa-times"></i></button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        {/* Booking detail panel */}
        {selected && (
          <div className="col-lg-5">
            <div className="admin-card">
              <div className="admin-card-header">
                <h6>Booking Details</h6>
                <button className="btn-close-modal" onClick={() => setSelected(null)} style={{fontSize:18}}>×</button>
              </div>
              <div className="admin-card-body">
                <div style={{marginBottom:20}}>
                  {statusBadge(selected.status)}
                  <span style={{fontSize:12,color:'var(--admin-text-muted)',marginLeft:8}}>
                    Received {formatDateTime(selected.created_at)}
                  </span>
                </div>

                {[
                  { icon: 'fa-user', label: 'Guest Name', value: selected.name },
                  { icon: 'fa-envelope', label: 'Email', value: selected.email },
                  { icon: 'fa-phone', label: 'Phone', value: selected.phone },
                  { icon: 'fa-calendar', label: 'Date', value: formatDate(selected.booking_date) },
                  { icon: 'fa-clock', label: 'Time', value: selected.booking_time || 'Not specified' },
                  { icon: 'fa-users', label: 'Guests', value: `${selected.guests} person(s)` },
                ].map(row => (
                  <div key={row.label} style={{display:'flex',gap:12,marginBottom:12,fontSize:14}}>
                    <div style={{width:28,color:'var(--admin-accent)',textAlign:'center'}}>
                      <i className={`fas ${row.icon}`}></i>
                    </div>
                    <div>
                      <div style={{fontSize:11,color:'var(--admin-text-muted)',textTransform:'uppercase',letterSpacing:'0.05em'}}>{row.label}</div>
                      <div style={{fontWeight:500}}>{row.value || '—'}</div>
                    </div>
                  </div>
                ))}

                {selected.message && (
                  <div style={{marginTop:12}}>
                    <div style={{fontSize:11,color:'var(--admin-text-muted)',textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:4}}>
                      <i className="fas fa-comment" style={{marginRight:6,color:'var(--admin-accent)'}}></i>Message
                    </div>
                    <div style={{fontSize:14,background:'#f9fafb',padding:'10px 14px',borderRadius:7,lineHeight:1.5}}>
                      {selected.message}
                    </div>
                  </div>
                )}

                <div style={{marginTop:20}}>
                  <div style={{fontSize:12,fontWeight:600,marginBottom:8,color:'var(--admin-text-muted)'}}>Update Status</div>
                  <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
                    {STATUS_OPTIONS.map(s => (
                      <button
                        key={s}
                        onClick={() => updateStatus(selected.id, s)}
                        disabled={updating || selected.status === s}
                        style={{
                          padding:'7px 16px',
                          borderRadius:7,
                          border:'1.5px solid',
                          fontSize:13,
                          fontWeight:500,
                          cursor: selected.status === s ? 'default' : 'pointer',
                          opacity: selected.status === s ? 0.4 : 1,
                          borderColor: s === 'confirmed' ? 'var(--admin-success)' : s === 'cancelled' ? 'var(--admin-danger)' : 'var(--admin-warning)',
                          color: s === 'confirmed' ? 'var(--admin-success)' : s === 'cancelled' ? 'var(--admin-danger)' : 'var(--admin-warning)',
                          background: 'transparent',
                          textTransform: 'capitalize',
                        }}
                      >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{marginTop:20,paddingTop:16,borderTop:'1px solid var(--admin-border)'}}>
                  <button className="btn-danger-sm" style={{fontSize:13}} onClick={() => deleteBooking(selected.id)}>
                    <i className="fas fa-trash" style={{marginRight:6}}></i>Delete Booking
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
