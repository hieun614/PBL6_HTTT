import React from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";

import classes from "./ForgotPassword.module.css";
import images from "../../assets";
import Button from "../../components/Button";

const cx = classNames.bind(classes);
function ForgotPassword() {
  return (
    <div>
      <header>
        <Link to="/">
          <img src={images.logo} alt="" className={cx("logo")} />
        </Link>
      </header>
      <div className={cx("contain")}>
        <h3 className={cx("title")}>Nhập email để lấy lại mật khẩu</h3>
        <div className={cx("form")}>
          <input className={cx("btn")} type="text" placeholder="Enter email" />
          <div className={cx("action")}>
            <Button outline>Thoát</Button>
            <Button primary>Lấy mật khẩu</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
