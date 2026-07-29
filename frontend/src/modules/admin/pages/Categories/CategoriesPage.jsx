import CategoryTable from "./components/CategoryTable";
import CategoryToolbar from "./components/CategoryToolbar";
import CategoryForm from "./components/CategoryForm";

import { useCategories } from "./hooks/useCategories";

export default function CategoriesPage() {

    const {

        categories,

        loading

    } = useCategories();

    if (loading) return <div>Loading...</div>;

    return (

        <main className="min-h-screen bg-gray-100 p-6">

            <CategoryToolbar />

            <CategoryTable
                categories={categories}
            />

            <CategoryForm />

        </main>

    );

}
