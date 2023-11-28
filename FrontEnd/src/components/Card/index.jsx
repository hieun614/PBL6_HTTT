import React from "react";
import className from "classnames/bind";

import classes from "./Card.module.css";
import images from "../../assets";
import { RateIcon, CartIcon } from "../Icons";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";
const cx = className.bind(classes);
function Card({ product }) {
  const navigate = useNavigate();

  const addToCartHandler = () => {
    navigate(`/cart/${product.id}?qty=1`);
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("sale")}>Giảm 30%</div>
      <Link to={`/productdetails/${product.id}`}>
        <img
          src={product.img_products[1].link}
          alt=""
          style={{ width: "188px", height: "188px" }}
        />
      </Link>
      <div className={cx("product-desc")}>
        <div className={cx("product-name")}>
          <Link
            to={`/productdetails/${product.id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <p>{product.name}</p>
          </Link>
        </div>
        <p className={cx("price-origin")}>{product.original_price}</p>
        <p className={cx("price-sale")}>{product.price}</p>
        <div className={cx("rate")}>
          <RateIcon />
          <RateIcon />
          <RateIcon />
          <RateIcon />
          <RateIcon />
        </div>
        <Button
          primary
          icon={<CartIcon />}
          onClick={addToCartHandler}
          className={cx("product-btn")}
        ></Button>
      </div>
    </div>
  );
}

export default Card;
