import { useState } from "react";

export default function SecurityForm({

    onSubmit,

}) {

    const [form, setForm] = useState({

        currentPassword: "",

        newPassword: "",

        confirmPassword: "",

    });

    function change(field, value) {

        setForm({

            ...form,

            [field]: value,

        });

    }

    function submit(e) {

        e.preventDefault();

        if (form.newPassword !== form.confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        onSubmit(form);

    }

    return (

        <form
            onSubmit={submit}
            className="bg-white rounded-xl p-6 space-y-5"
        >

            <input
                type="password"
                placeholder="Current Password"
                className="w-full border rounded p-3"
                value={form.currentPassword}
                onChange={e =>
                    change(
                        "currentPassword",
                        e.target.value
                    )
                }
            />

            <input
                type="password"
                placeholder="New Password"
                className="w-full border rounded p-3"
                value={form.newPassword}
                onChange={e =>
                    change(
                        "newPassword",
                        e.target.value
                    )
                }
            />

            <input
                type="password"
                placeholder="Confirm Password"
                className="w-full border rounded p-3"
                value={form.confirmPassword}
                onChange={e =>
                    change(
                        "confirmPassword",
                        e.target.value
                    )
                }
            />

            <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >

                Change Password

            </button>

        </form>

    );

}
