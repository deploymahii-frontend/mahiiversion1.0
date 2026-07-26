import Button from "@/components/ui/Button";

export default function GoldMembershipBanner() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="rounded-3xl bg-gradient-to-r from-yellow-500 to-orange-500 p-10">
        <h2 className="text-4xl font-bold text-white">Mahii Gold</h2>
        <p className="mt-4 text-yellow-50">Premium discounts. Exclusive offers. Priority support.</p>
        <Button className="mt-6 bg-white text-yellow-600">Join Gold</Button>
      </div>
    </section>
  );
}
