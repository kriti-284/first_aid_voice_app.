function Navbar() {
    return (
        <nav
            style={{
                backgroundColor: "#15803d", // Tailwind bg-green-700
                color: "white",
                padding: "0.75rem 1.5rem", // py-3 px-6
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)", // shadow-md
            }}
        >
            <h1
                style={{
                    fontSize: "1.5rem", // text-2xl
                    fontWeight: "bold",
                }}
            >
                🩺 First Aid Assistant
            </h1>
        </nav>
    );
}

export default Navbar;
