import React from "react";
import classNames from "classnames/bind";
import Card from "../../components/Card";
import Header from "../../Layout/Header";
import Menu from "../../components/Menu";
import Footer from "../../Layout/Footer";
import classes from "./SearchResult.module.css";

const cx = classNames.bind(classes);
function ListProduct({ match }) {
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
          <p className={cx("list-title")}>Kết quả tìm kiếm "Iphone"</p>
          <p className={cx("sort-title")}>Sắp xếp: </p>
          <button outline>Nổi bật</button>
        </div>
        <section className={cx("section-trend")}>
          <div className={cx("wrapper")}>
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
            <Card />
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
