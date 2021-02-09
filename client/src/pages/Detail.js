import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { products } from "../components/home/data";

const Detail = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams();

  const filterProduct = () => {
    const filteredProduct = products.find((product) => product.id == id);

    setProduct(filteredProduct);
  };

  useEffect(() => {
    filterProduct();
  }, []);

  return (
    <div className="container">
      {product ? (
        <>
          <h1>Title: {product.title}</h1>
          <img src={product.imageUrl} alt="gambar" />
        </>
      ) : (
        <h1>Product dengan id {id} tidak ditemukan</h1>
      )}
    </div>
  );
};

export default Detail;
