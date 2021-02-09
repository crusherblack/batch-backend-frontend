import React from "react";

const List = ({ product, removeProductFromCart }) => {
  const { id, qty, title, imageUrl } = product;

  return (
    <li
      style={{
        height: "200px",
      }}
      class="list-group-item d-flex "
    >
      <img
        src={imageUrl}
        alt="image"
        style={{
          height: "180px",
          width: "180px",
          objectFit: "cover",
        }}
      />
      <div className="ml-3">
        <h4>{title}</h4>
        <h4 className="text-secondary">Jumlah : {qty}</h4>
        <h4
          style={{
            cursor: "pointer",
          }}
          className="text-secondary"
          onClick={() => removeProductFromCart(id)}
        >
          Remove
        </h4>
      </div>
    </li>
  );
};

export default List;
