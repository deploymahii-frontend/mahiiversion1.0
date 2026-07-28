export default function ReportFilters({

    filters,

    onChange,

}) {

    function update(e) {

        onChange({

            ...filters,

            [e.target.name]:

                e.target.value,

        });

    }

    return (

        <div className="grid lg:grid-cols-3 gap-5 bg-white rounded-xl p-6">

            <input

                type="date"

                name="from"

                value={filters.from}

                onChange={update}

                className="border rounded p-3"

            />

            <input

                type="date"

                name="to"

                value={filters.to}

                onChange={update}

                className="border rounded p-3"

            />

            <select

                name="paymentMethod"

                value={filters.paymentMethod}

                onChange={update}

                className="border rounded p-3"

            >

                <option value="">

                    All Payments

                </option>

                <option value="CASH">

                    Cash

                </option>

                <option value="UPI">

                    UPI

                </option>

                <option value="CARD">

                    Card

                </option>

            </select>

        </div>

    );

}
