import useMembership from "../hooks/useMembership";
import GoldHero from "../components/GoldHero";
import CurrentPlanCard from "../components/CurrentPlanCard";
import BenefitsGrid from "../components/BenefitsGrid";
import PlanCard from "../components/PlanCard";
import SavingsCard from "../components/SavingsCard";
import FAQAccordion from "../components/FAQAccordion";

export default function MembershipPage() {
  const { data = {}, isLoading } = useMembership();

  const mockData = {
    membership: data.membership || { active: true, plan: "Mahii Gold Annual", expiresAt: "30 Jul 2027" },
    plans: data.plans || [
      { id: "monthly", name: "Monthly", price: 99, duration: "month", features: ["Free Delivery above ₹149", "Extra 10% OFF Mess Plans", "2x Reward Points"] },
      { id: "quarterly", name: "Quarterly", price: 249, duration: "3 months", features: ["Free Delivery above ₹149", "Extra 10% OFF Mess Plans", "2x Reward Points", "No Surge Fees"] },
      { id: "annual", name: "Annual VIP", price: 799, duration: "year", features: ["Free Delivery on ALL orders", "Extra 15% OFF Mess Plans", "3x Reward Points", "Priority Customer Support", "VIP Flash Sale Access"] },
    ],
    savings: data.savings || { totalSaved: 2450, ordersWithBenefits: 36 },
  };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-64 rounded-3xl bg-slate-200" />
        <div className="h-24 rounded-3xl bg-slate-200" />
        <div className="grid lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 rounded-3xl bg-slate-200" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <GoldHero />

      <CurrentPlanCard membership={mockData.membership} />

      <BenefitsGrid />

      <div className="space-y-4">
        <h2 className="text-xl font-black text-slate-900">Select Your Membership Plan</h2>
        <div className="grid md:grid-cols-3 gap-6 pt-2">
          {mockData.plans.map((plan, idx) => (
            <PlanCard key={plan.id} plan={plan} isPopular={idx === 1} />
          ))}
        </div>
      </div>

      <SavingsCard savings={mockData.savings} />

      <FAQAccordion />
    </div>
  );
}
