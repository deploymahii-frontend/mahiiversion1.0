import {

    Users,

    Store,

    ShoppingCart,

    DollarSign

} from "lucide-react";

export default function AdminStats({

    stats

}){

    const cards=[

        {

            title:"Users",

            value:stats.users,

            icon:Users

        },

        {

            title:"Shops",

            value:stats.shops,

            icon:Store

        },

        {

            title:"Orders",

            value:stats.orders,

            icon:ShoppingCart

        },

        {

            title:"Revenue",

            value:`₹${stats.revenue}`,

            icon:DollarSign

        }

    ];

    return(

        <div className="grid gap-6 md:grid-cols-4">

            {

                cards.map(card=>{

                    const Icon=card.icon;

                    return(

                        <div
                            key={card.title}
                            className="rounded-2xl bg-white p-6 shadow"
                        >

                            <Icon className="mb-4 text-blue-600"/>

                            <h3>{card.title}</h3>

                            <p className="mt-2 text-3xl font-bold">

                                {card.value}

                            </p>

                        </div>

                    )

                })

            }

        </div>

    )

}
