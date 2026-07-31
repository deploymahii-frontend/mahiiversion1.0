import { useEffect, useState } from "react";

export default function OrganizationSettings({
  loading,
  data = {},
  onSave,
}) {
  const [form, setForm] = useState({
    companyName: "",
    legalName: "",
    gstNumber: "",
    registrationNumber: "",
    address: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
    timezone: "Asia/Kolkata",
    currency: "INR",
    financialYearStart: "April",
  });

  useEffect(() => {
    if (data.organization) {
      setForm({
        companyName: data.organization.companyName || "",
        legalName: data.organization.legalName || "",
        gstNumber: data.organization.gstNumber || "",
        registrationNumber:
          data.organization.registrationNumber || "",
        address: data.organization.address || "",
        city: data.organization.city || "",
        state: data.organization.state || "",
        country: data.organization.country || "",
        postalCode:
          data.organization.postalCode || "",
        timezone:
          data.organization.timezone || "Asia/Kolkata",
        currency:
          data.organization.currency || "INR",
        financialYearStart:
          data.organization.financialYearStart ||
          "April",
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
        Loading organization settings...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Organization Settings
        </h2>

        <p className="text-gray-500">
          Configure business and legal information.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">

        <div>
          <label className="mb-2 block font-medium">
            Company Name
          </label>

          <input
            value={form.companyName}
            onChange={(e) =>
              update("companyName", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Legal Name
          </label>

          <input
            value={form.legalName}
            onChange={(e) =>
              update("legalName", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            GST Number
          </label>

          <input
            value={form.gstNumber}
            onChange={(e) =>
              update("gstNumber", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Registration Number
          </label>

          <input
            value={form.registrationNumber}
            onChange={(e) =>
              update(
                "registrationNumber",
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div className="md:col-span-2">
          <label className="mb-2 block font-medium">
            Registered Address
          </label>

          <textarea
            rows={3}
            value={form.address}
            onChange={(e) =>
              update("address", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            City
          </label>

          <input
            value={form.city}
            onChange={(e) =>
              update("city", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            State
          </label>

          <input
            value={form.state}
            onChange={(e) =>
              update("state", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Country
          </label>

          <input
            value={form.country}
            onChange={(e) =>
              update("country", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Postal Code
          </label>

          <input
            value={form.postalCode}
            onChange={(e) =>
              update("postalCode", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Time Zone
          </label>

          <input
            value={form.timezone}
            onChange={(e) =>
              update("timezone", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          />
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Currency
          </label>

          <select
            value={form.currency}
            onChange={(e) =>
              update("currency", e.target.value)
            }
            className="w-full rounded-lg border p-3"
          >
            <option value="INR">INR</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block font-medium">
            Financial Year Starts
          </label>

          <select
            value={form.financialYearStart}
            onChange={(e) =>
              update(
                "financialYearStart",
                e.target.value
              )
            }
            className="w-full rounded-lg border p-3"
          >
            <option>January</option>
            <option>April</option>
            <option>July</option>
          </select>
        </div>

      </div>

      <div className="mt-8 flex justify-end">

        <button
          onClick={() => onSave?.(form)}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Save Organization Settings
        </button>

      </div>

    </div>
  );
}
