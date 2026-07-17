import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
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

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"               element={<Splash />} />
        <Route path="/welcome"        element={<Welcome />} />
        <Route path="/who"            element={<WhoAreYou />} />
        <Route path="/register"       element={<CreateAccount />} />
        <Route path="/phone"          element={<Phone />} />
        <Route path="/otp"            element={<Otp />} />
        <Route path="/info"           element={<PersonalInfo />} />
        <Route path="/id-doc"         element={<IdDoc />} />
        <Route path="/selfie"         element={<Selfie />} />
        <Route path="/selfie-scan"     element={<SelfieScan />} />
        <Route path="/selfie-success"   element={<SelfieSuccess />} />
        <Route path="/account-created"       element={<AccountCreated />} />
        <Route path="/parent-phone"          element={<ParentPhone />} />
        <Route path="/parent-otp"            element={<ParentOtp />} />
        <Route path="/parrainage-code"       element={<ParrainageCode />} />
        <Route path="/parent-info"           element={<ParentInfo />} />
        <Route path="/parent-id-doc"         element={<ParentIdDoc />} />
        <Route path="/parent-selfie"         element={<ParentSelfie />} />
        <Route path="/parent-selfie-scan"    element={<ParentSelfieScan />} />
        <Route path="/parent-selfie-success" element={<ParentSelfieSuccess />} />
        <Route path="/parent-pin"            element={<ParentPin />} />
        <Route path="/parent-connexion"       element={<ParentConnexion />} />
        <Route path="/parent-connexion-light" element={<ParentConnexionLight />} />
        <Route path="/parent-dashboard"                    element={<ParentDashboard />} />
        <Route path="/parent-dashboard-light"             element={<ParentDashboardLight />} />
        <Route path="/parent-envoyer-beneficiaire"        element={<ParentEnvoyerBeneficiaire />} />
        <Route path="/parent-envoyer-beneficiaire-light"  element={<ParentEnvoyerBeneficiaireLight />} />
        <Route path="/parent-envoyer-montant"             element={<ParentEnvoyerMontant />} />
        <Route path="/parent-envoyer-montant-light"       element={<ParentEnvoyerMontantLight />} />
        <Route path="/parent-mode-paiement"               element={<ParentModePaiement />} />
        <Route path="/parent-mode-paiement-light"         element={<ParentModePaiementLight />} />
        <Route path="/parent-envoyer-succes"              element={<ParentEnvoyerSucces />} />
        <Route path="/parent-envoyer-succes-light"        element={<ParentEnvoyerSuccesLight />} />
        <Route path="/parent-historique"                  element={<ParentHistorique />} />
        <Route path="/parent-historique-light"            element={<ParentHistoriqueLight />} />
        <Route path="/parent-profil"                      element={<ParentProfil />} />
        <Route path="/parent-profil-light"                element={<ParentProfilLight />} />
        <Route path="/login"            element={<Login />} />
        <Route path="/login-light"      element={<LoginLight />} />
        <Route path="/dashboard"        element={<Dashboard />} />
        <Route path="/dashboard-light"  element={<DashboardLight />} />
        <Route path="/analytique"       element={<Analytique />} />
        <Route path="/analytique-light" element={<AnalytiqueLight />} />
        <Route path="/carte"                    element={<Carte />} />
        <Route path="/carte-light"            element={<CarteLight />} />
        <Route path="/parametres-carte"       element={<ParametresCarte />} />
        <Route path="/parametres-carte-light" element={<ParametresCarteLight />} />
        <Route path="/demande-limit"          element={<DemandeLimit />} />
        <Route path="/demande-limit-light"    element={<DemandeLimitLight />} />
        <Route path="/limite-soumise"         element={<LimiteSoumise />} />
        <Route path="/limite-soumise-light"   element={<LimiteSoumiseLight />} />
        <Route path="/transactions"              element={<Transactions />} />
        <Route path="/transactions-light"      element={<TransactionsLight />} />
        <Route path="/transaction-detail"           element={<TransactionDetail />} />
        <Route path="/transaction-detail-light"      element={<TransactionDetailLight />} />
        <Route path="/transactions-filtered"         element={<TransactionsFiltered />} />
        <Route path="/transactions-filtered-light"   element={<TransactionsFilteredLight />} />
        <Route path="/demande-destinataire"          element={<DemandeDestinataire />} />
        <Route path="/demande-destinataire-light"   element={<DemandeDestinataireLight />} />
        <Route path="/demande-montant"              element={<DemandeMontant />} />
        <Route path="/demande-montant-light"        element={<DemandeMontantLight />} />
        <Route path="/envoyer-destinataire"          element={<EnvoyerDestinataire />} />
        <Route path="/envoyer-destinataire-light"    element={<EnvoyerDestinataireLight />} />
        <Route path="/envoyer-montant"               element={<EnvoyerMontant />} />
        <Route path="/envoyer-montant-light"         element={<EnvoyerMontantLight />} />
        <Route path="/envoyer-confirmation"          element={<EnvoyerConfirmation />} />
        <Route path="/envoyer-confirmation-light"    element={<EnvoyerConfirmationLight />} />
        <Route path="/envoyer-succes"                element={<EnvoyerSucces />} />
        <Route path="/envoyer-succes-light"          element={<EnvoyerSuccesLight />} />
        <Route path="/demande-succes"                element={<DemandeSucces />} />
        <Route path="/demande-succes-light"          element={<DemandeSuccesLight />} />
        <Route path="/scolarite-montant"             element={<ScolariteMontant />} />
        <Route path="/scolarite-montant-light"       element={<ScolariteMontantLight />} />
        <Route path="/scolarite-succes"              element={<ScolariteSucces />} />
        <Route path="/scolarite-succes-light"        element={<ScolariteSuccesLight />} />
        <Route path="/profil"                        element={<ProfilDocumentsAlt />} />
        <Route path="/profil-light"                  element={<ProfilDocumentsAltLight />} />
        <Route path="/langue"                        element={<LangueSelection />} />
        <Route path="/langue-light"                  element={<LangueSelectionLight />} />
        <Route path="/notifications"                 element={<Notifications />} />
        <Route path="/notifications-light"           element={<NotificationsLight />} />
        <Route path="/notification-detail"           element={<NotificationDetail />} />
        <Route path="/notification-detail-light"     element={<NotificationDetailLight />} />
        <Route path="/parent-notifications"               element={<ParentNotifications />} />
        <Route path="/parent-notifications-light"         element={<ParentNotificationsLight />} />
        <Route path="/parent-notification-detail"         element={<ParentNotificationDetail />} />
        <Route path="/parent-notification-detail-light"   element={<ParentNotificationDetailLight />} />
        <Route path="/parent-forgot-pin"              element={<ParentForgotPin />} />
        <Route path="/parent-forgot-pin-light"        element={<ParentForgotPinLight />} />
        <Route path="/parent-forgot-pin-verify"       element={<ParentForgotPinVerify />} />
        <Route path="/parent-forgot-pin-verify-light" element={<ParentForgotPinVerifyLight />} />
        <Route path="/parent-new-pin"                 element={<ParentNewPin />} />
        <Route path="/parent-new-pin-light"           element={<ParentNewPinLight />} />
        <Route path="/parent-pin-reset"               element={<ParentPinReset />} />
        <Route path="/parent-pin-reset-light"         element={<ParentPinResetLight />} />
        <Route path="/forgot-password"                element={<ForgotPassword />} />
        <Route path="/forgot-password-light"          element={<ForgotPasswordLight />} />
        <Route path="/forgot-password-verify"         element={<ForgotPasswordVerify />} />
        <Route path="/forgot-password-verify-light"   element={<ForgotPasswordVerifyLight />} />
        <Route path="/new-password"                   element={<NewPassword />} />
        <Route path="/new-password-light"             element={<NewPasswordLight />} />
        <Route path="/password-reset"                 element={<PasswordReset />} />
        <Route path="/password-reset-light"           element={<PasswordResetLight />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div
        className="min-h-screen w-full flex items-center justify-center"
        style={{ backgroundColor: '#1C1C1E' }}
      >
        <div
          className="relative overflow-hidden"
          style={{ width: '390px', height: '844px', maxHeight: '100svh' }}
        >
          <AnimatedRoutes />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
