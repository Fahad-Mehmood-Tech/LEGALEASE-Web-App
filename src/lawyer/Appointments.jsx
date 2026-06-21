function Appointments() {
    const appointments = [
        {
            id: 1,
            client: "Ali",
            date: "20 June 2026",
            status: "Pending",
        },
        {
            id: 2,
            client: "Ahmed",
            date: "22 June 2026",
            status: "Approved",
        },
    ];

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">
                Appointments
            </h1>

            {appointments.map((appointment) => (
                <div
                    key={appointment.id}
                    className="bg-white p-4 rounded shadow mb-4"
                >
                    <h2 className="font-semibold">
                        Client: {appointment.client}
                    </h2>

                    <p>Date: {appointment.date}</p>

                    <p>Status: {appointment.status}</p>

                    <div className="mt-3">
                        <button className="bg-green-500 text-white px-4 py-2 rounded mr-2">
                            Accept
                        </button>

                        <button className="bg-red-500 text-white px-4 py-2 rounded">
                            Reject
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default Appointments;