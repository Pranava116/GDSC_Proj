import simpleGit from 'simple-git';
import path from 'path';
import fs from 'fs-extra';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const cloneRepo = async (url, folderName) => {
  const targetPath = path.join(__dirname, '..', 'temp', `${folderName}-${Date.now()}`);
  await simpleGit().clone(url, targetPath);
  return targetPath;
};

export const cleanUp = (folderPath) => {
  fs.remove(folderPath, err => {
    if (err) console.error("Cleanup error:", err);
  });
};
