import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MarketPrice from './pages/MarketPrice'
import UserProfile from './pages/UserProfile'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return(
      <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/marketprice" element={<MarketPrice />} />
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<UserProfile />} />

      </Routes>
    </Router>

      )
}
export default App
