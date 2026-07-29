import React from "react";
import BusinessHero from "./BusinessHero";
import BusinessInfo from "./BusinessInfo";
import BusinessCategories from "./BusinessCategories";
import BusinessProducts from "./BusinessProducts";
import BusinessHours from "./BusinessHours";
import BusinessContact from "./BusinessContact";

const BusinessPage = () => {
  return (
    <main>
      <BusinessHero />
      <BusinessInfo />
      <BusinessCategories />
      <BusinessProducts />
      <BusinessHours />
      <BusinessContact />
    </main>
  );
};

export default BusinessPage;
