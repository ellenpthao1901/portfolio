import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Intro from './Intro'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Nav />
      <Intro />
      <div className="flex flex-1 flex-col">
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}
