import Button from "@/components/ui/Button";

export default function PayoutRequests({

    requests=[],

    onApprove,

    onReject

}){

    return(

        <section className="mt-8 rounded-2xl bg-white p-6 shadow">

            <h2 className="mb-6 text-xl font-bold">

                Pending Requests

            </h2>

            {

                requests.map(request=>(

                    <div

                        key={request._id}

                        className="mb-5 flex items-center justify-between"

                    >

                        <div>

                            <h3>{request.shopName}</h3>

                            <p>₹{request.amount}</p>

                        </div>

                        <div className="flex gap-2">

                            <Button

                                onClick={()=>onApprove(request)}

                            >

                                Approve

                            </Button>

                            <Button

                                variant="destructive"

                                onClick={()=>onReject(request)}

                            >

                                Reject

                            </Button>

                        </div>

                    </div>

                ))

            }

        </section>

    )

}
