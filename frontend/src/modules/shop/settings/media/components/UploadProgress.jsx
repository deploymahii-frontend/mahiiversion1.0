export default function UploadProgress({

    progress,

}) {

    return (

        <div className="w-full bg-gray-200 rounded">

            <div
                style={{
                    width: `${progress}%`,
                }}
                className="bg-blue-600 h-3 rounded"
            />

        </div>

    );

}
