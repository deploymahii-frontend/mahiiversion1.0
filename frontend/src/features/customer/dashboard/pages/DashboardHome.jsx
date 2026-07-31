import HeroBanner from "../sections/HeroBanner";
import SearchInput from "@/design-system/input/SearchInput";

export default function DashboardHome() {
    return (
        <div className="space-y-8">
            <HeroBanner />
            <SearchInput />
        </div>
    );
}
