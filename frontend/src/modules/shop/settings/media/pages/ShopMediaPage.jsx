import { toast } from "react-hot-toast";

import useShopSettings from "../hooks/useShopSettings";

import useMediaUpload from "../hooks/useMediaUpload";

import LogoUploader from "../components/LogoUploader";

import BannerUploader from "../components/BannerUploader";

import UploadProgress from "../components/UploadProgress";

import * as mediaService from "../services/media.service";

export default function ShopMediaPage() {

    const {

        settings,

        refresh,

    } = useShopSettings();

    const upload =
        useMediaUpload();

    async function uploadLogo(file) {

        const formData = new FormData();

        formData.append("logo", file);

        upload.start();

        await mediaService.uploadLogo(formData);

        upload.finish();

        toast.success("Logo uploaded.");

        refresh();

    }

    async function uploadBanner(file) {

        const formData = new FormData();

        formData.append("banner", file);

        upload.start();

        await mediaService.uploadBanner(formData);

        upload.finish();

        toast.success("Banner uploaded.");

        refresh();

    }

    return (

        <div className="p-8 space-y-8">

            <h1 className="text-3xl font-bold">

                Shop Media

            </h1>

            {

                upload.uploading && (

                    <UploadProgress

                        progress={
                            upload.progress
                        }

                    />

                )

            }

            <LogoUploader

                logo={settings.logo}

                onUpload={uploadLogo}

            />

            <BannerUploader

                banner={settings.banner}

                onUpload={uploadBanner}

            />

        </div>

    );

}
