import useMembership from "../hooks/useMembership";
import GoldHero from "../components/GoldHero";
import CurrentPlanCard from "../components/CurrentPlanCard";
import BenefitsGrid from "../components/BenefitsGrid";
import PlanCard from "../components/PlanCard";
import SavingsCard from "../components/SavingsCard";
import FAQAccordion from "../components/FAQAccordion";

export default function MembershipPage() {
  const { data = {}, isLoading } = useMembership();

  const membershipData = {
    membership: data.membership || null,
    plans: data.plans || [],
    savings: data.savings || null,
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

      <CurrentPlanCard membership={membershipData.membership} />

      <BenefitsGrid />

      <div className="space-y-4">
        <h2 className="text-xl font-black text-slate-900">Select Your Membership Plan</h2>
        <div className="grid md:grid-cols-3 gap-6 pt-2">
          {membershipData.plans.map((plan, idx) => (
            <PlanCard key={plan.id} plan={plan} isPopular={idx === 1} />
          ))}
        </div>
      </div>

      <SavingsCard savings={membershipData.savings} />

      <FAQAccordion />
    </div>
  );
}
