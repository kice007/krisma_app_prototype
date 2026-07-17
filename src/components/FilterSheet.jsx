import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight, ArrowUp, ArrowDown, GraduationCap } from 'lucide-react'

const DATE_OPTIONS = ['7 dernier jours', 'Ce mois', 'Choisir une date']

const CAT_OPTIONS = [
  { label: 'Transfert', Icon: ArrowUp, iconBg: '#fce8ea', iconColor: '#000000' },
  { label: 'Requête', Icon: ArrowDown, iconBg: '#fff1c2', iconColor: '#000000' },
  { label: 'Scolarité', Icon: GraduationCap, iconBg: '#EDE9FE', iconColor: '#000000' },
]

export default function FilterSheet({ open, onClose, onApply, theme = 'dark' }) {
  const dark = theme === 'dark'
  const [selectedDate, setSelectedDate] = useState('Ce mois')
  const [selectedCat, setSelectedCat] = useState('Transfert')
  const [catOpen, setCatOpen] = useState(false)

  const rowBorder = dark ? '#161c2c' : '#e5e5f0'
  const rowText = dark ? '#FFFFFF' : '#0a0a0f'

  const currentCat = CAT_OPTIONS.find(c => c.label === selectedCat)
  const CurrentIcon = currentCat.Icon

  const inputStyle = {
    width: '100%',
    fontFamily: 'Inter',
    fontSize: 14,
    color: rowText,
    backgroundColor: 'transparent',
    border: 'none',
    outline: 'none',
    caretColor: '#4F46E5',
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          style={{
            position: 'absolute', inset: 0, zIndex: 100,
            backdropFilter: 'blur(4px)',
            WebkitBackdropFilter: 'blur(4px)',
            backgroundColor: '#dddddd0d',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          }}
        >
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 320 }}
            onClick={e => e.stopPropagation()}
            style={{
              backgroundColor: dark ? '#0a0a0f' : '#ffffff',
              borderRadius: '28px 28px 0 0',
              ...(dark ? {} : { border: '1px solid #e5e5f0' }),
              padding: '24px 24px 32px',
              display: 'flex', flexDirection: 'column', gap: 20,
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 20, fontWeight: 700, color: dark ? '#FFFFFF' : '#0a0a0f' }}>
                Filtre
              </span>
              <div
                onClick={onClose}
                style={{
                  width: 32, height: 32, borderRadius: 16,
                  backgroundColor: '#737373',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', flexShrink: 0,
                }}
              >
                <X size={16} color="#FFFFFF" strokeWidth={2.5} />
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: '#1E1E2E' }} />

            {/* Date range section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: '#737373', letterSpacing: 0.5 }}>
                Intervalle de date
              </span>
              {DATE_OPTIONS.map(opt => {
                const sel = selectedDate === opt
                return (
                  <div
                    key={opt}
                    onClick={() => setSelectedDate(opt)}
                    style={{
                      height: 52, borderRadius: 12,
                      border: sel ? '2px solid #4F46E5' : `1px solid ${rowBorder}`,
                      padding: '0 16px',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontFamily: 'Inter', fontSize: 14, color: sel && !dark ? '#4F46E5' : rowText }}>
                      {opt}
                    </span>
                    <div style={{
                      width: 22, height: 22, borderRadius: 11, flexShrink: 0,
                      backgroundColor: sel ? '#4F46E5' : (dark ? '#161c2c' : 'transparent'),
                      border: `2px solid ${sel ? '#4F46E5' : '#555577'}`,
                    }} />
                  </div>
                )
              })}
            </div>

            {/* Price range section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: '#737373', letterSpacing: 0.5 }}>
                Fourchette de prix
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  flex: 1, height: 52, borderRadius: 12,
                  border: `1px solid ${rowBorder}`,
                  padding: '0 16px', display: 'flex', alignItems: 'center',
                }}>
                  <input
                    type="text"
                    inputMode="decimal"
                    defaultValue="50.00"
                    className="filter-price-input"
                    style={inputStyle}
                  />
                </div>
                <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#737373' }}>à</span>
                <div style={{
                  flex: 1, height: 52, borderRadius: 12,
                  border: `1px solid ${rowBorder}`,
                  padding: '0 16px', display: 'flex', alignItems: 'center',
                }}>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Max"
                    className="filter-price-input"
                    style={inputStyle}
                  />
                </div>
              </div>
            </div>

            {/* Categories section */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontFamily: 'Inter', fontSize: 12, fontWeight: 600, color: '#737373', letterSpacing: 0.5, marginBottom: 10 }}>
                Categories
              </span>

              {/* Selector row */}
              <div
                onClick={() => setCatOpen(v => !v)}
                style={{
                  height: 56,
                  borderRadius: catOpen ? '12px 12px 0 0' : 12,
                  border: catOpen ? '1px solid #4F46E5' : `1px solid ${rowBorder}`,
                  borderBottom: catOpen ? 'none' : undefined,
                  padding: '0 16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  cursor: 'pointer',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: 16,
                    backgroundColor: currentCat.iconBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <CurrentIcon size={16} color={currentCat.iconColor} strokeWidth={2} />
                  </div>
                  <span style={{ fontFamily: 'Inter', fontSize: 14, color: rowText }}>
                    {currentCat.label}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: catOpen ? 90 : 0 }}
                  transition={{ duration: 0.2, ease: 'easeInOut' }}
                >
                  <ChevronRight size={18} color={dark ? '#555577' : '#9898B8'} strokeWidth={1.75} />
                </motion.div>
              </div>

              {/* Dropdown options */}
              <AnimatePresence>
                {catOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: 'easeInOut' }}
                    style={{
                      overflow: 'hidden',
                      border: '1px solid #4F46E5',
                      borderTop: 'none',
                      borderRadius: '0 0 12px 12px',
                    }}
                  >
                    {CAT_OPTIONS.map((cat, i) => {
                      const CatIcon = cat.Icon
                      const active = selectedCat === cat.label
                      return (
                        <div
                          key={cat.label}
                          onClick={() => { setSelectedCat(cat.label); setCatOpen(false) }}
                          style={{
                            height: 52, padding: '0 16px',
                            display: 'flex', alignItems: 'center', gap: 12,
                            cursor: 'pointer',
                            backgroundColor: active
                              ? (dark ? '#1a1a2e' : '#f5f4ff')
                              : (dark ? '#0a0a0f' : '#ffffff'),
                            borderTop: i > 0 ? `1px solid ${rowBorder}` : 'none',
                          }}
                        >
                          <div style={{
                            width: 32, height: 32, borderRadius: 16,
                            backgroundColor: cat.iconBg,
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                          }}>
                            <CatIcon size={16} color={cat.iconColor} strokeWidth={2} />
                          </div>
                          <span style={{
                            fontFamily: 'Inter', fontSize: 14,
                            color: active ? '#4F46E5' : rowText,
                            fontWeight: active ? 600 : 400,
                          }}>
                            {cat.label}
                          </span>
                        </div>
                      )
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Filtrer CTA */}
            <div
              onClick={onApply || onClose}
              style={{
                height: 56, borderRadius: 16,
                backgroundColor: '#4F46E5',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 16, fontWeight: 700, color: '#FFFFFF' }}>
                Filtrer
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
