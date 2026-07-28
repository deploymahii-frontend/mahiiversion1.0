export default function OfferStatusBadge({

    active,

}) {

    if (active)

        return (

            <span className="px-3 py-1 rounded bg-green-100 text-green-700">

                Active

            </span>

        );

    return (

        <span className="px-3 py-1 rounded bg-red-100 text-red-700">

            Inactive

        </span>

    );

}
