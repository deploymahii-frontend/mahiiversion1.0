import Button from "@/components/ui/Button";

export default function CategoryActions({

    category,

    onEdit,

    onDelete,

}){

    return(

        <div className="flex gap-2">

            <Button

                size="sm"

                onClick={()=>onEdit(category)}

            >

                Edit

            </Button>

            <Button

                size="sm"

                variant="destructive"

                onClick={()=>onDelete(category)}

            >

                Delete

            </Button>

        </div>

    )

}
