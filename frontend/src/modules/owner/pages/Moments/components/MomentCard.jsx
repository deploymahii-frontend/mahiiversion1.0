import Button from "@/components/ui/Button";

export default function MomentCard({

    moment,

    onDelete

}){

    return(

        <div className="rounded-2xl bg-white shadow overflow-hidden">

            <img

                src={moment.thumbnail}

                alt={moment.title}

                className="h-64 w-full object-cover"

            />

            <div className="p-4">

                <h3 className="font-bold">

                    {moment.title}

                </h3>

                <p className="mt-2 text-sm text-gray-500">

                    {moment.caption}

                </p>

                <Button

                    className="mt-4"

                    variant="destructive"

                    onClick={()=>onDelete(moment)}

                >

                    Delete

                </Button>

            </div>

        </div>

    )

}
