import { useRef } from "react";

export default function LogoUploader({

    logo,

    onUpload,

}) {

    const inputRef = useRef();

    function choose() {

        inputRef.current.click();

    }

    function select(e) {

        if (!e.target.files.length)
            return;

        onUpload(e.target.files[0]);

    }

    return (

        <div className="bg-white rounded-xl p-6">

            <h2 className="font-bold mb-4">

                Shop Logo

            </h2>

            {

                logo && (

                    <img
                        src={logo}
                        alt="Logo"
                        className="w-36 h-36 rounded-full object-cover mb-5"
                    />

                )

            }

            <button
                onClick={choose}
                className="bg-blue-600 text-white px-5 py-2 rounded"
            >

                Upload Logo

            </button>

            <input
                ref={inputRef}
                type="file"
                hidden
                accept="image/*"
                onChange={select}
            />

        </div>

    );

}
