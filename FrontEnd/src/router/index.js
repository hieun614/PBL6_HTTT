import Home from ".././Page/Home";
import SignIn from ".././Page/SignIn";
import SignUp from "../Page/SignUp";
import ForgotPassword from "../Page/ForgotPassword";
import ProductDetails from "../Page/ProductDetails";
// import PopularDetails from "../Page/PopularDetails";
import ListProduct from "../Page/ListProduct";
import SearchResult from "../Page/SearchResult";
import Cart from "../Page/Cart";
// import CheckOut from "../Page/CheckOut";
// import Profile from "../Page/Profile";

const publicRoutes = [
  { path: "/", component: Home },
  { path: "/signin", component: SignIn, layout: null },
  { path: "/forgot-password", component: ForgotPassword, layout: null },
  { path: "/signup", component: SignUp, layout: null },
  { path: "/productdetails", component: ProductDetails, layout: null },
  // { path: "/populardetails", component: PopularDetails, layout: null },
  { path: "/ListProduct", component: ListProduct, layout: null },
  { path: "/SearchResult", component: SearchResult, layout: null },
  { path: "/Cart", component: Cart, layout: null },
  // { path: "/CheckOut", component: CheckOut, layout: null },
  // { path: "/Profile", component: Profile, layout: null },
];

const privateRoutes = [];

export { privateRoutes, publicRoutes };
