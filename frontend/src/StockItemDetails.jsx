import { Link, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';
import api from './api';
import {useEffect, useState} from "react";

const StockItemDetails = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    id: "",
    productid: "",
    location: "",
  });

  useEffect( () => {
    api.getStockItemById(id).then(response => {setFormData(response.data)});
  }, [id]);

  if (!formData) {
    return <div className="error-div" data-testid="error">404 - Page not found</div>;
  }

  return (
    <div>
      <h1 className="title">Stock Item Details</h1>
      <table>
        <thead>
          <th>ID: {formData.id}</th>
        </thead>
        <tbody>
        <tr>
          <td>ProductID:</td>
          <td>{formData.productId}</td>
        </tr>
        <tr>
          <td>Location:</td>
          <td>{formData.location}</td>
        </tr>
        </tbody>
      </table>
      <Link to="/"><Button>Back</Button></Link>
    </div>
  );
}

export default StockItemDetails;