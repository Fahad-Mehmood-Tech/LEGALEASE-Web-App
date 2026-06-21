function Contact() {
    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
                <h1 className="text-4xl font-bold text-blue-600 mb-6">
                    Contact Us
                </h1>

                <form className="space-y-4">
                    <input
                        type="text"
                        placeholder="Your Name"
                        className="w-full border p-3 rounded"
                    />

                    <input
                        type="email"
                        placeholder="Your Email"
                        className="w-full border p-3 rounded"
                    />

                    <textarea
                        rows="5"
                        placeholder="Your Message"
                        className="w-full border p-3 rounded"
                    ></textarea>

                    <button
                        className="bg-blue-600 text-white px-6 py-3 rounded"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Contact;