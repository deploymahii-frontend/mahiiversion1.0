import Button from "@/components/ui/Button";

export default function ExportButtons({

    onCSV,

    onPDF

}){

    return(

        <div className="my-6 flex gap-3">

            <Button

                onClick={onCSV}

            >

                Export CSV

            </Button>

            <Button

                onClick={onPDF}

                variant="outline"

            >

                Export PDF

            </Button>

        </div>

    )

}
