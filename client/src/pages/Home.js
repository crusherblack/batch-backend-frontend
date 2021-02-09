import React, { useContext } from "react";
import { CartContext } from "../context/cartContext";
import ProductCard from "../components/home/Card";
import { products } from "../components/home/data";

const Home = () => {
  const [state, dispatch] = useContext(CartContext);

  const addProductToCart = (id) => {
    const product = products.find((product) => product.id === id);

    dispatch({
      type: "ADD_CART",
      payload: product,
    });
  };

  return (
    <div className="container mt-3">
      <h1 className="text-center mb-3">List Of Products</h1>
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3" key={product.id}>
            <ProductCard
              product={product}
              addProductToCart={addProductToCart}
            />
          </div>
        ))}
      </div>
      <div className="row">
        <div className="col-md-12">
          <pre>{JSON.stringify(state.carts, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
};

export default Home;
