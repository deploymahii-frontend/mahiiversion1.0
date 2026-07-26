export default function ProfileCard({ partner }) {
    return (
        <section className="rounded-xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">{partner?.name || "Partner Name"}</h2>
            <p>{partner?.phone || "Phone number"}</p>
            <p>{partner?.email || "Email address"}</p>
        </section>
    );
}
