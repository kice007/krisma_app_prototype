import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider, useTheme } from './theme'
import Splash from './screens/Splash'
import Welcome from './screens/Welcome'
import WhoAreYou from './screens/WhoAreYou'
import CreateAccount from './screens/CreateAccount'
import Phone from './screens/Phone'
import Otp from './screens/Otp'
import PersonalInfo from './screens/PersonalInfo'
import IdDoc from './screens/IdDoc'
import Selfie from './screens/Selfie'
import SelfieScan from './screens/SelfieScan'
import SelfieSuccess from './screens/SelfieSuccess'
import AccountCreated from './screens/AccountCreated'
import Login from './screens/Login'
import LoginLight from './screens/LoginLight'
import Dashboard from './screens/Dashboard'
import DashboardLight from './screens/DashboardLight'
import Analytique from './screens/Analytique'
import AnalytiqueLight from './screens/AnalytiqueLight'
import Carte from './screens/Carte'
import CarteLight from './screens/CarteLight'
import ParametresCarte from './screens/ParametresCarte'
import ParametresCarteLight from './screens/ParametresCarteLight'
import DemandeLimit from './screens/DemandeLimit'
import DemandeLimitLight from './screens/DemandeLimitLight'
import LimiteSoumise from './screens/LimiteSoumise'
import LimiteSoumiseLight from './screens/LimiteSoumiseLight'
import Transactions from './screens/Transactions'
import TransactionsLight from './screens/TransactionsLight'
import TransactionDetail from './screens/TransactionDetail'
import TransactionDetailLight from './screens/TransactionDetailLight'
import TransactionsFiltered from './screens/TransactionsFiltered'
import TransactionsFilteredLight from './screens/TransactionsFilteredLight'
import DemandeDestinataire from './screens/DemandeDestinataire'
import DemandeDestinataireLight from './screens/DemandeDestinataireLight'
import DemandeMontant from './screens/DemandeMontant'
import DemandeMontantLight from './screens/DemandeMontantLight'
import EnvoyerDestinataire from './screens/EnvoyerDestinataire'
import EnvoyerDestinataireLight from './screens/EnvoyerDestinataireLight'
import EnvoyerMontant from './screens/EnvoyerMontant'
import EnvoyerMontantLight from './screens/EnvoyerMontantLight'
import EnvoyerConfirmation from './screens/EnvoyerConfirmation'
import EnvoyerConfirmationLight from './screens/EnvoyerConfirmationLight'
import EnvoyerSucces from './screens/EnvoyerSucces'
import EnvoyerSuccesLight from './screens/EnvoyerSuccesLight'
import DemandeSucces from './screens/DemandeSucces'
import DemandeSuccesLight from './screens/DemandeSuccesLight'
import ScolariteMontant from './screens/ScolariteMontant'
import ScolariteMontantLight from './screens/ScolariteMontantLight'
import ScolariteSucces from './screens/ScolariteSucces'
import ScolariteSuccesLight from './screens/ScolariteSuccesLight'
import ParentPhone from './screens/ParentPhone'
import ParentOtp from './screens/ParentOtp'
import ParrainageCode from './screens/ParrainageCode'
import ParentInfo from './screens/ParentInfo'
import ParentIdDoc from './screens/ParentIdDoc'
import ParentSelfie from './screens/ParentSelfie'
import ParentSelfieScan from './screens/ParentSelfieScan'
import ParentSelfieSuccess from './screens/ParentSelfieSuccess'
import ParentPin from './screens/ParentPin'
import ParentConnexion from './screens/ParentConnexion'
import ParentConnexionLight from './screens/ParentConnexionLight'
import ParentDashboard from './screens/ParentDashboard'
import ParentDashboardLight from './screens/ParentDashboardLight'
import ParentEnvoyerBeneficiaire from './screens/ParentEnvoyerBeneficiaire'
import ParentEnvoyerBeneficiaireLight from './screens/ParentEnvoyerBeneficiaireLight'
import ParentEnvoyerMontant from './screens/ParentEnvoyerMontant'
import ParentEnvoyerMontantLight from './screens/ParentEnvoyerMontantLight'
import ParentModePaiement from './screens/ParentModePaiement'
import ParentModePaiementLight from './screens/ParentModePaiementLight'
import ParentEnvoyerSucces from './screens/ParentEnvoyerSucces'
import ParentEnvoyerSuccesLight from './screens/ParentEnvoyerSuccesLight'
import ParentHistorique from './screens/ParentHistorique'
import ParentHistoriqueLight from './screens/ParentHistoriqueLight'
import ParentProfil from './screens/ParentProfil'
import ParentProfilLight from './screens/ParentProfilLight'
import ProfilDocumentsAlt from './screens/ProfilDocumentsAlt'
import ProfilDocumentsAltLight from './screens/ProfilDocumentsAltLight'
import LangueSelection from './screens/LangueSelection'
import LangueSelectionLight from './screens/LangueSelectionLight'
import Notifications from './screens/Notifications'
import NotificationsLight from './screens/NotificationsLight'
import NotificationDetail from './screens/NotificationDetail'
import NotificationDetailLight from './screens/NotificationDetailLight'
import ParentNotifications from './screens/ParentNotifications'
import ParentNotificationsLight from './screens/ParentNotificationsLight'
import ParentNotificationDetail from './screens/ParentNotificationDetail'
import ParentNotificationDetailLight from './screens/ParentNotificationDetailLight'
import ParentForgotPin from './screens/ParentForgotPin'
import ParentForgotPinLight from './screens/ParentForgotPinLight'
import ParentForgotPinVerify from './screens/ParentForgotPinVerify'
import ParentForgotPinVerifyLight from './screens/ParentForgotPinVerifyLight'
import ParentNewPin from './screens/ParentNewPin'
import ParentNewPinLight from './screens/ParentNewPinLight'
import ParentPinReset from './screens/ParentPinReset'
import ParentPinResetLight from './screens/ParentPinResetLight'
import ForgotPassword from './screens/ForgotPassword'
import ForgotPasswordLight from './screens/ForgotPasswordLight'
import ForgotPasswordVerify from './screens/ForgotPasswordVerify'
import ForgotPasswordVerifyLight from './screens/ForgotPasswordVerifyLight'
import NewPassword from './screens/NewPassword'
import NewPasswordLight from './screens/NewPasswordLight'
import PasswordReset from './screens/PasswordReset'
import PasswordResetLight from './screens/PasswordResetLight'

// Dark-only screens (onboarding). No light variant exists for these.
const SINGLES = [
  ['/', Splash],
  ['/welcome', Welcome],
  ['/who', WhoAreYou],
  ['/register', CreateAccount],
  ['/phone', Phone],
  ['/otp', Otp],
  ['/info', PersonalInfo],
  ['/id-doc', IdDoc],
  ['/selfie', Selfie],
  ['/selfie-scan', SelfieScan],
  ['/selfie-success', SelfieSuccess],
  ['/account-created', AccountCreated],
  ['/parent-phone', ParentPhone],
  ['/parent-otp', ParentOtp],
  ['/parrainage-code', ParrainageCode],
  ['/parent-info', ParentInfo],
  ['/parent-id-doc', ParentIdDoc],
  ['/parent-selfie', ParentSelfie],
  ['/parent-selfie-scan', ParentSelfieScan],
  ['/parent-selfie-success', ParentSelfieSuccess],
  ['/parent-pin', ParentPin],
]

// Screens with a light + dark variant. Both the base path and the `-light` path
// render the variant that matches the global theme, so the appearance toggle
// controls the whole app regardless of which path a screen navigates to.
const PAIRS = [
  ['/login', Login, LoginLight],
  ['/dashboard', Dashboard, DashboardLight],
  ['/analytique', Analytique, AnalytiqueLight],
  ['/carte', Carte, CarteLight],
  ['/parametres-carte', ParametresCarte, ParametresCarteLight],
  ['/demande-limit', DemandeLimit, DemandeLimitLight],
  ['/limite-soumise', LimiteSoumise, LimiteSoumiseLight],
  ['/transactions', Transactions, TransactionsLight],
  ['/transaction-detail', TransactionDetail, TransactionDetailLight],
  ['/transactions-filtered', TransactionsFiltered, TransactionsFilteredLight],
  ['/demande-destinataire', DemandeDestinataire, DemandeDestinataireLight],
  ['/demande-montant', DemandeMontant, DemandeMontantLight],
  ['/envoyer-destinataire', EnvoyerDestinataire, EnvoyerDestinataireLight],
  ['/envoyer-montant', EnvoyerMontant, EnvoyerMontantLight],
  ['/envoyer-confirmation', EnvoyerConfirmation, EnvoyerConfirmationLight],
  ['/envoyer-succes', EnvoyerSucces, EnvoyerSuccesLight],
  ['/demande-succes', DemandeSucces, DemandeSuccesLight],
  ['/scolarite-montant', ScolariteMontant, ScolariteMontantLight],
  ['/scolarite-succes', ScolariteSucces, ScolariteSuccesLight],
  ['/profil', ProfilDocumentsAlt, ProfilDocumentsAltLight],
  ['/langue', LangueSelection, LangueSelectionLight],
  ['/notifications', Notifications, NotificationsLight],
  ['/notification-detail', NotificationDetail, NotificationDetailLight],
  ['/parent-connexion', ParentConnexion, ParentConnexionLight],
  ['/parent-dashboard', ParentDashboard, ParentDashboardLight],
  ['/parent-envoyer-beneficiaire', ParentEnvoyerBeneficiaire, ParentEnvoyerBeneficiaireLight],
  ['/parent-envoyer-montant', ParentEnvoyerMontant, ParentEnvoyerMontantLight],
  ['/parent-mode-paiement', ParentModePaiement, ParentModePaiementLight],
  ['/parent-envoyer-succes', ParentEnvoyerSucces, ParentEnvoyerSuccesLight],
  ['/parent-historique', ParentHistorique, ParentHistoriqueLight],
  ['/parent-profil', ParentProfil, ParentProfilLight],
  ['/parent-notifications', ParentNotifications, ParentNotificationsLight],
  ['/parent-notification-detail', ParentNotificationDetail, ParentNotificationDetailLight],
  ['/parent-forgot-pin', ParentForgotPin, ParentForgotPinLight],
  ['/parent-forgot-pin-verify', ParentForgotPinVerify, ParentForgotPinVerifyLight],
  ['/parent-new-pin', ParentNewPin, ParentNewPinLight],
  ['/parent-pin-reset', ParentPinReset, ParentPinResetLight],
  ['/forgot-password', ForgotPassword, ForgotPasswordLight],
  ['/forgot-password-verify', ForgotPasswordVerify, ForgotPasswordVerifyLight],
  ['/new-password', NewPassword, NewPasswordLight],
  ['/password-reset', PasswordReset, PasswordResetLight],
]

function Themed({ dark: Dark, light: Light }) {
  const { theme } = useTheme()
  return theme === 'light' ? <Light /> : <Dark />
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {SINGLES.map(([path, Comp]) => (
          <Route key={path} path={path} element={<Comp />} />
        ))}
        {PAIRS.flatMap(([base, D, L]) => [
          <Route key={base} path={base} element={<Themed dark={D} light={L} />} />,
          <Route key={`${base}-light`} path={`${base}-light`} element={<Themed dark={D} light={L} />} />,
        ])}
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <div
          className="flex min-h-[100dvh] w-full items-center justify-center sm:p-4"
          style={{ backgroundColor: '#1C1C1E' }}
        >
          {/* Fills the whole device on phones; centered 390×844 mockup on ≥ sm screens */}
          <div className="relative h-[100dvh] w-full overflow-hidden sm:h-[844px] sm:max-h-[100svh] sm:w-[390px] sm:rounded-[44px] sm:shadow-2xl">
            <AnimatedRoutes />
          </div>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
