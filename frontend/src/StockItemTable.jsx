import Button from '@mui/material/Button'
import { Link } from 'react-router-dom'
import Chip from '@mui/material/Chip'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import Visibility from '@mui/icons-material/Visibility'
import {useEffect, useState} from "react";
import api from "./api";
import {w3cwebsocket as W3CWebSocket} from "websocket";

const client = new W3CWebSocket('ws://localhost:8080');

function StockItemTable() {

  const [makeMap, setMakeMap] = useState(new Map());
  const [modelMap, setModelMap] = useState(new Map());
  const[stockItemList, setStockItemList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading state to true before making the API call
    setLoading(true);

    // Fetch products from API
    api.getStockItems()
      .then(response => {
        setStockItemList(response.data);
        console.log('StockItems fetched:', response.data);
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
      setStockItemList((prevProductList) => [...prevProductList, parsedMessage]);
    }
  }, []);

  useEffect(() => {
    // Check if loading is false before populating makeMap
    if (!loading) {
      const productIdList = stockItemList.map((stockItem) => stockItem.productId);
      const productIdSet = new Set(productIdList);
      const productIdArray = Array.from(productIdSet);
      const tempMap = new Map();
      const tempMap2 = new Map();
      // Use Promise.all to wait for all getProductById promises to resolve
      Promise.all(productIdArray.map((id) => api.getProductById(id)))
        .then(responses => {
          responses.forEach((response, index) => {
            tempMap.set(productIdArray[index], response.data.make);
            tempMap2.set(productIdArray[index], response.data.model);
          });
          setMakeMap(tempMap); // Update makeMap state after all promises have resolved
          setModelMap(tempMap2);
        })
        .catch(error => {
          console.error('Error fetching make:', error);
        });
    }
  }, [loading, stockItemList]); // Dependency on loading and stockItemList

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this StockItem?")) return;
    // api call for deleting product
    api.deleteStockItem(id)
      .then(response => {
        console.log('StockItem deleted:', response.data);
        setStockItemList(stockItemList.filter((product) => product.id !== id));
        window.parent.location = window.parent.location.href;
      })
      .catch(error => {
        console.error('Error deleting StockItem:', error);
      });
  };

  const paginatedData = stockItemList;

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
          <h1 className="title">StockItem Table</h1>
          <table>
            <thead>
            <tr>
              <th>Product</th>
              <th>Location</th>
            </tr>
            </thead>
            <tbody>
            {paginatedData.map((stockItem) => (
              <tr key={stockItem.id} data-testid={`row-${stockItem.id}`}>
                <td>{`${makeMap.get(stockItem.productId)} - ${modelMap.get(stockItem.productId)}`}</td>
                <td>{stockItem.location}</td>
                <td>
                  <div className="buttons">
                    <Link data-testid={`details-${stockItem.id}`} to={`/stockItem/${stockItem.id}`}>
                      <Chip color="success" icon={<Visibility/>} label="Details" size="small"/>
                    </Link>
                    <div className="button-edit">
                      <Link data-testid={`edit-${stockItem.id}`} to={`/stockItem/edit/${stockItem.id}`}>
                        <Chip color="info" icon={<EditIcon/>} label="Edit" size="small"/>
                      </Link>
                    </div>
                    <Button data-testid={`remove-${stockItem.id}`} onClick={() => handleDelete(stockItem.id)}>
                      <Chip color="error" size="small" icon={<DeleteForeverIcon/>} label="Delete"/>
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
          <div className="add-stockItem">
            <Link data-testid={`add`} to="/stockItem/add">
              <Button variant="contained">Add StockItem</Button>
            </Link>
          </div>
        </div>)}
    </div>
  )
}

export default StockItemTable;