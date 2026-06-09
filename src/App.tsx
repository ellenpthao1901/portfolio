import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cursor from './components/Cursor'
import PageTransition from './components/PageTransition'
import Home from './pages/Home'
import About from './pages/About'
import SAP from './pages/case-studies/SAP'
import ViettelDigital from './pages/case-studies/ViettelDigital'
import Pods from './pages/case-studies/Pods'
import Kitsap from './pages/case-studies/Kitsap'

export default function App() {
  return (
    <BrowserRouter>
      <Cursor />
      <PageTransition />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sap" element={<SAP />} />
        <Route path="/viettel-digital" element={<ViettelDigital />} />
        <Route path="/pods" element={<Pods />} />
        <Route path="/kitsap" element={<Kitsap />} />
      </Routes>
    </BrowserRouter>
  )
}
