import React from "react";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import api from "./api";

const ProductAdd = (props) => {

  const [formData, setFormData] = React.useState({
    make: "",
    model: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    //api call to add product
    api.createProduct(formData)
      .then(response => {
        console.log('Product added:', response.data);
      })
      .catch(error => {
        console.error('Error adding product:', error);
      });
  };

  return (
    <div>
      <h1 className="title">Add Product</h1>
      <form onSubmit={handleSubmit} className="addform">
        <div>
          <label htmlFor="make">Make:</label>
          <input
            data-testid="make"
            type="text"
            id="make"
            name="make"
            value={formData.make}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="model">Model:</label>
          <input
            data-testid="model"
            type="text"
            id="model"
            name="model"
            value={formData.model}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            data-testid="price"
            type="text"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="stock">Stock:</label>
          <input
            data-testid="stock"
            type="text"
            id="stock"
            name="stock"
            value={formData.stock}
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
export default ProductAdd;