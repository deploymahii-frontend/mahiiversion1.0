import { Link } from "react-router-dom";
import BusinessCard from "@/modules/customer/pages/Explore/components/cards/BusinessCard";

export default function RelatedBusinesses({ businesses = [] }) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Similar Businesses</h2>
        <Link to="/explore" className="font-medium text-blue-600">View All</Link>
      </div>
      <div className="grid gap-6 md:grid-cols-4">
        {businesses.map((business) => (
          <BusinessCard key={business._id} business={business} />
        ))}
      </div>
    </section>
  );
}
