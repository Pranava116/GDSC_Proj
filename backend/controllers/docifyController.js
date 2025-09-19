import path from 'path';
import { fileURLToPath } from 'url';
import { cloneRepo, cleanUp } from '../utils/gitUtils.js';
import { parseRepo } from '../utils/parseUtils.js';
import { generateAIContent } from '../utils/aiUtils.js';
import { exportDocs } from '../utils/exportUtils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const generateDocumentation = async (req, res) => {
  const { repoUrl, exportFormat } = req.body;

  if (!repoUrl || !repoUrl.startsWith('https://github.com/')) {
    return res.status(400).json({ error: 'Invalid GitHub URL' });
  }

  try {
    const repoName = repoUrl.split('/').slice(-1)[0];
    const localPath = await cloneRepo(repoUrl, repoName);

    const repoData = await parseRepo(localPath);
    const aiResponse = await generateAIContent(repoData);

    const filePath = await exportDocs(aiResponse, exportFormat || 'md');
    cleanUp(localPath);

    res.json({ downloadUrl: `/api/docify/download/${path.basename(filePath)}` });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: 'Failed to generate documentation' });
  // }
  } catch (error) {
  console.error("❌ Full error during documentation generation:");
  console.error(error);                // original object
  console.error(error.message);        // error message
  console.error(error.stack);          // stack trace
  res.status(500).json({ error: error.message || 'Failed to generate documentation' });
}

};

export const downloadFile = (req, res) => {
  const file = path.join(__dirname, '..', 'exports', req.params.filename);
  res.download(file);
};

// Example function to call Perplexity API

