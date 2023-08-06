
import "./sslcommerzLoader"
import { Route, Routes } from "react-router-dom";
import Home from "./compnents/Home";
import OrderConfirm from "./compnents/OrderConfirm";
import axios from "axios";
import OrderSuccess from "./compnents/OrderSuccess";
import ShopInfo from "./compnents/ShopInfo";

function App() {

  const accessToken = '51|mcDG2AWWgN7m1oAlH5I4E9wQ0GB82eMvePsNUMnB';
  axios.defaults.baseURL = 'http://localhost/checkbox-v2/api/v2/';
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  axios.defaults.headers.common['Checkbox-Api-V2-Key'] = '83324867-6668-4c04-bf36-91714ea8b3e3';


  return (
    <div className="">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/order-confirmation" element={ <OrderConfirm/> } />
        <Route path="/order-success" element={ <OrderSuccess/> } />
        <Route path="/add-shop-info" element={ <ShopInfo/> } />
      </Routes>
    </div>
  )
}

export default App
