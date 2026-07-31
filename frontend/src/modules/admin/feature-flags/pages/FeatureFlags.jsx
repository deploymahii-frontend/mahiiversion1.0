
import FeatureFlagStatistics from "../components/FeatureFlagStatistics";
import FeatureFlagFilters from "../components/FeatureFlagFilters";
import FeatureFlagCard from "../components/FeatureFlagCard";
import FeatureFlagHistory from "../components/FeatureFlagHistory";

import CreateFeatureFlagModal from "../components/CreateFeatureFlagModal";
import UpdateFeatureFlagModal from "../components/UpdateFeatureFlagModal";
import DeleteFeatureFlagDialog from "../components/DeleteFeatureFlagDialog";

import useFeatureFlags from "../hooks/useFeatureFlags";

export default function FeatureFlags() {
  const {
    loading,
    statistics,
    featureFlags,
    selectedFlag,
    createModal,
    updateModal,
    deleteDialog,
    openCreate,
    closeCreate,
    openUpdate,
    closeUpdate,
    openDelete,
    closeDelete,
    refresh,
  } = useFeatureFlags();

  return (
    <>
      <div className="flex-1">
      <main className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Feature Flags</h1>
              <p className="text-gray-500">
                Safely enable, disable and rollout platform features.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={refresh}
                className="rounded-xl bg-gray-700 px-5 py-3 text-white"
              >
                Refresh
              </button>

              <button
                onClick={openCreate}
                className="rounded-xl bg-blue-600 px-5 py-3 text-white"
              >
                New Feature Flag
              </button>
            </div>
          </div>

          <FeatureFlagStatistics loading={loading} statistics={statistics} />

          <FeatureFlagFilters />

          <div className="grid gap-6">
            {featureFlags.map((flag) => (
              <FeatureFlagCard
                key={flag.id}
                flag={flag}
                onEdit={() => openUpdate(flag)}
                onDelete={() => openDelete(flag)}
              />
            ))}
          </div>

          <FeatureFlagHistory />
        </main>
      </div>

      {createModal && <CreateFeatureFlagModal onClose={closeCreate} />}

      {updateModal && selectedFlag && (
        <UpdateFeatureFlagModal flag={selectedFlag} onClose={closeUpdate} />
      )}

      {deleteDialog && selectedFlag && (
        <DeleteFeatureFlagDialog flag={selectedFlag} onClose={closeDelete} />
      )}
    </>
  );
}
