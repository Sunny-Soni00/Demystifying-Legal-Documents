import React from 'react';

const WhyUs = ({ t }) => (
    <section id="why-us" className="py-20 bg-[#0A192F]">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12"><h2 className="text-3xl md:text-4xl font-bold text-slate-100">{t.why_us_title}</h2></div>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="bg-[#172A45]/80 border border-slate-800 p-8 rounded-lg text-center backdrop-blur-sm"><h3 className="text-2xl font-semibold text-blue-400">{t.why_us_empowerment}</h3><p className="mt-2 text-slate-400">{t.why_us_empowerment_desc}</p></div>
                <div className="bg-[#172A45]/80 border border-slate-800 p-8 rounded-lg text-center backdrop-blur-sm"><h3 className="text-2xl font-semibold text-amber-400">{t.why_us_accessibility}</h3><p className="mt-2 text-slate-400">{t.why_us_accessibility_desc}</p></div>
                <div className="bg-[#172A45]/80 border border-slate-800 p-8 rounded-lg text-center backdrop-blur-sm"><h3 className="text-2xl font-semibold text-blue-400">{t.why_us_security}</h3><p className="mt-2 text-slate-400">{t.why_us_security_desc}</p></div>
            </div>
        </div>
    </section>
);

export default WhyUs;


