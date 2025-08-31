import React from 'react';
import LoadingSpinner from './common/LoadingSpinner.jsx';

const ProgressTracker = ({ t, currentStep, isLoading }) => {
    const steps = [t.progress_upload, t.progress_analyze, t.progress_review];
    return (
        <div className="w-full py-8">
            <div className="flex justify-between items-center max-w-md mx-auto">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber <= currentStep;
                    const isAnalyzing = isLoading && stepNumber === 2;
                    return (
                        <React.Fragment key={step}>
                            <div className="flex flex-col items-center text-center">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isActive ? 'bg-blue-600 border-blue-500 text-white' : 'bg-[#172A45] border-slate-700 text-slate-400'}`}>
                                    {isAnalyzing ? <LoadingSpinner /> : stepNumber}
                                </div>
                                <p className={`mt-2 text-sm font-semibold transition-colors duration-300 ${isActive ? 'text-slate-100' : 'text-slate-500'}`}>{step}</p>
                            </div>
                            {index < steps.length - 1 && <div className={`flex-1 h-1 mx-4 transition-colors duration-300 ${isActive && currentStep > stepNumber ? 'bg-blue-500' : 'bg-slate-700'}`}></div>}
                        </React.Fragment>
                    );
                })}
            </div>
        </div>
    );
};

export default ProgressTracker;


