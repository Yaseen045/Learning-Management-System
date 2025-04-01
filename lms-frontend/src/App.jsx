import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Feedback from './pages/Feedback';
import Dashboard from './pages/Dashbord';
import Module from './pages/Module';
import AboutUs from './pages/AboutUs';
 
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/module/:courseId" element={<Module />} /> {/* Route with courseId */}
        <Route path="/course/:id/modules" element={<Module />} /> {/* ✅ Updated */}
        <Route path='/about' element={<AboutUs/>}/>
  
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;


