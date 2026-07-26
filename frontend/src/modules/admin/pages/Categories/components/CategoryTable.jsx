import CategoryActions from "./CategoryActions";

export default function CategoryTable({

    categories=[]

}){

    return(

        <div className="mt-8 rounded-2xl bg-white shadow">

            <table className="w-full">

                <thead>

                    <tr>

                        <th>Name</th>

                        <th>Slug</th>

                        <th>Parent</th>

                        <th>Status</th>

                        <th>Actions</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        categories.map(category=>(

                            <tr key={category._id}>

                                <td>{category.name}</td>

                                <td>{category.slug}</td>

                                <td>{category.parentName || "-"}</td>

                                <td>

                                    {category.active ? "Active" : "Hidden"}

                                </td>

                                <td>

                                    <CategoryActions
                                        category={category}
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
