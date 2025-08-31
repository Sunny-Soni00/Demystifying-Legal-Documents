import React from 'react';

const HowItWorks = ({ t, openModal }) => (
    <section id="how-it-works" className="py-20 bg-[#0A192F]">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold text-slate-100">{t.how_it_works_title}</h2><p className="text-slate-400 mt-4 text-lg">{t.how_it_works_subtitle}</p></div>
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="p-8 border border-slate-800 rounded-xl bg-[#172A45] cursor-pointer transform transition-transform hover:scale-105" onClick={() => openModal(t.step1_detail_title, <p>{t.step1_detail_desc}</p>)}><div className="flex items-center justify-center h-20 w-20 mx-auto border-2 border-blue-500 text-blue-400 rounded-full text-3xl font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)]">1</div><h3 className="text-2xl font-semibold mt-6 text-slate-100">{t.step1_title}</h3><p className="mt-2 text-slate-400">{t.step1_desc}</p></div>
                <div className="p-8 border border-slate-800 rounded-xl bg-[#172A45] cursor-pointer transform transition-transform hover:scale-105" onClick={() => openModal(t.step2_detail_title, <p>{t.step2_detail_desc}</p>)}><div className="flex items-center justify-center h-20 w-20 mx-auto border-2 border-amber-500 text-amber-400 rounded-full text-3xl font-bold shadow-[0_0_15px_rgba(251,191,36,0.3)]">2</div><h3 className="text-2xl font-semibold mt-6 text-slate-100">{t.step2_title}</h3><p className="mt-2 text-slate-400">{t.step2_desc}</p></div>
                <div className="p-8 border border-slate-800 rounded-xl bg-[#172A45] cursor-pointer transform transition-transform hover:scale-105" onClick={() => openModal(t.step3_detail_title, <p>{t.step3_detail_desc}</p>)}><div className="flex items-center justify-center h-20 w-20 mx-auto border-2 border-blue-500 text-blue-400 rounded-full text-3xl font-bold shadow-[0_0_15px_rgba(59,130,246,0.3)]">3</div><h3 className="text-2xl font-semibold mt-6 text-slate-100">{t.step3_title}</h3><p className="mt-2 text-slate-400">{t.step3_desc}</p></div>
            </div>
        </div>
    </section>
);

export default HowItWorks;


