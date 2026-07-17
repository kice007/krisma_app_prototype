import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Send, Bell } from 'lucide-react'
import StatusBar from '../components/StatusBar'
import ParentTabBar from '../components/ParentTabBar'
import avatar from '../assets/avatar-marc.png'

const BENEFICIARIES = [
  { initials: 'IV', color: '#4F46E5', name: 'Ivan', country: 'France' },
  { initials: 'MB', color: '#EC4899', name: 'Marie B.', country: 'Belgique' },
  { initials: 'AK', color: '#F59E0B', name: 'Awo K.', country: 'Canada' },
]

const SENDS = [
  { initials: 'IV', color: '#4F46E5', name: 'Ivan Ehouman', date: 'Auj. 08:30', amount: '- 300 €', badge: 'Reçu', badgeColor: '#22C55E' },
  { initials: 'MB', color: '#EC4899', name: 'Marie Bakayoko', date: 'Hier, 14:00', amount: '- 150 €', badge: 'Envoyé', badgeColor: '#818CF8' },
  { initials: 'AK', color: '#F59E0B', name: 'Awo Konaté', date: '03/06/2026', amount: '- 200 €', badge: 'En cours', badgeColor: '#F59E0B' },
]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.45, delay, ease: [0.16, 1, 0.3, 1] } },
})

export default function ParentDashboard() {
  const navigate = useNavigate()

  return (
    <motion.div
      className="relative w-full h-full overflow-hidden"
      style={{ backgroundColor: '#0A0A0F', display: 'flex', flexDirection: 'column' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.35 } }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
    >
      <StatusBar />

      {/* Scrollable content area */}
      <div style={{
        flex: 1, overflowY: 'auto', overflowX: 'hidden',
        display: 'flex', flexDirection: 'column', gap: 20,
        padding: '78px 20px 16px',
      }}>

        {/* Header */}
        <motion.div {...fadeUp(0)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img
              src={avatar}
              alt="Lamine"
              style={{ width: 44, height: 44, borderRadius: 22, objectFit: 'cover' }}
            />
            <span style={{
              fontFamily: '"Rethink Sans", sans-serif',
              fontSize: 18, fontWeight: 700, color: '#FFFFFF',
            }}>
              Bonjour, Lamine
            </span>
          </div>

          {/* Notif button */}
          <div style={{ position: 'relative' }} onClick={() => navigate('/parent-notifications')}>
            <div style={{
              width: 44, height: 44, borderRadius: 22,
              backgroundColor: '#141830', border: '1px solid #2A2A4A',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}>
              <Bell size={18} color="#FFFFFF" strokeWidth={1.5} />
            </div>
            <div style={{
              position: 'absolute', top: 8, right: 8,
              width: 8, height: 8, borderRadius: '50%', backgroundColor: '#EF4444',
            }} />
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.button
          {...fadeUp(0.06)}
          onClick={() => navigate('/parent-envoyer-beneficiaire')}
          whileTap={{ scale: 0.97 }}
          style={{
            width: '100%', height: 64, borderRadius: 16,
            backgroundColor: '#4F46E5', border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}
        >
          <Send size={20} color="#FFFFFF" strokeWidth={1.5} />
          <span style={{
            fontFamily: '"Rethink Sans", sans-serif',
            fontSize: 17, fontWeight: 700, color: '#FFFFFF',
          }}>
            Envoyer de l'argent
          </span>
        </motion.button>

        {/* Beneficiaries */}
        <motion.div {...fadeUp(0.1)} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 16, fontWeight: 700, color: '#FFFFFF' }}>
              Mes bénéficiaires
            </span>
            <span style={{ fontFamily: 'Inter', fontSize: 13, color: '#818CF8', cursor: 'pointer' }}>
              + Ajouter
            </span>
          </div>

          <div style={{ display: 'flex', gap: 20 }}>
            {BENEFICIARIES.map(({ initials, color, name, country }) => (
              <div key={name} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{
                  width: 52, height: 52, borderRadius: 26,
                  backgroundColor: color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                }}>
                  <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 16, fontWeight: 700, color: '#FFFFFF' }}>
                    {initials}
                  </span>
                </div>
                <span style={{ fontFamily: 'Inter', fontSize: 13, fontWeight: 600, color: '#FFFFFF', textAlign: 'center' }}>
                  {name}
                </span>
                <span style={{ fontFamily: 'Inter', fontSize: 11, color: '#737373', textAlign: 'center' }}>
                  {country}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Derniers envois */}
        <motion.div {...fadeUp(0.14)} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 16, fontWeight: 700, color: '#FFFFFF' }}>
              Derniers envois
            </span>
            <span
              onClick={() => navigate('/parent-historique')}
              style={{ fontFamily: 'Inter', fontSize: 13, color: '#818CF8', cursor: 'pointer' }}
            >
              Voir tout
            </span>
          </div>

          {SENDS.map(({ initials, color, name, date, amount, badge, badgeColor, badgeBg }) => (
            <div
              key={name}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderRadius: 12, border: '.5px solid #1E1E2E',
                padding: '14px 16px', cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 22,
                  backgroundColor: color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>
                    {initials}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  <span style={{ fontFamily: 'Inter', fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>{name}</span>
                  <span style={{ fontFamily: 'Inter', fontSize: 12, color: '#737373' }}>{date}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <span style={{ fontFamily: '"Rethink Sans", sans-serif', fontSize: 14, fontWeight: 700, color: '#FFFFFF' }}>
                  {amount}
                </span>
                <div style={{ borderRadius: 20 }}>
                  <span style={{ fontFamily: 'Inter', fontSize: 11, fontWeight: 600, color: badgeColor }}>
                    {badge}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <ParentTabBar activeTab="Accueil" theme="dark" />
    </motion.div>
  )
}
