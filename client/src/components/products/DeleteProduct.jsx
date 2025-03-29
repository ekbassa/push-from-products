/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import "./deleteProduct.css";

const DeleteProduct = ({ prodId, onDeleted }) => {
  useEffect(() => {
    const delete_product = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/products/${prodId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Product deleted successfully:", data);
          onDeleted(prodId); // Notify parent to remove from UI
        } else {
          console.error("Failed to delete product.");
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    };
    delete_product();
  }, [prodId, onDeleted]);

  return null; // no UI needed!
};

export default DeleteProduct;
