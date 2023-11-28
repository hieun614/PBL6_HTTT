import React from "react";
import className from "classnames/bind";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import classes from "./Profile.module.css";

import images from "../../assets";

import Button from "../../components/Button";

import Header from "../../Layout/Header";

import Footer from "../../Layout/Footer";

const cx = className.bind(classes);

function Profile() {
  let myProfile = JSON.parse(localStorage.getItem("userProfile"));
  if (!myProfile) {
    myProfile = {
      name: "",
      firstName: "",
      email: "",
      datetime: "",
      gender: "",
      phone: "",
      address: "",
    };
  }
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [name, setName] = useState(myProfile.name);
  const [firstName, setFirstName] = useState(myProfile.firstName);
  const [email, setEmail] = useState(myProfile.email);
  const [datetime, setDateTime] = useState(myProfile.datetime);
  const [gender, setGender] = useState(myProfile.gender);
  const [phone, setPhone] = useState(myProfile.phone);
  const [address, setAddress] = useState(myProfile.address);

  const handleUpdate = () => {
    alert("Success");
    localStorage.setItem(
      "userProfile",
      JSON.stringify({
        name: name,
        firstName: firstName,
        email: email,
        datetime: datetime,
        gender: gender,
        phone: phone,
        address: address,
      })
    );
  };

  return (
    <div>
      <Header></Header>
      <div className={cx("container")}>
        <div className={cx("row gutters")}>
          <div className={cx("card")}>
            <div className={cx("card-body")}>
              <div className={cx("account-settings")}>
                <div className={cx("user-avatar")}>
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt=""
                  />
                </div>
                <h5 className={cx("user-name")}>Nguyễn Trung Hiếu</h5>
                <h6 className={cx("user-email")}>Hieun614@gmail.com</h6>
              </div>
              <div className={cx("about")}>
                <button outline>Người mua</button>
              </div>
              <div className={cx("form-group")}>
                <label for="userName">Username</label>
                <input
                  type="text"
                  className={cx("form_control")}
                  id="userName"
                  placeholder="nguyenhieu@2k1"
                  value={userInfo.name}
                  disabled
                />
              </div>
              <div className={cx("regis-buy")}>
                <button outline>Đăng kí người bán</button>
              </div>
            </div>
          </div>
        </div>
        <div className={cx("card")}>
          <div className={cx("form-body")}>
            <div className={cx("row")}>
              <div className="col-3">
                <h6 className={cx("change-primary")}>Sửa hồ sơ</h6>
                <div className="list-form">
                  <div className={cx("form-group")}>
                    <label for="firstName">Họ</label>
                    <input
                      type="text"
                      className={cx("form-control")}
                      id="fullName"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      value={firstName}
                      placeholder="Enter first name"
                    />
                  </div>
                  <div className={cx("form-group")}>
                    <label for="phone">Tên</label>
                    <input
                      type="text"
                      className={cx("form-control")}
                      onChange={(e) => {
                        setName(e.target.value);
                      }}
                      value={name}
                      id="phone"
                      placeholder="Enter name"
                    />
                  </div>
                  <div className={cx("form-group")}>
                    <label for="eMail">Email</label>
                    <input
                      type="email"
                      className={cx("form-control")}
                      id="eMail"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder="Hieun614@gmail.com"
                      disabled
                    />
                  </div>

                  <div className={cx("form-group")}>
                    <label for="">Ngày Sinh</label>
                    <input
                      type="date"
                      onChange={(e) => {
                        setDateTime(e.target.value);
                      }}
                      value={datetime}
                      className={cx("form-control")}
                      id="ngày sinh"
                    />
                  </div>
                  <div className={cx("form-group")}>
                    <label for="">Giới Tính</label>
                    <select
                      name=""
                      id=""
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    >
                      <option
                        value="Nam"
                        selected={gender === "Nam" ? true : false}
                      >
                        Nam
                      </option>
                      <option
                        value="Nữ"
                        selected={gender === "Nữ" ? true : false}
                      >
                        Nữ
                      </option>
                    </select>
                  </div>
                  <div className={cx("form-group")}>
                    <label for="">Số điện thoại</label>
                    <input
                      type="text"
                      className={cx("form-control")}
                      onChange={(e) => {
                        setPhone(e.target.value);
                      }}
                      id="number"
                      value={phone}
                      placeholder="enter number"
                    />
                  </div>
                  <div className={cx("form-group")}>
                    <label for="">Địa chỉ</label>
                    <input
                      type="text"
                      className={cx("form-control")}
                      onChange={(e) => {
                        setAddress(e.target.value);
                      }}
                      value={address}
                      id="number"
                      placeholder="Enter address"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className={cx("text-right")}>
              <button
                type="button"
                id="submit"
                name="submit"
                className={cx("btn-secondary")}
              >
                Cancel
              </button>
              <button
                type="button"
                id="submit"
                name="submit"
                onClick={handleUpdate}
                className={cx("btn-primary")}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
