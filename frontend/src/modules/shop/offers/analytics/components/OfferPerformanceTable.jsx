export default function OfferPerformanceTable({

    offers,

}) {

    return (

        <table className="w-full bg-white rounded-xl">

            <thead>

                <tr>

                    <th>Offer</th>

                    <th>Coupon</th>

                    <th>Used</th>

                    <th>Revenue</th>

                    <th>Status</th>

                </tr>

            </thead>

            <tbody>

                {

                    offers.map(offer => (

                        <tr key={offer._id}>

                            <td>{offer.title}</td>

                            <td>{offer.code}</td>

                            <td>{offer.usedCount}</td>

                            <td>₹{offer.revenue}</td>

                            <td>

                                {

                                    offer.active

                                    ? "Active"

                                    : "Inactive"

                                }

                            </td>

                        </tr>

                    ))

                }

            </tbody>

        </table>

    );

}
