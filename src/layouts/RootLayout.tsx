import { Outlet } from 'react-router-dom'
import Navbar from '../components/Sidebar'

const RootLayout = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto px-4">
        <Outlet />
      </div>
    </div>
  )
}

export default RootLayout