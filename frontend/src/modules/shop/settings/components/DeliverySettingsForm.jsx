import { useState } from "react";

export default function DeliverySettingsForm({

    initialValues,

    onSubmit,

}) {

    const [form, setForm] = useState({

        pickup:
            initialValues?.pickup ?? true,

        shopDelivery:
            initialValues?.shopDelivery ?? true,

        deliveryRadius:
            initialValues?.deliveryRadius ?? 5,

        deliveryCharge:
            initialValues?.deliveryCharge ?? 40,

        freeDeliveryAbove:
            initialValues?.freeDeliveryAbove ?? 299,

        estimatedTime:
            initialValues?.estimatedTime ?? 30,

        autoAccept:
            initialValues?.autoAccept ?? false,

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
            className="bg-white rounded-xl p-6 space-y-6"
        >

            <label className="flex justify-between">

                Pickup Available

                <input
                    type="checkbox"
                    checked={form.pickup}
                    onChange={e =>
                        update(
                            "pickup",
                            e.target.checked
                        )
                    }
                />

            </label>

            <label className="flex justify-between">

                Home Delivery

                <input
                    type="checkbox"
                    checked={form.shopDelivery}
                    onChange={e =>
                        update(
                            "shopDelivery",
                            e.target.checked
                        )
                    }
                />

            </label>

            <div>

                <label>

                    Delivery Radius (KM)

                </label>

                <input
                    type="number"
                    value={form.deliveryRadius}
                    onChange={e =>
                        update(
                            "deliveryRadius",
                            Number(e.target.value)
                        )
                    }
                    className="w-full border rounded p-3"
                />

            </div>

            <div>

                <label>

                    Delivery Charge

                </label>

                <input
                    type="number"
                    value={form.deliveryCharge}
                    onChange={e =>
                        update(
                            "deliveryCharge",
                            Number(e.target.value)
                        )
                    }
                    className="w-full border rounded p-3"
                />

            </div>

            <div>

                <label>

                    Free Delivery Above

                </label>

                <input
                    type="number"
                    value={form.freeDeliveryAbove}
                    onChange={e =>
                        update(
                            "freeDeliveryAbove",
                            Number(e.target.value)
                        )
                    }
                    className="w-full border rounded p-3"
                />

            </div>

            <div>

                <label>

                    Estimated Delivery Time (Minutes)

                </label>

                <input
                    type="number"
                    value={form.estimatedTime}
                    onChange={e =>
                        update(
                            "estimatedTime",
                            Number(e.target.value)
                        )
                    }
                    className="w-full border rounded p-3"
                />

            </div>

            <label className="flex justify-between">

                Auto Accept Orders

                <input
                    type="checkbox"
                    checked={form.autoAccept}
                    onChange={e =>
                        update(
                            "autoAccept",
                            e.target.checked
                        )
                    }
                />

            </label>

            <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >

                Save Delivery Settings

            </button>

        </form>

    );

}
