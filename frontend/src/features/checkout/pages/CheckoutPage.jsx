import React from "react";
import AddressSection from "../components/AddressSection";
import DeliverySection from "../components/DeliverySection";
import PaymentSection from "../components/PaymentSection";
import ReviewSection from "../components/ReviewSection";
import PlaceOrderButton from "../components/PlaceOrderButton";

const CheckoutPage = () => {
  return (
    <main>
      <h1>Checkout</h1>
      <AddressSection />
      <DeliverySection />
      <PaymentSection />
      <ReviewSection />
      <PlaceOrderButton />
    </main>
  );
};

export default CheckoutPage;
