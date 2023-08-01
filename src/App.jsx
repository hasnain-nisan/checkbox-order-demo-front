
import "./sslcommerzLoader"
import { Route, Routes } from "react-router-dom";
import Home from "./compnents/Home";
import OrderConfirm from "./compnents/OrderConfirm";

function App() {

  return (
    <div className="">
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/order-confirmation" element={ <OrderConfirm/> } />
      </Routes>
    </div>
  )
}

export default App
