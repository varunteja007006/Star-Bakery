import Navbar from "./components/main/navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { FilterPage, Home, Order } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <main className="h-full text-black bg-purple-100">
        <Navbar></Navbar>
        <Routes>
          <Route index path="/" element={<Home></Home>}></Route>
          <Route path="/createOrder" element={<Order></Order>}></Route>
          <Route path="/filters" element={<FilterPage></FilterPage>}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
