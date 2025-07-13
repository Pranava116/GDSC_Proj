import Githuburl from './components/Githuburl/Githuburl';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import './App.css';
function App() {
  const handleGenerate = async (repoUrl) => {
    // call  /api/generate-docs endpoint here
    console.log('Generate docs for:', repoUrl);
  };
return (
  <div className="main-wrapper bg-[#0b1220]">
  <Hero />
  <Githuburl onSubmit={handleGenerate} />
  <Features />
</div>
)
}
export default App;
