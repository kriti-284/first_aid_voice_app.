function VoiceInput({ query, setQuery, handleSearch }) {
    const handleVoiceInput = () => {
        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            alert("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.continuous = false; // stop after speaking
        recognition.interimResults = true; // show live results

        recognition.start();

        recognition.onresult = (event) => {
            let transcript = "";
            for (let i = 0; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            setQuery(transcript);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };
    };

    return (
        <div
            style={{
                display: "flex",
                gap: "0.5rem",
                marginTop: "1.5rem",
            }}
        >
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type or speak a condition (e.g., burn, cut)"
                style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    border: "1px solid #ccc",
                    width: "18rem",
                }}
            />
            <button
                onClick={handleSearch}
                style={{
                    backgroundColor: "#16a34a",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Search
            </button>
            <button
                onClick={handleVoiceInput}
                style={{
                    backgroundColor: "#3b82f6",
                    color: "white",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.5rem",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                🎤 Speak
            </button>
        </div>
    );
}

export default VoiceInput;
