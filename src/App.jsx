import Githuburl from './components/Githuburl/Githuburl';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import { toast } from 'react-hot-toast';
import './App.css';

function App() {
  const handleGenerate = async (repoUrl) => {
    try {
      toast.loading('Generating documentation...', { id: 'generate' });
      
      const response = await fetch('http://localhost:5000/api/docify/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          repoUrl: repoUrl,
          exportFormat: 'md' // You can make this configurable
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate documentation');
      }

      const data = await response.json();
      
      // Download the generated file
      const downloadUrl = `http://localhost:5000${data.downloadUrl}`;
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `documentation-${Date.now()}.md`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Documentation generated successfully!', { id: 'generate' });
    } catch (error) {
      console.error('Error generating documentation:', error);
      toast.error(error.message || 'Failed to generate documentation', { id: 'generate' });
    }
  };

  return (
    <div className="main-wrapper bg-[#0b1220]">
      <Hero />
      <Githuburl onSubmit={handleGenerate} />
      <Features />
    </div>
  );
}

export default App;
