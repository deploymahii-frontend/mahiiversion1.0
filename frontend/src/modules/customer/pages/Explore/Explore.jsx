import CustomerLayout from "@/layouts/CustomerLayout";

import ExploreHeader from "./components/ExploreHeader";
import CategoryTabs from "./components/CategoryTabs";
import FilterBar from "./components/FilterBar";
import BusinessGrid from "./components/BusinessGrid";

export default function Explore() {
  return (
    <CustomerLayout>

      <ExploreHeader />

      <CategoryTabs />

      <FilterBar />

      <BusinessGrid />

    </CustomerLayout>
  );
}
