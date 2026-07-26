export default function RecruitmentWidget({ recruitment = {} }) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-bold">Recruitment Status</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-gray-500">Open Positions</p>
          <p className="mt-2 text-2xl font-semibold">{recruitment.openPositions ?? 0}</p>
        </div>
        <div className="rounded-2xl bg-slate-50 p-4">
          <p className="text-sm text-gray-500">Candidates</p>
          <p className="mt-2 text-2xl font-semibold">{recruitment.candidates ?? 0}</p>
        </div>
      </div>
      <div className="mt-6 space-y-3">
        {(recruitment.jobs || []).slice(0, 3).map((job) => (
          <div key={job.id} className="rounded-xl border p-4">
            <p className="font-semibold">{job.title}</p>
            <p className="text-sm text-gray-500">{job.location} • {job.stage}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
