import React, { useState } from 'react';
import UploadIcon from './icons/UploadIcon.jsx';
import LoadingSpinner from './common/LoadingSpinner.jsx';

const InputSection = ({ t, onAnalyze, onAnalyzeSample, isLoading, openModal }) => {
    const [inputMode, setInputMode] = useState('text');
    const [text, setText] = useState('');
    const [files, setFiles] = useState([]);
    const [link, setLink] = useState('');

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        if (selectedFiles.length > 5) {
            openModal(t.error_title, t.error_file_count);
            return;
        }
        const totalSize = selectedFiles.reduce((acc, file) => acc + file.size, 0);
        if (totalSize > 50 * 1024 * 1024) {
            openModal(t.error_title, t.error_file_size);
            return;
        }
        setFiles(selectedFiles);
    };

    const handleAnalyzeClick = () => {
        let inputData;
        let dataType;

        switch (inputMode) {
            case 'text':
                inputData = text;
                dataType = 'text';
                break;
            case 'file':
                inputData = files;
                dataType = 'files';
                break;
            case 'link':
                inputData = link;
                dataType = 'link';
                break;
            default:
                openModal(t.error_title, t.error_no_input);
                return;
        }
        if ((Array.isArray(inputData) && inputData.length === 0) || (!Array.isArray(inputData) && !inputData)) {
            openModal(t.error_title, t.error_no_input);
            return;
        }
        onAnalyze(inputData, dataType);
    };

    return (
        <section id="upload-section" className="py-20 relative overflow-hidden bg-gradient-to-b from-[#0A192F] to-[#172A45]">
            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <div className="bg-[#0A192F]/50 backdrop-blur-lg border border-slate-800 rounded-2xl shadow-2xl shadow-indigo-600/10 p-6 md:p-10 max-w-3xl mx-auto">
                    <div className="text-center mb-6"><h2 className="text-3xl md:text-4xl font-bold text-slate-100">{t.input_title}</h2><p className="text-slate-400 mt-2 text-lg">{t.input_subtitle}</p></div>
                    <div className="mb-6 bg-[#172A45] rounded-lg p-1 flex justify-center gap-2">
                        <button onClick={() => setInputMode('text')} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors w-full ${inputMode === 'text' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}>{t.input_paste_text}</button>
                        <button onClick={() => setInputMode('file')} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors w-full ${inputMode === 'file' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}>{t.input_upload_files}</button>
                        <button onClick={() => setInputMode('link')} className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors w-full ${inputMode === 'link' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}>{t.input_from_link}</button>
                    </div>
                    <div>
                        {inputMode === 'text' && <textarea value={text} onChange={(e) => setText(e.target.value)} className="w-full h-40 bg-[#0A192F] border border-slate-700 rounded-lg p-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder={t.input_paste_placeholder}></textarea>}
                        {inputMode === 'file' && <label htmlFor="file-upload" className="relative block w-full border-4 border-dashed border-slate-700 rounded-xl p-10 text-center cursor-pointer hover:border-blue-500 hover:bg-slate-800/50 transition-colors duration-300"><UploadIcon />{files.length > 0 ? (<div className="mt-4 text-sm font-semibold text-blue-400">{files.map(f => f.name).join(', ')}</div>) : (<p className="mt-4 text-slate-400"><span className="font-semibold text-blue-400">{t.input_upload_cta}</span> {t.input_upload_drag}</p>)}<p className="text-xs text-slate-500 mt-1">{t.input_upload_formats}</p><input type="file" multiple className="sr-only" id="file-upload" onChange={handleFileChange} disabled={isLoading} accept=".txt,.pdf,.docx,.jpg,.jpeg,.png,.gif,.bmp,.webp" /></label>}
                        {inputMode === 'link' && <input type="url" value={link} onChange={(e) => setLink(e.target.value)} className="w-full bg-[#0A192F] border border-slate-700 rounded-lg p-4 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder={t.input_link_placeholder} />}
                    </div>
                    <div className="mt-8 text-center flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
                         <button onClick={handleAnalyzeClick} disabled={isLoading} className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-3 h-12">
                            {isLoading ? <LoadingSpinner /> : t.upload_button}
                         </button>
                         <button onClick={onAnalyzeSample} disabled={isLoading} className="bg-transparent border-2 border-amber-500 text-amber-400 font-bold py-3 px-8 rounded-lg hover:bg-amber-500/10 transition-colors duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed h-12">{t.try_sample}</button>
                         <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">{t.watch_demo}</a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InputSection;


