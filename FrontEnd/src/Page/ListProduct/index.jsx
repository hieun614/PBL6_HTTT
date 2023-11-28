import React from "react";
import classNames from "classnames/bind";
import Card from "../../components/Card";
import Header from "../../Layout/Header";
import Menu from "../../components/Menu";
import Footer from "../../Layout/Footer";
import classes from "./ListProduct.module.css";

import { listProducts } from "../../actions/productActions";

import { useDispatch, useSelector } from "react-redux";
import { useRef } from "react";

const cx = classNames.bind(classes);
function ListProduct({ match }) {
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
      <Header />
      <div className={cx("nav")}>
        <section className={cx("section-menu")}>
          <Menu />
        </section>
      </div>
      <div className={cx("centent-section")}>
        <div className={cx("trend-title")}>
          <p className={cx("list-title")}>Điện thoại</p>
          <p className={cx("sort-title")}>Sắp xếp: </p>
          <button outline>Nổi bật</button>
        </div>
        <section className={cx("section-trend")}>
          <div className={cx("wrapper")}>
            {ref.current &&
              ref.current.map((product) => <Card product={product} />)}
          </div>
        </section>
        <div className={cx("quantity")}>
          <ul className="list-button">
            <button className={cx("page-1")}>1</button>
            <button>2</button>
            <button>3</button>
            <button>...</button>
            <button>9</button>
            <button>10</button>
            <button>11</button>
          </ul>
        </div>
      </div>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default ListProduct;
