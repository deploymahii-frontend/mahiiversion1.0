import { useEffect, useState } from "react";

export default function CategoryForm({
  initialValues = {},
  loading = false,
  onSubmit,
}) {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    icon: "📂",
    description: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    setForm({
      name: initialValues.name || "",
      slug: initialValues.slug || "",
      icon: initialValues.icon || "📂",
      description: initialValues.description || "",
      status: initialValues.status || "ACTIVE",
    });
  }, [initialValues]);

  function updateField(key, value) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  function generateSlug(name) {
    return name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^
\w-]/g, "");
  }

  function handleNameChange(e) {
    const name = e.target.value;

    updateField("name", name);

    if (!initialValues.slug) {
      updateField("slug", generateSlug(name));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit?.(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-2xl bg-white p-6 shadow-sm"
    >
      <div>
        <label className="mb-2 block font-medium">
          Category Name
        </label>

        <input
          type="text"
          value={form.name}
          onChange={handleNameChange}
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Slug
        </label>

        <input
          type="text"
          value={form.slug}
          onChange={(e) =>
            updateField("slug", e.target.value)
          }
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
          required
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Icon / Emoji
        </label>

        <input
          type="text"
          value={form.icon}
          onChange={(e) =>
            updateField("icon", e.target.value)
          }
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Description
        </label>

        <textarea
          rows={4}
          value={form.description}
          onChange={(e) =>
            updateField(
              "description",
              e.target.value
            )
          }
          className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-orange-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="mb-2 block font-medium">
          Status
        </label>

        <select
          value={form.status}
          onChange={(e) =>
            updateField("status", e.target.value)
          }
          className="w-full rounded-xl border border-gray-300 px-4 py-3"
        >
          <option value="ACTIVE">
            Active
          </option>

          <option value="INACTIVE">
            Inactive
          </option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white hover:bg-orange-600 disabled:opacity-50"
      >
        {loading
          ? "Saving..."
          : initialValues._id
          ? "Update Category"
          : "Create Category"}
      </button>
    </form>
  );
}
