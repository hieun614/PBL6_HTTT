import React from "react";
import className from "classnames/bind";
import classes from "./CheckOut.module.css";
import images from "../../assets";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";

const cx = className.bind(classes);

function CheckOut() {
  return (
    <div>
      <Header></Header>
      <div className={cx("container")}>
        <hr className={cx("col-1")} />
        <h2 className={cx("title")}>
          Hướng dẫn thanh toán đơn hàng này trên app địện thoại
        </h2>
        <hr />
        <div className={cx("card-content")}>
          <img className={cx("payment-img")} src={images.order} alt="" />
          <img className={cx("payment-img")} src={images.order} alt="" />
          <img className={cx("payment-img")} src={images.payment} alt="" />
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
