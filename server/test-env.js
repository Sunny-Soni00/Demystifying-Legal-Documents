import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../.env');
console.log('Current directory:', __dirname);
console.log('Looking for .env at:', envPath);
console.log('File exists:', fs.existsSync(envPath));

if (fs.existsSync(envPath)) {
    console.log('File content:');
    console.log(fs.readFileSync(envPath, 'utf8'));
}

const result = dotenv.config({ path: envPath });
console.log('Dotenv result:', result);
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY);
console.log('PORT:', process.env.PORT);
