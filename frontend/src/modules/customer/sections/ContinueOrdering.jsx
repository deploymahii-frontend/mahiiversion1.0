import SectionHeader from "../components/SectionHeader";

export default function ContinueOrdering() {
    return (
        <section>
            <SectionHeader
                title="Continue Ordering"
                subtitle="Your frequently ordered shops"
            />
            <div className="mt-5 flex gap-5 overflow-x-auto">
                {[1, 2, 3].map((item) => (
                    <div
                        key={item}
                        className="min-w-[240px] bg-white rounded-3xl shadow-sm p-4"
                    >
                        <img
                            src="https://picsum.photos/300/180"
                            className="rounded-2xl h-40 w-full object-cover"
                            alt="Shop"
                        />
                        <h3 className="font-bold mt-4">Shree Mess</h3>
                        <p className="text-gray-500">⭐4.8 • 18 min</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
