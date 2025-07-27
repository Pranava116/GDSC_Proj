import fs from 'fs';
import path from 'path';
import markdownPdf from 'markdown-pdf';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const exportDocs = async (content, format = 'md') => {
  const timestamp = Date.now();
  const basePath = path.join(__dirname, '..', 'exports', `doc_${timestamp}`);

  if (format === 'md') {
    const mdPath = basePath + '.md';
    fs.writeFileSync(mdPath, content);
    return mdPath;
  }

  if (format === 'pdf') {
    const mdTemp = basePath + '.md';
    fs.writeFileSync(mdTemp, content);
    const pdfPath = basePath + '.pdf';

    await new Promise((resolve, reject) =>
      markdownPdf().from(mdTemp).to(pdfPath, () => resolve())
    );
    return pdfPath;
  }

  if (format === 'docx') {
    const docxPath = basePath + '.docx';
    fs.writeFileSync(docxPath, content); // For production, use 'docx' npm package properly
    return docxPath;
  }

  throw new Error("Unsupported export format");
};
