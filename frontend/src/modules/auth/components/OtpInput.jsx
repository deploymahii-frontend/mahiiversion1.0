// src/modules/auth/components/OtpInput.jsx

import { useRef } from "react";

export default function OtpInput({

    value,

    onChange,

    length = 6,

}) {

    const inputRefs = useRef([]);

    function handleChange(index, e) {

        const digit = e.target.value.replace(/\D/g, "");

        const otp = [...value];

        otp[index] = digit;

        onChange(otp);

        if (

            digit &&

            index < length - 1

        ) {

            inputRefs.current[index + 1]?.focus();

        }

    }

    function handleBackspace(index, e) {

        if (

            e.key === "Backspace" &&

            !value[index] &&

            index > 0

        ) {

            inputRefs.current[index - 1]?.focus();

        }

    }

    function handlePaste(e) {

        e.preventDefault();

        const pasted =

            e.clipboardData

                .getData("text")

                .replace(/\D/g, "")
                .slice(0, length);

        const otp = new Array(length).fill("");

        pasted.split("").forEach((digit, index) => {

            otp[index] = digit;

        });

        onChange(otp);

        const lastIndex =

            Math.min(

                pasted.length,

                length

            ) - 1;

        if (lastIndex >= 0) {

            inputRefs.current[lastIndex]?.focus();

        }

    }

    return (

        <div className="flex justify-center gap-3">

            {

                Array.from({

                    length,

                }).map((_, index) => (

                    <input

                        key={index}

                        ref={el =>

                            inputRefs.current[index] = el

                        }

                        value={value[index] || ""}

                        maxLength={1}

                        onPaste={handlePaste}

                        onKeyDown={e =>

                            handleBackspace(index, e)

                        }

                        onChange={e =>

                            handleChange(index, e)

                        }

                        className="w-14 h-14 rounded-xl border-2 border-gray-300 text-center text-2xl font-bold outline-none focus:border-blue-600 transition"

                    />

                ))

            }

        </div>

    );

}
