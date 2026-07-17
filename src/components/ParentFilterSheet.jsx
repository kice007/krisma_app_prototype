import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CircleCheck, Hourglass, AlignJustify } from 'lucide-react'

const PERIOD_OPTIONS = ['7 derniers jours', 'Ce mois', 'Choisir une date']
const STATUS_OPTIONS = [
  { label: 'Tous', Icon: AlignJustify },
  { label: 'Terminé', Icon: CircleCheck },
  { label: 'En attente', Icon: Hourglass },
]

export default function ParentFilterSheet({ open, onClose, onApply, onReset, isActive, theme = 'dark' }) {
  const dark = theme === 'dark'
  const [selectedPeriod, setSelectedPeriod] = useState('Ce mois')
  const [selectedStatus, setSelectedStatus] = useState('Tous')

  const textColor = dark ? '#FFFFFF' : '#1a1a2e'
  const sheetBg = dark ? '#0D1025' : '#FFFFFF'
  const borderColor = dark ? '#2A2A4A' : '#dddde8'

  function handleApply() {
    onApply(selectedPeriod, selectedStatus)
    onClose()
  }

  function handleReset() {
    setSelectedPeriod('Ce mois')
    setSelectedStatus('Tous')
    onReset()
    onClose()
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
            backgroundColor: '#00000025',
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
              backgroundColor: sheetBg,
              borderRadius: '28px 28px 0 0',
              padding: '24px 20px 32px',
              display: 'flex', flexDirection: 'column', gap: 14,
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 20, fontWeight: 700, color: textColor }}>
                Filtres
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

            {/* Réinitialiser — appears only when filter is active */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 40 }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.22, ease: 'easeInOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  <div
                    onClick={handleReset}
                    style={{
                      height: 40, borderRadius: 10,
                      border: '1.5px solid #EF4444',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gap: 6, cursor: 'pointer',
                    }}
                  >
                    <X size={13} color="#EF4444" strokeWidth={2.5} />
                    <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: '#EF4444' }}>
                      Réinitialiser les filtres
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Divider */}
            <div style={{ height: 1, backgroundColor: '#737373' }} />

            {/* PÉRIODE */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 600, color: '#737373', letterSpacing: 0.5 }}>
                PÉRIODE
              </span>
              {PERIOD_OPTIONS.map(opt => {
                const sel = selectedPeriod === opt
                return (
                  <div
                    key={opt}
                    onClick={() => setSelectedPeriod(opt)}
                    style={{
                      height: 52, borderRadius: 12,
                      border: sel ? '2px solid #4F46E5' : `1px solid ${borderColor}`,
                      padding: '0 16px',
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{ fontFamily: 'Inter', fontSize: 14, color: sel ? '#4F46E5' : textColor }}>
                      {opt}
                    </span>
                    <div style={{
                      width: 20, height: 20, borderRadius: 10, flexShrink: 0,
                      border: `2px solid ${sel ? '#4F46E5' : '#737373'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {sel && (
                        <div style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: '#4F46E5' }} />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* STATUT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 600, color: '#737373', letterSpacing: 0.5 }}>
                STATUT
              </span>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {STATUS_OPTIONS.map(({ label, Icon }) => {
                  const sel = selectedStatus === label
                  return (
                    <div
                      key={label}
                      onClick={() => setSelectedStatus(label)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 6,
                        padding: '8px 12px', borderRadius: 20,
                        border: `1px solid ${sel ? '#4F46E5' : borderColor}`,
                        backgroundColor: sel ? (dark ? '#1a1a2e' : '#f5f4ff') : 'transparent',
                        cursor: 'pointer',
                      }}
                    >
                      <Icon size={13} color={sel ? '#4F46E5' : '#737373'} strokeWidth={2} />
                      <span style={{
                        fontFamily: 'Inter', fontSize: 12,
                        color: sel ? '#4F46E5' : '#737373',
                        fontWeight: sel ? 600 : 400,
                      }}>
                        {label}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Apply CTA */}
            <motion.div
              whileTap={{ scale: 0.97 }}
              onClick={handleApply}
              style={{
                height: 56, borderRadius: 16,
                backgroundColor: '#4F46E5',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', marginTop: 2,
              }}
            >
              <span style={{ fontFamily: 'Inter', fontSize: 15, fontWeight: 600, color: '#FFFFFF' }}>
                Appliquer les filtres
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
