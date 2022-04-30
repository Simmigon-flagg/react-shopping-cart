import React from "react";
import { Wrapper } from "./styles";
import { CardItemType } from "../../App";
import { Button } from "@mui/material";

type Props = {
  item: CardItemType;
  handleAddToCart: (clickedItem: CardItemType) => void;
};
const Item: React.FC<Props> = ({ item, handleAddToCart }) => {
  return (
    <Wrapper>
      <img src={`${item.image}`} alt={`${item.title}`} />
      <div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <h4>Price: ${item.price}</h4>
      </div>
      <Button onClick={() => handleAddToCart(item)}>Add To Cart</Button>
    </Wrapper>
  );
};

export default Item;
