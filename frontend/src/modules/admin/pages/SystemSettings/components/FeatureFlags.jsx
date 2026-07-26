const features = [

    "Customer App",

    "Shop Dashboard",

    "Delivery Partner",

    "Mahii Moments",

    "Offers",

    "Analytics"

];

export default function FeatureFlags() {

    return (

        <section className="mt-8 rounded-2xl bg-white p-6 shadow">

            <h2 className="mb-6 text-xl font-bold">

                Feature Flags

            </h2>

            {

                features.map(feature => (

                    <label
                        key={feature}
                        className="mb-4 flex items-center justify-between"
                    >

                        <span>{feature}</span>

                        <input type="checkbox" />

                    </label>

                ))

            }

        </section>

    );

}
