import React from "react";
import { CardItemType } from "../../App";
import { Button } from "@mui/material";
import { Wrapper } from "./styles";

type Props = {
  item: CardItemType;
  addToCart: (clickedItem: CardItemType) => void;
  removeFromCart: (id: number) => void;
};
const CartItem: React.FC<Props> = ({ item, addToCart, removeFromCart }) => {
  return (
    <Wrapper>
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className="informational">
          <p>Price: ${item.price}</p>
          <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
        </div>
        <div className="buttons">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            Remove item
          </Button>
          <p>{item.amount} </p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          >
            Add item
          </Button>
        </div>
      </div>
      <img src={`${item.image}`} alt={`${item.title}`} />
    </Wrapper>
  );
};

export default CartItem;
