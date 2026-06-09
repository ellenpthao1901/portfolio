import { Outlet } from 'react-router-dom'
import Nav from './Nav'
import Intro from './Intro'
import Footer from './Footer'

export default function Layout() {
  return (
    <>
      <Nav />
      <Intro />
      <Outlet />
      <Footer />
    </>
  )
}
