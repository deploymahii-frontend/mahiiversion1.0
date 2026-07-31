export default function ReferralRewardsCard({ rewards = {} }) {
  const earned = rewards.earned ?? 2450;
  const successful = rewards.successful ?? 18;

  return (
    <section className="grid grid-cols-2 gap-4">
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center">
        <p className="text-xs uppercase font-bold text-slate-400">Total Earned</p>
        <p className="text-4xl font-black text-slate-900 mt-2">₹{earned.toLocaleString()}</p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm text-center">
        <p className="text-xs uppercase font-bold text-slate-400">Friends Joined</p>
        <p className="text-4xl font-black text-slate-900 mt-2">{successful}</p>
      </div>
    </section>
  );
}
