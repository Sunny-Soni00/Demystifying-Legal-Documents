import React from 'react';

const Footer = ({ t }) => (
    <footer className="bg-[#0A192F]/80 border-t border-slate-800">
        <div className="container mx-auto px-6 py-8 text-center text-slate-400">
            <p>&copy; 2025 Docs Simplifier. {t.footer_text}</p>
            <p className="text-sm text-slate-500 mt-2">{t.footer_built_with}</p>
        </div>
    </footer>
);

export default Footer;


