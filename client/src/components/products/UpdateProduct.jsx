/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./updateProducts.css";

const UpdateProduct = ({ prodId, onUpdateSuccess, onCancel }) => {
  const [inputs, setInputs] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (!prodId) return;

    const getProduct = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/products/${prodId}`
        );
        if (response.ok) {
          const data = await response.json();
          setInputs(data);
        } else {
          console.log("Failed to fetch the product data.");
        }
      } catch (error) {
        console.log("Error:", error);
      }
    };
    getProduct();
  }, [prodId]);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://127.0.0.1:5000/products/${prodId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      if (response.ok) {
        console.log("Product Updated successfully ");

        const updateResponse = await fetch(
          `http://127.0.0.1:5000/products/${prodId}`
        );
        const updateData = await updateResponse.json();
        setInputs(updateData);
        onUpdateSuccess(); // ✅ Close the update form after success
      } else {
        console.error("Failed to update product.");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <h2>Update Product Data</h2>
      <form className='form-to-update' onSubmit={onSubmitHandler}>
        <label>
          Product Name:
          <input
            type='text'
            name='name'
            value={inputs.name || ""}
            onChange={onChangeHandler}
          />
        </label>
        <label>
          Product Price:
          <input
            type='number'
            name='price'
            value={inputs.price || ""}
            onChange={onChangeHandler}
          />
        </label>
        <label>
          Product Quantity:
          <input
            type='number'
            name='quantity'
            value={inputs.quantity || ""}
            onChange={onChangeHandler}
          />
        </label>
        <div>
          <button type='submit' className='update-btn btn'>
            Update
          </button>
          <button type='button' className='cancel-btn btn' onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </>
  );
};

export default UpdateProduct;
