import React from "react";
import CartItem from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import CartActions from "../components/CartActions";

const CartPage = () => {
  return (
    <main>
      <h1>Cart</h1>
      <CartItem />
      <CartSummary />
      <CartActions />
    </main>
  );
};

export default CartPage;
