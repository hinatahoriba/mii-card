import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import CardPage from './pages/CardPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/card/:encoded" element={<CardPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
