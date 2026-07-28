export default function ActiveSessionsTable({

    sessions,

}) {

    return (

        <div className="bg-white rounded-xl overflow-hidden">

            <h2 className="font-bold text-xl p-5">

                Active Sessions

            </h2>

            <table className="w-full">

                <thead>

                    <tr>

                        <th>Device</th>

                        <th>IP Address</th>

                        <th>Location</th>

                        <th>Last Active</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        sessions.map(session => (

                            <tr key={session._id}>

                                <td>{session.device}</td>

                                <td>{session.ip}</td>

                                <td>{session.location}</td>

                                <td>{session.lastActive}</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}
