import Button from "@/components/ui/Button";

export default function UploadMomentForm({

    onSubmit

}){

    return(

        <form
            onSubmit={onSubmit}
            className="rounded-2xl bg-white p-6 shadow space-y-4"
        >

            <input
                placeholder="Title"
            />

            <textarea
                placeholder="What's happening today?"
            />

            <input
                type="file"
                accept="image/*,video/*"
                multiple
            />

            <Button>

                Publish Moment

            </Button>

        </form>

    )

}
