import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer
} from "recharts";

export default function RevenueChart({

    revenue=[]

}){

    return(

        <section className="mt-8 rounded-2xl bg-white p-6 shadow">

            <h2 className="mb-6 text-xl font-bold">

                Revenue Trend

            </h2>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <LineChart data={revenue}>

                    <XAxis dataKey="day"/>

                    <YAxis/>

                    <Tooltip/>

                    <Line
                        dataKey="amount"
                    />

                </LineChart>

            </ResponsiveContainer>

        </section>

    )

}
