import React, { useEffect, useState, useCallback } from 'react'
import AdminLayout from '../AdminLayout'
import { supabase } from '../../lib/supabase'

const SETTING_KEYS = [
  { key: 'upi_id',           label: 'UPI ID',              type: 'text',     placeholder: 'e.g. goldenspoon@paytm',     desc: 'Your UPI ID that customers will pay to' },
  { key: 'upi_name',         label: 'Merchant Name',       type: 'text',     placeholder: 'Golden Spoon Restaurant',    desc: 'Name shown in UPI apps when customer pays' },
  { key: 'upi_qr_image',     label: 'UPI QR Code URL',     type: 'url',      placeholder: 'https://…/qr-code.png',      desc: 'URL to your UPI QR code image (upload to Supabase Storage)' },
  { key: 'ordering_enabled', label: 'Enable Online Orders', type: 'toggle',  placeholder: '',                           desc: 'Turn this off to disable the online ordering system' },
  { key: 'min_order_amount', label: 'Minimum Order (₹)',   type: 'number',   placeholder: '0',                          desc: 'Minimum cart value required to place an order (0 = no minimum)' },
]

export default function Settings() {
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  const fetchSettings = useCallback(async () => {
    const { data } = await supabase.from('site_settings').select('key, value')
    if (data) {
      const map = {}
      data.forEach(r => { map[r.key] = r.value })
      setSettings(map)
    }
    setLoading(false)
  }, [])

  useEffect(() => { fetchSettings() }, [fetchSettings])

  function setField(key, value) {
    setSettings(prev => ({ ...prev, [key]: value }))
    setSaved(false)
  }

  async function handleSave(e) {
    e.preventDefault()
    setSaving(true)
    setError('')

    const upserts = SETTING_KEYS.map(({ key }) => ({
      key,
      value: settings[key] ?? '',
    }))

    const { error: err } = await supabase
      .from('site_settings')
      .upsert(upserts, { onConflict: 'key' })

    setSaving(false)
    if (err) {
      setError('Failed to save settings: ' + err.message)
    } else {
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    }
  }

  const card = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 12, padding: '24px 28px', marginBottom: 20,
  }

  const upiLink = settings.upi_id
    ? `upi://pay?pa=${encodeURIComponent(settings.upi_id)}&pn=${encodeURIComponent(settings.upi_name || 'Golden Spoon')}&am=1&cu=INR`
    : null

  return (
    <AdminLayout title="Settings">
      <form onSubmit={handleSave}>
        <div style={{ maxWidth: 680 }}>
          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: 10, padding: '12px 16px', marginBottom: 20,
              color: '#ef4444', fontSize: 14,
            }}>
              <i className="fas fa-exclamation-circle" style={{ marginRight: 8 }}></i>{error}
            </div>
          )}

          {/* UPI Payment Settings */}
          <div style={card}>
            <h3 style={{ margin: '0 0 20px', fontSize: 17, fontWeight: 700, color: '#d4a843' }}>
              <i className="fas fa-mobile-alt" style={{ marginRight: 10 }}></i>UPI Payment Settings
            </h3>

            {loading ? (
              <div style={{ textAlign: 'center', padding: 30, opacity: 0.4 }}>
                <i className="fas fa-spinner fa-spin"></i>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {SETTING_KEYS.filter(s => s.key !== 'ordering_enabled' && s.key !== 'min_order_amount').map(({ key, label, type, placeholder, desc }) => (
                  <div key={key}>
                    <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 6 }}>
                      {label}
                    </label>
                    <input
                      type={type}
                      value={settings[key] || ''}
                      onChange={e => setField(key, e.target.value)}
                      placeholder={placeholder}
                      style={{
                        width: '100%', padding: '10px 14px',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: 8, background: 'rgba(255,255,255,0.05)',
                        color: 'inherit', fontSize: 14, outline: 'none',
                        fontFamily: key === 'upi_id' ? 'monospace' : 'inherit',
                      }}
                    />
                    <div style={{ fontSize: 12, opacity: 0.5, marginTop: 5 }}>{desc}</div>
                  </div>
                ))}

                {/* QR preview */}
                {settings.upi_qr_image && (
                  <div>
                    <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 8 }}>QR CODE PREVIEW</div>
                    <img
                      src={settings.upi_qr_image}
                      alt="UPI QR"
                      style={{ width: 160, height: 160, objectFit: 'contain', borderRadius: 10, background: '#fff', padding: 8 }}
                      onError={e => { e.target.style.display = 'none' }}
                    />
                  </div>
                )}

                {/* UPI test link */}
                {upiLink && (
                  <div style={{
                    background: 'rgba(212,168,67,0.06)', border: '1px solid rgba(212,168,67,0.2)',
                    borderRadius: 10, padding: '14px 16px', fontSize: 13,
                  }}>
                    <i className="fas fa-check-circle" style={{ color: '#10b981', marginRight: 8 }}></i>
                    UPI ID configured. Customers will pay to <strong>{settings.upi_id}</strong>.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Ordering Settings */}
          <div style={card}>
            <h3 style={{ margin: '0 0 20px', fontSize: 17, fontWeight: 700, color: '#d4a843' }}>
              <i className="fas fa-shopping-basket" style={{ marginRight: 10 }}></i>Ordering Settings
            </h3>

            {!loading && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {/* Toggle */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>Enable Online Orders</div>
                    <div style={{ fontSize: 12, opacity: 0.5, marginTop: 3 }}>
                      Turn this off to disable the online ordering system
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setField('ordering_enabled', settings.ordering_enabled === 'true' ? 'false' : 'true')}
                    style={{
                      width: 52, height: 28, borderRadius: 14, border: 'none',
                      background: settings.ordering_enabled === 'true' ? '#10b981' : 'rgba(255,255,255,0.15)',
                      cursor: 'pointer', position: 'relative', flexShrink: 0,
                      transition: 'background 0.2s',
                    }}
                  >
                    <span style={{
                      position: 'absolute', top: 4,
                      left: settings.ordering_enabled === 'true' ? 26 : 4,
                      width: 20, height: 20, borderRadius: '50%', background: '#fff',
                      transition: 'left 0.2s',
                    }}></span>
                  </button>
                </div>

                {/* Min order */}
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: 14, marginBottom: 6 }}>
                    Minimum Order Amount (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={settings.min_order_amount || '0'}
                    onChange={e => setField('min_order_amount', e.target.value)}
                    style={{
                      width: 160, padding: '10px 14px',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: 8, background: 'rgba(255,255,255,0.05)',
                      color: 'inherit', fontSize: 14, outline: 'none',
                    }}
                  />
                  <div style={{ fontSize: 12, opacity: 0.5, marginTop: 5 }}>
                    Minimum cart value required (0 = no minimum)
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Save button */}
          <button
            type="submit"
            disabled={saving || loading}
            style={{
              padding: '13px 32px',
              background: saved ? '#10b981' : '#d4a843',
              color: '#111', border: 'none', borderRadius: 10,
              fontSize: 15, fontWeight: 700,
              cursor: saving || loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {saving ? (
              <><i className="fas fa-spinner fa-spin" style={{ marginRight: 8 }}></i>Saving…</>
            ) : saved ? (
              <><i className="fas fa-check" style={{ marginRight: 8 }}></i>Saved!</>
            ) : (
              <><i className="fas fa-save" style={{ marginRight: 8 }}></i>Save Settings</>
            )}
          </button>
        </div>
      </form>
    </AdminLayout>
  )
}
