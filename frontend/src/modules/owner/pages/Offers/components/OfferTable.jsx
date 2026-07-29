import OfferActions from "./OfferActions";

export default function OfferTable({

  offers = [],

}) {

  return (

    <div className="mt-8 rounded-2xl bg-white shadow">

      <table className="w-full">

        <thead>

          <tr>

            <th>Title</th>
            <th>Type</th>
            <th>Value</th>
            <th>Status</th>
            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {offers.map((offer) => (

            <tr key={offer._id}>

              <td>{offer.title}</td>

              <td>{offer.type}</td>

              <td>{offer.value}</td>

              <td>{offer.active ? "Active" : "Inactive"}</td>

              <td>

                <OfferActions offer={offer} />

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}
