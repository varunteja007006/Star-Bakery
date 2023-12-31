import Navbar from "./components/main/navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home, Order, OrderDetails } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <main className="h-full text-black bg-sky-100 dark:text-black">
        <Navbar></Navbar>
        <Routes>
          <Route index path="/" element={<Home></Home>}></Route>
          <Route
            path="/orderDetails/:id"
            element={<OrderDetails></OrderDetails>}
          ></Route>
          <Route path="/createOrder" element={<Order></Order>}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
