export default function PayoutTable({

    payouts=[]

}){

    return(

        <section className="mt-8 rounded-2xl bg-white shadow">

            <table className="w-full">

                <thead>

                    <tr>

                        <th>Shop</th>

                        <th>Amount</th>

                        <th>Status</th>

                        <th>Date</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        payouts.map(payout=>(

                            <tr key={payout._id}>

                                <td>{payout.shopName}</td>

                                <td>₹{payout.amount}</td>

                                <td>{payout.status}</td>

                                <td>{payout.createdAt}</td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </section>

    )

}
