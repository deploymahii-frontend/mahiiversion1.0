import Button from "@/components/ui/Button";

export default function CategoryForm({

    onSubmit

}){

    return(

        <form
            onSubmit={onSubmit}
            className="space-y-4 rounded-2xl bg-white p-6 shadow"
        >

            <input
                placeholder="Category Name"
            />

            <input
                placeholder="Slug"
            />

            <select>

                <option>

                    Parent Category

                </option>

            </select>

            <input
                type="file"
                accept="image/*"
            />

            <Button>

                Save Category

            </Button>

        </form>

    )

}
