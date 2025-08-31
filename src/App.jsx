import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import ProgressTracker from './components/ProgressTracker.jsx';
import InputSection from './components/InputSection.jsx';
import UISample from './components/UISample.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import WhyUs from './components/WhyUs.jsx';
import ResultsPage from './components/ResultsPage.jsx';
import Footer from './components/Footer.jsx';
import Modal from './components/Modal.jsx';
import { translations } from './i18n/translations.js';
import { sampleData } from './data/sampleData.js';

export default function App() {
    const [lang, setLang] = useState('en');
    const [modalContent, setModalContent] = useState({ isOpen: false, title: '', content: null });
    const [view, setView] = useState('home');
    const [resultsData, setResultsData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const t = translations[lang];

    const openModal = (title, content) => setModalContent({ isOpen: true, title, content });
    const closeModal = () => setModalContent({ isOpen: false, title: '', content: null });

    const readFileAsText = (file) => new Promise((resolve, reject) => { 
        const reader = new FileReader(); 
        reader.onload = () => resolve(reader.result); 
        reader.onerror = reject; 
        reader.readAsText(file); 
    });

    const readFileAsBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });

    const isImageFile = (file) => {
        return file.type.startsWith('image/');
    };

    const callGeminiAPI = async (payload) => {
        const apiUrl = '/api/gemini/generate';
        let response;
        let delay = 1000;
        for (let i = 0; i < 3; i++) {
            try {
                console.log('Attempting API call:', i + 1);
                response = await fetch(apiUrl, { 
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' }, 
                    body: JSON.stringify(payload) 
                });
                
                if (response.ok) {
                    const data = await response.json();
                    console.log('API call successful:', data);
                    return data;
                } else {
                    const errorData = await response.text();
                    console.error('API call failed with status:', response.status, 'Response:', errorData);
                    throw new Error(`API call failed with status ${response.status}: ${errorData}`);
                }
            } catch (error) {
                console.error('API call error:', error);
                if (i === 2) { // Last attempt
                    throw error;
                }
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2;
            }
        }
        throw new Error('API call failed after multiple retries.');
    };

    const handleAnalyze = async (inputData, dataType) => {
        setIsLoading(true);
        setCurrentStep(2);
        try {
            let fileContent = '';
            let hasImages = false;
            
            if (dataType === 'text' || dataType === 'link') {
                fileContent = inputData;
            } else if (dataType === 'files') {
                const textFiles = [];
                const imageFiles = [];
                
                // Separate text and image files
                for (const file of inputData) {
                    if (isImageFile(file)) {
                        imageFiles.push(file);
                        hasImages = true;
                    } else {
                        textFiles.push(file);
                    }
                }
                
                // Process text files
                if (textFiles.length > 0) {
                    const textContents = await Promise.all(textFiles.map(readFileAsText));
                    fileContent += textContents.join('\n\n--- END OF FILE ---\n\n');
                }
                
                // Process image files
                if (imageFiles.length > 0) {
                    const imageContents = await Promise.all(imageFiles.map(readFileAsBase64));
                    if (fileContent) fileContent += '\n\n--- IMAGES ---\n\n';
                    fileContent += imageContents.map((base64, index) => 
                        `[IMAGE ${index + 1}: ${imageFiles[index].name}]\n${base64}`
                    ).join('\n\n');
                }
            }

            const analysisPrompt = `Analyze the document or image(s). Response MUST be a valid JSON object. For the summary, wrap critical info in [CRITICAL:text], monetary amounts in [AMOUNT:text], and dates in [DATE:text]. Also create a colorCodedOriginalText field with the same color coding applied to the original document text. Structure: { "summary": "...", "colorCodedOriginalText": "...", "keyPoints": ["..."], "extraInfo": ["..."], "wordHelper": [{ "term": "...", "simpleDefinition": "...", "detailedDefinition": "..." }], "verifiableClaims": [{ "claim": "...", "link": "..." }] }\n\nDOCUMENT:\n"""${fileContent}"""`;
            const analysisPayload = { contents: [{ role: 'user', parts: [{ text: analysisPrompt }] }], generationConfig: { responseMimeType: 'application/json' } };

            const result = await callGeminiAPI(analysisPayload);
            const jsonText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!jsonText) throw new Error('Analysis API call returned empty.');

            const parsedJson = JSON.parse(jsonText);
            const finalResults = { en: { ...parsedJson, originalText: fileContent } };

            if (lang === 'hi') {
                const translationPrompt = `Translate the following JSON object values into simple, conversational Hindi. Maintain the exact JSON structure and keys. Do not translate the keys. For the 'summary', keep the bracketed tags like [CRITICAL:text] in English but translate the text inside them.\n\nENGLISH JSON:\n${JSON.stringify(parsedJson, null, 2)}`;
                const translationPayload = { contents: [{ role: 'user', parts: [{ text: translationPrompt }] }], generationConfig: { responseMimeType: 'application/json' } };
                const transResult = await callGeminiAPI(translationPayload);
                const transJsonText = transResult?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (transJsonText) {
                    finalResults.hi = JSON.parse(transJsonText);
                }
            }

            setResultsData(finalResults);
            setView('results');
            setCurrentStep(3);
            window.scrollTo(0, 0);
        } catch (error) {
            console.error("Analysis Error:", error);
            let errorMessage = t.error_message;
            
            // Provide more specific error messages
            if (error.message.includes('API call failed with status')) {
                if (error.message.includes('500')) {
                    errorMessage = 'Server error: Please check if the backend is running and try again.';
                } else if (error.message.includes('401') || error.message.includes('403')) {
                    errorMessage = 'Authentication error: Please check the API key configuration.';
                } else if (error.message.includes('429')) {
                    errorMessage = 'Rate limit exceeded: Please wait a moment and try again.';
                } else {
                    errorMessage = `API Error: ${error.message}`;
                }
            } else if (error.message.includes('JSON')) {
                errorMessage = 'Invalid response from AI service. Please try again.';
            }
            
            openModal(t.error_title, errorMessage);
            setCurrentStep(1);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAskQuestion = async (question, originalText) => {
        const prompt = `Based on the document provided below, answer the user's question. Also, provide up to 3 short, relevant follow-up questions a user might ask next. Your response MUST be a valid JSON object like this: { "answer": "Your answer here.", "suggestions": ["Follow-up 1?", "Follow-up 2?"] }\n\nDOCUMENT:\n"""${originalText}"""\n\nQUESTION:\n"""${question}"""`;
        const payload = { contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json' } };
        const result = await callGeminiAPI(payload);
        const jsonText = result?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!jsonText) throw new Error('Q&A API call returned empty.');
        return JSON.parse(jsonText);
    };

    const handleAnalyzeSample = () => {
        const finalResults = { en: sampleData };
        if (lang === 'hi') {
            finalResults.hi = {
                summary: 'यह 12 महीने का आवासीय पट्टा समझौता है। [CRITICAL: पूर्व लिखित सहमति के बिना किसी भी पालतू जानवर की अनुमति नहीं है।] मासिक किराया [AMOUNT: ₹20,000] है, जो हर महीने की [DATE: पहली तारीख] को देय है। हस्ताक्षर करने पर [AMOUNT: ₹40,000] की सुरक्षा जमा राशि आवश्यक है। पट्टा [DATE: 1 सितंबर, 2025] से शुरू होता है।',
                colorCodedOriginalText: 'यह 12 महीने का आवासीय पट्टा समझौता है। [CRITICAL: पूर्व लिखित सहमति के बिना किसी भी पालतू जानवर की अनुमति नहीं है।] मासिक किराया [AMOUNT: ₹20,000] है, जो हर महीने की [DATE: पहली तारीख] को देय है। हस्ताक्षर करने पर [AMOUNT: ₹40,000] की सुरक्षा जमा राशि आवश्यक है। पट्टा [DATE: 1 सितंबर, 2025] से शुरू होता है। किरायेदार बिजली और पानी की उपयोगिताओं के लिए जिम्मेदार है। संपत्ति 123 सैंपल सेंट पर स्थित है। यह समझौता स्थानीय किरायेदारी अधिनियम के अधीन है।',
                keyPoints: ['पट्टे की अवधि: 12 महीने', 'किराया: ₹20,000/माह', 'सुरक्षा जमा: ₹40,000'],
                extraInfo: ['किरायेदार बिजली और पानी की उपयोगिताओं के लिए जिम्मेदार है।', 'संपत्ति 123 सैंपल सेंट पर स्थित है।'],
                wordHelper: [
                    { term: 'प्रथम पक्ष का पक्ष', simpleDefinition: 'यह मकान मालिक या संपत्ति का मालिक है।', detailedDefinition: 'संपत्ति का पट्टा देने वाला व्यक्ति या संस्था।' },
                    { term: 'उप-पट्टा', simpleDefinition: 'जब कोई किरायेदार किसी अन्य व्यक्ति को संपत्ति किराए पर देता है।', detailedDefinition: 'एक किरायेदार द्वारा एक उप-किरायेदार को संपत्ति का पट्टा।' }
                ],
                verifiableClaims: [{ claim: 'यह समझौता स्थानीय किरायेदारी अधिनियम के अधीन है।', link: 'https://www.google.com/search?q=local+tenancy+act' }]
            };
        }
        setResultsData(finalResults);
        setView('results');
        setCurrentStep(3);
        window.scrollTo(0, 0);
    };

    const handleReset = () => { setView('home'); setResultsData(null); setCurrentStep(1); window.scrollTo(0, 0); };

    useEffect(() => { document.body.style.overflow = modalContent.isOpen ? 'hidden' : 'unset'; }, [modalContent.isOpen]);

    return (
        <div className="bg-[#0A192F] text-slate-300 font-sans">
            <style>{`body { background-color: #0A192F; font-family: 'Inter', sans-serif; } @keyframes fade-in-scale { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } } .animate-fade-in-scale { animation: fade-in-scale 0.3s ease-out forwards; }`}</style>
            <Header t={t} lang={lang} setLang={setLang} />
            {view === 'home' && (
                <>
                    <Hero t={t} />
                    <div className="container mx-auto px-6"><ProgressTracker t={t} currentStep={currentStep} isLoading={isLoading} /></div>
                    {isLoading ? (
                        <div className="text-center py-20"><div className="w-6 h-6 border-4 border-t-transparent border-blue-500 rounded-full animate-spin mx-auto"></div><p className="mt-4 text-lg text-slate-300">{t.analyzing_text}</p></div>
                    ) : (
                        <>
                            <InputSection t={t} onAnalyze={handleAnalyze} onAnalyzeSample={handleAnalyzeSample} isLoading={isLoading} openModal={openModal} />
                            <UISample t={t} />
                            <HowItWorks t={t} openModal={openModal} />
                            <WhyUs t={t} />
                        </>
                    )}
                </>
            )}
            {view === 'results' && resultsData && (<ResultsPage t={t} results={resultsData} onReset={handleReset} onAskQuestion={handleAskQuestion} lang={lang} />)}
            <Footer t={t} />
            <Modal isOpen={modalContent.isOpen} onClose={closeModal} title={modalContent.title}>{modalContent.content}</Modal>
        </div>
    );
}


