import React from "react";
import { useHistory } from "react-router-dom";

const Card = ({ product, addProductToCart }) => {
  const history = useHistory();
  const { id, title, imageUrl } = product;

  const goToDetailProduct = () => {
    history.push(`/product/${id}`);
  };

  return (
    <div className="card mb-3">
      <img
        style={{
          height: "250px",
          objectFit: "cover",
          cursor: "pointer",
        }}
        className="card-img-top"
        src={imageUrl}
        alt="Card image cap"
        onClick={goToDetailProduct}
      />
      <div className="card-body">
        <p
          style={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
          className="card-text text-center font-weight-bold"
        >
          {title}
        </p>
      </div>
      <div className="card-footer bg-white">
        <button
          onClick={() => addProductToCart(id)}
          className="btn btn-primary btn-block"
          style={{
            backgroundColor: "#FF793F",
            borderColor: "#FF793F",
          }}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
