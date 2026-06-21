function Messages() {
    const clients = [
        "Ali",
        "Ahmed",
        "Sara",
        "Hassan",
    ];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                Messages
            </h1>

            {clients.map((client, index) => (
                <div
                    key={index}
                    className="bg-white p-4 rounded shadow mb-3"
                >
                    {client}
                </div>
            ))}
        </div>
    );
}

export default Messages;