import React, { useState } from 'react';
import ProgressTracker from './ProgressTracker.jsx';
import ColorCodedSummary from './results/ColorCodedSummary.jsx';
import QATab from './results/QATab.jsx';

const ResultsPage = ({ t, results, onReset, onAskQuestion, lang }) => {
    const tabSummaryLabel = lang === 'hi' ? 'सारांश' : 'Summary';
    const [activeTab, setActiveTab] = useState('summary');
    const tabs = [
        { id: 'summary', label: tabSummaryLabel },
        { id: 'keyPoints', label: t.results_key_points },
        { id: 'wordHelper', label: t.results_word_helper },
        { id: 'qa', label: t.results_qa },
        { id: 'verify', label: t.results_verify }
    ];

    const BilingualDisplay = ({ enData, hiData, render }) => (
        <div>
            {render(enData)}
            {lang === 'hi' && hiData && (
                <div className="mt-6 pt-6 border-t-2 border-slate-700/50">
                    <h3 className="text-lg font-bold text-amber-400 mb-3">{t.hindi_translation}</h3>
                    {render(hiData)}
                </div>
            )}
        </div>
    );

    return (
        <div className="container mx-auto px-4 sm:px-6 py-12 min-h-screen">
            <ProgressTracker t={t} currentStep={3} />
            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 text-center mb-8">{t.results_title}</h1>
            <div className="grid lg:grid-cols-3 gap-8">
                   <div className="lg:col-span-1">
                    <BilingualDisplay 
                        enData={{ summary: results.en.summary, originalText: results.en.colorCodedOriginalText || results.en.originalText }} 
                        hiData={results.hi ? { summary: results.hi.summary, originalText: results.hi.colorCodedOriginalText || results.hi.originalText } : null} 
                        render={(data) => <ColorCodedSummary t={t} summary={data.summary} originalText={data.originalText} />} 
                    />
                </div>
                <div className="lg:col-span-2 bg-[#172A45] p-6 rounded-xl border border-slate-800">
                    <div className="border-b border-slate-700 mb-4">
                        <nav className="-mb-px flex space-x-2 sm:space-x-6 overflow-x-auto">{tabs.map(tab => (<button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`whitespace-nowrap py-4 px-2 sm:px-4 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id ? 'border-blue-500 text-blue-400' : 'border-transparent text-slate-400 hover:border-slate-500 hover:text-slate-300'}`}>{tab.label}</button>))}</nav>
                    </div>
                    <div>
                        {activeTab === 'summary' && (
                            <BilingualDisplay 
                                enData={results.en.summary} 
                                hiData={results.hi?.summary} 
                                render={(data) => <ColorCodedSummary t={t} title={tabSummaryLabel} summary={data} />} 
                            />
                        )}
                        {activeTab === 'keyPoints' && <BilingualDisplay enData={results.en} hiData={results.hi} render={(data) => (<div><h3 className="text-xl font-bold text-blue-400 mb-3">{t.results_key_points}</h3><ul className="space-y-3">{data.keyPoints.map((point, i) => <li key={i} className="flex items-start"><span className="text-blue-400 mr-3 mt-1">&#10003;</span><span className="text-slate-300">{point}</span></li>)}</ul><h3 className="text-xl font-bold text-amber-400 mt-6 mb-3">{t.results_extra_info}</h3><ul className="space-y-3">{data.extraInfo.map((point, i) => <li key={i} className="flex items-start"><span className="text-amber-400 mr-3 mt-1">&#8505;</span><span className="text-slate-300">{point}</span></li>)}</ul></div>)} />}
                        {activeTab === 'wordHelper' && <BilingualDisplay enData={results.en.wordHelper} hiData={results.hi?.wordHelper} render={(data) => (<div className="space-y-4">{data.map((item, i) => <div key={i}><p className="font-semibold text-amber-400 text-lg">{item.term}</p><h4 className="font-semibold text-slate-300 mt-2">{t.simple_definition}</h4><p className="text-slate-300 pl-4 border-l-2 border-slate-700 ml-2">{item.simpleDefinition}</p><h4 className="font-semibold text-slate-300 mt-2">{t.dictionary_definition}</h4><p className="text-slate-400 pl-4 border-l-2 border-slate-700 ml-2">{item.detailedDefinition}</p></div>)}</div>)} />}
                        {activeTab === 'qa' && <QATab t={t} originalText={results.en.originalText} onAskQuestion={onAskQuestion} />}
                        {activeTab === 'verify' && <BilingualDisplay enData={results.en.verifiableClaims} hiData={results.hi?.verifiableClaims} render={(data) => (<div><p className="text-sm text-slate-400 mb-4">{t.verify_desc}</p><div className="space-y-4">{data.map((item, i) => <div key={i}><p className="text-slate-200">{item.claim}</p><a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline text-sm break-all">{item.link}</a></div>)}</div></div>)} />}
                    </div>
                </div>
            </div>
            <div className="text-center mt-12"><button onClick={onReset} className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-3 px-10 rounded-lg shadow-lg hover:shadow-blue-500/40 transition-shadow duration-300 transform hover:scale-105">{t.results_upload_new}</button></div>
        </div>
    );
};

export default ResultsPage;


