export default function CouponPreview({

    offer,

}) {

    return (

        <div className="border-2 border-dashed rounded-xl p-8 bg-yellow-50">

            <h2 className="text-2xl font-bold">

                {offer.title}

            </h2>

            <p className="mt-2">

                {offer.description}

            </p>

            <div className="mt-5">

                <span className="text-4xl font-bold text-red-600">

                    {offer.discountValue}

                    {

                        offer.type === "PERCENTAGE"

                        ? "%"

                        : " ₹"

                    }

                </span>

            </div>

            <div className="mt-5">

                Coupon

            </div>

            <div className="mt-2 bg-black text-white inline-block px-5 py-3 rounded-lg tracking-widest">

                {offer.code}

            </div>

        </div>

    );

}
