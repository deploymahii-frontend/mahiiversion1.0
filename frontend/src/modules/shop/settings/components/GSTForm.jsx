import { useState } from "react";

export default function GSTForm({

    initialValues,

    onSubmit,

}) {

    const [form, setForm] = useState({

        gstNumber:
            initialValues?.gstNumber || "",

        gstRate:
            initialValues?.gstRate ?? 5,

        panNumber:
            initialValues?.panNumber || "",

        businessName:
            initialValues?.businessName || "",

        hsnCode:
            initialValues?.hsnCode || "",

        invoicePrefix:
            initialValues?.invoicePrefix || "INV",

        invoiceStart:
            initialValues?.invoiceStart ?? 1001,

    });

    function update(field, value) {

        setForm({

            ...form,

            [field]: value,

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
                className="w-full border rounded p-3"
                placeholder="Business Name"
                value={form.businessName}
                onChange={e =>
                    update(
                        "businessName",
                        e.target.value
                    )
                }
            />

            <input
                className="w-full border rounded p-3"
                placeholder="GST Number"
                value={form.gstNumber}
                onChange={e =>
                    update(
                        "gstNumber",
                        e.target.value
                    )
                }
            />

            <input
                className="w-full border rounded p-3"
                placeholder="PAN Number"
                value={form.panNumber}
                onChange={e =>
                    update(
                        "panNumber",
                        e.target.value
                    )
                }
            />

            <input
                className="w-full border rounded p-3"
                placeholder="HSN/SAC Code"
                value={form.hsnCode}
                onChange={e =>
                    update(
                        "hsnCode",
                        e.target.value
                    )
                }
            />

            <input
                type="number"
                className="w-full border rounded p-3"
                placeholder="GST Rate (%)"
                value={form.gstRate}
                onChange={e =>
                    update(
                        "gstRate",
                        Number(e.target.value)
                    )
                }
            />

            <input
                className="w-full border rounded p-3"
                placeholder="Invoice Prefix"
                value={form.invoicePrefix}
                onChange={e =>
                    update(
                        "invoicePrefix",
                        e.target.value
                    )
                }
            />

            <input
                type="number"
                className="w-full border rounded p-3"
                placeholder="Starting Invoice Number"
                value={form.invoiceStart}
                onChange={e =>
                    update(
                        "invoiceStart",
                        Number(e.target.value)
                    )
                }
            />

            <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >

                Save GST Settings

            </button>

        </form>

    );

}
