import { Toaster } from 'react-hot-toast'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Managers from './pages/Managers'
import Collaborators from './pages/Collaborators'
import Courses from './pages/Courses'
import Profile from './pages/Profile'

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/managers" element={<Managers />} />
          <Route path="/collaborators" element={<Collaborators />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  )
}

export default App