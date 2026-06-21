function About() {
    return (
        <div className="min-h-screen p-8 bg-gray-100">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
                <h1 className="text-4xl font-bold text-blue-600 mb-6">
                    About LegalEase
                </h1>

                <p className="mb-4 text-gray-700">
                    LegalEase is an online platform that helps clients connect
                    with professional lawyers easily.
                </p>

                <p className="mb-4 text-gray-700">
                    Clients can search lawyers, view profiles, book appointments
                    and communicate with lawyers through the platform.
                </p>

                <h2 className="text-2xl font-semibold mt-6 mb-3">
                    Our Mission
                </h2>

                <p className="text-gray-700">
                    To make legal services accessible, simple and convenient
                    for everyone.
                </p>
            </div>
        </div>
    );
}

export default About;