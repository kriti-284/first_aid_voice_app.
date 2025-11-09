import React, { useState } from "react";

// Accept the onStartCall, theme, and toggleTheme props
export default function Home({ onStartCall, theme, toggleTheme }) {
    const [text, setText] = useState("");
    const [response, setResponse] = useState("");
    const [listening, setListening] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Define colors based on the current theme
    const themeColors = {
        dark: {
            cardBg: '#2d3748',
            textColor: '#f3f4f6',
            titleColor: '#6ee7b7',
            inputBg: 'white',
            inputTextColor: '#1f2937',
            outputBg: '#1f2937',
            outputTitleColor: '#a7f3d0',
        },
        light: {
            cardBg: '#ffffff',
            textColor: '#1f2937',
            titleColor: '#10b981',
            inputBg: '#f3f4f6',
            inputTextColor: '#1f2937',
            outputBg: '#f9fafb',
            outputTitleColor: '#059669',
        }
    };
    const colors = themeColors[theme];

    const startListening = () => {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = "en-IN";
        recognition.start();
        setListening(true);

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            setText(transcript);
            fetchInstructions(transcript);
        };

        recognition.onend = () => setListening(false);
    };

    const speakText = (text) => {
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "en-IN";
        speech.rate = 0.9;
        window.speechSynthesis.speak(speech);
    };

    // Updated fetchInstructions to handle ML model's JSON structure
    const fetchInstructions = async (input) => {
        if (!input.trim()) return;
        setResponse("Fetching instructions...");
        setIsLoading(true);

        const apiUrl = "https://first-aid-voice-app-o7qw.onrender.com/predict";

        try {
            const res = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                // Use the new input key "symptom"
                body: JSON.stringify({ symptom: input }),
            });

            const data = await res.json();

            // 1. Check for the new key "first_aid_steps"
            if (data.first_aid_steps && data.first_aid_steps.length > 0) {

                // 2. Extract the single string containing all instructions
                const instructionString = data.first_aid_steps[0];

                // 3. Split the single string into separate steps using ". " (period and space)
                const stepsArray = instructionString
                    .split(/\.\s*/)
                    .filter(step => step.trim() !== '');

                const stepsText = stepsArray.join("\n");

                setResponse(stepsText);
                speakText(stepsText); // Instructions are spoken out loud
            } else {
                setResponse("No instructions found. Please try again with a clear description.");
                speakText("No instructions found. Please try again.");
            }
        } catch (err) {
            console.error(err);
            setResponse("Error fetching instructions. Please check your connection or try again later.");
            speakText("Error fetching instructions. Try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchInstructions(text);
    };

    return (
        <div
            className="w-full max-w-3xl mx-auto text-center p-6"
            style={{
                backgroundColor: colors.cardBg,
                borderRadius: '16px',
                boxShadow: '0 10px 20px rgba(0,0,0,0.5)',
                maxWidth: '90%',
                padding: '40px',
                color: colors.textColor,
                position: 'relative',
            }}
        >
            {/* Theme Toggle Switch */}
            <div
                style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    cursor: 'pointer',
                    userSelect: 'none',
                    color: colors.textColor,
                }}
                onClick={toggleTheme}
            >
                <span style={{ marginRight: '8px' }}>{theme === 'dark' ? '🌙' : '☀️'}</span>
                <div
                    style={{
                        width: '45px',
                        height: '24px',
                        backgroundColor: theme === 'dark' ? '#4b5563' : '#a7f3d0',
                        borderRadius: '12px',
                        position: 'relative',
                        transition: 'background-color 0.3s',
                    }}
                >
                    <div
                        style={{
                            position: 'absolute',
                            top: '2px',
                            left: theme === 'dark' ? '2px' : '22px',
                            width: '20px',
                            height: '20px',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            transition: 'left 0.3s, background-color 0.3s',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
                        }}
                    />
                </div>
            </div>

            <h2
                className="text-xl font-semibold text-green-300 mb-4"
                style={{
                    fontSize: '2rem',
                    color: colors.titleColor,
                    fontWeight: 800,
                    marginBottom: '30px',
                    marginTop: '20px',
                }}
            >
                🩺 First Aid Voice Assistant 🗣️
            </h2>

            {/* Emergency Call Button */}
            <button
                type="button"
                onClick={onStartCall}
                style={{
                    backgroundColor: '#ef4444',
                    color: 'white',
                    padding: '12px 25px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    marginBottom: '30px',
                    border: 'none',
                    boxShadow: '0 4px 6px rgba(0,0,0,0.3)',
                    transition: 'background-color 0.3s',
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#ef4444'}
            >
                🚨 Call Emergency Services
            </button>

            <form onSubmit={handleSubmit} className="flex justify-center items-center gap-3 mb-6">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or say your emergency..."
                    style={{
                        width: '75%',
                        padding: '15px',
                        fontSize: '1rem',
                        color: colors.inputTextColor,
                        backgroundColor: colors.inputBg,
                        borderRadius: '8px',
                        border: `2px solid ${colors.titleColor}`,
                        outline: 'none',
                        transition: 'border-color 0.3s',
                    }}
                    className="w-3/4 p-3 text-black rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                />
                <button
                    type="button"
                    onClick={startListening}
                    style={{
                        padding: '15px',
                        borderRadius: '50%',
                        backgroundColor: listening ? '#f97316' : colors.titleColor,
                        color: 'white',
                        fontSize: '1.5rem',
                        fontWeight: 'semibold',
                        cursor: 'pointer',
                        transition: 'transform 0.2s, background-color 0.3s',
                        border: 'none',
                    }}
                    title="Speak your emergency"
                >
                    🎤
                </button>
            </form>

            <p
                className="text-gray-300 mb-6 text-sm"
                style={{
                    color: theme === 'dark' ? '#9ca3af' : '#4b5563',
                    marginBottom: '25px',
                    fontSize: '0.9rem',
                }}
            >
                💡 Tip: You can either <strong>type</strong> your emergency or <strong>press the mic</strong> to speak.
            </p>

            <div
                className="bg-gray-800 text-left rounded-lg p-5 shadow-lg"
                style={{
                    backgroundColor: colors.outputBg,
                    color: colors.textColor,
                    textAlign: 'left',
                    borderRadius: '12px',
                    padding: '25px',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)',
                    minHeight: '150px',
                    position: 'relative',
                }}
            >
                <h3
                    className="text-lg font-bold text-green-400 mb-2"
                    style={{
                        color: colors.outputTitleColor,
                        fontSize: '1.25rem',
                        borderBottom: `1px solid ${theme === 'dark' ? '#374151' : '#d1d5db'}`,
                        paddingBottom: '10px',
                        marginBottom: '15px',
                    }}
                >
                    🩹 First Aid Instructions:
                </h3>

                {isLoading ? (
                    <div
                        style={{
                            textAlign: 'center',
                            padding: '20px',
                            color: colors.titleColor,
                            fontSize: '1.1rem',
                        }}
                    >
                        Fetching instructions... ⏳
                    </div>
                ) : (
                    <pre
                        className="whitespace-pre-wrap text-gray-200 leading-relaxed"
                        style={{
                            whiteSpace: 'pre-wrap',
                            color: colors.textColor,
                            lineHeight: 1.8,
                            fontSize: '1rem',
                        }}
                    >
                        {response || "Start by describing the emergency."}
                    </pre>
                )}
            </div>
        </div>
    );
}
