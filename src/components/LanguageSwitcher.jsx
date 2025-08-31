import React from 'react';

const LanguageSwitcher = ({ lang, setLang }) => (
    <div className="flex items-center bg-[#172A45] rounded-full border border-slate-700 p-1">
        <button onClick={() => setLang('en')} className={`px-3 py-1 text-sm rounded-full transition-colors ${lang === 'en' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}>EN</button>
        <button onClick={() => setLang('hi')} className={`px-3 py-1 text-sm rounded-full transition-colors ${lang === 'hi' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}>HI</button>
    </div>
);

export default LanguageSwitcher;


