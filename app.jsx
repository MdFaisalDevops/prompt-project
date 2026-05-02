const { useState, useEffect, useRef } = React;

// --- Data ---
const flashcardsData = [
    { term: 'ECI', definition: 'Election Commission of India. An autonomous constitutional authority responsible for administering union and state election processes in India.' },
    { term: 'EVM', definition: 'Electronic Voting Machine. Used to record votes securely, eliminating invalid votes and speeding up the counting process.' },
    { term: 'VVPAT', definition: 'Voter Verifiable Paper Audit Trail. An independent system attached to EVMs that allows voters to verify their vote.' },
    { term: 'EPIC', definition: 'Electors Photo Identity Card. Commonly known as the Voter ID card issued by the ECI.' },
    { term: 'MCC', definition: 'Model Code of Conduct. Guidelines issued by the ECI for conduct of political parties and candidates during elections.' },
    { term: 'NOTA', definition: 'None of the Above. A ballot option allowing voters to indicate disapproval of all candidates in the voting system.' },
    { term: 'Form 6', definition: 'The application form for inclusion of name in the electoral roll for a first-time voter.' },
    { term: 'RO', definition: 'Returning Officer. An officer responsible for overseeing the election in a constituency.' },
    { term: 'BLO', definition: 'Booth Level Officer. A local government official responsible for electoral roll maintenance at the polling station level.' }
];

const quizQuestions = [
    { 
        question: 'What is the minimum age to be eligible to vote in Lok Sabha elections?', 
        options: ['16 years', '18 years', '21 years', '25 years'], 
        answer: 1,
        explanation: 'The voting age in India was reduced from 21 to 18 years by the 61st Constitutional Amendment Act of 1988.'
    },
    { 
        question: 'Which machine generates a printed paper slip for the voter to verify their vote?', 
        options: ['EVM', 'EPIC', 'VVPAT', 'NOTA'], 
        answer: 2,
        explanation: 'VVPAT (Voter Verifiable Paper Audit Trail) prints a slip containing the serial number, name, and symbol of the candidate voted for. It is visible for 7 seconds.'
    },
    { 
        question: 'When does the Model Code of Conduct (MCC) come into force?', 
        options: ['6 months before voting', 'Immediately after election schedule is announced', 'On the day of polling', 'After nominations are filed'], 
        answer: 1,
        explanation: 'The MCC comes into operation immediately from the day the Election Commission announces the election schedule.'
    },
    { 
        question: 'Which form should a new voter fill out to get registered in the electoral roll?', 
        options: ['Form 6', 'Form 7', 'Form 8', 'Form 9'], 
        answer: 0,
        explanation: 'Form 6 is used for the inclusion of a name in the electoral roll for a first-time voter or a voter shifting from one constituency to another.'
    },
    {
        question: 'What happens if the NOTA votes are higher than the highest votes secured by any candidate?',
        options: ['Re-election is held', 'The candidate with highest votes still wins', 'President\'s rule is imposed', 'Election is cancelled'],
        answer: 1,
        explanation: 'Currently in India, NOTA has no electoral value. Even if NOTA gets the maximum votes, the candidate with the highest number of votes is declared the winner.'
    }
];

const timelineSteps = [
    { title: "Notification", description: "The President or Governor issues a notification calling upon constituencies to elect members." },
    { title: "Nomination", description: "Candidates file their nomination papers, declaring their assets, criminal records, and educational qualifications." },
    { title: "Scrutiny", description: "The Returning Officer scrutinizes the nomination papers to ensure validity." },
    { title: "Withdrawal", description: "Candidates are given a deadline to withdraw their nominations if they choose to do so." },
    { title: "Campaigning", description: "Political parties campaign under the strict guidelines of the Model Code of Conduct (MCC)." },
    { title: "Polling Day", description: "Voters cast their votes using EVMs across designated polling booths." },
    { title: "Counting & Results", description: "EVMs are opened, votes are counted under RO supervision, and results are declared." }
];

const voterJourneySteps = [
    { title: "Eligibility Check", icon: "user-check", content: "To vote, you must be an Indian citizen, at least 18 years old on January 1st of the revision year, and a resident of the polling area." },
    { title: "Registration", icon: "file-signature", content: "Apply via Form 6 on the Voter Portal (voters.eci.gov.in) or through the Voter Helpline App. Track your status until you receive your EPIC (Voter ID)." },
    { title: "Find Polling Booth", icon: "map-pin", content: "Before election day, search your name on the electoral roll to find your part number and specific polling station." },
    { title: "Casting the Vote", icon: "vote", content: "Present your EPIC, get your finger inked, and press the blue button on the EVM against your chosen candidate. Verify the printed slip in the VVPAT window." }
];

// --- Components ---

const Header = () => (
    <header className="bg-saffron text-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center space-x-2">
                <i data-lucide="vote" className="w-8 h-8 text-white"></i>
                <h1 className="text-2xl font-bold tracking-tight">Bharat Vote Assistant</h1>
            </div>
            <div className="hidden md:flex space-x-6 text-sm font-medium">
                <a href="#journey" className="hover:text-navyBlue transition-colors">Journey</a>
                <a href="#timeline" className="hover:text-navyBlue transition-colors">Timeline</a>
                <a href="#flashcards" className="hover:text-navyBlue transition-colors">Flashcards</a>
                <a href="#quiz" className="hover:text-navyBlue transition-colors">Quiz</a>
                <a href="#chat" className="hover:text-navyBlue transition-colors">AI Chat</a>
            </div>
        </div>
    </header>
);

const Hero = () => (
    <section className="py-20 text-center px-4 relative">
        <h2 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-saffron via-indiaGreen to-navyBlue mb-6 animate-float drop-shadow-sm">
            Understand India's Democracy
        </h2>
        <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-10 font-medium">
            Your interactive guide to the world's largest democratic process. Learn the steps, test your knowledge, and ask our AI assistant anything!
        </p>
    </section>
);

const VoterJourneyWizard = () => {
    const [activeStep, setActiveStep] = useState(0);

    return (
        <section id="journey" className="max-w-4xl mx-auto px-4 py-12">
            <h3 className="text-3xl font-bold text-center mb-8 text-navyBlue">Your Voter Journey</h3>
            <div className="glass-panel rounded-3xl p-8 shadow-xl">
                <div className="flex justify-between items-center mb-10 relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-0 h-1 bg-indiaGreen -z-10 transform -translate-y-1/2 transition-all duration-500" style={{ width: `${(activeStep / (voterJourneySteps.length - 1)) * 100}%` }}></div>
                    
                    {voterJourneySteps.map((step, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                            <button 
                                onClick={() => setActiveStep(idx)}
                                className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all duration-300 ${activeStep === idx ? 'bg-indiaGreen border-green-200 text-white scale-110 shadow-lg' : activeStep < idx ? 'bg-white border-indiaGreen text-indiaGreen' : 'bg-gray-100 border-gray-300 text-gray-400'}`}
                            >
                                <i data-lucide={step.icon} className="w-5 h-5"></i>
                            </button>
                            <span className={`text-xs font-bold mt-2 ${activeStep === idx ? 'text-indiaGreen' : 'text-gray-500'} hidden md:block`}>{step.title}</span>
                        </div>
                    ))}
                </div>
                
                <div className="bg-white/60 p-8 rounded-2xl min-h-[200px] border border-gray-100 shadow-sm animate-fade-in">
                    <h4 className="text-2xl font-bold text-gray-800 mb-4">{voterJourneySteps[activeStep].title}</h4>
                    <p className="text-lg text-gray-700 leading-relaxed">{voterJourneySteps[activeStep].content}</p>
                </div>
                
                <div className="flex justify-between mt-8">
                    <button 
                        onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                        disabled={activeStep === 0}
                        className="px-6 py-2 rounded-full font-bold bg-gray-100 text-gray-600 disabled:opacity-50 hover:bg-gray-200 transition-colors"
                    >
                        Previous
                    </button>
                    <button 
                        onClick={() => setActiveStep(Math.min(voterJourneySteps.length - 1, activeStep + 1))}
                        disabled={activeStep === voterJourneySteps.length - 1}
                        className="px-6 py-2 rounded-full font-bold bg-saffron text-white disabled:opacity-50 hover:bg-orange-600 transition-colors shadow-md"
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
};

const ElectionTimeline = () => {
    return (
        <section id="timeline" className="max-w-4xl mx-auto px-4 py-12">
            <h3 className="text-3xl font-bold text-center mb-12 text-navyBlue">The Election Schedule Timeline</h3>
            <div className="relative pl-8 md:pl-0">
                <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-indigo-100 transform -translate-x-1/2"></div>
                <div className="md:hidden absolute left-4 top-0 bottom-0 w-1 bg-indigo-100"></div>
                
                {timelineSteps.map((step, idx) => (
                    <div key={idx} className={`relative flex items-center justify-between mb-8 w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        <div className="hidden md:block w-5/12"></div>
                        <div className="absolute left-[-2rem] md:left-1/2 w-6 h-6 rounded-full bg-navyBlue border-4 border-white shadow-md transform -translate-x-1/2 z-10 flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <div className="w-full md:w-5/12 bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow ml-4 md:ml-0">
                            <span className="text-xs font-extrabold text-saffron uppercase tracking-wider mb-1 block">Phase {idx + 1}</span>
                            <h4 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h4>
                            <p className="text-sm text-gray-600">{step.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

const Flashcard = ({ data, isLearned }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="relative w-full h-full cursor-pointer group mx-auto" onClick={() => setIsFlipped(!isFlipped)}>
            <div className={`w-full h-full absolute transition-transform duration-700 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
                {/* Front */}
                <div className="absolute w-full h-full bg-white rounded-2xl shadow-xl border-2 border-indigo-100 flex flex-col items-center justify-center backface-hidden p-6 text-center group-hover:shadow-2xl transition-shadow">
                    {isLearned && <div className="absolute top-4 right-4 text-indiaGreen"><i data-lucide="check-circle" className="w-6 h-6"></i></div>}
                    <h4 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-navyBlue to-indigo-600 mb-2">{data.term}</h4>
                    <p className="text-sm text-gray-400 font-medium tracking-widest uppercase mt-4">Click to flip</p>
                </div>
                {/* Back */}
                <div className="absolute w-full h-full bg-gradient-to-br from-indigo-700 to-navyBlue text-white rounded-2xl shadow-xl flex items-center justify-center backface-hidden rotate-y-180 p-8 text-center border-2 border-indigo-900">
                    <p className="text-lg font-medium leading-relaxed">{data.definition}</p>
                </div>
            </div>
        </div>
    );
};

const FlashcardsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [learned, setLearned] = useState(new Set());

    const handleNext = () => setCurrentIndex((prev) => (prev < flashcardsData.length - 1 ? prev + 1 : 0));
    const handlePrev = () => setCurrentIndex((prev) => (prev > 0 ? prev - 1 : flashcardsData.length - 1));

    const markLearned = () => {
        setLearned(prev => new Set([...prev, currentIndex]));
        handleNext();
    };

    return (
        <section id="flashcards" className="max-w-6xl mx-auto px-4 py-12 bg-white/40 rounded-3xl my-12 relative border border-white">
            <h3 className="text-3xl font-bold text-center mb-4 text-navyBlue">Electoral Vocabulary</h3>
            <p className="text-center text-gray-600 mb-8 font-medium">Progress: <span className="text-indiaGreen font-bold">{learned.size}</span> / {flashcardsData.length} terms learned</p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
                <button onClick={handlePrev} className="hidden md:flex p-3 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors z-10 text-navyBlue items-center justify-center"><i data-lucide="chevron-left" className="w-6 h-6"></i></button>
                
                <div className="relative w-80 h-56 perspective-1000">
                    {flashcardsData.map((card, idx) => {
                        if (idx !== currentIndex) return null;
                        return (
                            <div key={idx} className="absolute inset-0 animate-float">
                                <Flashcard data={card} isLearned={learned.has(idx)} />
                            </div>
                        );
                    })}
                </div>
                
                <button onClick={handleNext} className="hidden md:flex p-3 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors z-10 text-navyBlue items-center justify-center"><i data-lucide="chevron-right" className="w-6 h-6"></i></button>
            </div>
            
            <div className="flex justify-center mt-8 gap-4">
                <button onClick={markLearned} className="bg-indiaGreen text-white px-6 py-2 rounded-full font-bold hover:bg-green-700 transition-colors shadow-md flex items-center gap-2">
                    <i data-lucide="check" className="w-4 h-4"></i> Got it
                </button>
                <button onClick={handleNext} className="bg-saffron text-white px-6 py-2 rounded-full font-bold hover:bg-orange-600 transition-colors shadow-md flex items-center gap-2">
                    <i data-lucide="refresh-cw" className="w-4 h-4"></i> Review later
                </button>
            </div>
        </section>
    );
};

const QuizSection = () => {
    const [currentQ, setCurrentQ] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOpt, setSelectedOpt] = useState(null);

    const handleAnswer = (idx) => {
        if(selectedOpt !== null) return;
        setSelectedOpt(idx);
        
        if (idx === quizQuestions[currentQ].answer) {
            setScore(score + 1);
        }
    };

    const handleNext = () => {
        if (currentQ < quizQuestions.length - 1) {
            setCurrentQ(currentQ + 1);
            setSelectedOpt(null);
        } else {
            setShowResult(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQ(0);
        setScore(0);
        setShowResult(false);
        setSelectedOpt(null);
    };

    return (
        <section id="quiz" className="max-w-3xl mx-auto px-4 py-12">
            <h3 className="text-3xl font-bold text-center mb-8 text-navyBlue">Knowledge Check</h3>
            <div className="glass-panel rounded-3xl p-8 shadow-xl relative overflow-hidden border border-gray-100">
                {showResult ? (
                    <div className="text-center py-8 animate-float">
                        <i data-lucide="award" className="w-20 h-20 text-yellow-500 mx-auto mb-4"></i>
                        <h4 className="text-3xl font-bold mb-2 text-gray-800">Quiz Completed!</h4>
                        <p className="text-xl mb-6 text-gray-600">You scored <span className="font-extrabold text-2xl text-indiaGreen">{score}</span> out of {quizQuestions.length}</p>
                        <button onClick={resetQuiz} className="bg-navyBlue text-white px-8 py-3 rounded-full font-bold hover:bg-blue-800 transition-colors shadow-lg flex items-center justify-center mx-auto gap-2">
                            <i data-lucide="rotate-ccw" className="w-4 h-4"></i> Retry Quiz
                        </button>
                    </div>
                ) : (
                    <div>
                        <div className="flex justify-between text-xs text-gray-400 mb-6 font-extrabold uppercase tracking-widest">
                            <span>Question {currentQ + 1} of {quizQuestions.length}</span>
                            <span className="text-indigo-500">Score: {score}</span>
                        </div>
                        <h4 className="text-2xl font-bold mb-6 text-gray-800 leading-snug">{quizQuestions[currentQ].question}</h4>
                        <div className="space-y-3">
                            {quizQuestions[currentQ].options.map((opt, idx) => {
                                let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-300 font-semibold ";
                                if (selectedOpt === null) {
                                    btnClass += "border-gray-200 hover:border-indigo-400 hover:bg-indigo-50 bg-white text-gray-700";
                                } else {
                                    if (idx === quizQuestions[currentQ].answer) {
                                        btnClass += "border-indiaGreen bg-green-50 text-indiaGreen shadow-md";
                                    } else if (idx === selectedOpt) {
                                        btnClass += "border-red-400 bg-red-50 text-red-600";
                                    } else {
                                        btnClass += "border-gray-100 bg-gray-50 opacity-40";
                                    }
                                }

                                return (
                                    <button 
                                        key={idx} 
                                        onClick={() => handleAnswer(idx)}
                                        className={btnClass}
                                        disabled={selectedOpt !== null}
                                    >
                                        {opt}
                                    </button>
                                );
                            })}
                        </div>
                        
                        {selectedOpt !== null && (
                            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-xl animate-fade-in">
                                <h5 className="font-bold text-blue-800 flex items-center gap-2 mb-1">
                                    <i data-lucide="info" className="w-4 h-4"></i> Explanation
                                </h5>
                                <p className="text-sm text-blue-900">{quizQuestions[currentQ].explanation}</p>
                                <div className="mt-4 flex justify-end">
                                    <button onClick={handleNext} className="bg-blue-600 text-white px-6 py-2 rounded-full font-bold hover:bg-blue-700 transition-colors shadow-sm">
                                        {currentQ < quizQuestions.length - 1 ? 'Next Question' : 'View Results'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </section>
    );
};

const ChatAssistant = () => {
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'Namaste! I am the Election Sahayak AI. Ask me to explain the election process, what happens on polling day, or any terms like MCC or VVPAT.' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const suggestedQuestions = [
        "Explain the complete election process",
        "What is the Model Code of Conduct?",
        "How do I register to vote?",
        "How does EVM and VVPAT work?"
    ];

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (textToSend) => {
        if (!textToSend.trim() || isLoading) return;

        const userMsg = { role: 'user', text: textToSend };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMsg] })
            });
            const data = await response.json();
            
            if (data.reply) {
                setMessages(prev => [...prev, { role: 'assistant', text: data.reply }]);
            } else {
                setMessages(prev => [...prev, { role: 'assistant', text: "I'm sorry, I encountered an error. Please ensure the backend is running with a valid API key." }]);
            }
        } catch (error) {
            // Fallback for demo when backend is not running
            let fallbackReply = "I am operating in offline demo mode. ";
            const lowerInput = textToSend.toLowerCase();
            if (lowerInput.includes('process') || lowerInput.includes('step')) {
                fallbackReply += "The election process includes: Notification, Nomination, Scrutiny, Withdrawal, Campaigning (MCC), Polling, and Counting.";
            } else if (lowerInput.includes('mcc') || lowerInput.includes('model code')) {
                fallbackReply += "The Model Code of Conduct (MCC) is a set of guidelines issued by the ECI to regulate political parties and candidates prior to elections.";
            } else if (lowerInput.includes('register') || lowerInput.includes('form 6')) {
                fallbackReply += "To register, fill out Form 6 online via the Voter Portal or offline. You must be an Indian citizen and 18+ years old.";
            } else if (lowerInput.includes('evm') || lowerInput.includes('vvpat')) {
                fallbackReply += "EVMs record votes electronically. VVPAT provides a paper slip for 7 seconds so you can verify your vote was recorded correctly.";
            } else {
                fallbackReply += "Please ask me about the election process, EVMs, VVPAT, registration, or the Model Code of Conduct!";
            }
            setMessages(prev => [...prev, { role: 'assistant', text: fallbackReply }]);
        } finally {
            setIsLoading(false);
            setTimeout(() => {
                if (window.lucide) window.lucide.createIcons();
            }, 100);
        }
    };

    return (
        <section id="chat" className="max-w-4xl mx-auto px-4 py-12 mb-20">
            <h3 className="text-3xl font-bold text-center mb-8 text-navyBlue">Election Sahayak AI</h3>
            <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[600px] border border-white">
                
                <div className="bg-gradient-to-r from-navyBlue to-indigo-800 p-4 text-white flex items-center shadow-md z-10">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center mr-3 relative shadow-inner">
                        <i data-lucide="bot" className="text-navyBlue w-6 h-6"></i>
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></span>
                    </div>
                    <div>
                        <h4 className="font-bold text-lg tracking-wide">Election Sahayak AI</h4>
                        <p className="text-xs text-indigo-200 font-medium">Powered by Gemini AI</p>
                    </div>
                </div>

                <div className="flex-1 p-6 overflow-y-auto bg-gray-50/50 custom-scrollbar space-y-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${msg.role === 'user' ? 'bg-indigo-600 text-white rounded-br-sm' : 'bg-white text-gray-800 rounded-bl-sm border border-gray-100'}`}>
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start">
                            <div className="bg-white text-gray-800 p-4 rounded-2xl rounded-bl-sm shadow-sm border border-gray-100 flex gap-2 items-center">
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                
                {/* Suggested Questions */}
                {messages.length === 1 && !isLoading && (
                    <div className="px-4 py-3 bg-indigo-50/50 border-t border-indigo-100 flex gap-2 overflow-x-auto custom-scrollbar whitespace-nowrap">
                        {suggestedQuestions.map((sq, i) => (
                            <button 
                                key={i} 
                                onClick={() => handleSend(sq)}
                                className="text-xs font-semibold bg-white text-indigo-700 border border-indigo-200 px-3 py-1.5 rounded-full hover:bg-indigo-600 hover:text-white transition-colors"
                            >
                                {sq}
                            </button>
                        ))}
                    </div>
                )}

                <div className="p-4 bg-white border-t border-gray-200">
                    <form onSubmit={(e) => { e.preventDefault(); handleSend(input); }} className="flex gap-2">
                        <input 
                            type="text" 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your question about elections..."
                            className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all text-sm"
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading} className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors shadow-md flex items-center justify-center disabled:opacity-50">
                            <span className="hidden sm:inline mr-2 font-semibold">Ask</span>
                            <i data-lucide="send" className="w-4 h-4"></i>
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

const Footer = () => (
    <footer className="bg-gray-900 text-gray-400 py-8 text-center mt-12">
        <p>© 2026 Bharat Vote Assistant. Educational purposes only.</p>
        <p className="text-xs mt-2">Empowering citizens through knowledge. Build with React and Tailwind CSS.</p>
    </footer>
);

const App = () => {
    useEffect(() => {
        // Re-initialize icons whenever component renders
        setTimeout(() => {
            if (window.lucide) {
                window.lucide.createIcons();
            }
        }, 100);
    });

    return (
        <div className="min-h-screen relative overflow-x-hidden">
            {/* Decorative background blobs */}
            <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-saffron rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float pointer-events-none"></div>
            <div className="absolute top-[20%] right-[-10%] w-96 h-96 bg-indiaGreen rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float pointer-events-none" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-navyBlue rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float pointer-events-none" style={{animationDelay: '4s'}}></div>

            <div className="relative z-10">
                <Header />
                <Hero />
                <VoterJourneyWizard />
                <ElectionTimeline />
                <FlashcardsSection />
                <QuizSection />
                <ChatAssistant />
                <Footer />
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
