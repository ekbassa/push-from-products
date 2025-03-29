/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import "./addProduct.css";
// import "./addProduct2.css";
import GetAllProducts from "./GetAllProducts";

const AddProduct = () => {
  const [inputs, setInputs] = useState({});
  const [refresh, setRefresh] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    console.log(`Product Name:`, inputs);

    // Send POST request to Flask server
    try {
      const response = await fetch("http://127.0.0.1:5000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
      });

      //check if the request is successful
      if (response.ok) {
        const data = await response.json();
        console.log("Product added successfully:", data);
        // Clear the form after submission
        setInputs({});
        setRefresh((prev) => !prev);
      } else {
        console.error("Failed to add product.");
      }
    } catch (error) {
      console.error("Error occurred while sending data:", error);
    }
  };

  return (
    <div className='add-product-container'>
      <h1>Adding Products</h1>
      <form onSubmit={onSubmitHandler}>
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
          Product price:
          <input
            type='Number'
            name='price'
            value={inputs.price || ""}
            onChange={onChangeHandler}
          />
        </label>
        <label>
          Product quantity:
          <input
            type='Number'
            name='quantity'
            value={inputs.quantity || ""}
            onChange={onChangeHandler}
          />
        </label>

        <button type='submit' className='submit-btn'>
          Submit Data
        </button>
      </form>

      <GetAllProducts refresh={refresh} />
    </div>
  );
};

// its a Note

export default AddProduct;
