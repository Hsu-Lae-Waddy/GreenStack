import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MarketPrice from './pages/MarketPrice'
import UserProfile from './pages/UserProfile'
import Test from './pages/Test'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage'

function App() {
  return(
      <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/marketprice" element={<MarketPrice />} />
        {/* <Route path="/" element={<LandingPage />} /> */}
        <Route path="/home" element={<HomePage />} />
         <Route path="/" element={<LandingPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </Router>

      )
}

export default App
