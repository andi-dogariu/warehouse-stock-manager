import { Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import api from './api';
import {useEffect, useState} from "react";

const ProductDetails = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: "",
    make: "",
    name: "",
    price: "",
    stock: "",
    description: "",
  });

  useEffect( () => {
    api.getProductById(id).then(response => {setFormData(response.data)});
  }, [id]);

  if (!formData) {
    return <div className="error-div" data-testid="error">404 - Page not found</div>;
  }

  return (
    <div>
      <h1 className="title">Product Details</h1>
        <table>
          <thead>
            <th>ID: {formData.id}</th>
          </thead>
          <tbody>
            <tr>
              <td>Make:</td>
              <td>{formData.make}</td>
            </tr>
            <tr>
              <td>Model:</td>
              <td>{formData.model}</td>
            </tr>
            <tr>
              <td>Price:</td>
              <td>{formData.price}</td>
            </tr>
            <tr>
              <td>Stock:</td>
              <td>{formData.stock}</td>
            </tr>
          </tbody>
        </table>
        <Link to="/"><Button>Back</Button></Link>
      </div>
  );
}

export default ProductDetails;