import { useEffect, useMemo, useState } from "react";
import { getFeatureFlags } from "../services/featureFlag.service";

export default function useFeatureFlags() {
  const [loading, setLoading] = useState(true);
  const [featureFlags, setFeatureFlags] = useState([]);
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [createModal, setCreateModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const loadFlags = async () => {
    setLoading(true);
    const data = await getFeatureFlags();
    setFeatureFlags(data);
    setLoading(false);
  };

  useEffect(() => {
    loadFlags();
  }, []);

  const statistics = useMemo(() => {
    const enabled = featureFlags.filter((flag) => flag.enabled).length;
    return {
      total: featureFlags.length,
      enabled,
      disabled: featureFlags.length - enabled,
    };
  }, [featureFlags]);

  const openCreate = () => {
    setSelectedFlag(null);
    setCreateModal(true);
  };

  const closeCreate = () => setCreateModal(false);

  const openUpdate = (flag) => {
    setSelectedFlag(flag);
    setUpdateModal(true);
  };

  const closeUpdate = () => {
    setSelectedFlag(null);
    setUpdateModal(false);
  };

  const openDelete = (flag) => {
    setSelectedFlag(flag);
    setDeleteDialog(true);
  };

  const closeDelete = () => {
    setSelectedFlag(null);
    setDeleteDialog(false);
  };

  return {
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
    refresh: loadFlags,
  };
}
