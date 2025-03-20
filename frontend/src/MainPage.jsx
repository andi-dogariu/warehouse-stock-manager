import Table from './Table'
import StockItemTable from './StockItemTable'
import {useEffect} from "react";

function MainPage() {

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      window.location.href = "/login";
    }
  }, [token]);

  return (
    <div style={{width: "100%", display: "flex", flexDirection: "column", alignItems:"center"}}>
      <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "flex-start"}}>
        <button style={{margin: "0.2em"}} onClick={() => window.location.href = "/user-details"}>User Details</button>
        <button style={{margin: "0.2em"}} onClick={() => {localStorage.removeItem('token'); window.location.reload();}}>Logout</button>
      </div>
      <div style={{width: "80%", display: "flex", flexDirection: "row", justifyContent: "space-around"}}>
        <Table/>
        <StockItemTable/>
      </div>
    </div>
  )
}

export default MainPage;