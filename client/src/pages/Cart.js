import React, { useContext } from "react";
import List from "../components/cart/List";
import { CartContext } from "../context/cartContext";

const Cart = () => {
  const [state, dispatch] = useContext(CartContext);
  const { carts } = state;

  const removeProductFromCart = (id) => {
    dispatch({
      type: "REMOVE_CART",
      payload: {
        id,
      },
    });
  };

  return (
    <div className="container mt-3">
      <h1 className="text-center mb-3">Your Order</h1>
      <div className="row">
        <div className="col-md-8">
          <h2 className="mb-3">List Product</h2>
          <ul class="list-group">
            {carts.length > 0 ? (
              carts.map((product) => (
                <List
                  key={product.id}
                  product={product}
                  removeProductFromCart={removeProductFromCart}
                />
              ))
            ) : (
              <h1>Your Cart is Empty</h1>
            )}
          </ul>
        </div>
        <div className="col-md-4">Checkout</div>
      </div>
    </div>
  );
};

export default Cart;
