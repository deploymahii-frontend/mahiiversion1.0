import Button from "@/components/ui/Button";

export default function PendingApprovals({

    shops=[]

}){

    return(

        <section className="mt-8 rounded-2xl bg-white p-6 shadow">

            <h2 className="mb-6 text-xl font-bold">

                Pending Shop Approvals

            </h2>

            {

                shops.map(shop=>(

                    <div

                        key={shop._id}

                        className="mb-5 flex items-center justify-between"

                    >

                        <div>

                            <h3 className="font-bold">

                                {shop.name}

                            </h3>

                            <p>

                                {shop.owner}

                            </p>

                        </div>

                        <div className="flex gap-2">

                            <Button>

                                Approve

                            </Button>

                            <Button variant="destructive">

                                Reject

                            </Button>

                        </div>

                    </div>

                ))

            }

        </section>

    )

}
