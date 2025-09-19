import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Githuburl from './components/Githuburl/Githuburl';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import ChooseFormat from './components/ChooseFormat/ChooseFormat'; // <-- will create this next
import './App.css';

function App() {
  return (
    <Router>
      <div className="main-wrapper bg-[#0b1220]">
        <Routes>
          {/* Home page where user enters repo URL */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Githuburl />
                <Features />
              </>
            }
          />

          {/* New page to select MD / PDF / DOCX */}
          <Route path="/choose-format" element={<ChooseFormat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
