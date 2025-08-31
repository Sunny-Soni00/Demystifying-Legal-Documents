# Document Analyzer & Simplifier

A powerful web application that analyzes documents, images, and text using Google's Gemini AI to provide simplified summaries, key insights, and interactive Q&A capabilities. Built with React, Express, and Tailwind CSS.

## 🚀 Features

- Multi-format Support: Analyze text, documents, images, and web links
- AI-Powered Analysis: Uses Google Gemini AI for intelligent document processing
- Color-Coded Summaries: Important information highlighted with visual cues
- Interactive Q&A: Ask follow-up questions about your documents
- Multi-language Support: Available in English and Hindi
- Progress Tracking: Visual feedback during analysis
- Sample Data: Try the app with pre-loaded sample documents

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 18 or higher)
- npm (comes with Node.js)
- Google Gemini API Key (free tier available)

## 🛠️ Installation & Setup

### 1. Clone or Download the Project
```bash
git clone <repository-url>
cd cursor
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Get Your Google Gemini API Key

1. Visit the [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 4. Configure Environment Variables

Create a `.env` file in the root directory and add your API key:

```env
GEMINI_API_KEY=your_actual_api_key_here
PORT=3001
```

Important: 
- Replace `your_actual_api_key_here` with your actual Gemini API key
- Do not share your API key publicly
- The `.env` file should not be committed to version control

### 5. Start the Application

#### Development Mode (Recommended)
```bash
npm run dev
```
This starts both the client (React app) and server concurrently.

#### Manual Start (Alternative)
Start the server:
```bash
npm run dev:server
```

In a new terminal, start the client:
```bash
npm run dev:client
```

### 6. Access the Application

Open your browser and go to:
- Frontend: http://localhost:5173
- Backend API: http://localhost:3001

## 🔧 API Configuration Test

To verify your API key is working correctly:

1. Make sure the server is running
2. Visit: http://localhost:3001/api/test
3. You should see:
   ```json
   {
     "message": "Backend is working!",
     "timestamp": "2025-08-31T...",
     "hasApiKey": true,
     "apiKeyLength": 39
   }
   ```

If `hasApiKey` is `false`, check your `.env` file configuration.

## 📁 Project Structure

```
cursor/
├── src/                          # Frontend source code
│   ├── components/              # React components
│   │   ├── Header.jsx          # Main navigation
│   │   ├── Hero.jsx            # Landing section
│   │   ├── InputSection.jsx    # File upload & input
│   │   ├── ResultsPage.jsx     # Analysis results
│   │   ├── Modal.jsx           # Modal dialogs
│   │   └── ...                 # Other components
│   ├── data/                   # Sample data
│   ├── i18n/                   # Language translations
│   ├── styles/                 # CSS styles
│   └── App.jsx                 # Main app component
├── server/                     # Backend server
│   └── index.js               # Express server
├── .env                       # Environment variables (create this)
├── package.json               # Dependencies & scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS config
└── README.md                 # This file
```

## 🎯 How to Use

### 1. Upload Documents
- Click "Choose Files" to upload documents (PDF, TXT, DOCX, etc.)
- Or paste text directly into the text area
- Or provide a web link to analyze

### 2. Upload Images
- Support for common image formats (JPG, PNG, PDF, etc.)
- The AI can analyze text within images (OCR)
- Combine images with text documents for comprehensive analysis

### 3. View Results
- Summary: Key points with color-coded highlights
  - 🔴 [CRITICAL:...] - Important information
  - 💰 [AMOUNT:...] - Monetary values
  - 📅 [DATE:...] - Important dates
- Key Points: Bullet-point summary
- Word Helper: Definitions of complex terms
- Q&A Tab: Ask questions about your document

### 4. Interactive Features
- Switch between English and Hindi
- Ask follow-up questions about your document
- Use the sample data to try the application

## 🔍 Troubleshooting

### Common Issues

1. "API call failed" error
- Check if your `.env` file exists and contains the correct API key
- Verify the server is running on port 3001
- Test the API endpoint: http://localhost:3001/api/test

 2. "Server not responding"
- Make sure you ran `npm run dev` or `npm run dev:server`
- Check if port 3001 is available
- Look for error messages in the terminal

3. File upload not working
- Check file size (limit: 10MB)
- Ensure file formats are supported
- Try uploading one file at a time

4. Environment Variables Not Loading
- Ensure `.env` file is in the root directory (not in `server/` folder)
- No spaces around the `=` in your `.env` file
- Restart the server after modifying `.env`

### Debug Commands

Check if the server is running:
```bash
curl http://localhost:3001/api/health
```

Check API key configuration:
```bash
curl http://localhost:3001/api/test
```

## 🚀 Production Build

To build for production:

```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## 📚 Dependencies

### Frontend
- React 18: UI framework
- Vite: Build tool and dev server
- Tailwind CSS: Styling framework

### Backend
- Express: Web server framework
- CORS: Cross-origin resource sharing
- dotenv: Environment variable loading
- node-fetch: HTTP requests to Gemini API

## 🔐 Security Notes

- Never commit your `.env` file to version control
- Keep your API key secure and don't share it
- The Gemini API has usage limits - monitor your usage
- Consider implementing rate limiting for production use

## 📄 License

This project is for educational and personal use. Please respect Google's Gemini API terms of service.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

If you encounter issues:
1. Check this README for troubleshooting steps
2. Verify your API key configuration
3. Check the browser console for error messages
4. Ensure all dependencies are installed correctly

---

Happy analyzing! 🎉
