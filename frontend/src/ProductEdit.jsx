import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import api from "./api";

const ProductEdit = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: "",
    make: "",
    model: "",
    price: "",
    stock: ""
  });

  useEffect( () => {
    setLoading(true);
    api.getProductById(id).then(response => {setFormData(response.data); console.log(response.data)});
    setLoading(false);
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    //api call to edit product
    api.updateProduct(id, formData)
      .then(response => {
        console.log('Product edited:', response.data);
      })
      .catch(error => {
        console.error('Error editing product:', error);
      });
  };

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
      <div>
        <h1 className="title">Edit Product</h1>
        <form onSubmit={handleSubmit} className="editform">
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
              type="text"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="stock">Quantity:</label>
            <input
              type="text"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
            />
          </div>
          <Link reloadDocument to={'/'} style={{textDecoration: "none"}}>
            <Button data-testid={`save`} onClick={
              () => handleSubmit()
            }>
              Save
            </Button>
          </Link>
        </form>
      </div>)}
    </div>
  )
}

export default ProductEdit
