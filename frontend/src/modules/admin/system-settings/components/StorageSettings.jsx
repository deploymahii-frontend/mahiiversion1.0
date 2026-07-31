import { useEffect, useState } from "react";

export default function StorageSettings({
  loading,
  data = {},
  onSave,
  onTestConnection,
}) {
  const [form, setForm] = useState({
    provider: "AWS S3",
    region: "",
    bucketName: "",
    accessKey: "",
    secretKey: "",
    endpoint: "",
    publicBaseUrl: "",
    maxUploadSizeMB: 25,
    enableVersioning: true,
    enableEncryption: true,
  });

  useEffect(() => {
    if (data.storage) {
      setForm({
        provider: data.storage.provider || "AWS S3",
        region: data.storage.region || "",
        bucketName: data.storage.bucketName || "",
        accessKey: "",
        secretKey: "",
        endpoint: data.storage.endpoint || "",
        publicBaseUrl: data.storage.publicBaseUrl || "",
        maxUploadSizeMB:
          data.storage.maxUploadSizeMB || 25,
        enableVersioning:
          data.storage.enableVersioning ?? true,
        enableEncryption:
          data.storage.enableEncryption ?? true,
      });
    }
  }, [data]);

  const update = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 shadow-sm">
        Loading storage settings...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Storage Settings
        </h2>

        <p className="text-gray-500">
          Configure object storage for uploads and backups.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Storage Provider
          </label>

          <select
            value={form.provider}
            onChange={(e) =>
              update("provider", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          >
            <option>AWS S3</option>
            <option>Cloudflare R2</option>
            <option>Google Cloud Storage</option>
            <option>Azure Blob</option>
            <option>Local Storage</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Region
          </label>

          <input
            value={form.region}
            onChange={(e) =>
              update("region", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Bucket / Container
          </label>

          <input
            value={form.bucketName}
            onChange={(e) =>
              update("bucketName", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Endpoint (Optional)
          </label>

          <input
            value={form.endpoint}
            onChange={(e) =>
              update("endpoint", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Access Key
          </label>

          <input
            value={form.accessKey}
            onChange={(e) =>
              update("accessKey", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Secret Key
          </label>

          <input
            type="password"
            value={form.secretKey}
            onChange={(e) =>
              update("secretKey", e.target.value)
            }
            placeholder="••••••••••"
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium">
            Public Base URL
          </label>

          <input
            value={form.publicBaseUrl}
            onChange={(e) =>
              update("publicBaseUrl", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Max Upload Size (MB)
          </label>

          <input
            type="number"
            value={form.maxUploadSizeMB}
            onChange={(e) =>
              update(
                "maxUploadSizeMB",
                Number(e.target.value)
              )
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2">

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.enableVersioning}
            onChange={(e) =>
              update(
                "enableVersioning",
                e.target.checked
              )
            }
          />
          Enable Object Versioning
        </label>

        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={form.enableEncryption}
            onChange={(e) =>
              update(
                "enableEncryption",
                e.target.checked
              )
            }
          />
          Enable Server-side Encryption
        </label>

      </div>

      <div className="mt-8 flex flex-wrap gap-3">

        <button
          onClick={() => onSave?.(form)}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Save Settings
        </button>

        <button
          onClick={() => onTestConnection?.()}
          className="rounded-xl bg-green-600 px-6 py-3 text-white hover:bg-green-700"
        >
          Test Storage
        </button>

      </div>

    </div>
  );
}
