import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cursor from './components/Cursor'
import PageTransition from './components/PageTransition'
import SiteLoader from './components/SiteLoader'
import Layout from './components/Layout'
import { useVisitorTracking } from './hooks/useVisitorTracking'

const Home = lazy(() => import('./pages/Home'))
const About = lazy(() => import('./pages/About'))
const SAP = lazy(() => import('./pages/case-studies/SAP'))
const ViettelDigital = lazy(() => import('./pages/case-studies/ViettelDigital'))
const Pods = lazy(() => import('./pages/case-studies/Pods'))
const Kitsap = lazy(() => import('./pages/case-studies/Kitsap'))
const Admin = lazy(() => import('./pages/Admin'))
const AdminInbox = lazy(() => import('./pages/AdminInbox'))

export default function App() {
  useVisitorTracking()

  return (
    <BrowserRouter>
      <SiteLoader />
      <Cursor />
      <PageTransition />
      <Suspense fallback={null}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/sap" element={<SAP />} />
            <Route path="/viettel-digital" element={<ViettelDigital />} />
            <Route path="/pods" element={<Pods />} />
            <Route path="/kitsap" element={<Kitsap />} />
          </Route>
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/inbox" element={<AdminInbox />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
