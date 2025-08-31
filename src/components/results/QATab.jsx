import React, { useState } from 'react';
import LoadingSpinner from '../common/LoadingSpinner.jsx';

const QATab = ({ t, originalText, onAskQuestion }) => {
    const [question, setQuestion] = useState('');
    const [history, setHistory] = useState([]);
    const [isAsking, setIsAsking] = useState(false);
    const [followUps, setFollowUps] = useState([]);

    const handleAsk = async (q) => {
        const currentQuestion = q || question.trim();
        if (!currentQuestion) return;
        setQuestion('');
        setFollowUps([]);
        setIsAsking(true);
        setHistory(prev => [...prev, { type: 'user', text: currentQuestion }]);
        try {
            const { answer, suggestions } = await onAskQuestion(currentQuestion, originalText);
            setHistory(prev => [...prev, { type: 'ai', text: answer }]);
            setFollowUps(suggestions);
        } catch (error) {
            setHistory(prev => [...prev, { type: 'ai', text: 'Sorry, an error occurred while getting the answer.' }]);
        } finally {
            setIsAsking(false);
        }
    };

    return (
        <div>
            <div className="space-y-4 mb-4 max-h-64 overflow-y-auto pr-2">
                {history.map((item, index) => ( <div key={index} className={`p-3 rounded-lg ${item.type === 'user' ? 'bg-[#0A192F] text-right' : 'bg-slate-800'}`}><p className="text-slate-200">{item.text}</p></div> ))}
                {isAsking && <div className="flex justify-start"><LoadingSpinner /></div>}
            </div>
            {followUps.length > 0 && !isAsking && (
                <div className="mb-4"><h4 className="text-sm font-semibold text-slate-400 mb-2">{t.follow_up_title}</h4><div className="flex flex-wrap gap-2">{followUps.map((q, i) => <button key={i} onClick={() => handleAsk(q)} className="text-sm bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded-full transition-colors">{q}</button>)}</div></div>
            )}
            <div className="relative">
                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleAsk()} placeholder={t.results_ask_question} className="w-full bg-[#0A192F] border border-slate-700 rounded-lg py-3 px-4 pr-20 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none" disabled={isAsking} />
                <button onClick={() => handleAsk()} className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-blue-700 disabled:opacity-50" disabled={isAsking}>Ask</button>
            </div>
        </div>
    );
};

export default QATab;


