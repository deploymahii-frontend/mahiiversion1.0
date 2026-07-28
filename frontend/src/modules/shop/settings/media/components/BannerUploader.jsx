import { useRef } from "react";

export default function BannerUploader({

    banner,

    onUpload,

}) {

    const inputRef = useRef();

    return (

        <div className="bg-white rounded-xl p-6">

            <h2 className="font-bold mb-4">

                Shop Banner

            </h2>

            {

                banner && (

                    <img
                        src={banner}
                        alt="Banner"
                        className="w-full h-60 object-cover rounded mb-5"
                    />

                )

            }

            <button
                onClick={() =>
                    inputRef.current.click()
                }
                className="bg-green-600 text-white px-5 py-2 rounded"
            >

                Upload Banner

            </button>

            <input
                ref={inputRef}
                hidden
                type="file"
                accept="image/*"
                onChange={e =>
                    onUpload(e.target.files[0])
                }
            />

        </div>

    );

}
