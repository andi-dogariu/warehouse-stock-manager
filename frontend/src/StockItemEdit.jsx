import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import api from "./api";

const StockItemEdit = () => {

  const [productIds, setProductIds] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    id: "",
    productid: "", 
    location: "",
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

  useEffect( () => {
    setLoading(true);
    api.getStockItemById(id).then(response => {setFormData(response.data); console.log(response.data)});
    setLoading(false);
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    //api call to edit product
    api.updateStockItem(id, formData)
      .then(response => {
        console.log('StockItem edited:', response.data);
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
          <h1 className="title">Edit Stock Item</h1>
          <form onSubmit={handleSubmit} className="editform">
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
                type="text"
                id="location"
                name="location"
                value={formData.location}
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

export default StockItemEdit
