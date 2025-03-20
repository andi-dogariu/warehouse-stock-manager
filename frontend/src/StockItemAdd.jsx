import React from "react";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import api from "./api";
import { useState, useEffect } from "react";

const StockItemAdd = () => {

  const [productIds, setProductIds] = useState([]);

  const [formData, setFormData] = React.useState({
    productId: "",
    location: ""
  });

  useEffect(() => {
    // Fetch product IDs from the API
    api.getProducts()
      .then(response => {
        // Extract the IDs from the response data
        const ids = response.data.map(product => product.id);
        setProductIds(ids);
      })
      .catch(error => {
        console.error('Error fetching product IDs:', error);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    //api call to add product
    api.createStockItem(formData)
      .then(response => {
        console.log('StockItem added:', response.data);
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };

  return (
    <div>
      <h1 className="title">Add StockItem</h1>
      <form onSubmit={handleSubmit} className="addform">
        <div>
          <label htmlFor="productId">Product ID:</label>
          {/* Render dropdown with product IDs */}
          <select
            data-testid="productId"
            id="productId"
            name="productId"
            value={formData.productId}
            onChange={handleChange}
          >
            <option value="">Select Product ID</option>
            {productIds.map(productId => (
              <option key={productId} value={productId}>{productId}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            data-testid="location"
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>
        <Link reloadDocument to={"/"} style={{textDecoration: "none"}}>
          <Button data-testid={`save`} onClick={
            () => handleSubmit()
          }>
            Add
          </Button>
        </Link>
      </form>
    </div>
  )
}
export default StockItemAdd;