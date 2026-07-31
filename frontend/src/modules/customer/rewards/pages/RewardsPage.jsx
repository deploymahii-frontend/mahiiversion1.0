import RewardsCard from "../../wallet/components/RewardsCard";
import RedeemRewards from "../../wallet/components/RedeemRewards";
import useWallet from "../../wallet/hooks/useWallet";

export default function RewardsPage() {
  const { data = {} } = useWallet();
  const rewards = data.rewards || { points: 520 };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-900">Rewards & Vouchers</h1>
        <p className="text-slate-500 mt-1">Earn points on every order and redeem for exclusive perks</p>
      </div>

      <RewardsCard rewards={rewards} />

      <RedeemRewards points={rewards.points} />
    </div>
  );
}
