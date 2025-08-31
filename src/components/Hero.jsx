import React from 'react';

const Hero = ({ t }) => (
    <main className="relative overflow-hidden bg-[#0A192F]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"><div className="w-[80vw] h-[50vh] bg-indigo-600/20 blur-[120px] rounded-full"></div></div>
        <section className="container mx-auto px-6 py-20 md:py-32 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100 leading-tight tracking-tight">{t.hero_title_1}<span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500 mt-2">{t.hero_title_2}</span></h1>
            <p className="mt-6 text-lg md:text-xl text-slate-400 max-w-3xl mx-auto">{t.hero_subtitle}</p>
            <div className="mt-12"><a href="#upload-section" className="group relative inline-block text-lg font-medium text-white focus:outline-none focus:ring"><span className="absolute inset-0 border-2 border-blue-600 rounded-lg"></span><span className="block bg-blue-600/10 backdrop-blur-sm px-8 py-4 rounded-lg transition-transform group-hover:-translate-x-1.5 group-hover:-translate-y-1.5 group-active:bg-blue-600/20">{t.hero_button}</span></a></div>
        </section>
    </main>
);

export default Hero;


