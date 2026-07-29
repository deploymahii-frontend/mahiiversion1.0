import { useState } from "react";

const DAYS = [

    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",

];

export default function BusinessHoursForm({

    initialValues = {},

    onSubmit,

}) {

    const [hours, setHours] = useState(

        DAYS.map(day => ({

            day,

            open:

                initialValues?.[day]?.open || "09:00",

            close:

                initialValues?.[day]?.close || "21:00",

            closed:

                initialValues?.[day]?.closed || false,

        }))

    );

    function update(index, field, value) {

        const copy = [...hours];

        copy[index][field] = value;

        setHours(copy);

    }

    function submit(e) {

        e.preventDefault();

        onSubmit(hours);

    }

    return (

        <form
            onSubmit={submit}
            className="bg-white rounded-xl p-6 space-y-6"
        >

            {

                hours.map((item, index) => (

                    <div
                        key={item.day}
                        className="grid lg:grid-cols-4 gap-4 items-center"
                    >

                        <h3 className="font-semibold">

                            {item.day}

                        </h3>

                        <input
                            type="time"
                            value={item.open}
                            disabled={item.closed}
                            onChange={e =>
                                update(
                                    index,
                                    "open",
                                    e.target.value
                                )
                            }
                            className="border rounded p-2"
                        />

                        <input
                            type="time"
                            value={item.close}
                            disabled={item.closed}
                            onChange={e =>
                                update(
                                    index,
                                    "close",
                                    e.target.value
                                )
                            }
                            className="border rounded p-2"
                        />

                        <label className="flex items-center gap-2">

                            <input
                                type="checkbox"
                                checked={item.closed}
                                onChange={e =>
                                    update(
                                        index,
                                        "closed",
                                        e.target.checked
                                    )
                                }
                            />

                            Closed

                        </label>

                    </div>

                ))

            }

            <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg"
            >

                Save Hours

            </button>

        </form>

    );

}
