import {useEffect, useState} from 'react'
import './App.css'
import Table from './Table'
import ProductDetails from './ProductDetails'
import ProductEdit from './ProductEdit'
import ProductAdd from './ProductAdd'
import StockItemDetails from './StockItemDetails'
import StockItemEdit from './StockItemEdit'
import StockItemAdd from './StockItemAdd'
import MainPage from "./MainPage.jsx";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import api from './api'
import axios from "axios";
import Login from "./Login.jsx";
import SignUp from "./SignUp.jsx";
import UserDetails from "./UserDetails.jsx";

function App() {
  // const [items, setItems] = useState([])
  // const[forceUpdate, setForceUpdate] = useState(false)

  useEffect(() => {
    const checkBackendStatus = async () => {
      try {
        await axios.get('http://34.173.243.69/api/products'); // Change the URL to your backend endpoint
      } catch (error) {
        // Show dialog on error
        window.confirm('Error: Backend server is not running.');
      }
    };
    checkBackendStatus();
  }, []);

  // useEffect(() => {
  //   // Fetch products from backend when component mounts
  //   api.getProducts()
  //     .then(response => {
  //       setItems(response.data);
  //       console.log('Products fetched:', response.data);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching products:', error);
  //     });
  //   setForceUpdate(false)
  // }, [forceUpdate]);

  return (
    <div style={{width: "100%", display: "flex", justifyContent:"center", alignItems:"center"}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/product/:id" element={<ProductDetails/>} />
          <Route path="/product/edit/:id" element={<ProductEdit/>} />
          <Route path="/product/add" element={<ProductAdd/>} />
          <Route path={"/stockItem/:id"} element={<StockItemDetails/>} />
          <Route path={"/stockItem/edit/:id"} element={<StockItemEdit/>} />
          <Route path={"/stockItem/add"} element={<StockItemAdd/>} />
          <Route path={"/signup"} element={<SignUp/>} />
          <Route path={"/login"} element={<Login/>} />
          <Route path={"/user-details"} element={<UserDetails/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;
