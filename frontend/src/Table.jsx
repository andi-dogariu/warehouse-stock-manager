import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import Chip from '@mui/material/Chip'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Visibility from '@mui/icons-material/Visibility'
import MakePieChart from "./PieChart.jsx";
import {Pagination} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {useEffect, useState} from "react";
import api from "./api";
import {w3cwebsocket as W3CWebSocket} from "websocket";

const client = new W3CWebSocket('ws://localhost:8080');

function Table() {

  const[productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading state to true before making the API call
    setLoading(true);

    // Fetch products from API
    api.getProducts()
      .then(response => {
        setProductList(response.data);
        console.log('Products fetched:', response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      })
      .finally(() => {
        // Set loading state to false after the API call is complete (whether successful or not)
        setLoading(false);
      });
  }, []);


  useEffect(() => {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    }
    client.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data);
      console.log('Received:', parsedMessage);
      setProductList((prevProductList) => [...prevProductList, parsedMessage]);
    }
  }, []);

  const groupByMake = (items) => {
    const grouped = items.reduce((acc, item) => {
      if (acc[item.make]) {
        acc[item.make] += 1;
      } else {
        acc[item.make] = 1;
      }
      return acc;
    }, {});
    return Object.keys(grouped).map((key) => ({ name: key, value: grouped[key] }));
  }

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    // api call for deleting product
    api.deleteProduct(id)
      .then(response => {
        console.log('Product deleted:', response.data);
        setProductList(productList.filter((product) => product.id !== id));
        window.parent.location = window.parent.location.href;
      })
      .catch(error => {
        console.error('Error deleting product:', error);
      });
  };

  const paginatedData = productList;

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
      <div>
        <h1 className="title">Product Table</h1>
        <MakePieChart data={groupByMake(productList)}/>
        <br/>
        <div>
          <b>Max Price:</b> {productList.reduce((max, product) => (Number(product.price) > max ? Number(product.price) : max), 0)}
        </div>
        <br/>
        <table>
          <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          {paginatedData.map((product) => (
            <tr key={product.id} data-testid={`row-${product.id}`}>
              <td>{product.make}</td>
              <td>{product.model}</td>
              <td>{product.price}</td>
              <td>
                <div className="buttons">
                  <Link data-testid={`details-${product.id}`} to={`/product/${product.id}`}>
                    <Chip color="success" icon={<Visibility/>} label="Details" size="small"/>
                  </Link>
                  <div className="button-edit">
                    <Link data-testid={`edit-${product.id}`} to={`/product/edit/${product.id}`}>
                      <Chip color="info" icon={<EditIcon/>} label="Edit" size="small"/>
                    </Link>
                  </div>
                  <Button data-testid={`remove-${product.id}`} onClick={() => handleDelete(product.id)}>
                    <Chip color="error" size="small" icon={<DeleteForeverIcon/>} label="Delete"/>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        <div className="add-product">
          <Link data-testid={`add`} to="/product/add">
            <Button variant="contained">Add Product</Button>
          </Link>
        </div>
      </div>)}
    </div>
  )
}

export default Table;