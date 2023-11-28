import classNames from "classnames/bind";
import classes from "./Cart.module.css";
import Header from "../../Layout/Header";
import Menu from "../../components/Menu";
import Footer from "../../Layout/Footer";
import images from "../../assets";
import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartActions";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { FaBeer } from "react-icons/fa";

const cx = classNames.bind(classes);
function Cart() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const qty = searchParams.get("qty") ? Number(searchParams.get("qty")) : 1;
  const cart = useSelector((state) => state.cart);
  const cartItems = cart.cartItems;
  const userLogin = useSelector((state) => state.userLogin);
  const userInfo = userLogin.userInfo;
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  return (
    <div>
      <Header />
      <div className={cx("nav")}>
        <section className={cx("section-menu")}>
          <Menu />
        </section>
        <container className="div"></container>
        <div className="title-cart">
          <h2 className={cx("trend-title-2")} style={{ marginLeft: "320px" }}>
            Xóa tất cả
          </h2>
        </div>
      </div>

      {cartItems.map((item) => {
        return (
          <div>
            <div className={cx("cart-container")}>
              {/* <div className={cx("cart-checkbox")}>
                <input type="checkbox" name="item" />
              </div> */}
              <div className={cx("cart-img")}>
                <img
                  src={item.data.data.img_products[1].link}
                  alt="Item in cart"
                />
              </div>
              <div className={cx("cart-content")}>
                <h3 className={cx("name-item")}>{item.data.data.name}</h3>
                <p className={cx("content-item")}>Dung Lượng: 256_GB</p>
                <p className={cx("content-item")}>Màu Sắc: Blue</p>
                <p className={cx("content-item")}>Số Lượng : 1</p>
                {/* <div className={cx("content-item")}>
                  <input type="number" className={cx("quantity-item")} />
                </div> */}
                <p className={cx("price-item")}>{item.data.data.price}</p>
              </div>
              <div className={cx("cart-delete")}></div>
            </div>
          </div>
        );
      })}

      <hr />
      <div className={cx("total-price")}>
        <p>Tổng thanh toán: </p>
        <span>2050000</span>
      </div>
      <hr />
      <div className={cx("view-all")}>
        <button
          outline
          onClick={() => {
            navigate("/checkout");
          }}
        >
          Thanh toán
        </button>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Cart;
