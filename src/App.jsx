import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Page/Home";
import About from "./Page/Aboutme";
import Footer from "./components/Footer";
import VoiceAssistant from "./Page/VoiceAssistant";
import ImageAssistant from "./Page/ImageAssistant";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutme" element={<About/>} />
        <Route path="/voiceassistant" element={<VoiceAssistant />} />
        <Route path="/imageassistant" element={<ImageAssistant />} />
      </Routes>
    </Router>
  );
}

export default App;