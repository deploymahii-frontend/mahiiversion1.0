export default function HealthStatus() {

    return (

        <section className="mt-8 rounded-2xl bg-white p-6 shadow">

            <h2 className="mb-6 text-xl font-bold">

                Platform Health

            </h2>

            <ul className="space-y-3">

                <li>Database : Healthy</li>

                <li>API : Healthy</li>

                <li>Storage : Healthy</li>

                <li>Payment Gateway : Healthy</li>

                <li>Email Service : Healthy</li>

            </ul>

        </section>

    );

}
