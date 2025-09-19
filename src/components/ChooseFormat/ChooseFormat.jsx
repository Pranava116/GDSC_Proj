import { useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import './ChooseFormat.css';

export default function ChooseFormat() {
  const location = useLocation();
  const repoUrl = location.state?.repoUrl;
  const [loadingFormat, setLoadingFormat] = useState(null); // ✅ track one format at a time

  const handleGenerate = async (format) => {
    if (!repoUrl) {
      toast.error('Repository URL missing');
      return;
    }

    setLoadingFormat(format);
    toast.loading('Generating documentation...', { id: 'generate' });

    try {
      const response = await fetch('http://localhost:5000/api/docify/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repoUrl, exportFormat: format }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate documentation');
      }

      const data = await response.json();
      const downloadUrl = `http://localhost:5000${data.downloadUrl}`;

      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = `documentation-${Date.now()}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success('Documentation generated successfully!', { id: 'generate' });
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Failed to generate documentation', { id: 'generate' });
    } finally {
      setLoadingFormat(null); // ✅ reset when done
    }
  };

  return (
    <div className="text-center mt-16">
      <h1 className="text-2xl text-white mb-6">Choose export format</h1>
      <div className="flex justify-center gap-4">
        {['md', 'pdf', 'docx'].map((fmt) => (
          <button
            key={fmt}
            onClick={() => handleGenerate(fmt)}
            disabled={loadingFormat === fmt} // ✅ disable only clicked one
            className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            {loadingFormat === fmt ? 'Generating…' : fmt.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
