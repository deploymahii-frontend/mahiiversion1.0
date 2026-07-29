import UserActions from "./UserActions";

export default function UsersTable({

    users=[]

}){

    return(

        <div className="mt-8 rounded-2xl bg-white shadow">

            <table className="w-full">

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Role</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        users.map(user=>(

                            <tr key={user._id}>

                                <td>{user.name}</td>

                                <td>{user.email}</td>

                                <td>{user.role}</td>

                                <td>{user.status}</td>

                                <td>

                                    <UserActions
                                        user={user}
                                    />

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    )

}
