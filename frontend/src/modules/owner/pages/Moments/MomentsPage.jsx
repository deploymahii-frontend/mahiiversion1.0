import MomentsGrid from "./components/MomentsGrid";
import UploadMomentForm from "./components/UploadMomentForm";

import { useMoments } from "./hooks/useMoments";

export default function MomentsPage() {

    const {

        moments,

        loading

    } = useMoments();

    if (loading) return <div>Loading...</div>;

    return (

        <main className="min-h-screen bg-gray-100 p-6">

            <UploadMomentForm />

            <MomentsGrid
                moments={moments}
            />

        </main>

    );

}
