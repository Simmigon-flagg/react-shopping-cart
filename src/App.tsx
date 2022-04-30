import React, { useState } from "react";
import { useQuery } from "react-query";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
// import CircularProgress from "@mui/material/CircularProgress";
import Item from "./components/Item";
import LinearProgress from "@mui/material/LinearProgress";
import Drawer from "@mui/material/Drawer";
import Grid from "@mui/material/Grid";
import Badge from "@mui/material/Badge";
import { Wrapper, StyledButton } from "./app.styles";
import Cart from "./components/Cart";

// Types
export type CardItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CardItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CardItemType[]);
  // const [cartItems, setCartItems] = useState<CardItemType[]>([])
  const { data, isLoading, error } = useQuery<CardItemType[]>(
    "products",
    getProducts
  );

  const getTotalItems = (items: CardItemType[]) =>
    // This get the amount from the item.amount and starts adding from 0
    items.reduce((ack: number, item) => ack + item.amount, 0);
  const handleAddToCart = (clickedItem: CardItemType) => {
    setCartItems((prevItem) => {
      const isItemInCart = prevItem.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prevItem.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      //  First Time adding an item to the cart
      return [...prevItem, { ...clickedItem, amount: 1 }];
    });
  };
  const handleRemoveFromCart = (id: number) => {
    setCartItems((prevItemFromCart) =>
      prevItemFromCart.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else {
          return [...acc, item];
        }
      }, [] as CardItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  // if(isLoading) return <CircularProgress />;
  if (error) return <div>Something went wrong</div>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      </Drawer>

      <StyledButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItems(cartItems)} color="error">
          <AddShoppingCartIcon />
        </Badge>
      </StyledButton>

      <Grid container spacing={3}>
        {/* Implicit "()" Return
        because we are only returning JXS */}
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item key={item.id} item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
