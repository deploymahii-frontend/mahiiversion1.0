import { useState } from "react";

export default function OfferForm({
    initialValues = {},
    loading,
    onSubmit,
}) {

    const [form, setForm] = useState({

        title: initialValues.title || "",

        description: initialValues.description || "",

        code: initialValues.code || "",

        type: initialValues.type || "PERCENTAGE",

        discountValue:
            initialValues.discountValue || "",

        minimumOrder:
            initialValues.minimumOrder || "",

        maximumDiscount:
            initialValues.maximumDiscount || "",

        usageLimit:
            initialValues.usageLimit || "",

        startDate:
            initialValues.startDate || "",

        endDate:
            initialValues.endDate || "",

        active:
            initialValues.active ?? true,

    });

    function change(e) {

        const {

            name,

            value,

            checked,

            type,

        } = e.target;

        setForm({

            ...form,

            [name]:

                type === "checkbox"

                    ? checked

                    : value,

        });

    }

    function submit(e) {

        e.preventDefault();

        onSubmit(form);

    }

    return (

        <form
            onSubmit={submit}
            className="bg-white rounded-xl p-8 space-y-6"
        >

            <input
                name="title"
                placeholder="Offer Title"
                value={form.title}
                onChange={change}
                className="w-full border p-3 rounded"
            />

            <textarea
                name="description"
                rows={4}
                placeholder="Description"
                value={form.description}
                onChange={change}
                className="w-full border p-3 rounded"
            />

            <input
                name="code"
                placeholder="Coupon Code"
                value={form.code}
                onChange={change}
                className="w-full border p-3 rounded uppercase"
            />

            <select
                name="type"
                value={form.type}
                onChange={change}
                className="w-full border p-3 rounded"
            >

                <option value="PERCENTAGE">

                    Percentage Discount

                </option>

                <option value="FLAT">

                    Flat Discount

                </option>

                <option value="BUY_ONE_GET_ONE">

                    Buy One Get One

                </option>

            </select>

            <div className="grid md:grid-cols-2 gap-5">

                <input
                    type="number"
                    name="discountValue"
                    placeholder="Discount Value"
                    value={form.discountValue}
                    onChange={change}
                    className="border p-3 rounded"
                />

                <input
                    type="number"
                    name="minimumOrder"
                    placeholder="Minimum Order"
                    value={form.minimumOrder}
                    onChange={change}
                    className="border p-3 rounded"
                />

            </div>

            <div className="grid md:grid-cols-2 gap-5">

                <input
                    type="number"
                    name="maximumDiscount"
                    placeholder="Maximum Discount"
                    value={form.maximumDiscount}
                    onChange={change}
                    className="border p-3 rounded"
                />

                <input
                    type="number"
                    name="usageLimit"
                    placeholder="Usage Limit"
                    value={form.usageLimit}
                    onChange={change}
                    className="border p-3 rounded"
                />

            </div>

            <div className="grid md:grid-cols-2 gap-5">

                <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={change}
                    className="border p-3 rounded"
                />

                <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={change}
                    className="border p-3 rounded"
                />

            </div>

            <label className="flex gap-3 items-center">

                <input
                    type="checkbox"
                    name="active"
                    checked={form.active}
                    onChange={change}
                />

                Active Offer

            </label>

            <button
                disabled={loading}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg"
            >

                {

                    loading

                        ? "Saving..."

                        : "Save Offer"

                }

            </button>

        </form>

    );

}
