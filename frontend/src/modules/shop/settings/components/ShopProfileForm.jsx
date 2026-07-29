import { useState } from "react";

export default function ShopProfileForm({

    initialValues,

    onSubmit,

    loading,

}) {

    const [form, setForm] = useState({

        name: initialValues?.name || "",

        description: initialValues?.description || "",

        mobile: initialValues?.mobile || "",

        email: initialValues?.email || "",

        address: initialValues?.address || "",

    });

    function change(e) {

        setForm({

            ...form,

            [e.target.name]: e.target.value,

        });

    }

    function submit(e) {

        e.preventDefault();

        onSubmit(form);

    }

    return (

        <form
            onSubmit={submit}
            className="bg-white rounded-xl p-6 space-y-5"
        >

            <input
                name="name"
                value={form.name}
                onChange={change}
                placeholder="Shop Name"
                className="w-full border rounded p-3"
            />

            <textarea
                name="description"
                value={form.description}
                onChange={change}
                placeholder="Description"
                className="w-full border rounded p-3"
            />

            <input
                name="mobile"
                value={form.mobile}
                onChange={change}
                placeholder="Mobile Number"
                className="w-full border rounded p-3"
            />

            <input
                name="email"
                value={form.email}
                onChange={change}
                placeholder="Email"
                className="w-full border rounded p-3"
            />

            <textarea
                name="address"
                value={form.address}
                onChange={change}
                placeholder="Shop Address"
                className="w-full border rounded p-3"
            />

            <button
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >
                {loading ? "Saving..." : "Save Changes"}
            </button>

        </form>

    );

}
