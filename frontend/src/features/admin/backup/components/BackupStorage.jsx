function StorageCard({
  title,
  value,
  unit = "",
  icon,
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between">
        <span className="text-3xl">{icon}</span>

        <span className="text-2xl font-bold">
          {value}
          {unit}
        </span>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        {title}
      </p>
    </div>
  );
}

export default function BackupStorage({
  loading,
  data = {},
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading backup storage...
      </div>
    );
  }

  const storage = data.storage || {};

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Backup Storage
        </h2>

        <p className="text-gray-500">
          Storage capacity and provider information.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        <StorageCard
          title="Total Capacity"
          value={storage.totalCapacity ?? "--"}
          unit=" GB"
          icon="💾"
        />

        <StorageCard
          title="Used Storage"
          value={storage.usedStorage ?? "--"}
          unit=" GB"
          icon="📦"
        />

        <StorageCard
          title="Available Storage"
          value={storage.availableStorage ?? "--"}
          unit=" GB"
          icon="☁️"
        />

        <StorageCard
          title="Usage"
          value={storage.usagePercent ?? "--"}
          unit="%"
          icon="📈"
        />

      </div>

      <div className="mt-8 rounded-xl border border-gray-200 p-5">

        <h3 className="mb-4 text-lg font-semibold">
          Storage Provider
        </h3>

        <div className="grid gap-4 md:grid-cols-2">

          <div>
            <p className="text-sm text-gray-500">
              Provider
            </p>

            <p className="font-medium">
              {storage.provider || "--"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Region
            </p>

            <p className="font-medium">
              {storage.region || "--"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Encryption
            </p>

            <p className="font-medium">
              {storage.encryption || "--"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Replication
            </p>

            <p className="font-medium">
              {storage.replication || "--"}
            </p>
          </div>

        </div>

      </div>

      {storage.warning && (
        <div className="mt-6 rounded-xl border border-yellow-300 bg-yellow-50 p-4 text-yellow-800">
          ⚠ {storage.warning}
        </div>
      )}

    </div>
  );
}
