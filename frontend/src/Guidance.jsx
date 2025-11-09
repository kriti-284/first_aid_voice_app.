import React, { useEffect } from 'react';

const Guidance = ({ steps }) => {
    useEffect(() => {
        if (steps && steps.length > 0) {
            const utterance = new SpeechSynthesisUtterance(
                `Attention, here are the first aid steps. ${steps.join('. ')}`
            );
            utterance.rate = 0.9;
            speechSynthesis.cancel();
            speechSynthesis.speak(utterance);
        }
    }, [steps]);

    return (
        <div
            style={{
                width: '90%',
                margin: '20px auto',
                backgroundColor: '#f9fafb',
                borderRadius: '16px',
                padding: '30px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                borderLeft: '5px solid #10b981',
            }}
        >
            <h3 style={{ color: '#111827', marginBottom: '15px', fontSize: '1.5rem', fontWeight: 'bold' }}>
                🩹 Steps to Follow:
            </h3>
            {steps && steps.length > 0 ? (
                <ol style={{ color: '#374151', lineHeight: 1.8, paddingLeft: '25px', listStyleType: 'decimal' }}>
                    {steps.map((s, i) => (
                        <li
                            key={i}
                            style={{
                                marginBottom: '12px',
                                paddingLeft: '10px',
                                borderLeft: '3px solid #d1d5db',
                            }}
                        >
                            <strong style={{ color: '#10b981' }}>Step {i + 1}:</strong> {s}
                        </li>
                    ))}
                </ol>
            ) : (
                <p style={{ color: '#6b7280', fontStyle: 'italic' }}>
                    Waiting for your emergency description...
                </p>
            )}
        </div>
    );
};

export default Guidance;
