import React from 'react';
import LanguageSwitcher from './LanguageSwitcher.jsx';

const Header = ({ t, lang, setLang }) => (
    <header className="bg-[#0A192F]/80 backdrop-blur-sm sticky top-0 z-40 border-b border-slate-800">
        <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
            <div className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">Docs Simplifier</div>
            <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-slate-300 hover:text-blue-400 transition-colors duration-300">{t.nav_features}</a>
                <a href="#how-it-works" className="text-slate-300 hover:text-blue-400 transition-colors duration-300">{t.nav_how_it_works}</a>
                <a href="#why-us" className="text-slate-300 hover:text-blue-400 transition-colors duration-300">{t.nav_why_us}</a>
            </div>
            <div className="flex items-center gap-4">
                 <LanguageSwitcher lang={lang} setLang={setLang} />
                 <a href="#upload-section" className="group relative hidden sm:inline-block text-sm font-medium text-white focus:outline-none focus:ring">
                    <span className="absolute inset-0 border border-blue-600 group-active:border-blue-500 rounded-lg"></span>
                    <span className="block border border-slate-800 bg-[#0A192F] px-4 py-2 rounded-lg transition-transform active:bg-slate-800 group-hover:-translate-x-1 group-hover:-translate-y-1">{t.nav_try_now}</span>
                </a>
            </div>
        </nav>
    </header>
);

export default Header;


