export default function AuditTable({

    logs=[]

}){

    return(

        <div className="rounded-2xl bg-white shadow">

            <table className="w-full">

                <thead>

                    <tr>

                        <th>User</th>

                        <th>Action</th>

                        <th>Resource</th>

                        <th>IP</th>

                        <th>Time</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        logs.map(log=>(

                            <tr key={log._id}>

                                <td>{log.user}</td>

                                <td>{log.action}</td>

                                <td>{log.resource}</td>

                                <td>{log.ip}</td>

                                <td>{log.createdAt}</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    )

}
