import fs from 'fs';
import path from 'path';

const getAllFiles = (dir, files = []) => {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, files);
    } else if (/\.(js|ts|py|java|cpp)$/.test(file)) {
      files.push({ name: file, content: fs.readFileSync(fullPath, 'utf-8') });
    }
  });
  return files;
};

export const parseRepo = (repoPath) => {
  const readmePath = path.join(repoPath, 'README.md');
  const readme = fs.existsSync(readmePath) 
    ? fs.readFileSync(readmePath, 'utf-8') 
    : '';
  const files = getAllFiles(repoPath);
  return { readme, files };
};
