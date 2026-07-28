import { useState } from "react";

export default function useMediaUpload() {

    const [uploading, setUploading] =
        useState(false);

    const [progress, setProgress] =
        useState(0);

    function start() {

        setUploading(true);

        setProgress(0);

    }

    function update(value) {

        setProgress(value);

    }

    function finish() {

        setUploading(false);

        setProgress(100);

    }

    return {

        uploading,

        progress,

        start,

        update,

        finish,

    };

}
