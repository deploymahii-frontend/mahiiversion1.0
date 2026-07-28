import { useState } from "react";

export default function PaymentSettingsForm({

    initialValues,

    onSubmit,

}) {

    const [form, setForm] = useState({

        cashOnDelivery:
            initialValues?.cashOnDelivery ?? true,

        upiEnabled:
            initialValues?.upiEnabled ?? true,

        bankName:
            initialValues?.bankName || "",

        accountHolder:
            initialValues?.accountHolder || "",

        accountNumber:
            initialValues?.accountNumber || "",

        ifsc:
            initialValues?.ifsc || "",

        upiId:
            initialValues?.upiId || "",

        settlementDays:
            initialValues?.settlementDays ?? 2,

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

            <label className="flex justify-between">

                Cash On Delivery

                <input
                    type="checkbox"
                    checked={form.cashOnDelivery}
                    onChange={e =>
                        update(
                            "cashOnDelivery",
                            e.target.checked
                        )
                    }
                />

            </label>

            <label className="flex justify-between">

                UPI Payments

                <input
                    type="checkbox"
                    checked={form.upiEnabled}
                    onChange={e =>
                        update(
                            "upiEnabled",
                            e.target.checked
                        )
                    }
                />

            </label>

            <input
                className="w-full border rounded p-3"
                placeholder="Bank Name"
                value={form.bankName}
                onChange={e =>
                    update("bankName", e.target.value)
                }
            />

            <input
                className="w-full border rounded p-3"
                placeholder="Account Holder"
                value={form.accountHolder}
                onChange={e =>
                    update("accountHolder", e.target.value)
                }
            />

            <input
                className="w-full border rounded p-3"
                placeholder="Account Number"
                value={form.accountNumber}
                onChange={e =>
                    update("accountNumber", e.target.value)
                }
            />

            <input
                className="w-full border rounded p-3"
                placeholder="IFSC Code"
                value={form.ifsc}
                onChange={e =>
                    update("ifsc", e.target.value)
                }
            />

            <input
                className="w-full border rounded p-3"
                placeholder="UPI ID"
                value={form.upiId}
                onChange={e =>
                    update("upiId", e.target.value)
                }
            />

            <input
                type="number"
                className="w-full border rounded p-3"
                placeholder="Settlement Days"
                value={form.settlementDays}
                onChange={e =>
                    update(
                        "settlementDays",
                        Number(e.target.value)
                    )
                }
            />

            <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >

                Save Payment Settings

            </button>

        </form>

    );

}
