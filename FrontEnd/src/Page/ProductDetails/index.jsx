import classNames from "classnames/bind";
import classes from "./ProductDetails.module.css";
import Header from "../../Layout/Header";
import Menu from "../../components/Menu";
import Footer from "../../Layout/Footer";
import images from "../../assets";
import Card from "../../components/Card";
import { RateIcon } from "../../components/Icons";

import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { listProductDetails } from "../../actions/productActions";

const cx = classNames.bind(classes);

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(id));
  }, [dispatch]);

  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=1`);
  };

  console.log(product);
  return (
    <div>
      <Header />
      <div className={cx("nav")}>
        <section className={cx("section-menu")}>
          <Menu />
        </section>
      </div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <div className={cx("container")}>
          <div className={cx("row")}>
            <div className={cx("col-lg-6 col-md-6")}>
              <div className={cx("product__details__pic")}>
                <div className={cx("product__details__pic__item")}>
                  <img
                    className={cx("product__details__pic__item--large")}
                    src={
                      product.data
                        ? product.data.img_products[1].link
                        : images.productdetail_1
                    }
                    alt=""
                  />
                </div>
                {/* <div className={cx("product__details__pic__slider ")}>
                  <img
                    data-imgbigurl={images.productdetail_2}
                    src={images.productdetail_2}
                    alt=""
                  />
                  <img
                    data-imgbigurl={images.productdetail_3}
                    src={images.productdetail_3}
                    alt=""
                  />
                  <img
                    data-imgbigurl={images.productdetail_4}
                    src={images.productdetail_4}
                    alt=""
                  />
                  <img
                    data-imgbigurl={images.productdetail_5}
                    src={images.productdetail_5}
                    alt=""
                  />
                  <img
                    data-imgbigurl={images.productdetail_6}
                    src={images.productdetail_6}
                    alt=""
                  />
                </div> */}
              </div>
            </div>
            <div className={cx("product_details_card")}>
              <div className={cx("product__details__text")}>
                <h3>{product.data ? product.data.name : ""}</h3>
                <div className={cx("product__details__rating")}>
                  <RateIcon />
                  <RateIcon />
                  <RateIcon />
                  <RateIcon />
                  <RateIcon />
                  <span>6969 đánh giá</span>
                </div>
                <div className={cx("product__details__price")}>
                  {product.data ? product.data.price : ""}
                  <span>{product.data ? product.data.original_price : ""}</span>
                </div>
                <div className={cx("product__details__info")}>
                  <div className={cx("product-color")}>
                    <p>Màu:</p>
                  </div>
                  <button outline>Vàng</button>
                  <button outline>Xanh</button>
                </div>
                <div className={cx("product-capacity")}>
                  <p>Dung lượng :</p>
                  <button outline>256GB</button>
                </div>

                <p>Số Lượng</p>
                <div className={cx("product-item")}>
                  <input type="number" className={cx("quantity-item")} />
                  <button
                    onClick={addToCartHandler}
                    className={cx("product_cart")}
                  >
                    Thêm vào giỏ hàng
                  </button>
                  <button className={cx("product_buy")}>Mua ngay</button>
                </div>
                <div className={cx("balashop-img")}>
                  <img
                    src={images.bala_shop}
                    alt=""
                    className={cx("massage-img")}
                  />
                  <div>
                    <h4>Tech Shop</h4>
                    <button className={cx("message")}>Nhắn tin</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={cx("col")}>
            <div className={cx("col-lg-6 col-md-6")}>
              <div className={cx("col-content")}>
                <h3>Mô Tả Sản Phẩm</h3>
                <p>{product.data ? product.data.short_description : ""}</p>
                <p>Tính năng nổi bật</p>
                <ul className={cx("list-content")}>
                  <li>
                    Màn hình Super Retina XDR 6.7 inch với ProMotion cho cảm
                    giác nhanh nhạy hơn (3)
                  </li>
                  <li>
                    Chế độ Điện Ảnh làm tăng thêm độ sâu trường ảnh nông và tự
                    động thay đổi tiêu cự trong video
                  </li>
                  <li>
                    Hệ thống camera chuyên nghiệp Telephoto, Wide và Ultra Wide
                    12MP; LiDAR Scanner; phạm vi thu phóng quang học 6x; chụp
                    ảnh macro; Phong Cách Nhiếp Ảnh, video ProRes (4), HDR thông
                    minh thế hệ 4, chế độ Ban Đêm, Apple ProRAW, khả năng quay
                    video HDR Dolby Vision 4K
                  </li>
                  <li>
                    Camera trước TrueDepth 12MP với chế độ Ban Đêm và khả năng
                    quay video HDR Dolby Vision 4K
                  </li>
                  <li>Chip A15 Bionic cho hiệu năng thần tốc</li>
                  <li>
                    Thời gian xem video lên đến 28 giờ, thời lượng pin dài nhất
                    từng có trên iPhone (2)
                  </li>
                  <li>Thiết kế bền bỉ với Ceramic Shield</li>
                  <li>
                    Khả năng chống nước đạt chuẩn IP68 đứng đầu thị trường (5)
                  </li>
                  <li>
                    Mạng 5G cho tốc độ tải xuống siêu nhanh, xem video và nghe
                    nhạc trực tuyến chất lượng cao (1)
                  </li>
                  <li>
                    iOS 15 tích hợp nhiều tính năng mới cho phép bạn làm được
                    nhiều việc hơn bao giờ hết với iPhone (6)
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={cx("card-content")}>
            <section className={cx("section-trend")}>
              <h2 className={cx("trend-title")}>Sản phẩm tương tự</h2>
              <div className={cx("wrapper")}>
                {/* <Card />
              <Card />
              <Card />
              <Card />
              <Card /> */}
              </div>
            </section>
          </div>

          <div className={cx("product-reviews")}>
            <section className={cx("reviews-content")}>
              <h2 className={cx("trend-title")}>Đánh giá sản phẩm</h2>
              <div className={cx("rate")}>
                <span className={cx("vote")}>5</span>
                <RateIcon />
                <RateIcon />
                <RateIcon />
                <RateIcon />
                <RateIcon />
                <span>6969 đánh giá</span>
              </div>
              <div className={cx("reviews")}>
                <h4>Nguyen Huu Dinh</h4>
                <RateIcon />
                <RateIcon />
                <RateIcon />
                <RateIcon />
                <RateIcon />
                <h5>Sản phẩm tuyệt vời</h5>
              </div>
              <div className={cx("reviews")}>
                <h4>Nguyen Huu Dinh</h4>
                <RateIcon />
                <RateIcon />
                <RateIcon />
                <RateIcon />
                <RateIcon />
                <h5>Sản phẩm tuyệt vời</h5>
              </div>
              <div className={cx("reviews")}>
                <h4>Nguyen Trung Hiếu</h4>
                <RateIcon />
                <RateIcon />
                <RateIcon />
                <RateIcon />
                <RateIcon />
                <h5>Sản phẩm tuyệt vời</h5>
              </div>
              <div className={cx("view-all")}>
                <button outline>Xem tất cả đánh giá</button>
              </div>
            </section>
          </div>
        </div>
      )}

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default ProductDetails;
