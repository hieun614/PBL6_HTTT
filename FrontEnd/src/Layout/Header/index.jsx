import React from "react";
import className from "classnames/bind";
import { Link } from "react-router-dom";

import classes from "./Header.module.css";
import images from "../../assets";
import { SearchIcon, CartIcon } from "../../components/Icons";
import Button from "../../components/Button";
import { logout } from "../../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { Navbar, Nav, Container, Row, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const cx = className.bind(classes);
function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <div className={cx("wrapper")}>
        <div className={cx("logo")}>
          <Link to="/">
            <img className={cx("logoImage")} src={images.logo} alt="" />
          </Link>
        </div>
        <div className={cx("search")}>
          <input type="text" className={cx("searchInput")} />
          <button className={cx("searchBtn")}>
            <SearchIcon />
          </button>
        </div>
        <div className={cx("direct")}>
          {userInfo ? (
            <div className={cx("direct")}>
              <Button primary to="/profile">
                {userInfo.data.first_name}
              </Button>

              <Button second icon={<CartIcon />} to="/cart">
                Giỏ hàng
              </Button>

              <Button outline primary onClick={logoutHandler}>
                Logout
              </Button>
            </div>
          ) : (
            <div className={cx("direct")}>
              <Button outline primary to="/signup">
                Đăng ký
              </Button>
              <Button primary to="/signin">
                Đăng nhập
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
