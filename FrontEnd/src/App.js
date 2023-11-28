import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Page/Home";
import SignIn from "./Page/SignIn";
import SignUp from "./Page/SignUp";
import ForgotPassword from "./Page/ForgotPassword";
import ProductDetails from "./Page/ProductDetails";
import ListProduct from "./Page/ListProduct";
import SearchResult from "./Page/SearchResult";
import Cart from "./Page/Cart";
import Profile from "./Page/Profile";
import CheckOut from "./Page/CheckOut";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/productdetails/:id" element={<ProductDetails />} />
        <Route path="/listProduct" element={<ListProduct />} />
        <Route path="/searchResult" element={<SearchResult />} />
        <Route path="/cart/:id/*" element={<Cart />} />
        <Route path="/cart/" element={<Cart />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/checkout" element={<CheckOut />} />
      </Routes>
    </Router>
  );
}

export default App;
