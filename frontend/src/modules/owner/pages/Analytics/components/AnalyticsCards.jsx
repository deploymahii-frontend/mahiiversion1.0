const cards = [

    "Revenue",

    "Orders",

    "Customers",

    "Products"

];

export default function AnalyticsCards({

    analytics

}){

    return(

        <div className="grid gap-6 md:grid-cols-4">

            {

                cards.map(card=>(

                    <div

                        key={card}

                        className="rounded-2xl bg-white p-6 shadow"

                    >

                        <h3 className="text-gray-500">

                            {card}

                        </h3>

                        <p className="mt-3 text-3xl font-bold">

                            {

                                analytics[card.toLowerCase()]

                            }

                        </p>

                    </div>

                ))

            }

        </div>

    )

}
