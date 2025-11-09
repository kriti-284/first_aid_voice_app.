import React, { useEffect } from "react";

function ResultsDisplay({ result }) {
    useEffect(() => {
        if (result) {
            const utterance = new SpeechSynthesisUtterance(result);
            window.speechSynthesis.speak(utterance);
        }
    }, [result]); // runs whenever "result" changes

    return (
        <div
            style={{
                marginTop: "1.5rem",
                backgroundColor: "white",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                borderRadius: "0.5rem",
                padding: "1rem",
                maxWidth: "28rem",
            }}
        >
            <h2
                style={{
                    fontWeight: "bold",
                    fontSize: "1.125rem",
                    marginBottom: "0.5rem",
                }}
            >
                Steps:
            </h2>
            <p>{result || "No instructions found. Try another condition."}</p>
        </div>
    );
}

export default ResultsDisplay;
