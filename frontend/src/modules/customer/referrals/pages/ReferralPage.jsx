import useReferral from "../hooks/useReferral";
import ReferralHero from "../components/ReferralHero";
import ReferralCodeCard from "../components/ReferralCodeCard";
import ReferralRewardsCard from "../components/ReferralRewardsCard";

export default function ReferralPage() {
  const { data = {}, isLoading } = useReferral();

  const code = data.code || "OM123XYZ";
  const rewards = data.rewards || { earned: 2450, successful: 18 };

  if (isLoading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-48 rounded-3xl bg-slate-200" />
        <div className="h-32 rounded-3xl bg-slate-200" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ReferralHero />
      <ReferralCodeCard code={code} />
      <ReferralRewardsCard rewards={rewards} />
    </div>
  );
}
