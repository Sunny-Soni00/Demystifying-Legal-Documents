import React from 'react';

const ColorCodedSummary = ({ t, summary, originalText, title }) => {
    // Use originalText if available, otherwise fall back to summary
    const textToProcess = originalText || summary;
    
    const parts = textToProcess.split(/(\[CRITICAL:.+?\]|\[AMOUNT:.+?\]|\[DATE:.+?\])/g).filter(Boolean);
    const renderPart = (part, i) => {
        if (part.startsWith('[CRITICAL:')) return <span key={i} className="bg-red-500/20 text-red-300 px-1 rounded">{part.substring(10, part.length - 1)}</span>;
        if (part.startsWith('[AMOUNT:')) return <span key={i} className="bg-green-500/20 text-green-300 px-1 rounded">{part.substring(8, part.length - 1)}</span>;
        if (part.startsWith('[DATE:')) return <span key={i} className="bg-amber-500/20 text-amber-300 px-1 rounded">{part.substring(6, part.length - 1)}</span>;
        return <span key={i}>{part}</span>;
    };
    
    return (
        <div className="bg-[#172A45] p-6 rounded-xl border border-slate-800">
            <h2 className="text-2xl font-bold text-blue-400 mb-4">{title || t.results_summary}</h2>
            <div className="relative">
                <div className="text-slate-300 leading-relaxed whitespace-pre-wrap overflow-x-auto overflow-y-auto min-h-[12rem] max-h-[60vh] pr-2 resize-y">
                    {parts.map(renderPart)}
                </div>
            </div>
            <div className="mt-6 border-t border-slate-700 pt-4">
                <h3 className="font-semibold text-slate-100 mb-2">{t.legend_title}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                    <div className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-red-500/80"></span><span>{t.legend_critical}</span></div>
                    <div className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-green-500/80"></span><span>{t.legend_amount}</span></div>
                    <div className="flex items-center gap-2"><span className="w-4 h-4 rounded-full bg-amber-500/80"></span><span>{t.legend_date}</span></div>
                </div>
            </div>
        </div>
    );
};

export default ColorCodedSummary;


