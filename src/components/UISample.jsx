import React from 'react';

const UISample = ({ t }) => (
    <section id="features" className="py-20 bg-[#172A45]">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-100">{t.features_title}</h2>
                <p className="text-slate-400 mt-4 text-lg">{t.features_subtitle}</p>
            </div>
            
            {/* Sample Preview Label */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-full shadow-lg">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    <span className="font-semibold">Live Preview - See How It Works!</span>
                </div>
            </div>

            {/* Enhanced Sample UI */}
            <div className="relative mx-auto border-4 border-blue-500/30 bg-gradient-to-b from-blue-900/20 to-indigo-900/20 rounded-2xl w-full max-w-6xl h-[28rem] md:h-[36rem] shadow-2xl shadow-blue-500/20">
                {/* Browser-like header */}
                <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-3 rounded-t-xl border-b border-slate-600">
                    <div className="flex items-center gap-2">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="ml-4 text-sm text-slate-300">docs-simplifier.com - Analysis Results</div>
                    </div>
                </div>

                <div className="rounded-b-xl overflow-hidden w-full h-full bg-[#0A192F] p-6">
                    <div className="grid lg:grid-cols-3 gap-6 h-full">
                        {/* Left Panel - Color-Coded Summary */}
                        <div className="lg:col-span-1 bg-[#172A45] p-4 rounded-xl border border-slate-700 shadow-lg">
                            <h3 className="text-lg font-bold text-blue-400 mb-3 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                </svg>
                                {t.results_summary}
                            </h3>
                            <div className="text-xs text-slate-300 leading-relaxed max-h-32 overflow-y-auto">
                                This is a 12-month lease agreement. <span className="bg-red-500/20 text-red-300 px-1 rounded font-medium">No pets allowed without consent.</span> Monthly rent is <span className="bg-green-500/20 text-green-300 px-1 rounded font-medium">₹20,000</span>, due on the <span className="bg-amber-500/20 text-amber-300 px-1 rounded font-medium">1st of each month</span>. Security deposit <span className="bg-green-500/20 text-green-300 px-1 rounded font-medium">₹40,000</span> required.
                            </div>
                            
                            {/* Color Legend */}
                            <div className="mt-4 pt-3 border-t border-slate-600">
                                <h4 className="text-xs font-semibold text-slate-400 mb-2">Color Legend:</h4>
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-500/80"></span><span className="text-red-300">Critical</span></div>
                                    <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-green-500/80"></span><span className="text-green-300">Amount</span></div>
                                    <div className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-amber-500/80"></span><span className="text-amber-300">Date</span></div>
                                </div>
                            </div>
                        </div>

                        {/* Right Panel - Feature Tabs */}
                        <div className="lg:col-span-2 bg-[#172A45] p-4 rounded-xl border border-slate-700 shadow-lg">
                            <div className="border-b border-slate-700 mb-4">
                                <nav className="flex space-x-6 text-sm overflow-x-auto">
                                    <button className="py-2 px-1 border-b-2 border-blue-500 text-blue-400 font-medium whitespace-nowrap">
                                        {t.results_key_points}
                                    </button>
                                    <button className="py-2 px-1 border-b-2 border-transparent text-slate-400 hover:text-slate-300 whitespace-nowrap">
                                        {t.results_word_helper}
                                    </button>
                                    <button className="py-2 px-1 border-b-2 border-transparent text-slate-400 hover:text-slate-300 whitespace-nowrap">
                                        {t.results_qa}
                                    </button>
                                    <button className="py-2 px-1 border-b-2 border-transparent text-slate-400 hover:text-slate-300 whitespace-nowrap">
                                        {t.results_verify}
                                    </button>
                                </nav>
                            </div>

                            {/* Tab Content - Key Points */}
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-sm font-semibold text-blue-400 mb-2">Key Points:</h4>
                                    <ul className="space-y-2 text-xs">
                                        <li className="flex items-start">
                                            <span className="text-blue-400 mr-2 mt-1">&#10003;</span>
                                            <span className="text-slate-300">Lease Term: 12 months</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-400 mr-2 mt-1">&#10003;</span>
                                            <span className="text-slate-300">Monthly Rent: ₹20,000</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-400 mr-2 mt-1">&#10003;</span>
                                            <span className="text-slate-300">Security Deposit: ₹40,000</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-blue-400 mr-2 mt-1">&#10003;</span>
                                            <span className="text-slate-300">Due Date: 1st of each month</span>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="text-sm font-semibold text-amber-400 mb-2">Additional Info:</h4>
                                    <ul className="space-y-2 text-xs">
                                        <li className="flex items-start">
                                            <span className="text-amber-400 mr-2 mt-1">&#8505;</span>
                                            <span className="text-slate-300">Tenant responsible for utilities</span>
                                        </li>
                                        <li className="flex items-start">
                                            <span className="text-amber-400 mr-2 mt-1">&#8505;</span>
                                            <span className="text-slate-300">Property location: 123 Sample St.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Highlights Below */}
            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 bg-[#0A192F]/50 rounded-xl border border-slate-700">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">Smart Analysis</h3>
                    <p className="text-sm text-slate-400">AI identifies critical information, amounts, and dates automatically</p>
                </div>

                <div className="text-center p-6 bg-[#0A192F]/50 rounded-xl border border-slate-700">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">Ask Questions</h3>
                    <p className="text-sm text-slate-400">Get instant answers about your document in natural language</p>
                </div>

                <div className="text-center p-6 bg-[#0A192F]/50 rounded-xl border border-slate-700">
                    <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">Fact Verification</h3>
                    <p className="text-sm text-slate-400">Verify claims and get links to relevant regulations</p>
                </div>

                <div className="text-center p-6 bg-[#0A192F]/50 rounded-xl border border-slate-700">
                    <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"></path>
                        </svg>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">Bilingual Support</h3>
                    <p className="text-sm text-slate-400">Get results in English and Hindi for better understanding</p>
                </div>
            </div>
        </div>
    </section>
);

export default UISample;


