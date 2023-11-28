import * as React from "react";
import className from "classnames/bind";

import classes from "./Home.module.css";

import Card from "../../components/Card";

import Button from "../../components/Button";

import Header from "../../Layout/Header";

import Footer from "../../Layout/Footer";

import Slide from "../../components/Slide";

import { listProducts } from "../../actions/productActions";

import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";
import Menu from "../../components/Menu";

const cx = className.bind(classes);
function Home() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  const ref = useRef();

  React.useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  if (products) {
    ref.current = products.results;
  }
  return (
    <div>
      <Header></Header>
      <Menu></Menu>
      <Slide></Slide>
      <section className={cx("section-trend")}>
        <h2 className={cx("trend-title")} style={{ marginBottom: "20px" }}>
          Xu hướng mua sắm
        </h2>
        <div className={cx("wrapper")}>
          {ref.current &&
            ref.current.map((product) => <Card product={product} />)}
        </div>
        <div className={cx("view-all")}>
          <Button outline>Xem tất cả</Button>
        </div>
      </section>
      <Footer></Footer>
    </div>
  );
}

export default Home;
