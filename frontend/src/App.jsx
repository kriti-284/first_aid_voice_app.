import React, { useState } from "react";
import Navbar from "./components/Navbar";
import VoiceInput from "./components/VoiceInput";
import ResultsDisplay from "./components/ResultsDisplay";
import Footer from "./components/Footer";
import firstAidData from "./dummyDatatemp";

function App() {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState("");

    const handleSearch = () => {
        const lowerQuery = query.toLowerCase();
        if (firstAidData[lowerQuery]) {
            setResult(firstAidData[lowerQuery]);
        } else {
            setResult("No instructions found for this condition.");
        }
    };

    return (
        <div
            style={{
                minHeight: "100vh", // min-h-screen
                backgroundColor: "#d1fae5", // bg-green-100
                display: "flex", // flex
                flexDirection: "column", // flex-col
                alignItems: "center", // items-center
            }}
        >
            <Navbar />
            <VoiceInput query={query} setQuery={setQuery} handleSearch={handleSearch} />
            <ResultsDisplay result={result} />
            <Footer />
        </div>
    );
}

export default App;
