/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./getAllProducts.css";
import DeleteProduct from "./DeleteProduct";
import UpdateProduct from "./UpdateProduct";

const GetAllProducts = ({ refresh }) => {
  const [products, setProducts] = useState([]);
  const [toDelete, setToDelete] = useState(null);
  const [toUpdate, setToUpdate] = useState(null);

  const getProducts = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.log("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [refresh]);

  // Function to handle product deletion in state
  const handleProductDeleted = (deletedId) => {
    setProducts(products.filter((product) => product.id !== deletedId));
    setToDelete(null); // Reset delete state
  };

  const handleProductUpdate = () => {
    setToUpdate(null);
    getProducts(); // ✅ Re-fetch products to update UI
  };
  return (
    <>
      <h2>Products List</h2>
      <table className='product-table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((prod) => (
              <tr key={prod.id}>
                <td>{prod.id}</td>
                <td>{prod.name}</td>
                <td>${prod.price}</td>
                <td>{prod.quantity}</td>
                <td>
                  <button
                    className='update-btn'
                    onClick={() => setToUpdate(prod.id)}
                  >
                    Update
                  </button>
                  <button
                    className='delete-btn'
                    onClick={() => setToDelete(prod.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='5'>No Products available.</td>
            </tr>
          )}
        </tbody>
      </table>

      {toDelete && (
        <DeleteProduct prodId={toDelete} onDeleted={handleProductDeleted} />
      )}
      {/* Show the updateProduct when the product is selected  */}
      {toUpdate && (
        <UpdateProduct
          prodId={toUpdate}
          onUpdateSuccess={handleProductUpdate}
          onCancel={() => setToUpdate(null)}
        />
      )}
    </>
  );
};

export default GetAllProducts;
