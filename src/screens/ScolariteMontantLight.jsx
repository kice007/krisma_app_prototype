import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, Shield, GraduationCap, X } from 'lucide-react'
import StatusBar from '../components/StatusBar'

const PAD = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['*', '0', '←'],
]

const STUDENT = { matricule: 'A00225427', nom: 'Aka', prenom: 'Jean Élysé' }

function displayCents(c) {
  if (c === 0) return '0.00'
  const int = Math.floor(c / 100)
  const dec = String(c % 100).padStart(2, '0')
  const intFmt = int === 0 ? '0' : int.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `${intFmt}.${dec}`
}

function fmtEur(c) { return `EUR ${displayCents(c)}` }

export default function ScolariteMontantLight() {
  const navigate = useNavigate()
  const [cents, setCents] = useState(0)
  const [showPad, setShowPad] = useState(false)
  const [showRecap, setShowRecap] = useState(false)

  const frais = Math.round(cents * 0.01)
  const total = cents + frais

  function press(k) {
    if (k === '←') {
      setCents(c => Math.floor(c / 10))
    } else if (k !== '*') {
      const d = parseInt(k)
      setCents(c => { const next = c * 10 + d; return next <= 9999999 ? next : c })
    }
  }

  const ROWS = [
    { l: 'Matricule',         v: STUDENT.matricule },
    { l: 'Nom',               v: STUDENT.nom },
    { l: 'Prénom',            v: STUDENT.prenom },
    { l: 'Montant',           v: fmtEur(cents) },
    { l: 'Frais Krisma (1%)', v: fmtEur(frais) },
    { l: 'Montant Total',     v: fmtEur(total), bold: true },
  ]

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#4F46E5' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <style>{`
        @keyframes smlBlink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
        .sml-cursor { animation: smlBlink 1s step-end infinite; user-select:none; }
      `}</style>

      <StatusBar />

      {/* Header */}
      <div style={{
        position: 'absolute', top: 62, left: 0, right: 0, height: 56,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 20px',
      }}>
        <div onClick={() => navigate('/dashboard-light')} style={{
          width: 40, height: 40, borderRadius: 20,
          backgroundColor: 'rgba(255,255,255,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
        }}>
          <ChevronLeft size={20} color="#FFFFFF" strokeWidth={2} />
        </div>
        <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 18, fontWeight: 700, color: '#FFFFFF' }}>
          Règlement scolarité
        </span>
        <div style={{
          width: 36, height: 36, borderRadius: 18, backgroundColor: '#1A1A3A',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Shield size={17} color="#FFFFFF" strokeWidth={2} />
        </div>
      </div>

      {/* Inner white sheet */}
      <div style={{
        position: 'absolute', top: 142, left: 0, right: 0, bottom: 0,
        backgroundColor: '#FFFFFF',
        borderRadius: '28px 28px 0 0',
        overflow: 'hidden',
      }}>
        <div style={{
          padding: '28px 20px 0',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
        }}>
          {/* Pill handle */}
          <div style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: '#EBEBF2' }} />

          {/* Label */}
          <span style={{ fontFamily: 'Inter', fontSize: 14, color: '#737373' }}>Entrer le montant</span>

          {/* Amount — click to toggle numpad */}
          <div
            onClick={() => setShowPad(p => !p)}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'baseline' }}
          >
            <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 42, fontWeight: 800, color: '#1A1A2E' }}>
              EUR {displayCents(cents)}
            </span>
            <span className="sml-cursor" style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 42, fontWeight: 200, color: '#4F46E5' }}>|</span>
          </div>

          {/* Université card */}
          <div style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: 12,
            border: '1px solid #DDDDE8', borderRadius: 14, padding: '14px 16px',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 22, flexShrink: 0,
              backgroundColor: 'rgba(79,70,229,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <GraduationCap size={20} color="#818CF8" strokeWidth={1.5} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#1A1A2E' }}>
                Université de Poitier
              </span>
              <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373' }}>Virement instantané</span>
            </div>
          </div>
        </div>

        {/* NumPad slides up from bottom */}
        <AnimatePresence>
          {showPad && (
            <motion.div
              key="sml-pad"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 32, stiffness: 320 }}
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                backgroundColor: '#FFFFFF',
                padding: '12px 20px 20px',
                display: 'flex', flexDirection: 'column', gap: 8,
              }}
            >
              {PAD.map((row, ri) => (
                <div key={ri} style={{ display: 'flex', gap: 8 }}>
                  {row.map(k => (
                    <button key={k} onClick={() => press(k)} style={{
                      flex: 1, height: 70, borderRadius: 14, backgroundColor: '#EAEAF2',
                      border: 'none', cursor: 'pointer',
                      fontFamily: 'Inter', fontSize: 24, color: '#1A1A2E',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      WebkitTapHighlightColor: 'transparent',
                    }}>
                      {k}
                    </button>
                  ))}
                </div>
              ))}
              <button
                onClick={() => setShowRecap(true)}
                style={{
                  width: '100%', height: 56, borderRadius: 16, backgroundColor: '#4F46E5',
                  border: 'none', cursor: 'pointer', marginTop: 4,
                  fontFamily: '"Rethink Sans", sans-serif', fontSize: 16, fontWeight: 700, color: '#FFFFFF',
                }}
              >
                Récapitulatif
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Blurry veil + Recap popup */}
      <AnimatePresence>
        {showRecap && (
          <>
            <motion.div
              key="sml-veil"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={() => setShowRecap(false)}
              style={{
                position: 'absolute', inset: 0,
                backgroundColor: 'rgba(0,0,0,0.35)',
                backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
                zIndex: 20,
              }}
            />
            <motion.div
              key="sml-sheet"
              initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                backgroundColor: '#FFFFFF',
                borderRadius: '28px 28px 0 0',
                padding: '12px 20px 32px',
                zIndex: 21,
                boxShadow: '0 -8px 40px rgba(0,0,0,0.12)',
                border: '1px solid #DDDDE8',
              }}
            >
              {/* Drag handle */}
              <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 16 }}>
                <div style={{ width: 36, height: 4, borderRadius: 2, backgroundColor: '#DDDDE8' }} />
              </div>

              {/* Sheet header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: 16 }}>
                <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 18, fontWeight: 700, color: '#1A1A2E' }}>
                  Récapitulatif
                </span>
                <button
                  onClick={() => setShowRecap(false)}
                  style={{
                    width: 32, height: 32, borderRadius: 16, backgroundColor: '#737373',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >
                  <X size={16} color="#FFFFFF" strokeWidth={2} />
                </button>
              </div>

              {/* Divider */}
              <div style={{ height: 1, backgroundColor: '#DDDDE8', marginBottom: 4 }} />

              {/* Table rows */}
              {ROWS.map(({ l, v, bold }, i) => (
                <div key={l} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 0',
                  borderTop: i > 0 ? '1px solid #DDDDE8' : 'none',
                }}>
                  <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#737373' }}>{l}</span>
                  <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: bold ? 700 : 500, color: '#1A1A2E' }}>{v}</span>
                </div>
              ))}

              {/* CTA */}
              <button
                onClick={() => navigate('/scolarite-succes-light')}
                style={{
                  width: '100%', height: 56, borderRadius: 16, backgroundColor: '#4F46E5',
                  border: 'none', cursor: 'pointer', marginTop: 12,
                  fontFamily: '"Rethink Sans", sans-serif', fontSize: 16, fontWeight: 700, color: '#FFFFFF',
                }}
              >
                Payer la scolarité
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
