import React from "react";
import CartItem from "../CartItem";
import { Wrapper } from "./style";
import { CardItemType } from "../../App";
import { accordionActionsClasses, Button, CardTypeMap } from "@mui/material";

type Props = {
  cartItems: CardItemType[];
  // Remove this later

  addToCart: (clickedItem: CardItemType) => void;
  removeFromCart: (id: number) => void;
};
const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items: CardItemType[]) =>
    items.reduce((acc: number, item) => acc + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in the</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
